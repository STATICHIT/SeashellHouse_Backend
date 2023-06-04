<template>
  <div>
    <div class="index">
      <h2 style="text-align: left;margin-bottom: 10px;">当前首页轮播图效果</h2>
      <hr style="color:gray;margin-bottom: 20px;"/>
      <!-- 跑马灯  -->
      <div>
        <el-carousel :interval="3000" type="card" height="400px">
          <el-carousel-item v-for="item in imgList" :key="item">
            <img
              style="object-fit: scale-down; width: 600px; height: 100%"
              :src="item"
              class="image"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import apiFun from "../axios/api.js";
export default {
  name: "index",
  data() {
    return {
      imgList: [],
      screenWidth: 0,
    };
  },
  methods: {
    getAll() {
      apiFun.getHomepageImg().then((res) => {
        this.imgList = res.data;
        console.log(this.imgList);
      });
    },
  },
  created() {
    this.getAll();
  },
};
</script>

<style>
.index {
  background: white;
  text-align: center;
  padding: 30px;
}
.el-carousel__item h3 {
  color: white;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
}
</style>
