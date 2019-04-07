import Vue from 'vue/dist/vue.js';


import App from './App.vue'
import HelloWorld from './containers/Login-Register/HelloWorld.vue'
import HomeContainer from './containers/Home/Home.vue'
import AddContainer from './containers/Add/Add.vue'


import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import store from './store/store'

import "vue-material/dist/vue-material.min.css";

import 'vue-material/dist/theme/default.css'
import Vuex from 'vuex'
import { instance } from "./routeconfig.js";

import { mapState } from "vuex";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
//  Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue.config.productionTip = false


Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: HelloWorld,
      beforeEnter:(to, from, next)=>{
        if(JSON.parse(localStorage.getItem("user"))!== null){
          instance.interceptors.request.use(config => {
            const token = JSON.parse(localStorage.getItem("user"));
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          });
          instance.get("/users/me").then(success => {
         
              next({
                path: '/home',
              })
          })
            .catch(err => {
              if (err.response) {
                if (err.response.status === 401) {
                  localStorage.removeItem("user");
                  next()
                }
              }
            });
        }
        else{
          next()
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeContainer,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/add',
      name: 'add',
      component: AddContainer,
      meta: {
        requiresAuth: true,
        adminAuth: true
      }
    },
  ],

})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') == null) {
      next({
        path: '/',
      })
    }

    else {
      if (to.matched.some(record => record.meta.adminAuth)) {

        if (router.app.$store.getters.role) {
          if (router.app.$store.getters.role === 'agency') {
            next()
          }
        }
        else {
          instance.interceptors.request.use(config => {
            const token = JSON.parse(localStorage.getItem("user"));
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          });
          instance.get("/users/me").then(success => {
            if (success.data.role === 'victim') {
              next({
                path: '/home',
              })
            }
            else {
              next()
            }
          })
            .catch(err => {
              if (err.response) {
                if (err.response.status === 401) {
                  localStorage.removeItem("user");
                  next({
                    path: '/',
                  })
                }
              }
            });
        }
        // if (user.is_admin == 1) {
        //   next()
        // }
        // else {
        //   next({ name: 'userboard' })
        // }
      } else {
        next()
      }


      // const data = { ...mapState(["role"]) }
      // if (router.app.$store.getters.role) {
      //   if (router.app.$store.getters.role === record.meta.role) {
      //     next()
      //   }
      // }
      // else {
      //   next({
      //     path: '/home',
      //   })
      // }
      // console.log(router.app.$store.getters.role, 'sdad')
      // let user = JSON.parse(localStorage.getItem('user'))
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
