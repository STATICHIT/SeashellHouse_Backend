<template>
  <div>
    <div>
      <div class="">
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              ><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="container">
          <el-tabs v-model="message">
            <el-tab-pane
              :label="`未读消息(${state.unread.length})`"
              name="first"
            >
              <el-table
                :data="state.unread"
                :show-header="false"
                style="width: 100%"
              >
                <el-table-column>
                  <template #default="scope">
                    <span class="message-title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="date" width="180"></el-table-column>
                <el-table-column width="120">
                  <template #default="scope">
                    <el-button size="small" @click="handleRead(scope.$index)"
                      >标为已读</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="handle-row">
                <el-button type="primary">全部标为已读</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane
              :label="`已读消息(${state.read.length})`"
              name="second"
            >
              <template v-if="message === 'second'">
                <el-table
                  :data="state.read"
                  :show-header="false"
                  style="width: 100%"
                >
                  <el-table-column>
                    <template #default="scope">
                      <span class="message-title">{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" width="150"></el-table-column>
                  <el-table-column width="120">
                    <template #default="scope">
                      <el-button type="danger" @click="handleDel(scope.$index)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="handle-row">
                  <el-button type="danger">删除全部</el-button>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane
              :label="`回收站(${state.recycle.length})`"
              name="third"
            >
              <template v-if="message === 'third'">
                <el-table
                  :data="state.recycle"
                  :show-header="false"
                  style="width: 100%"
                >
                  <el-table-column>
                    <template #default="scope">
                      <span class="message-title">{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" width="150"></el-table-column>
                  <el-table-column width="120">
                    <template #default="scope">
                      <el-button @click="handleRestore(scope.$index)"
                        >还原</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <div class="handle-row">
                  <el-button type="danger">清空回收站</el-button>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      message:"first",
      state: {
        unread: [
          {
            date: "2022-12-25 20:00:00",
            title: "用户101已提交委托，请及时处理，联系方式为12893627960",
          },
          {
            date: "2022-04-19 21:00:00",
            title: "今晚12点整发大红包，先到先得",
          },
        ],
        read: [
          {
            date: "2018-04-19 20:00:00",
            title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          },
        ],
        recycle: [
          {
            date: "2018-04-19 20:00:00",
            title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          },
        ],
      },
    };
  },
  methods: {
    handleRead(index) {
      const item = this.state.unread.splice(index, 1);
      console.log(item);
      this.state.read = item.concat(this.state.read);
    },
    handleDel(index) {
      const item = this.state.read.splice(index, 1);
      this.state.recycle = item.concat(this.state.recycle);
    },
    handleRestore(index) {
      const item = this.state.recycle.splice(index, 1);
      this.state.read = item.concat(this.state.read);
    },
  },
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>

