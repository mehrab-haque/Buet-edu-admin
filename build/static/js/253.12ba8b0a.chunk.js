(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[253],{466:function(n,e){!function(n){function e(n,e){return"___"+n.toUpperCase()+e+"___"}Object.defineProperties(n.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var i=t.tokenStack=[];t.code=t.code.replace(o,(function(n){if("function"===typeof r&&!r(n))return n;for(var o,c=i.length;-1!==t.code.indexOf(o=e(a,c));)++c;return i[c]=n,o})),t.grammar=n.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=n.languages[a];var o=0,r=Object.keys(t.tokenStack);!function i(c){for(var u=0;u<c.length&&!(o>=r.length);u++){var s=c[u];if("string"===typeof s||s.content&&"string"===typeof s.content){var p=r[o],g=t.tokenStack[p],l="string"===typeof s?s:s.content,f=e(a,p),k=l.indexOf(f);if(k>-1){++o;var h=l.substring(0,k),m=new n.Token(a,n.tokenize(g,t.grammar),"language-"+a,g),d=l.substring(k+f.length),v=[];h&&v.push.apply(v,i([h])),v.push(m),d&&v.push.apply(v,i([d])),"string"===typeof s?c.splice.apply(c,[u,1].concat(v)):s.content=v}}else s.content&&i(s.content)}return c}(t.tokens)}}}})}(Prism)}}]);
//# sourceMappingURL=253.12ba8b0a.chunk.js.map