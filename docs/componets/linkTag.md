  <link-tag
                  v-model="formObj.groupId"
                  parent-id="266"
                  cmax-width="848"
                />



        <link-tag
              v-model="formObj.projStatus"
              cmax-width="848"
              :data-arr="projStatusOptions"
            />

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