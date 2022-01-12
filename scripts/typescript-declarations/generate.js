// This script generates TypeScript declaration files (.d.ts) of the library and saves them to the
// 'dist' directory for later publishing. By default, CommonJS and ES2020 versions are generated.
//
// Calling this script with the -t argument allows generating only one declaration file. Options
// are: cjs and esm.
//
// Calling this script with the -c argument allows you to commit and push the generated files.
// Options are true or false.

// Modules
const git = require("simple-git/promise")();
const moment = require("moment");
const path = require("path");
const prependFile = require("prepend-file");
const replace = require("replace-in-file");
const system = require("system-commands");
const pkg = require("../../package.json");
const os = require("os");
const fsPromises = require("fs").promises;
const fs = require("fs-extra");

const OUT_DIR = "dist";

const WEB_MIDI_API_CLASSES = [
  "MIDIAccess",
  "MIDIConnectionEvent",
  "MIDIConnectionEventInit",
  "MIDIInput",
  "MIDIInputMap",
  "MIDIMessageEvent",
  "MIDIMessageEventInit",
  "MIDIOptions",
  "MIDIOutput",
  "MIDIOutputMap",
  "MIDIPort",
  "MIDIPortConnectionStatus",
  "MIDIPortDeviceState",
  "MIDIPortType"
];

const HEADER = `// Type definitions for ${pkg.webmidi.name} ${pkg.version}\n` +
  `// Project: ${pkg.homepage}\n` +
  `// Definitions by: ${pkg.author.name} <https://github.com/djipco/>\n` +
  `// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\n\n`;

let targets = [];

let type = "all";
const argv = require("minimist")(process.argv.slice(2));
if (["cjs", "esm"].includes(argv.t)) type = argv.t;

const commit = argv.c === "true";

if (type === "all" || type === "cjs")
  targets.push({source: "webmidi.cjs.js", name: "cjs", type: "CommonJS"});

if (type === "all" || type === "esm")
  targets.push({source: "webmidi.esm.js", name: "esm", type: "ES2020"});

async function execute() {

  // Temp dir
  const TMP_DIR_PATH = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-ts-"));

  targets.forEach(async target => {

    // Make a copy of the source file so we can substitute some elements before parsing
    const TMP_FILE_PATH = path.join(TMP_DIR_PATH, target.source);
    await fs.copy(
      path.join(OUT_DIR, target.name, target.source),
      TMP_FILE_PATH,
      {overwrite: true}
    );

    // Add TypeScript WebMidi namespace before native Web MIDI API objects
    WEB_MIDI_API_CLASSES.forEach(element => {

      const options = {
        files: TMP_FILE_PATH,
        from: new RegExp("{" + element + "}", "g"),
        to: () => `{WebMidi.${element}}`
      };

      replace.sync(options);

    });

    // Replace callback type by simply "EventEmitterCallback" (this is needed because tsc does not
    // support tilde character in types. See below...
    replace.sync({
      files: TMP_FILE_PATH,
      from: new RegExp("{EventEmitter~callback}", "g"),
      to: () => "{EventEmitterCallback}"
    });

    // Generate declaration file
    const cmd = "npx -p typescript tsc " + TMP_FILE_PATH +
      " --declaration --allowJs --emitDeclarationOnly" +
      " --module " + target.type +
      " --lib ES2020,DOM --outDir " + path.join(OUT_DIR, target.name) ;
    await system(cmd);

    // Remove readonly flag
    const file = path.join(OUT_DIR, target.name, target.source.replace(".js", ".d.ts"));
    const options = {
      files: [file],
      from: /readonly /g,
      to: ""
    };
    await replace(options);

    // Prepend header for DefinitelyTyped
    await prependFile(file, HEADER);
    log("Saved " + target.type + " TypeScript declaration file to '" + file + "'");

    // Inject EventEmitterCallback type declaration
    fs.appendFileSync(
      file,
      `\n\n` +
      `// This is automatically injected to fix a bug with the TypeScript compiler\n` +
      `export type EventEmitterCallback = (...args: any[]) => void;\n`
    );

    // Commit
    if (commit) {
      await git.add([file]);
      await git.commit("Generated by TypeScript compiler on " + moment().format());
      await git.push();
    }

  });

}

// Execute and catch errors if any (in red)
execute().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));

function log(message) {
  console.info("\x1b[32m", message, "\x1b[0m");
}
