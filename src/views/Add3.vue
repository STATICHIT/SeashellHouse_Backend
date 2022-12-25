<template>
  <div>
    <div class="form-box myBox">
      <el-form-item label="入住时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 90%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="起租期限" prop="desc">
        <el-input
          type="area"
          style="width: 200px"
          v-model="form.developer"
        ></el-input>
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
      <el-form-item label="房屋朝向" prop="resource">
        <el-radio-group v-model="form.face">
          <el-radio label="南 北"></el-radio>
          <el-radio label="东 西"></el-radio>
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
      <el-form-item label="配备电梯" prop="resource">
        <el-radio-group v-model="form.lift">
          <el-radio label="有"></el-radio>
          <el-radio label="无"></el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="租房方式" prop="resource">
        <el-radio-group v-model="form.way">
          <el-radio label="整租"></el-radio>
          <el-radio label="合租"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="配套设施" prop="title">
        <div>
          <el-upload
            class="avatar-uploader"
            action="http://localhost:80/uploadImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="signList"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary">点此上传</el-button>
            <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        time2: "",
        term: "",
        own: "",
        type: "",
        face: "",
        floor:"",
        lift:"",
        way: "",
        signList:[],
      },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadSuccess(res) {
      console.log(res.data);
      // this.fileList.push(res.name,res.url)
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
    sonSubmit(){
      // alert(this.form.cost)
      return this.form
    }
  },
};
</script>

<style lang="css" scoped>
.myBox {
  padding: 20px;
  border: 1px solid rgb(224, 221, 221);
}
</style>