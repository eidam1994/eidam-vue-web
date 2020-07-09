// vue.config.js
const path = require('path')

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
            return {
                resolve: {
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
        }
    },
    devServer: {
        // 自动打开浏览器
        open: false,
        // 跨域
        proxy: {
            '/api': {
                target: 'http://localhost:8060',
                changeOrigin: true,
                pathRewrite: { // 路径重写，
                    '^/api': '' // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
                }
            }
        }
    }
}
