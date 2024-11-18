import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9c5885cc = () => interopDefault(import('..\\pages\\batallas.vue' /* webpackChunkName: "pages/batallas" */))
const _28c4650a = () => interopDefault(import('..\\pages\\casas.vue' /* webpackChunkName: "pages/casas" */))
const _828ec73e = () => interopDefault(import('..\\pages\\muertes.vue' /* webpackChunkName: "pages/muertes" */))
const _e0d6a430 = () => interopDefault(import('..\\pages\\personajes.vue' /* webpackChunkName: "pages/personajes" */))
const _632cf71e = () => interopDefault(import('..\\pages\\regiones.vue' /* webpackChunkName: "pages/regiones" */))
const _cd77e3f4 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _4b4f8186 = () => interopDefault(import('..\\pages\\battle\\_slug.vue' /* webpackChunkName: "pages/battle/_slug" */))
const _4da941bd = () => interopDefault(import('..\\pages\\character\\_slug.vue' /* webpackChunkName: "pages/character/_slug" */))
const _3afc8f92 = () => interopDefault(import('..\\pages\\death\\_slug.vue' /* webpackChunkName: "pages/death/_slug" */))
const _393753ea = () => interopDefault(import('..\\pages\\houses\\_slug.vue' /* webpackChunkName: "pages/houses/_slug" */))
const _af5ea46c = () => interopDefault(import('..\\pages\\region\\_slug.vue' /* webpackChunkName: "pages/region/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/batallas",
    component: _9c5885cc,
    name: "batallas"
  }, {
    path: "/casas",
    component: _28c4650a,
    name: "casas"
  }, {
    path: "/muertes",
    component: _828ec73e,
    name: "muertes"
  }, {
    path: "/personajes",
    component: _e0d6a430,
    name: "personajes"
  }, {
    path: "/regiones",
    component: _632cf71e,
    name: "regiones"
  }, {
    path: "/",
    component: _cd77e3f4,
    name: "index"
  }, {
    path: "/battle/:slug?",
    component: _4b4f8186,
    name: "battle-slug"
  }, {
    path: "/character/:slug?",
    component: _4da941bd,
    name: "character-slug"
  }, {
    path: "/death/:slug?",
    component: _3afc8f92,
    name: "death-slug"
  }, {
    path: "/houses/:slug?",
    component: _393753ea,
    name: "houses-slug"
  }, {
    path: "/region/:slug?",
    component: _af5ea46c,
    name: "region-slug"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
