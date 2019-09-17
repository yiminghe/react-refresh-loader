import Refresh from 'react-refresh/runtime';

function registerClasses(classes, m) {
  classes.forEach((cls) => {
    if (cls.prototype.isReactComponent) {
      registerRefresh(m, cls, cls.displayName || cls.name)
    }
  })
}

function processReactRefreshBoundary(m) {
  var moduleExports = m.exports || m.__proto__.exports;
  if (Refresh.isLikelyComponentType(moduleExports)) {
    registerClasses([ moduleExports ], m);
    return true;
  }
  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return false;
  }
  let hasExports = false;
  let areAllExportsComponents = true;
  let classes = [];
  for (const key in moduleExports) {
    hasExports = true;
    if (key === '__esModule') {
      continue;
    }
    const exportValue = moduleExports[key];
    if (!Refresh.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    } else {
      classes.push(exportValue);
    }
  }
  const ret = hasExports && areAllExportsComponents;
  if (ret) {
    registerClasses(classes, m);
  }
  return ret;
}


export function checkRefresh(m) {
  if (processReactRefreshBoundary(m)) {
    m.hot.accept();
    setTimeout(function () {
      Refresh.performReactRefresh()
    }, 0);
  }
}

export function registerRefresh(m, type, id) {
  const fullId = m.id + " " + id;
  Refresh.register(type, fullId);
}

export const $RefreshSig$ = Refresh.createSignatureFunctionForTransform;
