function prepend(entries) {
  const header = [
    require.resolve('./entryHeader'),
  ];

  // Single string entry point
  if (typeof entries === 'string') {
    return [ ...header, entries ];
  }
  // Single array entry point
  if (Array.isArray(entries)) {
    return [ ...header, ...entries ];
  }
  // Multiple entry points
  if (typeof entries === 'object') {
    const ret = {};
    for (const key of Object.keys(entries)) {
      ret[key] = prepend(entries[key]);
    }
    return ret;
  }
  // Dynamic entry points
  if (typeof entries === 'function') {
    return (...args) =>
      Promise.resolve(entries(...args)).then(resolvedEntries =>
        prepend(resolvedEntries)
      );
  }
  throw new Error('invalid webpack entry');
}

class ReactRefreshPlugin {
  apply(compiler) {
    compiler.options.entry = prepend(compiler.options.entry);
  }
}

module.exports = ReactRefreshPlugin;
