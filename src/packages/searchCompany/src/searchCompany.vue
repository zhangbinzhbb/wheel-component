
<template>
  <el-select
          v-model="companyValue"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
    <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
/*
 * @Author: zhaopeng
 * @Date: 2019-06-14
 */
  export default {
    name: 'searchCompany',
    data() {
      return {
        options: [],
        loading: false,
        companyValue: this.value
      }
    },
    props: {
      url: {
        type: String,
        // default: 'http://172.29.109.17/yhhr-web'
        default: 'http://172.29.201.164:9090/yhhr-web'
      },
      value: {
        type: String,
        default: ''
      }
    },
    watch: {
      value(val){
        this.companyValue = val
      },
      companyValue(val){
        this.$emit("change",val);
      }
    },
    methods: {
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          this.options[0] = { label: query, value: 0 };
          axios.get(`${this.url}/BPI/QCCSearchData?keyword=${query}`)
                  .then((res) => {
                    this.loading = false;
                    const data = eval('(' + res.data.data.value + ')');
                    const result = data.Result
                    let list = result.map(item => {
                      let value = item.CreditCode
                      if (item.CreditCode == '') {
                        value = item.Name
                      }
                      return {
                        value: value,
                        label: item.Name
                      };
                    });
                    list.forEach((item, index) => {
                      this.options[index + 1] = item
                    })
                  })
                  .catch(err => {
                    console.log(err)
                  })

        } else {
          this.options = [];
        }
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>