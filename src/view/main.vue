<script>
export default {
  data() {
    return {
      money: {
        //首付
        downPyments: 0,
        //贷款
        loan: 0,
        //保险
        insure: 0,
        //车牌
        licensePlate: 0,
        //分期年数
        periods: 5,
        //提前还款
        repayment: 1,
        //违约金
        damages: 3,
        //月供
        supply: 0,
        //利率
        rate:4,
        //其他费用
        other:0,
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit() {

    }
  },
  computed:{
   rate(){
     return ((this.money.supply * this.money.periods*12) - this.money.loan) / this.money.loan / this.money.periods * 100
   },
  Landing(){
     //实际落地金额=首付+贷款+利息+保险+上牌+其他费用+提前还款违约金
    return Number(this.money.downPyments)
        + Number(this.money.loan)
        + Number(this.totalInterest)
        + Number(this.money.insure)
        + Number(this.money.licensePlate)
        + Number(this.money.other)
        + Number(this.totalDamages)
  },
    //总利息
  totalInterest(){
    return Number(this.interest) * Number(this.money.repayment) * 12
  },
    //提前还款违约金
    totalDamages(){
      return (Number(this.money.loan) - Number(this.totalPrincipal)) * Number(this.money.damages) / 100
    },
    //提前还款的本金
    totalPrincipal(){
     return Number(this.principal) * Number(this.money.repayment) * 12
    },
    //每月还款本金
    principal(){
     return this.money.loan / this.money.periods / 12
    },
    //每月还款利息
    interest(){
     return this.money.supply - this.principal
    },
  }
}
</script>

<template>

      <el-form :inline="true" :model="money" class="demo-form-inline">
        <el-form-item label="首付" >
          <el-input v-model="money.downPyments"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="贷款">
          <el-input v-model="money.loan"  clearable type="number" />
        </el-form-item>
        <el-form-item label="保险">
          <el-input v-model="money.insure"  clearable  type="number"/>
        </el-form-item>
        <el-form-item label="上牌">
          <el-input v-model="money.licensePlate"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="月供">
          <el-input v-model="money.supply"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="分期年数">
          <el-input v-model="money.periods "  clearable type="number"/>
        </el-form-item>
        <el-form-item label="年利率（%）">
          <el-input v-model="rate"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="月还款本金">
          <el-input v-model="principal"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="月还款利息">
          <el-input v-model="interest"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="其他费用">
          <el-input v-model="money.other"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="X年后提前还款">
          <el-input v-model="money.repayment"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="提前还款违约金（%）">
          <el-input v-model="money.damages"  clearable type="number"/>
        </el-form-item>
        <br>实际落地金额=首付+贷款+利息+保险+上牌+其他费用+提前还款违约金<br>
        <el-form-item>
          <el-button type="primary">实际落地价：{{Landing}}</el-button>
        </el-form-item>
      </el-form>

<!--      <el-table :data="tableData" style="width: 100%" border>-->
<!--        <el-table-column prop="date" label="Date" width="50" />-->
<!--        <el-table-column prop="name" label="Name" width="180" />-->
<!--        <el-table-column prop="address" label="Address" />-->
<!--      </el-table>-->


</template>

<style>

</style>