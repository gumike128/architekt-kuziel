const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Optimalizácia produkčného buildu
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Získanie názvu npm balíčka
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            
            // Vytvorenie názvu pre chunk
            return `npm.${packageName.replace('@', '')}`;
          },
        },
        // Oddelenie React komponentov
        reactComponents: {
          test: /[\\/]components[\\/]/,
          name: 'components',
          priority: -10,
        },
        // Oddelenie AI/ML modulov
        aiModules: {
          test: /[\\/]AI[\\/]/,
          name: 'ai-modules',
          priority: -5,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  
  // Pluginy pre optimalizáciu
  plugins: [
    // Kompresia súborov
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    
    // Definovanie konštánt pre produkčné prostredie
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.NEXT_PUBLIC_API_URL': JSON.stringify(process.env.NEXT_PUBLIC_API_URL),
    }),
    
    // Analýza veľkosti bundlov (len pre vývojové účely)
    process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  
  // Nastavenie pre výstupné súbory
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  
  // Nastavenie pre cache
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};
