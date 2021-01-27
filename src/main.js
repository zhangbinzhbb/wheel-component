import Vue from 'vue'
import App from './demo/App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Button from '@/packages/button/src/button.vue'
import Pagination from '@/packages/pagination/src/pagination.vue'
import LinkTag from '@/packages/linkTag/src/linkTag.vue'

Vue.component('g-button', Button)
Vue.component('g-pagination', Pagination)
Vue.component('g-linkTag', LinkTag)

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
