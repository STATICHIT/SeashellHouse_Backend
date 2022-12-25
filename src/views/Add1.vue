<template>
  <div>
    <div class="form-box myBox">
      <el-form-item label="总价" prop="desc">
              <el-input
                type="area"
                style="width: 100px"
                v-model="form.cost"
              ></el-input>
              W
            </el-form-item>
      <el-form-item label="开盘时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 90%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="开发商" prop="desc">
        <el-input
          type="area"
          style="width: 200px"
          v-model="form.developer"
        ></el-input>
      </el-form-item>
      <el-form-item label="产权年限" prop="desc">
        <el-input
          type="area"
          style="width: 100px"
          v-model="form.ownership"
        ></el-input>
      </el-form-item>

      <el-col :span="11">
        <el-form-item label="绿化率" prop="desc">
          <el-input
            type="area"
            style="width: 100px"
            v-model="form.rate"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="容积率" prop="desc">
        <el-input
          type="area"
          style="width: 100px"
          v-model="form.plot"
        ></el-input>
      </el-form-item>

      <el-col :span="11">
        <el-form-item label="占地面积" prop="desc">
          <el-input
            type="area"
            style="width: 100px"
            v-model="form.space"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-form-item label="规划户数" prop="desc">
        <el-input
          type="area"
          style="width: 100px"
          v-model="form.plan"
        ></el-input>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cost:"",//总价
        time2: "",//开盘时间
        developer: "",//开发商
        ownership: "",//产权年限
        rate: "",//绿化率
        plot: "",//容积率
        space: "",//占地面积
        plan: "",//规划户数
      },
    };
  },
  methods:{
    sonSubmit(){
      // alert(this.form.cost)
      return this.form
    }
  }
};
</script>

<style lang="css" scoped>
.myBox {
  padding: 20px;
  border: 1px solid rgb(224, 221, 221);
}
</style>