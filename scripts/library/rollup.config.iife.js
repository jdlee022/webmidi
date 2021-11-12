import babel from "rollup-plugin-babel";
import stripCode from "rollup-plugin-strip-code";

const fs = require("fs");
const license = require("rollup-plugin-license");
const versionInjector = require("rollup-plugin-version-injector");

const BANNER = fs.readFileSync(__dirname + "/../../BANNER.txt", "utf8") + "\n\n\n";

export default {

  output: {
    name: "window",       // WebMidi and Note will be added to window
    extend: true,         // important!
    exports: "named"
  },

  plugins: [
    versionInjector(),
    stripCode({
      start_comment: "START-NODE.JS",
      end_comment: "END-NODE.JS"
    }),
    babel(),
    license({
      banner: BANNER
    })
  ]

};