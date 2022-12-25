<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>增加楼盘</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="psd">
            <el-input v-model="form.psd"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio label="超级管理员"></el-radio>
              <el-radio label="业务员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介" prop="desc">
            <el-input type="textarea" rows="5" v-model="form.sign"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建业务员</el-button>
            <el-button @click="onReset">重置表单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import apiFun from "../axios/api.js";
export default {
  name: "baseform",
  data() {
    return {
      form: {
        name: "",
        psd: "",
        state: "业务员",
        sign: "",
      },
    };
  },
  methods: {
    onSubmit() {
      alert(this.form.name);
      apiFun
        .addWorker({
          name:this.form.name,
          password: this.form.psd,
          state: this.form.state,
          sign:this.form.sign,
        })
        .then((res) => {
          if (res.flag == true) {
            this.$message({
              type: "success",
              message: "成功添加，可在业务员列表中查看",
            });
            this.onReset()
          }
        });
    },
    // 重置
    onReset() {
      this.form.name = null;
      this.form.psd = null;
      this.form.sign = null;
    },
  },
};
</script>