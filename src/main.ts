import Vue from 'vue'
import { createApp } from 'vue'
import store from './store/index'
import vueCustomElement from 'vue-custom-element'
import { defineCustomElement } from 'vue'
import App from './App.ce.vue'

// const app = createApp(App)

// // Vue.config.devtools = true;
// app.config.performance = true;
// app.use(store)


createApp(App).use(vueCustomElement).use(store)
const CurrentTimeElement = defineCustomElement(App)
customElements.define('vue-widget', CurrentTimeElement)

