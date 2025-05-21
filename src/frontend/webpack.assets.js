const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  // Optimalizácia CSS súborov
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: false,
            },
          ],
        },
      }),
    ],
  },
  
  // Pluginy pre optimalizáciu statických súborov
  plugins: [
    // Vyčistenie výstupného adresára pred buildom
    new CleanWebpackPlugin(),
    
    // Extrakcia CSS do samostatných súborov
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].[contenthash].css',
    }),
    
    // Kopírovanie statických súborov
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'public'), 
          to: 'public' 
        },
      ],
    }),
    
    // Optimalizácia obrázkov
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            ['svgo', {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      addAttributesToSVGElement: {
                        params: {
                          attributes: [
                            { xmlns: 'http://www.w3.org/2000/svg' },
                          ],
                        },
                      },
                    },
                  },
                },
              ],
            }],
          ],
        },
      },
    }),
  ],
  
  // Pravidlá pre spracovanie súborov
  module: {
    rules: [
      // Spracovanie CSS súborov
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      
      // Spracovanie obrázkov
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          filename: 'images/[name].[hash][ext][query]',
        },
      },
      
      // Spracovanie fontov
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext][query]',
        },
      },
    ],
  },
};
