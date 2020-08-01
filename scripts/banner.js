const banner = (pkg) =>
  `// ${pkg.name} v${pkg.version} Copyright ${new Date().getFullYear()} ${
    pkg.author
  } - ${pkg.homepage}`;

export default banner;
