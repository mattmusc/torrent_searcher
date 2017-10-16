const path = require("path");
const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_FOLDER = "src";
const JS_FOLDER = "js";
const DIST_FOLDER = "dist";
const APP_ENTRY_JS = "main.js";

module.exports = {
    entry: {
        app: path.resolve(__dirname, SRC_FOLDER, JS_FOLDER, APP_ENTRY_JS)
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
                test: /\.(scss)$/,
                use: [{
                        loader: "style-loader" // inject CSS to page
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS modules
                    },
                    {
                        loader: "postcss-loader", // Run post css actions
                        options: {
                            plugins: function () {
                                // post css plugins, can be exported to postcss.config.js
                                return [require("precss"), require("autoprefixer")];
                            }
                        }
                    },
                    {
                        loader: "sass-loader" // compiles SASS to CSS
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/", // where the fonts will go
                        publicPath: "../" // override the default path
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin([DIST_FOLDER]),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, SRC_FOLDER, "favicon.ico"),
            title: "mytorrents",
            template: path.resolve(__dirname, SRC_FOLDER, "index.ejs"),
            inject: 'body'
        }),
        // Plugin used to prevent duplication
        new webpack.optimize.CommonsChunkPlugin({
            name: "common" // Specify the common bundle's name.
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, DIST_FOLDER)
    }
};