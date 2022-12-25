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
      <el-form-item label="来源" prop="desc">
        <el-input type="area" style="width: 100px" v-model="form.own"></el-input
        ><span style="color: gray">（请填写“平台”或用户id）</span>
      </el-form-item>
      <el-form-item label="户型" prop="desc">
        <el-input
          type="area"
          style="width: 150px"
          v-model="form.type"
        ></el-input>
      </el-form-item>
      <el-form-item label="配备电梯" prop="resource">
        <el-radio-group v-model="form.lift">
          <el-radio label="有"></el-radio>
          <el-radio label="无"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="房屋朝向" prop="resource">
        <el-radio-group v-model="form.face">
          <el-radio label="南 北"></el-radio>
          <el-radio label="东 西"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="装修情况" prop="resource">
        <el-radio-group v-model="form.decorate">
          <el-radio label="精装"></el-radio>
          <el-radio label="毛胚"></el-radio>
          <el-radio label="在建"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在楼层" prop="desc">
        <el-input
          type="area"
          style="width: 100px"
          v-model="form.floor"
        ></el-input>
        层
      </el-form-item>
      <el-form-item label="梯户比例" prop="desc">
        <el-input
          type="area"
          style="width: 100px"
          v-model="form.scale"
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
        cost: "",//总价
        own: "",//来源
        type: "",//户型
        lift: "",//配备电梯
        face: "",//房屋朝向
        decorate: "",//装修情况
        floor: "",//所在楼层
        scale: "",//梯户比例
      },
    };
  },
  methods:{
    sonSubmit(){
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