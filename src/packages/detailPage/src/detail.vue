<template>
    <section id="Dsection">
        <main class="content">
            <section class="multiple-columns">
                <ul class="columns" v-for="(row,index) in columnData" :key="index">
                    <li class="columns-item" v-for="(column,sindex) in row.columns" :key="sindex">
                        <ul class="label-content">
                            <li>{{column.label}}</li>
                            <li>{{model[column.value]}}</li>
                        </ul>
                    </li>
                </ul>
            </section>
        </main>
    </section>
</template>

<script>
    export default {
        name: 'GuluDetail',
        props:{
            columnData:{
                type:Array,
                default: function() {
                    return []
                }
            },
            model:{
                type:Object,
                default: function() {
                    return {}
                }
            }
        },
        data(){
            return {}
        },
    }
</script>

<style lang="scss" scoped>
    #Dsection{
        padding: 20px;
        .content{
            .multiple-columns{
                border-top: 1px solid #e9e9e9;
                border-bottom: 1px solid #e9e9e9;
                .columns{
                    display: flex;
                    line-height: 1.5;
                    color: #666;
                    font-size: 14px;
                    font-family: 微软雅黑;
                    &+.columns{
                        border-top: 1px solid #e9e9e9;
                    }
                    .columns-item{
                        flex: 1;
                        .label-content{
                            display: flex;
                            height: 100%;
                            li{
                                &:first-child{
                                    width: 167px;
                                    background-color: #f8f8f9;
                                    padding: 10px 14px;
                                    text-align: right;
                                }
                                &:last-child{
                                    width: calc(100% - 167px);
                                    padding: 10px 14px;
                                    word-break: break-all;
                                    white-space: pre-line;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
