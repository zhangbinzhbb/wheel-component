/*
 * @Author: zhangbinzhbb
 * @Date: 2017-09-06 17:23:33
 * @Last Modified by: zhangbiaobin
 * @Last Modified time: 2018-04-22 13:32:54
 */

import gButton          from './packages/button/index.js'
import searchCompany    from './packages/searchCompany/index.js'
import gPagination      from './packages/pagination/index.js'
import gUpload          from './packages/upload/index.js'
import gLinkTag         from './packages/linkTag/index.js'
import gDetailPage      from './packages/detailPage/index.js'

// ...如果还有的话继续添加

const components = [
    gButton,
    searchCompany,
    gPagination,
    gUpload,
    gLinkTag,
    gDetailPage
    // ...如果还有的话继续添加
]

const install = function (Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    gButton,
    searchCompany,
    gPagination,
    gUpload,
    gLinkTag,
    gDetailPage
    // ...如果还有的话继续添加
}