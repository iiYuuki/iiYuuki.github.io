module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  lintOnSave: false,
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    var externals = {
      cropperjs: 'cropperjs',
      imageConversion: 'image-conversion'
    }
    config.externals(externals)

    const cdn = {
      css: [
        // cropper
        'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css',
        // jodit
        'https://cdnjs.cloudflare.com/ajax/libs/jodit/3.6.1/jodit.min.css'
      ],
      js: [
        // cropper
        'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js',
        // image-conversion
        'https://cdn.jsdelivr.net/gh/WangYuLue/image-conversion/build/conversion.js',
        // jodit
        'https://cdnjs.cloudflare.com/ajax/libs/jodit/3.6.1/jodit.min.js'
      ]
    }
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })
  }
}
