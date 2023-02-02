module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Hermosa/' : '/',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [meta] = args
      meta.title = '京式會社 | 日韓服飾、雜貨代購'
      meta.icon = 'favicon.ico'
      meta.meta = {
        description:
          '京式會社為代購日本和韓國品牌服飾及雜貨，因全部都為日本、韓國空運來台，需等待至少7-20個工作天才能出貨，煩請下單的小仙女們耐心等候，美好的事物值得等待。',
        og: {
          type: 'website',
          url: 'https://a94s84.github.io/Hermosa/#/',
          title: 'Hermosa',
          image: '@/public/favicon.ico',
          description:
            '京式會社為代購日本和韓國品牌服飾及雜貨。'
        }
      }
      return args
    })
  }
}
