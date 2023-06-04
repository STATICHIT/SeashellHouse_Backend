<template>
  <div>
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
          <el-table-column fixed prop="id" label="编号" width="100" />
          <el-table-column prop="user" label="用户id" width="150" />
          <el-table-column prop="name" label="客户姓名" width="150" />
          <el-table-column prop="phone" label="客户电话" width="200" />
          <el-table-column
            prop="cost"
            label="预期房屋价格（W）/租房租金（元/月）"
            width="300"
          />
          <el-table-column prop="type" label="租赁方式" width="150" />
          <el-table-column prop="city" label="城市" width="200" />
          <el-table-column prop="block" label="小区" width="200" />
          <el-table-column prop="area" label="地址" width="200" />
          <el-table-column fixed="right" label="操作" width="280">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                v-if="scope.row.state2 == 1"
                @click="ok(scope.row, scope.$index)"
                >通过</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                v-if="scope.row.state2 == 1"
                @click="no(scope.row, scope.$index)"
                >否决</el-button
              >
              <el-button
                link
                type="success"
                size="small"
                v-if="scope.row.state2 == 2"
                >已通过</el-button
              >
              <el-button
                link
                type="danger"
                size="small"
                v-if="scope.row.state2 == 3"
                >已否决</el-button
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
        .getAllEntrusts({
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
    // 通过审核
    ok(row, index) {
      this.$confirm("是否将通过此委托?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        apiFun
          .dealEntrust({
            id: row.id,
            type: "1",
          })
          .then((res) => {
            if (res.flag == true) {
              ElMessage.success("已通过该用户委托，该用户消息列表将收到提示，请及时主动联系该用户进行详细信息核对以及发布");
              this.getAll();
            } else {
              ElMessage.error("操作失败");
            }
          });
      });
    },
    //否决
    no(row, index) {
      this.$confirm("是否否决此委托", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        apiFun
          .dealEntrust({
            id: row.id,
            type: "2",
          })
          .then((res) => {
            if (res.flag == true) {
              ElMessage.success("已否决该用户委托，该用户消息列表将收到提示");
              this.getAll();
            } else {
              ElMessage.error("操作失败");
            }
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