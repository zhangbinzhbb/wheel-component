<template>
    <el-row >
        <el-col :span="24"><div class="grid-pagination">
            <span class="button-first" @click="toFirst">首页</span>
            <el-pagination
                    :background="background"
                    :current-page.sync="currentPage"
                    :page-size.sync="pageSize"
                    :layout="layout"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="prevClickChange"
                    @next-click="nextClickChange"
            />
            <span class="button-first" @click="toEnd">末页</span>
            <span class="total">共 {{total}} 条 </span>
            <div class="pagination__editor">
                跳至 <el-input size="mini" v-model.number="internalCurrentPage" @keyup.native.enter="inputKeyEvent" maxlength="2"></el-input> 页
            </div>
        </div></el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'GuluPagination',
        props:{
            total: {
                required: true,
                type: Number
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 10
            },
            pageSizes: {
                type: Array,
                default() {
                    return [10, 20, 30, 50]
                }
            },
            layout: {
                type: String,
                default: 'prev, pager, next'
            },
            background: {
                type: Boolean,
                default: false
            },
            autoScroll: {
                type: Boolean,
                default: true
            },
            hidden: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            currentPage: {
                get() {
                    return this.page
                },
                set(val) {
                    this.$emit('update:page', val)
                }
            },
            pageSize: {
                get() {
                    return this.limit
                },
                set(val) {
                    this.$emit('update:limit', val)
                }
            },
            pageCount:{
                get() {
                    return Math.ceil(this.total / this.pageSize)
                }
            }
        },
        data(){
            return {
                value:null,
                internalCurrentPage:1
            }
        },
        watch:{
            currentPage: {
                immediate: true,
                handler(val) {
                    this.internalCurrentPage = val
                }
            }
        },
        created(){},
        methods:{
            handleSizeChange(val) {
                this.$emit('pagination', { page: this.currentPage, limit: val })
            },
            handleCurrentChange(val) {
                this.$emit('pagination', { page: val, limit: this.pageSize })
            },
            toFirst(){
                this.$emit('update:page', 1)
                this.$emit('pagination', { page: 1, limit: this.pageSize })
            },
            toEnd(){
                this.$emit('update:page', this.pageCount)
                this.$emit('pagination', { page: this.pageCount, limit: this.pageSize })
            },
            inputKeyEvent() {
                const value = this.internalCurrentPage > this.pageCount ? this.pageCount : this.internalCurrentPage
                this.internalCurrentPage = value

                this.$emit('update:page', value)
                this.$emit('pagination', { page: value, limit: this.pageSize })
            },
            prevClickChange(page){},
            nextClickChange(page){},
            getValidCurrentPage(value) {
                value = parseInt(value, 10);

                const havePageCount = typeof this.internalPageCount === 'number';

                let resetValue;
                if (!havePageCount) {
                    if (isNaN(value) || value < 1) resetValue = 1;
                } else {
                    if (value < 1) {
                        resetValue = 1;
                    } else if (value > this.internalPageCount) {
                        resetValue = this.internalPageCount;
                    }
                }

                if (resetValue === undefined && isNaN(value)) {
                    resetValue = 1;
                } else if (resetValue === 0) {
                    resetValue = 1;
                }

                return resetValue === undefined ? value : resetValue;
            },
        }
    }
</script>

<style lang="scss">
    .grid-pagination {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0 19px 0 22px;
        padding-top: 36px;

        .button-first {
            height: 38px;
            line-height: 38px;
            border: 1px solid #d8d8d8;
            border-radius: 4px;
            min-width: 35.5px;
            padding: 0 4px;
            margin-right: 12px;
            font-size: 14px;
            color: #666;
            cursor: pointer;
            text-align: center;
        }
        .total{
            font-size: 13px;
            color: #666;
        }

        .pagination__editor{
            font-size: 13px;
            color: #666;
            padding-left: 8px;
            .el-input {
                width: 50px;
            }
            .el-input__inner {
                text-align: center;
                height: 38px;
                line-height: 38px;
            }
        }

        .el-pagination {
            display: flex;
            align-items: center;
        }

        .el-pagination button {
            height: 38px;
            line-height: 38px;
            border: 1px solid #d8d8d8;
            border-radius: 4px;
            min-width: 35.5px;
            padding: 0 4px;
            margin-right: 12px;
        }

        .el-pager li {
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
            border: 1px solid #d8d8d8;

            &:first-child {
                // margin-left: 12px;
            }

            &:last-child {
                margin-right: 12px;
            }

            &+li {
                margin-left: 12px;
            }
        }

        .el-pager li.active {
            border: 1px solid #b40005;
            color: #b40005;
        }

        .el-pager li.active + li {
            border: 1px solid #d8d8d8;
        }
    }
</style>


