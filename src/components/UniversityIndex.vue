<template>
  <div id="UserIndex" class="container">
    <el-container>
      <el-header class="el-header">
        <div class="logo">
          <img src="../assets/logo.png" />
          <p>跨校选课系统UNIVERSITY</p>
        </div>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <!-- <el-menu-item index="1">
            <router-link to="/UserCenter" class="router-link">
              <i class="el-icon-user-solid"></i>用户中心
            </router-link>
          </el-menu-item> -->

          <el-menu-item index="1">
            <!-- <i class="el-icon-s-management"></i> -->
            <!-- <span slot="title">选课中心</span> -->
            <router-link to="/UniversityIndex/ManageCourse" class="router-link">
              <i class="el-icon-s-management"></i>课程管理
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <!-- <i class="el-icon-menu"></i> -->
            <router-link to="/UniversityIndex/ManageUser" class="router-link">
              <i class="el-icon-menu"></i>用户管理
            </router-link>
            <!-- <span slot="title">我的课程</span> -->
          </el-menu-item>
         <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-operation"/>账号</template>
            <el-menu-item index="4-1">
             <router-link to="/Certifica" class="router-link">
             实名认证
            </router-link></el-menu-item>
            <el-menu-item index="/">注销</el-menu-item>
            <!-- <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item> -->
            <!-- <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          </el-submenu>
      <!--      <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>-->

          <!-- <el-submenu index="4">
            <template slot="title">账号</template>
            <el-menu-item index="2-1">更换账号</el-menu-item>
            <el-menu-item index="/">注销</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <p>create by Mr Liu</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// import SelectCourse from '@/components/SelectCourse'
import Login from "@/components/Login";

// import VueRouter from 'vue-router'
// import Vue from 'vue'

// Vue.use(VueRouter);

// const routes = [
//   { path: '/SelectCourse', component: SelectCourse },
// //   { path: '/bar', component: Bar }
// ]

// const router = new VueRouter({
//   routes // (缩写) 相当于 routes: routes
// })

// const app = new Vue({
//   router
// }).$mount('#UserIndex')

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "0"
    };
  },
  components: {
    //   SelectCourse,
    Login
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key.trim() == "/"){
this.$router.push({ path: key });
      }
      
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  width: 100%;
}

.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 2px solid #333;
}

.router-link {
  text-decoration: none;
}

.a {
  text-decoration: none;
}

.el-header > .logo {
  display: flex;
  align-items: center;
}

.logo > img {
  height: 60px;
  height: 60px;
}

.el-aside {
  /* background-color: #909399; */
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #28323b; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  width: 100%;
}

.el-footer {
  /* background-color: #909399; */
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>