<template>
  <div>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 新房管理
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="id" label="房屋编号" width="80" />
        <el-table-column prop="cover" label="房屋图片" width="160" >
          <template #default="scope">
            <img :src="scope.row.cover" width="120" height="100" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="房屋简介" width="260" />
        <el-table-column prop="city" label="所在城市" width="150" />
        <el-table-column prop="area" label="地址" width="300" />
        <el-table-column prop="block" label="小区" width="150" />
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scope.row, scope.$index)"
              >修改资料</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="deleteUSer(scope.row, scope.$index)"
              >删除</el-button
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
      addMsg:"",
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
        .getAllRents({
          a1: this.pagination.currentPage,
          a2: this.pagination.pageSize,
          other: this.addMsg,
        })
        .then((res) => {
          this.pagination.pageSize = res.data.size;
          this.pagination.currentPage = res.data.current;
          this.pagination.total = res.data.total;
          this.tableData = res.data.records;
        });
    },
    // 封号
    deleteUSer(row, index) {
      // console.log(row );
      apiFun
        .dealUser({
          id: row.id,
          type:"1",
        })
        .then((res) => {
          if (res.flag == true) {
            this.tableData.splice(index, 1);//从列表中移除
            ElMessage.success("已成功将该用户封号");
          } else {
            ElMessage.error("封号失败");
          }
        });
    },
    handleClick(row, index) {
      // console.log(row.id)//row.id为该行的id
      console.log(row + "," + index);
  
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