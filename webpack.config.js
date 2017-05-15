const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("webpack-html-plugin");

module.exports = function(args) {
    args = args || {};

    const styles = args.production ? [{
        test: /\.(s?css|less)$/, 
        exclude: /node_modules/, 
        use: ExtractTextPlugin.extract(
            { fallbackLoader: "style-loader", use: [ "css-loader", "postcss-loader", "sass-loader" ] }
        )
    }] : [
        {
            test: /\.s?css$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ]
        },
        {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "less-loader",
            ]
        },
    ];

    return {
        context: path.resolve(__dirname, "."),
        output: {
            path: path.resolve(__dirname, "../build"),
            filename: "[name].js",
            publicPath: "/"
        },
        entry: {
            vendor: "vendor.js",
            app: "index.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    query: {
                        presets: [ "babel-preset-es2015" ]
                    }
                },
                { test: /\.json$/, loader: "json-loader" },
                { test: /\.(woff|woff2|ttf|eot|mp3|ctm|mp4|bmp|gif|png|je?pg)(\?.*)?$/, loader: "file-loader", query: {
                    name: "assets/files/[name]_[sha1:hash:base26:7].[ext]"
                } },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
                { test: /\.ejs$/, loader: "ejs-loader" },
                ...styles,
            ]
        },
        resolve: {
            modules: [
                ".",
                "node_modules",
            ],
            extensions: [".json", ".js", ".ejs", ".scss", ".less", ".html"]
        },
        devtool: args.production ? "cheap-source-map" : "inline-source-map",
        devServer: {
            contentBase: "./build",
            inline: true,
            hot: true,
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendor",
            //     filename: "[name].js",
            //     minChunks: Infinity
            // }),

            new HtmlWebpackPlugin({
                filename: "index.html",
                title: "Sergiy Samborskiy <salterok@gmail.com> portfolio",
                template: "index.ejs",
                chunks: [ "app", "vendor" ],
                cache: false,
                hash: true,
                inject: true,
                favicon: "favicon.ico"
            }),
        ]
    };
}