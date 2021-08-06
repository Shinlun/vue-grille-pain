const nested = require("postcss-nested");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [nested],
      },
    },
  },
};
