module.exports = function (source) {
  const prefix = `
	import {checkRefresh, $RefreshSig$, registerRefresh} from "${require.resolve('./runtime')}";
	function $RefreshReg$(type, id) {
	  registerRefresh(module,type,id);
	}
	`;
  const postfix = `checkRefresh(module)`;
  const code = prefix + '\n' + source + '\n' + postfix;
  this.callback(null, code, getJsLoaderMap({
    code,
    source,
    path: this.resourcePath.slice(0),
  }));
};

const { SourceMapGenerator } = require('source-map');

function getJsLoaderMap({ code, source, path }) {
  let map;
  const prefix = code.indexOf(source);
  const prefixCode = code.slice(0, prefix);
  const startLines = prefixCode.match(/\n/g).length;
  const file = path;
  map = new SourceMapGenerator({
    file,
    sourceRoot: '/',
  });
  const lines = source.split('\n');
  const allLines = lines.length;
  for (let i = 1; i <= allLines; i++) {
    const col = lines[i - 1].search(/[A-Za-z]/g) + 1 || 1;
    map.addMapping({
      source: file,
      original: {
        line: i,
        column: col,
      },
      generated: {
        line: i + startLines,
        column: col,
      },
    });
  }
  map.setSourceContent(file, source);
  map = map.toJSON();

  return map;
};
