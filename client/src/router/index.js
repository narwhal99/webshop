import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import contentrender from '../views/contentDisplay'
import resuply from '../views/resuply'
import product from '../components/moderator/addproduct/product'
import productgroup from '../components/moderator/addproduct/group'
import productRender from '../components/productRender/renderDisplay'
import productEdit from '../components/moderator/editproduct/edit'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/resuply', component: resuply,
      children: [
        { path: 'product', component: product },
        { path: 'group', component: productgroup },
        { path: 'edit', component: productEdit },
      ]
    },
    { path: '/product/:product', component: productRender, props: true },
    { path: '/:gender/:product', component: contentrender, name: 'contentrender', props: true },

  ]
})


export default router
