<!-- 
<template>
  <el-upload
    class="avatar-uploader"
    action="http://localhost:80/uploadImg"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :limit="3"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
const imageUrl = ref(""); //图片回显值

const handleAvatarSuccess = (res) => {
  console.log(res.data);
  // imageUrl.value = res.data; //将图片进行回显
  // console.log(imageUrl.value);
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png" && rawFile.type !== "image/jpg") {
    //只能为图片类型
    // imageUrl=rawFile
    ElMessage.error("请选择图片类型的文件！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("大小不能超过2MB!"); //不能大于2MB
    return false;
  }
  return true;
};
</script> -->
<template>
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
      <el-button size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
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
  },
};
</script>