import {EventEmitter} from "../node_modules/djipevents/dist/djipevents.esm.min.js";
import {WebMidi} from "./WebMidi.js";
import {InputChannel} from "./InputChannel.js";

/**
 * The `Input` class represents a single MIDI input port. This object is derived from the host's
 * MIDI subsystem and cannot be instantiated directly.
 *
 * You can find a list of all currently available `Input` objects in the {@link WebMidi#inputs}
 * array.
 *
 * The `Input` class extends the
 * [EventEmitter](https://djipco.github.io/djipevents/EventEmitter.html) class from the
 * [djipevents]{@link https://djipco.github.io/djipevents/index.html} module. This means
 * it also includes methods such as
 * [getListeners()](https://djipco.github.io/djipevents/EventEmitter.html#getListeners),
 * [emit()](https://djipco.github.io/djipevents/EventEmitter.html#emit),
 * [suspendEvent()](https://djipco.github.io/djipevents/EventEmitter.html#suspendEvent) and several
 * others.
 *
 * @param {MIDIInput} midiInput `MIDIInput` object as provided by the MIDI subsystem (Web MIDI API).
 *
 * @fires Input#opened
 * @fires Input#disconnected
 * @fires Input#closed
 * @fires Input#midimessage
 * @fires Input#sysex
 * @fires Input#timecode
 * @fires Input#songposition
 * @fires Input#songselect
 * @fires Input#tunerequest
 * @fires Input#clock
 * @fires Input#start
 * @fires Input#continue
 * @fires Input#stop
 * @fires Input#activesensing
 * @fires Input#reset
 * @fires Input#midimessage
 * @fires Input#unknownmidimessage
 */
export class Input extends EventEmitter {

  constructor(midiInput) {

    super();

    /**
     * Reference to the actual MIDIInput object
     * @private
     */
    this._midiInput = midiInput;

    /**
     * Array containing the 16 {@link InputChannel} objects available for this `Input`. The
     * channels are numbered 1 through 16.
     *
     * @type {InputChannel[]}
     */
    this.channels = [];
    for (let i = 1; i <= 16; i++) this.channels[i] = new InputChannel(this, i);

    // Setup listeners
    this._midiInput.onstatechange = this._onStateChange.bind(this);
    this._midiInput.onmidimessage = this._onMidiMessage.bind(this);

  }

  /**
   * Destroys the `Input` by remove all listeners, emptying the `channels` array and unlinking the
   * MIDI subsystem.
   *
   * @returns {Promise<void>}
   */
  async destroy() {
    this.removeListener();
    this.channels.forEach(ch => ch.destroy());
    this.channels = [];
    this._midiInput.onstatechange = null;
    this._midiInput.onmidimessage = null;
    await this.close();
    this._midiInput = null;
  }

  /**
   * Executed when a `"statechange"` event occurs.
   *
   * @param e
   * @private
   */
  _onStateChange(e) {

    let event = {
      timestamp: WebMidi.time,
      target: this
    };

    if (e.port.connection === "open") {

      /**
       * Event emitted when the {@link Input} has been opened by calling the {@link Input#open}
       * method.
       *
       * @event Input#opened
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"opened"`
       * @property {Input} target The object that triggered the event
       */
      event.type = "opened";
      this.emit("opened", event);

    } else if (e.port.connection === "closed" && e.port.state === "connected") {

      /**
       * Event emitted when the {@link Input} has been closed by calling the {@link Input#close}
       * method.
       *
       * @event Input#closed
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"closed"`
       * @property {Input} target The object that triggered the event
       */
      event.type = "closed";
      this.emit("closed", event);

    } else if (e.port.connection === "closed" && e.port.state === "disconnected") {

      /**
       * Event emitted when the {@link Input} becomes unavailable. This event is typically fired
       * when the MIDI device is unplugged.
       *
       * @event Input#disconnected
       * @type {Object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"disconnected"`
       * @property {Object} target Object with properties describing the {@link Input} that
       * triggered the event. This is not the actual `Input` as it is no longer available.
       * @property {string} target.connection `"closed"`
       * @property {string} target.id ID of the input
       * @property {string} target.manufacturer Manufacturer of the device that provided the input
       * @property {string} target.name Name of the device that provided the input
       * @property {string} target.state `"disconnected"`
       * @property {string} target.type `"input"`
       */
      event.type = "disconnected";
      event.target = {
        connection: e.port.connection,
        id: e.port.id,
        manufacturer: e.port.manufacturer,
        name: e.port.name,
        state: e.port.state,
        type: e.port.type
      };
      this.emit("disconnected", event);

    } else if (e.port.connection === "pending" && e.port.state === "disconnected") {
      // I don't see the need to forward that...
    } else {
      console.warn("This statechange event was not caught: ", e.port.connection, e.port.state);
    }

  }

