(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[373],{586:function(e,t){!function(e){var t="(?:\"(?:\"\"|[^\"])*\"(?!\")|'(?:''|[^'])*'(?!'))",a=/\b(?:\d[\da-f]*x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,n={pattern:RegExp(t+"[bx]"),alias:"number"},i={pattern:/&[a-z_][a-z_0-9]*/i},s={pattern:/((?:^|\s|=|\())%(?:ABORT|BY|CMS|COPY|DISPLAY|DO|ELSE|END|EVAL|GLOBAL|GO|GOTO|IF|INC|INCLUDE|INDEX|INPUT|KTRIM|LENGTH|LET|LIST|LOCAL|PUT|QKTRIM|QSCAN|QSUBSTR|QSYSFUNC|QUPCASE|RETURN|RUN|SCAN|SUBSTR|SUPERQ|SYMDEL|SYMGLOBL|SYMLOCAL|SYMEXIST|SYSCALL|SYSEVALF|SYSEXEC|SYSFUNC|SYSGET|SYSRPUT|THEN|TO|TSO|UNQUOTE|UNTIL|UPCASE|WHILE|WINDOW)\b/i,lookbehind:!0,alias:"keyword"},r={pattern:/(^|\s+)(?:proc\s+\w+|quit|run|data(?!\=))\b/i,alias:"keyword",lookbehind:!0},o=[/\/\*[\s\S]*?\*\//,{pattern:/(^\s*|;\s*)\*[^;]*;/m,lookbehind:!0}],l={pattern:RegExp(t),greedy:!0},c=/[$%@.(){}\[\];,\\]/,d={pattern:/%?\w+(?=\()/,alias:"keyword"},p={function:d,"arg-value":{pattern:/(\s*=\s*)[A-Z\.]+/i,lookbehind:!0},operator:/=/,"macro-variable":i,arg:{pattern:/[A-Z]+/i,alias:"keyword"},number:a,"numeric-constant":n,punctuation:c,string:l},u={pattern:/\b(?:format|put)\b=?[\w'$.]+/im,inside:{keyword:/^(?:format|put)(?=\=)/i,equals:/=/,format:{pattern:/(?:\w|\$\d)+\.\d?/i,alias:"number"}}},m={pattern:/\b(?:format|put)\s+[\w']+(?:\s+[$.\w]+)+(?=;)/i,inside:{keyword:/^(?:format|put)/i,format:{pattern:/[\w$]+\.\d?/,alias:"number"}}},b={pattern:/((?:^|[\s])=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|%include|libname|%list|lock|missing|options|page|resetline|%run|sasfile|skip|sysecho|title\d?)\b/i,lookbehind:!0,alias:"keyword"},g={pattern:/(^|\s)(?:submit(?:\s+(?:load|parseonly|norun))?|endsubmit)\b/i,lookbehind:!0,alias:"keyword"},k="accessControl|cdm|aggregation|aStore|ruleMining|audio|autotune|bayesianNetClassifier|bioMedImage|boolRule|builtins|cardinality|sccasl|clustering|copula|countreg|dataDiscovery|dataPreprocess|dataSciencePilot|dataStep|decisionTree|deepLearn|deepNeural|varReduce|simSystem|ds2|deduplication|ecm|entityRes|espCluster|explainModel|factmac|fastKnn|fcmpact|fedSql|freqTab|gam|gleam|graphSemiSupLearn|gVarCluster|hiddenMarkovModel|hyperGroup|image|iml|ica|kernalPca|langModel|ldaTopic|sparseML|mlTools|mixed|modelPublishing|mbc|network|optNetwork|neuralNet|nonlinear|nmf|nonParametricBayes|optimization|panel|pls|percentile|pca|phreg|qkb|qlim|quantreg|recommend|tsReconcile|deepRnn|regression|reinforcementLearn|robustPca|sampling|sparkEmbeddedProcess|search(?:Analytics)?|sentimentAnalysis|sequence|configuration|session(?:Prop)?|severity|simple|smartData|sandwich|spatialreg|stabilityMonitoring|spc|loadStreams|svDataDescription|svm|table|conditionalRandomFields|text(?:Rule(?:Develop|Score)|Mining|Parse|Topic|Util|Filters|Frequency)|tsInfo|timeData|transpose|uniTimeSeries",y={pattern:RegExp("(^|\\s)(?:action\\s+)?(?:<act>)\\.[a-z]+\\b[^;]+".replace(/<act>/g,(function(){return k})),"i"),lookbehind:!0,inside:{keyword:RegExp("(?:<act>)\\.[a-z]+\\b".replace(/<act>/g,(function(){return k})),"i"),action:{pattern:/(?:action)/i,alias:"keyword"},comment:o,function:d,"arg-value":p["arg-value"],operator:p.operator,argument:p.arg,number:a,"numeric-constant":n,punctuation:c,string:l}},S={pattern:/((?:^|\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|cas|cbarline|cfill|class(?:lev)?|close|column|computed?|contains|continue|data(?=\=)|define|delete|describe|document|do\s+over|do|dol|drop|dul|end(?:source|comp)?|entryTitle|else|eval(?:uate)?|exec(?:ute)?|exit|fill(?:attrs)?|file(?:name)?|flist|fnc|function(?:list)?|goto|global|group(?:by)?|headline|headskip|histogram|if|infile|keep|keylabel|keyword|label|layout|leave|legendlabel|length|libname|loadactionset|merge|midpoints|name|noobs|nowd|_?null_|ods|options|or|otherwise|out(?:put)?|over(?:lay)?|plot|put|print|raise|ranexp|rannor|rbreak|retain|return|select|set|session|sessref|source|statgraph|sum|summarize|table|temp|terminate|then\s+do|then|title\d?|to|var|when|where|xaxisopts|yaxisopts|y2axisopts)\b/i,lookbehind:!0};e.languages.sas={datalines:{pattern:/^(\s*)(?:(?:data)?lines|cards);[\s\S]+?^[ \t]*;/im,lookbehind:!0,alias:"string",inside:{keyword:{pattern:/^(?:(?:data)?lines|cards)/i},punctuation:/;/}},"proc-sql":{pattern:/(^proc\s+(?:fed)?sql(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S]))/im,lookbehind:!0,inside:{sql:{pattern:RegExp("^[ \t]*(?:select|alter\\s+table|(?:create|describe|drop)\\s+(?:index|table(?:\\s+constraints)?|view)|create\\s+unique\\s+index|insert\\s+into|update)(?:<str>|[^;\"'])+;".replace(/<str>/g,(function(){return t})),"im"),alias:"language-sql",inside:e.languages.sql},"global-statements":b,"sql-statements":{pattern:/(^|\s)(?:disconnect\s+from|exec(?:ute)?|begin|commit|rollback|reset|validate)\b/i,lookbehind:!0,alias:"keyword"},number:a,"numeric-constant":n,punctuation:c,string:l}},"proc-groovy":{pattern:/(^proc\s+groovy(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S]))/im,lookbehind:!0,inside:{comment:o,groovy:{pattern:RegExp("(^[ \t]*submit(?:\\s+(?:load|parseonly|norun))?)(?:<str>|[^\"'])+?(?=endsubmit;)".replace(/<str>/g,(function(){return t})),"im"),lookbehind:!0,alias:"language-groovy",inside:e.languages.groovy},keyword:S,"submit-statement":g,"global-statements":b,number:a,"numeric-constant":n,punctuation:c,string:l}},"proc-lua":{pattern:/(^proc\s+lua(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S]))/im,lookbehind:!0,inside:{comment:o,lua:{pattern:RegExp("(^[ \t]*submit(?:\\s+(?:load|parseonly|norun))?)(?:<str>|[^\"'])+?(?=endsubmit;)".replace(/<str>/g,(function(){return t})),"im"),lookbehind:!0,alias:"language-lua",inside:e.languages.lua},keyword:S,"submit-statement":g,"global-statements":b,number:a,"numeric-constant":n,punctuation:c,string:l}},"proc-cas":{pattern:/(^proc\s+cas(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|data);|(?![\s\S]))/im,lookbehind:!0,inside:{comment:o,"statement-var":{pattern:/((?:^|\s)=?)saveresult\s[^;]+/im,lookbehind:!0,inside:{statement:{pattern:/^saveresult\s+\S+/i,inside:{keyword:/^(?:saveresult)/i}},rest:p}},"cas-actions":y,statement:{pattern:/((?:^|\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im,lookbehind:!0,inside:p},step:r,keyword:S,function:d,format:u,altformat:m,"global-statements":b,number:a,"numeric-constant":n,punctuation:c,string:l}},"proc-args":{pattern:RegExp("(^proc\\s+\\w+\\s+)(?!\\s)(?:[^;\"']|<str>)+;".replace(/<str>/g,(function(){return t})),"im"),lookbehind:!0,inside:p},"macro-keyword":s,"macro-variable":i,"macro-string-functions":{pattern:/((?:^|\s|=))%(?:NRBQUOTE|NRQUOTE|NRSTR|BQUOTE|QUOTE|STR)\(.*?(?:[^%]\))/i,lookbehind:!0,inside:{function:{pattern:/%(?:NRBQUOTE|NRQUOTE|NRSTR|BQUOTE|QUOTE|STR)/i,alias:"keyword"},"macro-keyword":s,"macro-variable":i,"escaped-char":{pattern:/%['"()<>=\xac^~;,#]/i},punctuation:c}},"macro-declaration":{pattern:/^%macro[^;]+(?=;)/im,inside:{keyword:/%macro/i}},"macro-end":{pattern:/^%mend[^;]+(?=;)/im,inside:{keyword:/%mend/i}},macro:{pattern:/%_\w+(?=\()/,alias:"keyword"},input:{pattern:/\binput\s[-\w\s/*.$&]+;/i,inside:{input:{alias:"keyword",pattern:/^input/i},comment:o,number:a,"numeric-constant":n}},"options-args":{pattern:/(^options)[-'"|/\\<>*+=:()\w\s]*(?=;)/im,lookbehind:!0,inside:p},"cas-actions":y,comment:o,function:d,format:u,altformat:m,"numeric-constant":n,datetime:{pattern:RegExp(t+"(?:dt?|t)"),alias:"number"},string:l,step:r,keyword:S,"operator-keyword":{pattern:/\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,alias:"operator"},number:a,operator:/\*\*?|\|\|?|!!?|\xa6\xa6?|<[>=]?|>[<=]?|[-+\/=&]|[~\xac^]=?/i,punctuation:c}}(Prism)}}]);
//# sourceMappingURL=373.e79420e9.chunk.js.map