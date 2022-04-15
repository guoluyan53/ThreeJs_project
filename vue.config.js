
// const ThreeExample = require('import-three-examples')
module.exports = {

    // //基本路径
    // publicPath:'./',
    // //输出文件目录
    // outputDir:'dist',
    // lintOnSave:true,
    // assetsDir:'static'
    
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/API': {
                target: `http://120.77.149.245:8080/api_v1`,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                '^/API': ''
                },
            },
            '/loginApi': {
                target: `http://120.77.149.245:8080/api/v2`,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                '^/loginApi': ''
                },
            }
        },
        // pluginOptions:{
        //     ThreeExample
        // }
    }
}

// const ThreeExample = require('import-three-example');
// pluginOptions:{

// }