  /**
   * Executed when a `"midimessage"` event is received
   * @param e
   * @private
   */
  _onMidiMessage(e) {

    // Extract data bytes (unless it's a sysex message)
    let dataBytes = null;
    if (e.data[0] !== WebMidi.MIDI_SYSTEM_MESSAGES.sysex) dataBytes = e.data.slice(1);

    /**
     * Event emitted when a MIDI message is received on the `Input`
     *
     * @event Input#midimessage
     * @type {Object}
     * @property {Input} target The `Input` that triggered the event.
     * @property {Array} event.data The MIDI message as an array of 8 bit values.
     * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
     * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
     * milliseconds since the navigation start of the document).
     * @property {string} type `"midimessage"`
     * @property {number} event.statusByte The message's status byte.
     * @property {?number[]} event.dataBytes The message's data bytes as an array of 0, 1 or 2
     * integers. This will be null for `sysex` messages.
     *
     * @since 2.1
     */
    let event = {
      target: this,
      data: Array.from(e.data),
      rawData: e.data,
      statusByte: e.data[0],
      dataBytes: dataBytes,
      timestamp: e.timeStamp,
      type: "midimessage"
    };

    this.emit("midimessage", event);

    // Messages are forwarded to InputChannel if they are targeted at a channel or parsed locally
    // for system messages.
    if (e.data[0] < 240) {          // channel-specific message
      let channel = (e.data[0] & 0xf) + 1;
      this.channels[channel]._parseEvent(e);
    } else if (e.data[0] <= 255) {  // system message
      this._parseEvent(e);
    }

  }

