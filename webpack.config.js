const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src',
    mode: 'development',

    // Output: output directory links
    output: {
        path: __dirname + "/dist",
        filename: 'js/simbox.min.js'
    },

    // Optimization: minify the js and css files plugins
    optimization: {
        minimize: true, // To ensure a proper minified file, keep this true, if want to raw css file, In production mode, it is default to be true
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin() new CssMinimizerPlugin()]
    },

    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                include: __dirname + '/src',
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ]
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ],
    },

    plugins: [

        // Plugins that will make a css file after converting from scss and extract to location
        new MiniCssExtractPlugin({
            filename: 'css/simbox.min.css',
            chunkFilename: '[id].min.css',
            ignoreOrder: false
        }),

    ],
    watch: true,
};