[
  {
    columns:[
      {
        label:'所属平台1',
        value:'value1'
      },
      {
        label:'所属平台2',
        value:'value2'
      }
    ]
  },
  {
    columns:[
      {
        label:'所属平台1',
        value:'value1'
      }
    ]
  }
]
// columnData 自定义显示列表布局数据  类型 array
// label: 显示name
// value: 对应model的值

model:{
  value1:"1",
  value:"2"
} // 后端传入的model数据

import detailSection from '@/components/detailSection'

<detailSection :column-data="Array"  :model="Obj"/>