<template>
    <div ref="tag" class="link-tag-box" :style="{marginTop:cmarginTop+'px'}">
        <div class="all"><span class="spa" :class="{allActiveClass:isActive}" @click="allTags">不限</span></div>
        <el-row class="menu-content">
            <el-col ref="menu" :span="24" :style="{maxWidth:cmaxWidth+'px'}"><div class="ul-contaier">
                <ul class="tag-nav" :class="{activeHeight:isActiveH}">
                    <li v-for="(item, index) in options" :key="item.value" class="navItem" :class="item.checked === true?'activeClass':''" @click="changeTags(index)">
                        <span>{{ item.label }}</span>
                    </li>
                </ul>
                <div v-if="isMoreShow" class="col-handle">
                    <a
                            href="javascript:void(0)"
                            class="open-btn icon-open-select"
                            :class="{open:isActiveH}"
                            @click="moreShow"
                    />
                </div>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'LinkTag',
        model: {
            prop: 'value',
            event: 'update-value'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            contextPath: {// 请求地址
                type: String,
                default: '/ei-web'
            },
            parentId: {// 项目id
                type: String,
                default: ''
            },
            include: {
                type: String,
                default: null
            },
            cmaxWidth: {
                type: [String, Number],
                default: 'inherit'
            },
            cmarginTop: {
                type: Number,
                default: 10
            },
            dataArr: {
                type: Array,
                default() {
                    return []
                }
            },
            selectType: { // 1:多选 2:单选 默认为多选
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                isActive: true,
                isActiveH: false,
                isMoreShow: false,
                filterMore: true,
                multipleData: [],
                options: []
            }
        },
        computed: {
            myValue() {
                return this.value !== '' ? this.value.split(',') : []
            },
            randomNum() {
                return this.dataArr.length + Math.ceil(Math.random() * 10)
            }
        },
        watch: {
            randomNum(val) {
                this.updateParentCreateData(this.dataArr)
                this.updateParentData(this.dataArr)
                return
            }
        },
        created() {},
        mounted() {
            this.$nextTick(() => {
                if (this.dataArr.length > 0) {
                    this.updateParentCreateData(this.dataArr)
                    this.updateParentData(this.dataArr)
                    return
                }

                const parentId = this.parentId
                this.getCodeByParentId(parentId)
            })
        },
        methods: {
            getCodeByParentId(parentId) { // 获取options label data 数据
                const URL = `${this.contextPath}/commonTCode/getCodeByParentId?parentId=${parentId}`
                axios({
                    url: URL,
                    method: 'get'
                }).then((response) => {
                    const data = response.data
                    if (data.status === '0') {
                        if (data.data.options) {
                            const arr = data.data.options
                            this.updateParentCreateData(arr)
                            this.updateParentData(arr)
                        }
                    }
                })
            },
            updateParentData(arr) { // 处理数据过多，折叠显示隐藏
                this.$nextTick(() => {
                    let ul_width = this.cmaxWidth
                    const optionsLength = arr.length
                    const numWidth = optionsLength * 70

                    if (ul_width === 'inherit') {
                        ul_width = this.$refs.tag.offsetWidth
                    }
                    ul_width = parseInt(ul_width)

                    if (numWidth > ul_width) { // 展开显示
                        this.isMoreShow = true
                    } else { // 隐藏
                        this.isMoreShow = false
                    }
                })
            },
            updateParentCreateData(arr) {
                this.$nextTick(() => {
                    let optionsArray = []
                    // 处理包含
                    const responseOptions = arr

                    if (this.include) {
                        const includeVals = this.include.split(',')
                        for (var i = 0; i < responseOptions.length; i++) {
                            if (includeVals.includes(responseOptions[i].value)) {
                                optionsArray.push(responseOptions[i])
                            }
                        }
                    } else {
                        optionsArray = responseOptions
                    }

                    this.options = optionsArray

                    // 拿到父组件传入的value值
                    this.myValue.forEach((v, k) => {
                        for (var i = 0; i < this.options.length; i++) {
                            // 拿到value值做对比
                            if (this.options[i].value === v) {
                                var obj = this.options[i]
                                obj.checked = true
                                this.$set(this.options, i, obj)
                                this.isActive = false
                            }
                        }
                    })
                })
                return
            },
            allTags() {
                // 不限
                // this.isActive = !this.isActive
                this.isActive = true
                // 为false时，样式标签不显示样式
                for (const j in this.options) {
                    var obj = this.options[j]
                    obj.checked = false
                    this.$set(this.options, j, obj)
                }
                this.$emit('update-value', '')
            },
            // 数组每一项加个checked属性记录一下就行了，点击时候把index传过去修改数据
            changeTags(index) {
                // 切换选中状态
                // 只要选中标签，不限样式不显示
                this.isActive = false
                const type = this.selectType
                if (type === 1) {
                    // 多选
                    const obj = this.options[index]
                    obj.checked = !obj.checked
                    this.$set(this.options, index, obj)
                    if (this.options[index].checked === true) {
                        // 点击选中
                        this.myValue.push(this.options[index].value)
                        var valueString = this.myValue.join(',')
                        this.$emit('update-value', valueString)
                    } else {
                        // 去掉选中
                        const id = this.options[index].value
                        const indexId = this.myValue.indexOf(id)
                        this.myValue.splice(indexId, 1)
                        let valueString = this.myValue.join(',')
                        if (this.myValue.length === 0) {
                            valueString = ''
                            this.isActive = true
                        }
                        this.$emit('update-value', valueString)
                    }
                }
                if (type === 2) {
                    // 单选
                    // 点击先将checked置为false
                    for (let i = 0; i < this.options.length; i++) {
                        const obj = this.options[i]
                        obj.checked = false
                        this.$set(this.options, i, obj)
                    }
                    // 选中的颜色高亮
                    const obj = this.options[index]
                    obj.checked = true
                    this.$set(this.options, index, obj)

                    const valueString = this.options[index].value
                    this.$emit('update-value', valueString)
                }
            },
            moreShow() { // 更多
                this.isActiveH = !this.isActiveH
            },
            clear() {
                this.allTags()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-content{
        width: 90%;
    }
    .col-type {
        float: left;
        min-width: 48px;
        vertical-align: middle;
        text-align: left;
        font-size: 12px;
        color: #5a626d;
        letter-spacing: 0;
        font-weight: 600;
        line-height: 24px;
        white-space: nowrap;
    }

    .link-tag-box {
        display: flex;
    }

    .link-tag-box .spa {
        line-height: 24px;
        position: relative;
        overflow: hidden;
        border-radius: 2px;
        display: inline-block;
    }

    .link-tag-box .all {
        float: left;
        font-size: 13px;
        color: #222c38;
        cursor: pointer;
        width: 48px;
        height: 24px;
        line-height: 24px;
        margin-bottom: 4px;
        margin-right: 5px;
        overflow: hidden;
    }

    .allActiveClass {
        color: #b40005;
    }

    .tag-nav {
        float: left;
        overflow: hidden;
        position: relative;
        height: 24px;
        padding-right: 30px;
        margin: 0;
    }

    .activeHeight {
        height:auto !important;
    }

    .ul-contaier {
        position: relative;
    }

    /* 更多-收起 */
    .filter-more {
        position: absolute;
        top: 1px;
        right: -82px;
        width: auto;
        height: 24px;
        line-height: 24px;
        padding-right: 15px;
        color: #43647f;
        cursor: pointer;
    }
    .col-handle {
        position: absolute;
        right: 0;
        top: 2px;
        line-height: 24px;
    }
    .col-handle .open-btn {
        display: block;
        width: 20px;
        height: 20px;
    }

    .col-handle .open-btn {
        vertical-align: middle;
        font-size: 20px;
        color: #ccc;
        transition: transform 0.4s;
    }

    /*展开*/

    .col-handle .open-btn.open {
        transform: rotate(180deg);
    }

    .icon-open-select {
        background: url(./images/top.png) no-repeat;
        background-position: center;
    }

    /* 更多-收起 end */

    .tag-nav li {
        list-style-type: none;
        float: left;
        font-size: 13px;
        color: #222c38;
        cursor: pointer;
        /* width: 90px; */
        height: 24px;
        line-height: 24px;
        margin-bottom: 4px;
        margin-right: 5px;
        overflow: hidden;
        cursor: pointer;
    }

    .tag-nav li span:hover {
        background-color: #eff2f5;
    }

    .tag-nav li:not(.activeClass) span:hover {
        /* background-color: #fac073; */
    }

    /* .link-tag-box .all:hover {
      background-color: #fac073;
      color: #fff;
    } */

    .link-tag-box .all .spa:not(.allActiveClass):hover {
        /* background-color: #fac073;
        color: #fff; */
    }

    .tag-nav li.activeClass>span {
        color: #b40005;
    }

    .tag-nav li>span:first-child {
        padding: 0 10px;
        line-height: 24px;
        position: relative;
        overflow: hidden;
        border-radius: 2px;
        display: inline-block;
    }

</style>
