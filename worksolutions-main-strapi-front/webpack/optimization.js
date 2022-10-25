function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

exports.makeCacheGroup = function(name) {
  return {
    name,
    test: (m, c, entry) => m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
    chunks: "all",
    enforce: true,
  };
};
