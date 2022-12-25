<template>
  <div>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 用户管理
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="id" label="账号" width="100" />
        <el-table-column prop="img" label="房屋图片" width="240">
          <template #default="scope">
            <img :src="scope.row.img" width="150" height="110" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="房屋地址" width="200" />
        <el-table-column prop="user" label="用户id" width="150" />
        <el-table-column prop="name" label="客户姓名" width="200" />
        <el-table-column prop="phone" label="客户电话" width="200" />
        <el-table-column prop="money" label="看房费用" width="150" />
        <el-table-column prop="time1" label="看房时间" width="200" />
        <el-table-column prop="time2" label="订单时间" width="200" />
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              v-if="scope.row.state == 1"
              @click="cancelBooks(scope.row, scope.$index)"
              >取消订单</el-button
            >
            <el-button
              link
              type="success"
              size="small"
              v-if="scope.row.state == 2"
              >订单已完成</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              v-if="scope.row.state == 3"
              >订单已取消</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              v-if="scope.row.state2 == 1"
              @click="refund(scope.row, scope.$index)"
              >退款</el-button
            >
            <el-button
              link
              type="success"
              size="small"
              v-if="scope.row.state2 == 2"
              >已退款</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="float: right">
      <!-- 分页 -->
      <br />
      <el-pagination
        background
        class="pagiantion"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        layout="prev,pager,next,jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import apiFun from "../axios/api.js";
export default {
  data() {
    return {
      tableData: [],
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 5, //每页显示的记录数
        total: 0, //总记录数
      },
    };
  },
  methods: {
    getAll() {
      apiFun
        .getAllBooks({
          a1: this.pagination.currentPage,
          a2: this.pagination.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.pagination.pageSize = res.data.size;
          this.pagination.currentPage = res.data.current;
          this.pagination.total = res.data.total;
          this.tableData = res.data.records;
        });
    },
    // 退钱
    refund(row, index) {
      this.$confirm("是否将此预约费用（"+row.money+"元）退回给该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        apiFun
          .refund({
            id: row.id,
            user: row.user,
            money: row.money,
          })
          .then((res) => {
            if (res.flag == true) {
              ElMessage.success("退款成功");
              this.getAll();
            } else {
              ElMessage.error("退款失败");
            }
          });
      });
    },
    cancelBooks(row, index) {
      this.$confirm("预约生效中，是否要取消该订单","提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          apiFun
          .cancelBooks({
            id: row.id,
          })
          .then((res) => {
            if (res.flag == true) {
              ElMessage.success("取消订单成功");
              this.getAll();
            } else {
              ElMessage.error("取消订单失败");
            }
          });
        })
    },
    handleCurrentChange(currentPage) {
      //修改页码值为当前选中页码值
      this.pagination.currentPage = currentPage;
      //执行查询
      this.getAll();
    },
  },
  created() {
    this.getAll();
  },
};
</script>