  /**
   * @private
   */
  _parseEvent(e) {

    let command = e.data[0];

    // Returned event
    var event = {
      target: this,
      data: Array.from(e.data),
      rawData: e.data,
      timestamp: e.timeStamp
    };

    if (command === WebMidi.MIDI_SYSTEM_MESSAGES.sysex) {

      /**
       * Input-wide (system) event emitted when a **system exclusive** message has been received.
       * You should note that, to receive `sysex` events, you must call the `WebMidi.enable()`
       * method with the `sysex` option set to `true`:
       *
       * ```js
       * WebMidi.enable({sysex: true})
       *  .then(() => console.log("WebMidi has been enabled with sysex support."))
       *  .catch(err => console.log("WebMidi could not be enabled."))
       * ```
       *
       * @event Input#sysex
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"sysex"`
       */
      event.type = "sysex";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.timecode) {

      /**
       * Input-wide (system) event emitted when a **time code quarter frame** message has been
       * received.
       *
       * @event Input#timecode
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"sysextimecode"`
       */
      event.type = "timecode";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.songposition) {

      /**
       * Input-wide (system) event emitted when a **song position** message has been received.
       *
       * @event Input#songposition
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"songposition"`
       */
      event.type = "songposition";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.songselect) {

      /**
       * Input-wide (system) event emitted when a **song select** message has been received.
       *
       * @event Input#songselect
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"songselect"`
       * @property {string} song Song (or sequence) number to select (1-128)
       */
      event.type = "songselect";
      event.song = e.data[1] + 1;

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.tunerequest) {

      /**
       * Input-wide (system) event emitted when a **tune request** message has been received.
       *
       * @event Input#tunerequest
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"tunerequest"`
       */
      event.type = "tunerequest";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.clock) {

      /**
       * Input-wide (system) event emitted when a **timing clock** message has been received.
       *
       * @event Input#clock
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"clock"`
       */
      event.type = "clock";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.start) {

      /**
       * Input-wide (system) event emitted when a **start** message has been received.
       *
       * @event Input#start
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"start"`
       */
      event.type = "start";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.continue) {

      /**
       * Input-wide (system) event emitted when a **continue** message has been received.
       *
       * @event Input#continue
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"continue"`
       */
      event.type = "continue";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.stop) {

      /**
       * Input-wide (system) event emitted when a **stop** message has been received.
       *
       * @event Input#stop
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"stop"`
       */
      event.type = "stop";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.activesensing) {

      /**
       * Input-wide (system) event emitted when an **active sensing** message has been received.
       *
       * @event Input#activesensing
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"activesensing"`
       */
      event.type = "activesensing";

    } else if (command === WebMidi.MIDI_SYSTEM_MESSAGES.reset) {

      /**
       * Input-wide (system) event emitted when a **reset** message has been received.
       *
       * @event Input#reset
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"reset"`
       */
      event.type = "reset";

    } else {

      /**
       * Input-wide (system) event emitted when an unknown MIDI message has been received. It could
       * be, for example, one of the undefined/reserved messages.
       *
       * @event Input#unknownmidimessage
       * @type {Object}
       * @property {InputChannel} target The `Input` that triggered the event.
       * @property {Array} event.data The MIDI message as an array of 8 bit values.
       * @property {Uint8Array} event.rawData The raw MIDI message as a Uint8Array.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `"unknownmidimessage"`
       */
      event.type = "unknownmidimessage";

    }

    this.emit(event.type, event);

  }

  /**
   * Opens the input for usage.
   *
   * @returns {Promise<Input>} The promise is fulfilled with the `Input`
   */
  async open() {

    // Explicitly opens the port for usage. This is not mandatory. When the port is not explicitly
    // opened, it is implicitly opened (asynchronously) when assigning a listener to the
    // `onmidimessage` property of the `MIDIInput`. We do it explicitly so that 'connected' events
    // are dispatched immediately and that we are ready to listen.
    try {
      await this._midiInput.open();
      return Promise.resolve(this);
    } catch (err) {
      return Promise.reject(err);
    }

  }

  /**
   * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
   * the input is opened again by calling [Input.open()]{@link Input#open}.
   *
   * @returns {Promise<void|*>}
   */
  async close() {

    // We close the port. This triggers a statechange event which, in turn, will emit the 'closed'
    // event.
    if (this._midiInput) {
      return this._midiInput.close();
    } else {
      return Promise.resolve();
    }

  }

  /**
   * @private
   * @deprecated since v3.0.0 (moved to 'InputChannel' class)
   */
  getChannelModeByNumber() {
    if (WebMidi.validation) {
      console.warn(
        "The 'getChannelModeByNumber()' method has been moved to the 'InputChannel' class."
      );
    }
  }

