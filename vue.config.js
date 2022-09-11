const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    devtool: 'source-map',
  },
  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    },
  filenameHashing: false
}

// function enableShadowCss(config) {
//   const configs = [
//     config.module.rule('vue').use('vue-loader'),
//   ];
//   // based on common rules returned by `vue inspect`
//   const ruleSets = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
//   const ruleNames = ['vue-modules', 'vue', 'normal-modules', 'normal'];

//   ruleSets.forEach((ruleSet) => {
//     if (config.module.rules.store.has(ruleSet)) {
//       ruleNames.forEach((rName) => {
//         if (config.module.rule(ruleSet).oneOfs.store.has(rName)) {
//           if (config.module.rule(ruleSet).oneOf(rName).uses.store.has('vue-style-loader')) {
//             configs.push(config.module.rule(ruleSet).oneOf(rName).use('vue-style-loader'));
//           }
//         }
//       });
//     }
//   });
//   if (!process.env.BUILD_MODE) {
//     process.env.BUILD_MODE = config.store.get('mode');
//   }
//   configs.forEach((c) => c.tap((options) => {
//     options.shadowMode = true;
//     return options;
//   }));
// }

// module.exports = {
//   chainWebpack:
//     (config) => {
//       enableShadowCss(config);
//     },
//   css: {
//     sourceMap: true,
//     extract: false,
//   },
// };

// const webpack = require('webpack');

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new webpack.optimize.LimitChunkCountPlugin({
//         maxChunks: 1,
//       }),
//     ],
//   },
//   chainWebpack: (config) => {
//     config.optimization.delete('splitChunks');
//   },
// };


// module.exports = {
//   chainWebpack: config => {
//     config.module
//       .rule('vue')
//       .use('vue-loader')
//       .tap(options => {
//         options.customElement = true
//         return options
//       })
//   }
// }