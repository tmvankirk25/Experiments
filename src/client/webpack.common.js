const path = require('path')

module.exports = {
    entry: {
      'EXP01-ORBS/':  './src/client/EXP01.js',
      'EXP02-RGBXYZ/': './src/client/EXP02.js',
      'EXP03-BEAMS/': './src/client/EXP03.js'
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
            {
                test: /\.png$/,
                loader: 'file-loader',
                options:{
                    name: '[path][name].[ext]',
                    
                }
              }
        ],
    },
    output: {
        filename: '[name] bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}
