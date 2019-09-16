import Refresh from 'react-refresh/runtime';

function isReactRefreshBoundary(moduleExports) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    return true;
  }
  if (moduleExports == null || typeof moduleExports !== 'object') {
    // Exit if we can't iterate over exports.
    return false;
  }
  let hasExports = false;
  let areAllExportsComponents = true;
  for (const key in moduleExports) {
    hasExports = true;
    if (key === '__esModule') {
      continue;
    }
    const exportValue = moduleExports[key];
    if (!Refresh.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }
  return hasExports && areAllExportsComponents;
}


export function checkRefresh(m) {
  if (isReactRefreshBoundary(m.exports || m.__proto__.exports)) {
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
