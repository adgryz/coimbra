const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    target: "web",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    resolve: {
        alias: {
            models: path.resolve(__dirname, 'src/models/'),
            scenes: path.resolve(__dirname, 'src/scenes/'),
            services: path.resolve(__dirname, 'src/services/')
        },
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader',
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.scss$/, use: [
                    { loader: "style-loader" },
                    { loader: "css-modules-typescript-loader" },
                    { loader: "css-loader", options: { modules: true } },
                    { loader: "sass-loader" },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
        new HtmlWebPackPlugin({
            hash: true,
            template: path.resolve(__dirname, "src", "index.html"), //source
            filename: "index.html", // target
        })
    ],
    devServer: {
        historyApiFallback: true,
    },
}