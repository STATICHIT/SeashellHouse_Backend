import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  }, {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/test",
        name: "test",
        meta: {
          title: 'test'
        },
        component: () => import("../views/test.vue")
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '系统首页'
        },
        component: () => import("../views/Dashboard.vue")
      }, {
        path: "/table",
        name: "basetable",
        meta: {
          title: '表格'
        },
        component: () => import("../views/BaseTable.vue")
      }, {
        path: "/charts",
        name: "basecharts",
        meta: {
          title: '图表'
        },
        component: () => import("../views/BaseCharts.vue")
      }, {
        path: "/form",
        name: "baseform",
        meta: {
          title: '表单'
        },
        component: () => import("../views/BaseForm.vue")
      }, {
        path: "/newHouse",
        name: "newHouse",
        meta: {
          title: '新增楼盘'
        },
        component: () => import("../views/AddHouse.vue"),
        children:[
          {
            path: "/add1",
            component: () => import("../views/Add1.vue")
          },
          {
            path: "/add2",
            component: () => import("../views/Add2.vue")
          },
          {
            path: "/add3",
            component: () => import("../views/Add3.vue")
          },
        ]
      }
      , {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: 'tab标签'
        },
        component: () => import("../views/Tabs.vue")
      }, {
        path: "/permission",
        name: "permission",
        meta: {
          title: '权限管理',
          permission: true
        },
        component: () => import("../views/Permission.vue")
      }, {
        path: "/i18n",
        name: "i18n",
        meta: {
          title: '国际化语言'
        },
        component: () => import("../views/I18n.vue")
      }, {
        path: "/upload",
        name: "upload",
        meta: {
          title: '上传插件'
        },
        component: () => import("../views/Upload.vue")
      }, {
        path: "/icon",
        name: "icon",
        meta: {
          title: '自定义图标'
        },
        component: () => import("../views/Icon.vue")
      }, {
        path: '/404',
        name: '404',
        meta: {
          title: '找不到页面'
        },
        component: () => import("../views/404.vue")
      }, {
        path: '/403',
        name: '403',
        meta: {
          title: '没有权限'
        },
        component: () => import("../views/403.vue")
      }, {
        path: '/user',
        name: 'user',
        meta: {
          title: '个人中心'
        },
        component: () => import('../views/User.vue')
      }, {
        path: '/editor',
        name: 'editor',
        meta: {
          title: '富文本编辑器'
        },
        component: () => import('../views/Editor.vue')
      },
      {
        path: '/userTable',
        name: 'userTable',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/UserTable.vue')
      },
      {
        path: '/bookTable',
        name: 'bookTable',
        meta: {
          title: '预约管理',
          permission:true
        },
        component: () => import('../views/BookTable.vue')
      },
      {
        path: '/workerTable',
        name: 'workerTable',
        meta: {
          title: '业务员管理',
          permission:true
        },
        component: () => import('../views/WorkerTable.vue')
      },
      {
        path: '/entrustTable',
        name: 'entrustTable',
        meta: {
          title: '委托管理'
        },
        component: () => import('../views/EntrustTable.vue')
      },
      {
        path: '/secondTable',
        name: 'secondTable',
        meta: {
          title: '二手房管理'
        },
        component: () => import('../views/SecondTable.vue')
      },
      {
        path: '/houseTable',
        name: 'houseTable',
        meta: {
          title: '新房管理'
        },
        component: () => import('../views/HouseTable.vue')
      },
      {
        path: '/rentTable',
        name: 'rentTable',
        meta: {
          title: '出租房管理'
        },
        component: () => import('../views/RentTable.vue')
      },
      {
        path: '/addWorker',
        name: 'addWorker',
        meta: {
          title: '添加业务员',
          permission:true
        },
        component: () => import('../views/AddWorker.vue')
      },
      {
        path: '/homepage',
        name: 'homepage',
        meta: {
          title: '首页推荐设置',
          permission:true
        },
        component: () => import('../views/Homepage.vue')
      },
    ]
  }, {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import("../views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403');
  } else if (to.meta.addWorker) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403');
  } else if (to.meta.workerTable) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403');
  } 
   else {
    next();
  }
});

export default router;