  /**
   * Adds an event listener that will trigger a function callback when the specified event happens.
   * The event can be **channel-bound** or **input-wide**. Channel-bound events are dispatched by
   * {@link InputChannel} objects and are tied to a specific MIDI channel while input-wide events
   * are dispatched by the {@link Input} object itself and are not tied to a specific channel.
   *
   * When listening for an input-wide event, you must specify the event to listen for and the
   * callback function to trigger when the event happens:
   *
   * ```
   * WebMidi.inputs[0].addListener("midimessage", someFunction);
   * ```
   *
   * To listen for a channel-bound event, you must also specify the event to listen for and the
   * function to trigger but you have to add the channels you wish to listen on in the `options`
   * parameter:
   *
   * ```
   * WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
   * ```
   *
   * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
   * event is triggered on MIDI channels `1`, `2` or `3`.
   *
   * Note that, when adding events to channels, it is the {@link InputChannel} instance that
   * actually gets a listener added and not the `{@link Input} instance.
   *
   * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
   * on the {@link InputChannel} object itself.
   *
   * There are 6 families of events you can listen to:
   *
   * 1. **MIDI System Common** Events (input-wide)
   *
   *    * [songposition]{@link Input#event:songposition}
   *    * [songselect]{@link Input#event:songselect}
   *    * [sysex]{@link Input#event:sysex}
   *    * [timecode]{@link Input#event:timecode}
   *    * [tunerequest]{@link Input#event:tunerequest}
   *
   * 2. **MIDI System Real-Time** Events (input-wide)
   *
   *    * [clock]{@link Input#event:clock}
   *    * [start]{@link Input#event:start}
   *    * [continue]{@link Input#event:continue}
   *    * [stop]{@link Input#event:stop}
   *    * [activesensing]{@link Input#event:activesensing}
   *    * [reset]{@link Input#event:reset}
   *
   * 3. **State Change** Events (input-wide)
   *
   *    * [opened]{@link Input#event:opened}
   *    * [closed]{@link Input#event:closed}
   *    * [disconnected]{@link Input#event:disconnected}
   *
   * 4. **Catch-All** Events (input-wide)
   *
   *    * [midimessage]{@link Input#event:midimessage}
   *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
   *
   * 5. **Channel Voice** Events (channel-specific)
   *
   *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   *    * [controlchange]{@link InputChannel#event:controlchange}
   *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   *    * [noteoff]{@link InputChannel#event:noteoff}
   *    * [noteon]{@link InputChannel#event:noteon}
   *    * [nrpn]{@link InputChannel#event:nrpn}
   *    * [pitchbend]{@link InputChannel#event:pitchbend}
   *    * [programchange]{@link InputChannel#event:programchange}
   *
   * 6. **Channel Mode** Events (channel-specific)
   *
   *    * [channelmode]{@link InputChannel#event:channelmode}
   *    * To be completed...
   *
   * @param event {string} The type of the event.
   *
   * @param listener {function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @param {Object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the `arguments` property of the `Listener` object
   * and can be retrieved or modified as desired.
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
   * input-wide events.
   *
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array.
   *
   * @param {boolean} [options.remaining=Infinity] The number of times after which the callback
   * should automatically be removed.
   *
   * @throws {Error} For channel-specific events, 'options.channels' must be defined.
   *
   * @returns {Listener[]} An array of all `Listener` objects that were created.
   */
  addListener(event, listener, options = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (typeof options === "function") {
        let channels = (listener != undefined) ? [].concat(listener) : undefined; // clone
        listener = options;
        options = {channels: channels};
      }

      // Validation
      if (
        WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined &&
        options.channels === undefined
      ) {
        throw new Error("For channel-specific events, 'options.channels' must be defined.");
      }

    }

    let listeners = [];

