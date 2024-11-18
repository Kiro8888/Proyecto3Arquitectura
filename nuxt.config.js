export default {
  target: 'static',
  modules: ['@nuxt/content'],
  content: {
    // Asegúrate de que la carpeta content es la correcta
    dir: 'content', // Si la carpeta donde están los archivos JSON no es 'content', cámbiala
  },
  components: true,
  head: {
    titleTemplate: 'Museo Site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    link: [
      { rel: 'stylesheet', href: 'css/normalize.css'},
      { rel: 'stylesheet', href: 'css/skeleton.css'},
      { rel: 'icon', type:"image/png", href: 'images/favicon.png'}
    ]
  }
}
