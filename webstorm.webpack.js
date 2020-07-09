const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            '@js': path.resolve(__dirname, './src/assets/js'),
            '@css': path.resolve(__dirname, './src/assets/css'),
            '@img': path.resolve(__dirname, './src/assets/images'),
            '@components': path.resolve(__dirname, './src/components'),
            '@views': path.resolve(__dirname, './src/views'),
            '@apis': path.resolve(__dirname, './src/api'),
            '@utils': path.resolve(__dirname, './src/utils')
        }
    }
}

