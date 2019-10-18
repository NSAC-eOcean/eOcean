const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                },
            },
        }), new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'eOcean',
            myPageHeader: 'eOcean',
            template: './src/html/main.ejs',
            chunks: ['main'],
            chunksSortMode: 'manual',
            minify: true,
            inlineSource: '.(js|css)$',
            filename: './index.html',
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/js/sw.js',
        })
    ],
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    interpolate: 'require',
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, },
                    { loader: 'css-loader', },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:6]-[name].[ext]',//'[name].[ext]',//'[hash:6]-[name].[ext]',
                            outputPath: 'assets',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: { enabled: false, },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: { interlaced: false, },
                            webp: {
                                quality: 75
                            },
                        }
                    },
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/, ///\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/, ///\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash:6]-[name].[ext]',//'[hash].[ext]',//'[name].[ext]'
                        outputPath: 'assets',
                    },
                },],
            },
            {
                test: /\.(js)$/,///\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: 3,
                                    useBuiltIns: 'usage'
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(mst|mustache)$/,
                use: [
                    { loader: 'mustache-loader?noShortcut&minify', },
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeAttributeQuotes: false,
                            minifyCSS: false,
                        }
                    },
                ],
            },
        ],
    },
    devServer: {
        compress: true,
        port: 8080,
        disableHostCheck: true,
        headers: { 'Cache-Control': 'max-age=31557600' }
    }
};
