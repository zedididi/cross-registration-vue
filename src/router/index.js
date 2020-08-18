import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SelectCourse from '@/components/select/SelectCourse'
import UserCenter from '@/components/UserCenter'
import MyCourse from '@/components/student/MyCourse'
import MyCourseT from '@/components/teacher/MyCourse'
import AdminIndex from "@/components/AdminIndex";
import TeacherIndex from "@/components/TeacherIndex";
import UserIndex from "@/components/UserIndex";
import UniversityIndex from "@/components/UniversityIndex";
import Certification from '@/components/Certification'
import ManageCourse from '@/components/course/ManageCourse'
import ManageUser from '@/components/user/ManageUser'
import IssueCourse from '@/components/course/IssueCourse'
import Register from '@/components/Register'
import ManageUniversity from '@/components/ManageUniversity'


Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    component: Login,
  },
  {
    path: '/Register',
    component: Register,
  },
  {
    path: '/UserIndex',
    component: UserIndex,
  //  redirect:'/UserCenter',
    children: [{
      path: '/UserIndex/SelectCourse',
      name: 'SelectCourse',
      component: SelectCourse
    }, {
      path: '/UserIndex/UserCenter',
      name: UserCenter,
      component: UserCenter,
    },{
      path: '/UserIndex/MyCourse',
      name: MyCourse,
      component: MyCourse,
    },{
      path: '/UserIndex/Certification',
      name: Certification,
      component: Certification,
    }]
  },
  {
    path: '/TeacherIndex',
    component: TeacherIndex,
    // redirect:'/UserCenter',
    children: [
    {
      path: '/TeacherIndex/MyCourseT',
      name: MyCourseT,
      component: MyCourseT,
    }
  ]
  },
  {
    path: '/UniversityIndex',
    component: UniversityIndex,
    // redirect:'/ManageCourse',
    children: [{
      path: '/UniversityIndex/ManageCourse',
      name: 'ManageCourse',
      component: ManageCourse
    }
    // , {
    //   path: '/UniversityIndex/ManageUniversity',
    //   name: ManageUniversity,
    //   component: ManageUniversity,
    // }
    ,{
      path: '/UniversityIndex/ManageUser',
      name: ManageUser,
      component: ManageUser,
    }]
  },
  {
    path: '/AdminIndex',
    component: AdminIndex,
    // redirect:'/ManageCourse',
    children: [{
      path: '/AdminIndex/IssueCourse',
      name: 'IssueCourse',
      component: IssueCourse
    }, {
      path: '/AdminIndex/UserCenter',
      name: UserCenter,
      component: UserCenter,
    },{
      path: '/AdminIndex/ManageUser',
      name: ManageUser,
      component: ManageUser,
    }, {
      path: '/AdminIndex/ManageUniversity',
      name: ManageUniversity,
      component: ManageUniversity,
    },]
  },
  {
    path: '/SelectCourse',
    component: SelectCourse
  }
]

const router = new Router({
  routes
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/Login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('tokenStr')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/Login')
  next()
})

export default router