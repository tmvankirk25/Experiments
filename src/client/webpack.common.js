const path = require('path')

module.exports = {
    entry: {
      'EXP01-ORBS/':  './src/client/EXP01.js',
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.mp3|.wav$/,
                loader: 'file-loader',
                options:{
                    name: '[path][name].[ext]',
                    
                }

            },
        ],
    },
    output: {
        filename: '[name] bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}
