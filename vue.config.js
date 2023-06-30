const { defineConfig } = require("@vue/cli-service");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("ProvidePlugin").use(webpack.ProvidePlugin, [{_: "lodash" }]);
    config.plugin("WindiCss").use(WindiCSSWebpackPlugin);
    config.plugin("CopyPlugin").use(CopyPlugin, [
      {
        patterns: [
          {
            // 相对于当前文件路径
            from: "./node_modules/bl",
            // 相对于输出目录路径
            to: "./bl",
            filter: (resourcePath) => !(resourcePath.indexOf("package") > -1),
          },
          {
            from: "./node_modules/csso/lib",
            to: "./csso",
          },
        ],
      },
    ]);
  },
});
