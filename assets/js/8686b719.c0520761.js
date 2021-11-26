"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[286],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return c}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=s(n),c=i,h=u["".concat(l,".").concat(c)]||u[c]||d[c]||r;return n?a.createElement(h,p(p({ref:t},m),{},{components:n})):a.createElement(h,p({ref:t},m))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,p=new Array(r);p[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,p[1]=o;for(var s=2;s<r;s++)p[s]=n[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3001:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return m},default:function(){return u}});var a=n(3117),i=n(102),r=(n(7294),n(3905)),p=["components"],o={sidebar_label:"Version 3",sidebar_position:1},l="Features Planned for v3",s={unversionedId:"future-versions/v3",id:"future-versions/v3",isDocsHomePage:!1,title:"Features Planned for v3",description:"Version 3 is nearing beta stage. This version is a major overhaul. Here is a list of what is planned",source:"@site/docs/future-versions/v3.md",sourceDirName:"future-versions",slug:"/future-versions/v3",permalink:"/docs/future-versions/v3",editUrl:"https://github.com/djipco/webmidi/edit/master/website/docs/future-versions/v3.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Version 3",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Version 1.0.0-beta.15",permalink:"/docs/archives/v1"},next:{title:"Next Version",permalink:"/docs/future-versions/next"}},m=[{value:"Enhancements Still Remaining",id:"enhancements-still-remaining",children:[],level:2},{value:"Enhancement Already Baked In",id:"enhancement-already-baked-in",children:[],level:2}],d={toc:m};function u(e){var t=e.components,n=(0,i.Z)(e,p);return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"features-planned-for-v3"},"Features Planned for v3"),(0,r.kt)("p",null,"Version 3 is nearing beta stage. This version is a major overhaul. Here is a list of what is planned\nfor that version and what has already been included:"),(0,r.kt)("h2",{id:"enhancements-still-remaining"},"Enhancements Still Remaining"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Publish TypeScript definitions to\n",(0,r.kt)("a",{parentName:"p",href:"https://definitelytyped.org/guides/contributing.html"},"DefinitelyTyped")," when v3 is stable (they are\ncurrently available in the ",(0,r.kt)("inlineCode",{parentName:"p"},"dist")," directory)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Adjust ",(0,r.kt)("inlineCode",{parentName:"p"},"InputChannel.EVENTS")," to include all ",(0,r.kt)("inlineCode",{parentName:"p"},"controlchange-xxx")," events"))),(0,r.kt)("h2",{id:"enhancement-already-baked-in"},"Enhancement Already Baked In"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"filter")," option to allow listening to only a subset of events (e.g. specific controller change\nor NRPN messages, discussed in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/pull/88"},"PR #88"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add a way to forward inbound messages on an ",(0,r.kt)("inlineCode",{parentName:"p"},"Input")," object to an ",(0,r.kt)("inlineCode",{parentName:"p"},"Output")," (to behave like a\nphysical MIDI THRU port). This could be expanded to a more elaborate filtering and routing system\n(",(0,r.kt)("a",{parentName:"p",href:"https://github.com/shemeshg/RtMidiWrap#routing-configuration"},"example"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add mechanism to Generate TypeScript type definitions (.d.ts files)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"getNoteState()")," method to ",(0,r.kt)("inlineCode",{parentName:"p"},"InputChannel")," so it it is possible to check if a note is currently\nplaying or not. This allows to check for chords when a ",(0,r.kt)("strong",{parentName:"p"},"noteon")," message is received.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Properly handle when a laptop's lid is closed then reopened\n(",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/140"},"Issue #140"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"As suggested by users, allow sending MSB and LSB at once when sending control change messages\n(",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/57"},"Issue #57"),"). This would have to be done for CC\nmessages 0-31 which all have a matching LSB.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Rewrite the NRPN parsing mechanism in InputChannel. I do not think it works correctly. Here are\nstarting points:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://tetradev.blogspot.com/2010/03/nrpns-part-2-nrpns-in-ableton-with-max.html"},"http://tetradev.blogspot.com/2010/03/nrpns-part-2-nrpns-in-ableton-with-max.html")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.elektronauts.com/t/nrpn-tutorial-how-to/46669"},"https://www.elektronauts.com/t/nrpn-tutorial-how-to/46669")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://www.philrees.co.uk/nrpnq.htm"},"http://www.philrees.co.uk/nrpnq.htm"))))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Allow ",(0,r.kt)("inlineCode",{parentName:"p"},"sendSysex()")," to accept ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array")," (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/124"},"Issue #124"),", ",(0,r.kt)("a",{parentName:"p",href:"https://webmidijs.org/forum/discussion/comment/97#Comment_97"},"forum thread"),") or perhaps to accept a ",(0,r.kt)("inlineCode",{parentName:"p"},"Message")," object that can be built from a ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array")," (this needs to be carefully examined)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add a ",(0,r.kt)("inlineCode",{parentName:"p"},"Message")," object")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add the ability to set default values for attack velocity, release velocity, etc. ( see ",(0,r.kt)("a",{parentName:"p",href:"https://webmidijs.org/forum/discussion/44/things-in-webmidi-js-2-52-that-make-me-go-huh#latest"},"forum discussion"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Various utility methods should probably be stashed in a ",(0,r.kt)("inlineCode",{parentName:"p"},"Utils")," class (e.g. getCcNameByNumber(), etc.)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add convenience method to convert float and 7 bit: ",(0,r.kt)("inlineCode",{parentName:"p"},"to7bit()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"toNormalized()"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add the ability to individually transpose ",(0,r.kt)("inlineCode",{parentName:"p"},"Input"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"Output"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"InputChannel")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"OutputChannel"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"InputChannel")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"OutputChannel")," objects (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/20"},"Issue #20"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Use ES6+ modern syntax and add default export so library can be imported with ",(0,r.kt)("inlineCode",{parentName:"p"},"import"),"\n(Issues ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/49"},"#49")," and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/89"},"#89"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Move to Rollup for packaging the library (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/61"},"Issue #61"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Drop support for Bower (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/60"},"Issue #60"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Extend a proper event library to allow for modern event support (probably\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/djipevents"},"djipevents"),").")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Implement port ",(0,r.kt)("inlineCode",{parentName:"p"},"statechange")," events (",(0,r.kt)("inlineCode",{parentName:"p"},"connected")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"disconnected"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Make ",(0,r.kt)("inlineCode",{parentName:"p"},"WebMidi")," a singleton (see example\n",(0,r.kt)("a",{parentName:"p",href:"https://www.sitepoint.com/javascript-design-patterns-singleton/"},"here"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"WebMidi should dispatch 'enabled' and 'disabled' event")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Check that disable() really does disable everything")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add methods for channel mode messages")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Implement ",(0,r.kt)("inlineCode",{parentName:"p"},"clear()")," method (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/52"},"Issue #52"),") [this will\nautomatically work when browsers add support for it but will show a warning in the console until\nthen).")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Added the new (",(0,r.kt)("a",{parentName:"p",href:"https://webaudio.github.io/web-midi-api/#dom-midioptions"},"software"),") parameter for\n",(0,r.kt)("inlineCode",{parentName:"p"},"requestMIDIAccess")," [this will automatically work when browsers add support for it).")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Emit events for all channel mode messages")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"statusByte")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"dataBytes")," properties to the event triggered when receiving messages\n(",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/109"},"#109"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Deprecate the ability to send on all channels (default behaviour). This clogs up the MIDI stream\nand I do not really see a good use case for it.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Create a ",(0,r.kt)("inlineCode",{parentName:"p"},"Note")," object with ",(0,r.kt)("inlineCode",{parentName:"p"},"duration")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"velocity")," property")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add official support for Node.js (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/15"},"Issue #15"),")")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Allow specifying different note durations and velocities in ",(0,r.kt)("inlineCode",{parentName:"p"},"playNote()")," when using arrays\n(",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/75"},"Issue #75")," and\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/90"},"#90"),"). ","[this is now possible with ",(0,r.kt)("inlineCode",{parentName:"p"},"Note")," objects]",".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("a",{parentName:"p",href:"https://atom.io/packages/editorconfig"},"editorconfig file"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Complete test suite for all objects")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"sendRaw()")," method accepting either list of integers or ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Allow ",(0,r.kt)("inlineCode",{parentName:"p"},"send()")," to accept ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array")))))}u.isMDXComponent=!0}}]);