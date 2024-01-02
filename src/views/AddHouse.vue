<template>
  <div>
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
          <el-form ref="formRef" :model="form" label-width="100px">
            <el-form-item label="房源图片" prop="title">
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:80/uploadImg"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :on-success="uploadSuccess"
                  :before-upload="beforeAvatarUpload"
                  list-type="picture"
                  :limit="4"
                >
                  <el-button size="small" type="primary">点此上传</el-button>
                  <div class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="介绍标题" prop="title">
              <el-input
                type="textarea"
                placeholder="请输入房源介绍标题"
                maxlength="20"
                show-word-limit
                v-model="form.title"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在城市" prop="city">
              <el-select v-model="form.city" placeholder="请选择">
                <el-option key="bj" label="北京" value="北京"></el-option>
                <el-option key="sh" label="上海" value="上海"></el-option>
                <el-option key="sz" label="深圳" value="深圳"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="desc">
              <el-input type="area" v-model="form.area"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="desc">
              <el-input
                type="area"
                style="width: 100px"
                v-model="form.size"
              ></el-input>
              平方米
            </el-form-item>
            <el-form-item label="所在小区" prop="desc">
              <el-input type="area" rows="3" v-model="form.block"></el-input>
            </el-form-item>

            <el-form-item label="建筑类型" prop="resource">
              <el-radio-group v-model="form.building">
                <el-radio label="塔楼"></el-radio>
                <el-radio label="板楼"></el-radio>
                <el-radio label="塔板结合"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="房屋备注" prop="desc">
              <el-input
                type="textarea"
                rows="4"
                v-model="form.demand"
              ></el-input>
            </el-form-item>
            <el-form-item label="房源类型" prop="resource">
              <el-radio-group v-model="type">
                <el-radio label="新房"></el-radio>
                <el-radio label="二手房"></el-radio>
                <el-radio label="租房"></el-radio>
              </el-radio-group>
            </el-form-item>
            <component ref="text" :is="comName"> </component>
            <br />
            <el-form-item>
              <el-button type="primary" style="width: 200px" @click="onSubmit"
                >表单提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import add1 from "./Add1.vue";
import add2 from "./Add2.vue";
import add3 from "./Add3.vue";
import apiFun from "../axios/api.js";
export default {
  name: "baseform",
  components: { add1, add2, add3 },
  data() {
    return {
      comName: "add1",
      type: "新房",
      form: {
        title: "",
        city: "",
        area: "",
        size: "",
        block: "",
        building: "",
        demand: "",
        fileList: [],
      },
      son: {},
    };
  },
  methods: {
    // 提交
    onSubmit() {
      this.son = this.$refs.text.sonSubmit();
      if (this.type == "二手房") console.log(this.type);
      console.log(this.form);
      console.log(this.son);
      if (this.type == "二手房") {
        let num = 0;
        let cover = null;
        this.form.fileList.forEach((item) => {
          num = num + 1;
          let img = item.data;
          if(num == 1){
            cover = img;
          }
        });
        apiFun
          .addSecond({
            title: this.form.title,
            city: this.form.city,
            area: this.form.area,
            size: this.form.size,
            block: this.form.block,
            building: this.form.building,
            demand: this.form.demand,
            cost: this.son.cost,
            own: this.son.own,
            type: this.son.type,
            lift: this.son.lift,
            face: this.son.face,
            decorate: this.son.decorate,
            floor: this.son.floor,
            scale: this.son.scale,
            cover: cover,
          })
          .then((res) => {
            if (res.flag == true) {
              let newId = res.msg;
              this.form.fileList.forEach((item) => {
                let img = item.data;
                console.log(img);
                apiFun
                  .addSecondImg({
                    id: newId,
                    img: img,
                    type: "2",
                  })
                  .then((res) => {
                    //
                  });
              });
              ElMessage.success("提交成功！");
              setTimeout("location.reload()",2000)//刷新清除页面数据
            } else {
              ElMessage.error("添加新房失败");
            }
          });
      } else if (this.type == "新房") {
        ElMessage.success("提交成功！");
        setTimeout("location.reload()",2000)
    
      } else if (this.type == "租房") {
        ElMessage.success("提交成功！");
        setTimeout("location.reload()",2000)
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    uploadSuccess(file) {
      console.log(file);
      this.form.fileList.push(file);
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        //只能为图片类型
        ElMessage.error("请选择图片类型的文件！");
        return false;
      } else if (file.size / 1024 / 1024 > 2) {
        ElMessage.error("大小不能超过2MB!"); //不能大于2MB
        return false;
      }
      return true;
    },
  },
  watch: {
    type(newValue) {
      console.log(newValue);
      if (newValue == "新房") {
        this.comName = "add1";
      } else if (newValue == "二手房") {
        this.comName = "add2";
      } else if (newValue == "租房") {
        this.comName = "add3";
      }
    },
    immediate: true,
  },
};
</script>