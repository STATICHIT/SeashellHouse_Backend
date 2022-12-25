<template>
  <div>
    <div>
      <div>
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-cascades"></i> 业务员管理
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="id" label="账号" width="260" />
          <el-table-column prop="name" label="账户名称" width="260" />
          <el-table-column prop="avatar" label="头像" width="260">
            <template #default="scope">
              <img :src="scope.row.avatar" width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column prop="state" label="身份" width="260" />
          <el-table-column fixed="right" label="操作" width="280">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="changeWorker(scope.row, scope.$index)"
                >修改资料</el-button
              >
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
    <!-- 弹窗要素 -->
    <div>
      <el-dialog
        v-model="centerDialogVisible"
        title="修改业务员资料"
        width="30%"
        align-center
      >
        昵称：<el-input v-model="newData.name"></el-input> 密码：<el-input
          v-model="newData.password"
          placeholder="请输入新的密码"
        ></el-input>
        身份：<el-input v-model="newData.state"></el-input>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="change"> 好的 </el-button>
          </span>
        </template>
      </el-dialog>
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
      //弹窗要素
      current: [],
      centerDialogVisible: false,
      newData: {
        name: null,
        password: null,
        state: null,
      },
    };
  },
  methods: {
    getAll() {
      apiFun
        .getAllWorkers({
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
    dealWorker(row, index) {
      // console.log(row );
      this.$confirm('是否删除该业务员账号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiFun
        .dealWorker({
          id: row.id,
          type: "1",
        })
        .then((res) => {
          if (res.flag == true) {
            this.tableData.splice(index, 1); //从列表中移除
            ElMessage.success("已成功删除该业务员账号");
          } else {
            ElMessage.error("删除失败");
          }
        });
        })
    },
    changeWorker(row, index) {
      //弹窗要素
      this.current = row;
      console.log(this.current);
      this.newData.name = row.name;
      this.newData.state = row.state;
      this.centerDialogVisible = true;
    },
    change() {
      // 确定修改
      apiFun
        .updateWorker({
          id: this.current.id,
          name: this.newData.name,
          password: this.newData.password,
          state: this.newData.state,
        })
        .then((res) => {
          if (res.flag == true) {
            this.$message({
              type: "success",
              message: "成功修改该业务员信息",
            });
            this.centerDialogVisible = false;
            //改完之后要刷新下数据，重新加载列表
            this.getAll();
          }
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