// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import $ from 'jquery'
import Ajax from './mixins/ajax'

import JSYaml from 'js-yaml'

import iView from 'iview';
import 'iview/dist/styles/iview.css'
Vue.use(iView)

import Common from './mixins/common'
Vue.use(Common)

window['iView'] = iView

// 声明全局方法，以便可以使用iView的loading和spin等，其他的vue插件同理
declare module 'vue/types/vue' {
  interface Vue {
    $Loading: any,
    $Spin: any,
    $loactionHref: any
  }
}

/**
 * 声明wau变量的interface，这样可以在wau中直接使用data而不会报错
 */
// interface Wau {
//   data: Object
// }
let wau = window.wau
let wauConfig: object = window.wauConfig || {}

console.log(wau, wauConfig, window)

/**
 * WAU初始化的类，包含初始化方法和判断
 */
class WAU {
  constructor(wauConfig: object) {
    this.mode = wauConfig['mode']||this.mode;
    this.url = wauConfig['url'];
  }

  mode: string = 'json'
  url: string = ''

  init() {
    console.log('当前渲染模式为 ---> ',this.mode);

    if(this.mode == 'yml'){
      Ajax.request(this.url, {}, 'GET', 'text')
        .then((res) => {
          res = JSYaml.load(res);
          const app = new Vue({
            el: '#app',
            components: {
              App
            },
            mounted() {
            },
            data() {
              window['wau'] = res
              // let result = Template.render(res, res.data);
              return {
                data: res
              }
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }else if(this.mode == 'json'){
      const app = new Vue({
        el: '#app',
        components: {
          App
        },
        mounted() {
        },
        data() {
          // let result = Template.render(wau, wau.data);
          return {
            data: wau
          }
        }
      })
    }
  }
}

new WAU(wauConfig).init();