<script>
export default {
  data() {
    return {
      money: {
        //首付
        downPyments: 5700,
        //贷款
        loan: 42000,
        //保险
        insure: 4300,
        //车牌
        licensePlate: 120,
        //分期年数
        periods: 5,
        //提前还款
        repayment: 1,
        //违约金
        damages: 3,
        //月供
        supply: 840,
        //利率
        rate:4,
        //其他费用
        other:0,
      },
      tableData: [{

      }],
      hide:true,
    }
  },
  created() {
    this.onlaod()
  },
  methods: {
    onlaod() {
      this.hide = false
      this.tableData = []
      let l = Number(this.money.periods) * 12;
      console.log(l)
      for (let i = 1; i <= l; i++) {
        //bj
        let bj = Number(this.principal) * (i)
        //利息
        let lx = Number(this.interest) * (i)
        //违约金
        let wyj = (Number(this.money.loan) - Number(bj)) * Number(this.money.damages) / 100

        this.tableData.push({
          data:i,
          bj:bj + lx,
          money: wyj,
          totalmoney: (Number(this.tableTotalmoney) + Number(lx) + Number(wyj)).toFixed(2)
        })
      }

    }
  },
  computed:{
   rate(){
     return ((this.money.supply * this.money.periods*12) - this.money.loan) / this.money.loan / this.money.periods * 100
   },
    tableTotalmoney(){
      return Number(this.money.downPyments)
          + Number(this.money.loan)
          + Number(this.money.insure)
          + Number(this.money.licensePlate)
          + Number(this.money.other)
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
  },
  watch:{
    Landing(){
      this.onlaod()
    }
  }
}
</script>

<template>
  <div style="align-items: center;text-align: center">

      <el-form :inline="true" :model="money" class="demo-form-inline" label-width="auto" :label-position="'right'">
        <el-form-item label="首付:" >
          <el-input v-model="money.downPyments"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="贷款:">
          <el-input v-model="money.loan"  clearable type="number" />
        </el-form-item>
        <el-form-item label="保险:">
          <el-input v-model="money.insure"  clearable  type="number"/>
        </el-form-item>
        <el-form-item label="上牌:">
          <el-input v-model="money.licensePlate"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="月供:">
          <el-input v-model="money.supply"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="分期年数:">
          <el-input v-model="money.periods "  clearable type="number"/>
        </el-form-item>
        <el-form-item label="年利率（%）:">
          <el-input v-model="rate"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="月还款本金:">
          <el-input v-model="principal"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="月还款利息:">
          <el-input v-model="interest"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="其他费用:">
          <el-input v-model="money.other"  clearable type="number"/>
        </el-form-item>
        <el-form-item label="X年后提前还款:">
          <el-input v-model="money.repayment" :max="money.periods" clearable type="number"/>
        </el-form-item>
        <el-form-item label="提前还款违约金（%）:">
          <el-input v-model="money.damages"  clearable type="number"/>
        </el-form-item>

      </el-form>
    <el-divider />
    <el-text class="mx-1" size="large" type="primary">实际落地价：{{Landing}}</el-text>
    <el-divider />
    <el-text class="mx-1" size="small">实际落地价=首付+贷款+利息+保险+上牌+其他费用+提前还款违约金</el-text>
    <el-divider />
    <el-text class="mx-1" size="large" type="primary">以下为提前还款具体的价格表</el-text>
    <el-divider />
      <el-table :data="tableData" style="width: 100%" border stripe height="450px" table-layout="auto">
        <el-table-column prop="data" label="期数"  />
        <el-table-column prop="bj" label="已还款本金+利息"  />
        <el-table-column prop="money" label="违约金"  />
        <el-table-column prop="totalmoney" label="落地价" />
      </el-table>

  </div>

</template>

<style>

</style>