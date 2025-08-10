const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    optimization: {
        minimize: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        hot: true,
        port: 8080,
        watchFiles: ['src/**/*']
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000
    }
};
