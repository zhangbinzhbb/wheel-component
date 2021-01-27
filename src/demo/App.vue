<template>
    <div>
        <!--<ElPagination></ElPagination>-->
        <!--<g-pagination/>-->
        <g-button>
            123
        </g-button>

        <g-pagination :total="total"
                      :page.sync="pages.page"
                      :limit.sync="pages.limit"
                      @pagination="paginationGetList" />
        <div>
            <g-linkTag v-model="formObj.projStatus" :data-arr="projStatusOptions" cmaxWidth="400"></g-linkTag>
        </div>

    </div>
</template>

<script>
    export default {
        name: "App.vue",
        data(){
            return {
                pages: {
                    page: 1,
                    limit: 10
                },
                total:0,
                formObj:{
                    projStatus:'123'
                },
                projStatusOptions:[
                    {
                        label: "储备项目",
                        value: "2"
                    },
                    {
                        label: "立项中",
                        value: "3"
                    },
                    {
                        label: "已立项",
                        value: "4"
                    },
                    {
                        label: "决策中",
                        value: "15"
                    },
                    {
                        label: "已决策",
                        value: "5"
                    },
                    {
                        label: "协议已签署",
                        value: "6"
                    },
                    {
                        label: "已出资",
                        value: "11"
                    },
                    {
                        label: "已部分退出",
                        value: "13"
                    },
                    {
                        label: "已退出",
                        value: "14"
                    },
                    {
                        label: "已中止",
                        value: "9"
                    },
                    {
                        label: "已废弃",
                        value: "8"
                    }
                ],
            }
        },
        methods:{
            paginationGetList(){

            }
        }
    }
</script>


<style scoped>

</style>
