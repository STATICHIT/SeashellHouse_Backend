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
        <el-table-column fixed prop="id" label="账号" width="260" />
        <el-table-column prop="nickname" label="昵称" width="260" />
        <el-table-column prop="phone" label="电话" width="260" />
        <el-table-column prop="email" label="邮箱" width="260" />
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="changeName(scope.row, scope.$index)"
              >修改资料</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              v-if="scope.row.still == '0'"
              @click="deleteUser(scope.row, scope.$index)"
              >封号</el-button
            >
            <el-button
              link
              type="success"
              size="small"
              v-if="scope.row.still == '1'"
              @click="unblockUser(scope.row, scope.$index)"
              >解封</el-button
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
        pageSize: 12, //每页显示的记录数
        total: 0, //总记录数
      },
    };
  },
  methods: {
    getAll() {
      apiFun
        .getAllUsers({
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
    // 封号
    deleteUser(row, index) {
      this.$confirm('是否将该用户封号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiFun
        .dealUser({
          id: row.id,
          type: "1",
        })
        .then((res) => {
          if (res.flag == true) {
            ElMessage.success("已成功将该用户封号");
          } else {
            ElMessage.error("封号失败");
          }
        });
        })
    },
    //解封
    unblockUser(row,index){
      this.$confirm('是否将该用户解封?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiFun
        .dealUser({
          id: row.id,
          type: "2",
        })
        .then((res) => {
          if (res.flag == true) {
            ElMessage.success("已成功将该用户解封");
          } else {
            ElMessage.error("解封失败");
          }
        });
        })
    },
    changeName(row, index) {
      // console.log(row.id)//row.id为该行的id
      console.log(row + "," + index);
      this.$prompt("您正在修改用户‘" + row.nickname + "’的昵称", "修改昵称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          //修改用户put请求
          apiFun
            .updateUser({
              id: row.id,
              nickname: value,
            })
            .then((res) => {
              if (res.flag == true) {
                this.$message({
                  type: "success",
                  message: "成功修改该用户昵称",
                });
                this.getAll();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
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