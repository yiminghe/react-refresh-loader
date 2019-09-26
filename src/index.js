const MagicString = require('magic-string-fix');

module.exports = function (source) {
  const prefix = `
	import {checkRefresh, $RefreshSig$, registerRefresh} from "${require.resolve('./runtime')}";
	function $RefreshReg$(type, id) {
	  registerRefresh(module,type,id);
	}
	`.trim();
  const postfix = `checkRefresh(module)`;
  var s = new MagicString(source);
  s.prepend(`${prefix}\n`);
  s.append(`\n${postfix}`);
  const path = this.resourcePath.slice(0);
  const newMap = s.generateMap({
    source: path,
    includeContent: true
  });
  this.callback(null, s.toString(), newMap);
};

