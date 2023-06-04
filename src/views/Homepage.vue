<template>
  <div>
    <my-carousel></my-carousel>
    <br />
    <h3>当前选图</h3>
    <br />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="150"> </el-table-column>
      <el-table-column prop="src" label="当前选图" width="600">
        <template #default="scope">
          <img :src="scope.row" width="400" height="200" />
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="280">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="dealWorker(scope.row, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      <el-button size="small" type="primary">点击添加</el-button>
    </el-upload>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import apiFun from "../axios/api.js";
export default {
  data() {
    return {
      tableData: [],
      fileList: [],
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
    getAll() {
      apiFun.getHomepageImg().then((res) => {
        this.tableData = res.data;
        console.log(this.tableData);
      });
    },
  },
  created() {
    this.getAll();
  },
};
</script>