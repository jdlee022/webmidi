"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[3085],{6416:function(e,n,a){a.r(n),a.d(n,{default:function(){return o}});var t=a(7294),l=a(6010),i=a(2978),c=a(4269),s=a(1575),r=a(2847),m="mdxPageWrapper_zHyg";function o(e){var n=e.content,a=n.metadata,o=a.title,u=a.description,d=a.frontMatter,v=d.wrapperClassName,f=d.hide_table_of_contents;return t.createElement(r.FG,{className:(0,l.Z)(null!=v?v:r.kM.wrapper.mdxPages,r.kM.page.mdxPage)},t.createElement(r.d,{title:o,description:u}),t.createElement(i.Z,null,t.createElement("main",{className:"container container--fluid margin-vert--lg"},t.createElement("div",{className:(0,l.Z)("row",m)},t.createElement("div",{className:(0,l.Z)("col",!f&&"col--8")},t.createElement(c.Z,null,t.createElement(n,null))),!f&&n.toc&&t.createElement("div",{className:"col col--2"},t.createElement(s.Z,{toc:n.toc,minHeadingLevel:d.toc_min_heading_level,maxHeadingLevel:d.toc_max_heading_level}))))))}},1575:function(e,n,a){a.d(n,{Z:function(){return o}});var t=a(7462),l=a(3366),i=a(7294),c=a(6010),s=a(5002),r="tableOfContents_cNA8",m=["className"];function o(e){var n=e.className,a=(0,l.Z)(e,m);return i.createElement("div",{className:(0,c.Z)(r,"thin-scrollbar",n)},i.createElement(s.Z,(0,t.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:function(e,n,a){a.d(n,{Z:function(){return m}});var t=a(7462),l=a(3366),i=a(7294),c=a(2847),s=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function r(e){var n=e.toc,a=e.className,t=e.linkClassName,l=e.isChild;return n.length?i.createElement("ul",{className:l?void 0:a},n.map((function(e){return i.createElement("li",{key:e.id},i.createElement("a",{href:"#"+e.id,className:null!=t?t:void 0,dangerouslySetInnerHTML:{__html:e.value}}),i.createElement(r,{isChild:!0,toc:e.children,className:a,linkClassName:t}))}))):null}function m(e){var n=e.toc,a=e.className,m=void 0===a?"table-of-contents table-of-contents__left-border":a,o=e.linkClassName,u=void 0===o?"table-of-contents__link":o,d=e.linkActiveClassName,v=void 0===d?void 0:d,f=e.minHeadingLevel,N=e.maxHeadingLevel,g=(0,l.Z)(e,s),k=(0,c.LU)(),_=null!=f?f:k.tableOfContents.minHeadingLevel,C=null!=N?N:k.tableOfContents.maxHeadingLevel,E=(0,c.b9)({toc:n,minHeadingLevel:_,maxHeadingLevel:C}),h=(0,i.useMemo)((function(){if(u&&v)return{linkClassName:u,linkActiveClassName:v,minHeadingLevel:_,maxHeadingLevel:C}}),[u,v,_,C]);return(0,c.Si)(h),i.createElement(r,(0,t.Z)({toc:E,className:m,linkClassName:u},g))}},8573:function(e,n,a){a.d(n,{Z:function(){return i}});var t=a(7294),l=a(8066);function i(e){return t.createElement(t.Fragment,null,t.createElement(l.Z,e))}}}]);