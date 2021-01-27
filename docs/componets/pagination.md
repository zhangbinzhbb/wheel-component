
```

    Vue.component('g-pagination', Pagination)

     <g-pagination
      :total="total"
      :page.sync="pages.page"
      :limit.sync="pages.limit"
      @pagination="paginationGetList" />


      <script>
        export default {
            data(){
                return {
                    pages: {
                        page: 1,
                        limit: 10
                    },
                    total:0
                }
            },
            methods:{
                paginationGetList(){

                }
            }
        }
    </script>

```
### Attributes

参数 | 说明 | 类型 | 默认值
---|---|---|---
total | 总条目数 | Number | /
page |  当前页数   支持 .sync 修饰符 | Number | 1
limit | 每页显示条目个数，支持 .sync 修饰符 | Number | 10
page-sizes| 每页显示个数选择器的选项设置 | Number [] | [10, 20, 30, 50]
hidden | 是否隐藏 | Boolean | false
auto-scroll | 分页之后是否自动滚动到顶部 | Boolean | false

### Events


事件名称 | 说明 | 回调参数
---|---|---
pagination | 当 limit 或者 page 发生改变时会触发 | {page,limit}
