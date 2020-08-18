<template>
  <div class="container">
    <div class="input-container">
      <img src="../assets/logo.png" />
      <p>跨校选课平台</p>
      <div class="input">
        <p>账号：</p>
        <div class="input-item">
          <el-input class="account" v-model="account" maxlength="20" placeholder="请输入内容" clearable type="number" />
        </div>
      </div>
      <div class="input">
        <p>密码：</p>
        <div class="input-item">
          <el-input
            class="password"
            v-model="password"
            maxlength="30"
            show-password
            placeholder="请输入内容"
            clearable
          />
        </div>
      </div>
    </div>

    <div class="radio">
      <el-radio v-model="roleId" label="1">学生</el-radio>
      <el-radio v-model="roleId" label="2">老师</el-radio>
      <el-radio v-model="roleId" label="3">教务处</el-radio>
      <el-radio v-model="roleId" label="4">管理员</el-radio>
    </div>

    <div class="button">
      <el-button type="primary" @click="onSubmit" round>登录</el-button>
      <el-button type="info" @click="toRegister" round>注册</el-button>
      <el-button type="text" round>忘记密码</el-button>
    </div>
  </div>
</template>

<script>

import { post } from "../api/index.js";

export default {
  data() {
    return {
      account: "",
      password: "",
      roleId: "",
    };
  },
  methods: {

    onSubmit(e) {

      console.log(this.account + " | " + this.password + " | " + this.roleId);

      if (
        this.account.length == 0 ||
        this.password.length == 0 ||
        this.roleId == 0
      ) {

         this.$message({
            message: "请填写完整数据o(╥﹏╥)o",
            type: "danger"
          });
   //     alert("请填写完整数据！")
        return;
      }

      post("/api/account/auth/login", {
        account: this.account,
        password: this.password,
        roleId: this.roleId
      })
        .then(res => {
          console.log("登录成功", res);
          if (res.code == 200) {

            //设置token
            window.sessionStorage.setItem('tokenStr',res.data)

            //存储account
            window.sessionStorage.setItem('account',this.account)


            //跳转到对应页面
            switch (this.roleId) {
              case "1":
                this.$router.push({ path: "/UserIndex" });
                //    localStorage.student_id=this.id;
                break;
              case "2":
                this.$router.push({ path: "/TeacherIndex" });
                //    localStorage.teacher_id=this.id;
                break;
              case "3":
                this.$router.push({ path: "/UniversityIndex" });
                //    localStorage.teacher_id=this.id;
                break;
              case "4":
                this.$router.push({ path: "/AdminIndex" });
                //    localStorage.admin_id=this.id;
                break;
            }
          } else {

           this.$message({
            message: res.message+"o(╥﹏╥)o",
            type: "danger"
          });

          }
        })
        .catch(err => {
          this.$message({
            message:"系统出现问题，请稍后o(╥﹏╥)o",
            type: "danger"
          });
       //   console.log("登录失败！", err);
        });
    },
    toRegister(){
      this.$router.push({ path: "/Register" });
    }
  }
};
</script>

<style  scoped>
.container {
  /* height: 100%; */
  width: 50%;
  margin-left: 25%;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

img {
  /* padding-left: 35%;
    width: 30%;
    height: 30%; */
  align-self: center;
}

.input-container > p {
  font-size: 40px;
  /* padding-left: 20%; */
  align-self: center;
}

.input {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.input > p {
  text-align: center;
}

.input-item {
  flex-grow: 1;
  /* display: flex;
    flex-shrink:1;
     flex-direction: column;
    justify-content: space-around; */
}

.radio {
  margin: 20px 20px 0 20px;
  display: flex;
  justify-content: space-around;
}
.button {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>