    // Check if the event is channel-specific or input-wide
    if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[event] === undefined) {
      listeners.push(super.addListener(event, listener, options));
    } else {
      WebMidi.sanitizeChannels(options.channels).forEach(ch => {
        listeners.push(this.channels[ch].addListener(event, listener, options));
      });
    }

    return listeners;

  }

  /**
   * Adds a one-time event listener that will trigger a function callback when the specified event
   * happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
   * dispatched by {@link InputChannel} objects and are tied to a specific MIDI channel while
   * input-wide events are dispatched by the {@link Input} object itself and are not tied to a
   * specific channel.
   *
   * When listening for an input-wide event, you must specify the event to listen for and the
   * callback function to trigger when the event happens:
   *
   * ```
   * WebMidi.inputs[0].addListener("midimessage", someFunction);
   * ```
   *
   * To listen for a channel-bound event, you must also specify the event to listen for and the
   * function to trigger but you have to add the channels you wish to listen on in the `options`
   * parameter:
   *
   * ```
   * WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
   * ```
   *
   * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
   * event is triggered on MIDI channels `1`, `2` or `3`.
   *
   * Note that, when adding events to channels, it is the {@link InputChannel} instance that
   * actually gets a listener added and not the `{@link Input} instance.
   *
   * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
   * on the {@link InputChannel} object itself.
   *
   * There are 6 families of events you can listen to:
   *
   * 1. **MIDI System Common** Events (input-wide)
   *
   *    * [songposition]{@link Input#event:songposition}
   *    * [songselect]{@link Input#event:songselect}
   *    * [sysex]{@link Input#event:sysex}
   *    * [timecode]{@link Input#event:timecode}
   *    * [tunerequest]{@link Input#event:tunerequest}
   *
   * 2. **MIDI System Real-Time** Events (input-wide)
   *
   *    * [clock]{@link Input#event:clock}
   *    * [start]{@link Input#event:start}
   *    * [continue]{@link Input#event:continue}
   *    * [stop]{@link Input#event:stop}
   *    * [activesensing]{@link Input#event:activesensing}
   *    * [reset]{@link Input#event:reset}
   *
   * 3. **State Change** Events (input-wide)
   *
   *    * [opened]{@link Input#event:opened}
   *    * [closed]{@link Input#event:closed}
   *    * [disconnected]{@link Input#event:disconnected}
   *
   * 4. **Catch-All** Events (input-wide)
   *
   *    * [midimessage]{@link Input#event:midimessage}
   *    * [unknownmidimessage]{@link Input#event:unknownmidimessage}
   *
   * 5. **Channel Voice** Events (channel-specific)
   *
   *    * [channelaftertouch]{@link InputChannel#event:channelaftertouch}
   *    * [controlchange]{@link InputChannel#event:controlchange}
   *    * [keyaftertouch]{@link InputChannel#event:keyaftertouch}
   *    * [noteoff]{@link InputChannel#event:noteoff}
   *    * [noteon]{@link InputChannel#event:noteon}
   *    * [nrpn]{@link InputChannel#event:nrpn}
   *    * [pitchbend]{@link InputChannel#event:pitchbend}
   *    * [programchange]{@link InputChannel#event:programchange}
   *
   * 6. **Channel Mode** Events (channel-specific)
   *
   *    * [channelmode]{@link InputChannel#event:channelmode}
   *    * To be completed...
   *
   * @param event {string} The type of the event.
   *
   * @param listener {function} A callback function to execute when the specified event is detected.
   * This function will receive an event parameter object. For details on this object's properties,
   * check out the documentation for the various events (links above).
   *
   * @param {Object} [options={}]
   *
   * @param {array} [options.arguments] An array of arguments which will be passed separately to the
   * callback function. This array is stored in the `arguments` property of the `Listener` object
   * and can be retrieved or modified as desired.
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
   * input-wide events.
   *
   * @param {Object} [options.context=this] The value of `this` in the callback function.
   *
   * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
   * automatically expires.
   *
   * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
   * of the listeners array.
   *
   * @throws {Error} For channel-specific events, 'options.channels' must be defined.
   *
   * @returns {Listener[]} An array of all `Listener` objects that were created.
   */
  addOneTimeListener(event, listener, options = {}) {
    options.remaining = 1;
    return this.addListener(event, listener, options);
  }

  /**
   * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
   * @since 2.0.0
   * @deprecated since v3.0
   * @private
   */
  on(event, channel, listener, options) {
    return this.addListener(event, channel, listener, options);
  }

  /**
   * Checks if the specified event type is already defined to trigger the listener function. For
   * channel-specific events, the function will return `true` only if all channels have the listener
   * defined.
   *
   * @param event {string} The type of the event.
   *
   * @param listener {function} The callback function to check for.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to check. This parameter is ignored for
   * input-wide events.
   *
   * @returns {Boolean} Boolean value indicating whether or not the channel(s) already have this
   * listener defined.
   *
   * @throws Error For channel-specific events, 'options.channels' must be defined.
   */
  hasListener(event, listener, options = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (typeof options === "function") {
        let channels = [].concat(listener); // clone
        listener = options;
        options = {channels: channels};
      }

      // Validation
      if (
        WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined &&
        options.channels === undefined
      ) {
        throw new Error("For channel-specific events, 'options.channels' must be defined.");
      }

    }

    if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined) {

      return WebMidi.sanitizeChannels(options.channels).every(ch => {
        return this.channels[ch].hasListener(event, listener);
      });

    } else {
      return super.hasListener(event, listener);
    }

  }

  /**
   * Removes the specified listener for the specified event. If no listener is specified, all
   * listeners for the specified event will be removed. If no event is specified, all listeners for
   * the `Input` as well as all listeners for all `InputChannels` will be removed.
   *
   * By default, channel-specific listeners will be removed from all channels unless the
   * `options.channel` narrows it down.
   *
   * @param [type] {String} The type of the event.
   *
   * @param [listener] {Function} The callback function to check for.
   *
   * @param {Object} [options={}]
   *
   * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
   * such integers representing the MIDI channel(s) to match. This parameter is ignored for
   * input-wide events.
   *
   * @param {*} [options.context] Only remove the listeners that have this exact context.
   *
   * @param {number} [options.remaining] Only remove the listener if it has exactly that many
   * remaining times to be executed.
   */
  removeListener(event, listener, options = {}) {

    if (WebMidi.validation) {

      // Legacy compatibility
      if (typeof options === "function") {
        let channels = [].concat(listener); // clone
        listener = options;
        options = {channels: channels};
      }

    }

    if (options.channels === undefined) {
      options.channels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }

    // If the event is not specified, remove everything (channel-specific and input-wide)!
    if (event == undefined) {
      WebMidi.sanitizeChannels(options.channels).forEach(ch => this.channels[ch].removeListener());
      return super.removeListener();
    }

    // If the event is specified, check if it's channel-specific or input-wide.
    if (WebMidi.MIDI_CHANNEL_VOICE_MESSAGES[event] !== undefined) {

      WebMidi.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].removeListener(event, listener, options);
      });

    } else {

      super.removeListener(event, listener, options);

    }

  }

  /**
   * Name of the MIDI input
   *
   * @type {string}
   * @readonly
   */
  get name() {
    return this._midiInput.name;
  }

  /**
   * ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
   * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
   * the same port.
   *
   * @type {string}
   * @readonly
   */
  get id() {
    return this._midiInput.id;
  }

  /**
   * Input port's connection state: `"pending"`, `"open"` or `"closed"`.
   *
   * @type {string}
   * @readonly
   */
  get connection() {
    return this._midiInput.connection;
  }

  /**
   * Name of the manufacturer of the device that makes this input port available.
   *
   * @type {string}
   * @readonly
   */
  get manufacturer() {
    return this._midiInput.manufacturer;
  }

  /**
   * State of the input port: `"connected"` or `"disconnected"`.
   *
   * @type {string}
   * @readonly
   */
  get state() {
    return this._midiInput.state;
  }

  /**
   * Port type. In the case of `Input`, this is always: `"input"`.
   *
   * @type {string}
   * @readonly
   */
  get type() {
    return this._midiInput.type;
  }

  /**
   * @type {boolean}
   * @private
   * @deprecated since v3.0.0 (moved to 'InputChannel' class)
   */
  get nrpnEventsEnabled() {
    if (WebMidi.validation) {
      console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class.");
    }
    return false;
  }

}
