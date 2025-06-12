import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

router.afterEach((to) => {
  const defaultTitle = 'Bookane'
  document.title = to.meta.title || defaultTitle
})


createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')