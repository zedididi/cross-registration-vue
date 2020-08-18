<template>
  <div class="container">
    <p>注册中心</p>
    <div class="certification">
      <el-timeline>
        <el-timeline-item placement="top">
          <el-card>
            <h4>填写信息</h4>
            <el-form
              :model="formData"
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="studentForm"
            >
              <el-form-item label="账号" prop="account">
                <el-input v-model="formData.account" placeholder="请输入账号" clearable type="number"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <!-- <el-form-item label="学号" prop="workNumber">
                <el-input v-model="formData.workNumber" placeholder="请输入学号"></el-input>
              </el-form-item>
              <el-form-item label="入学时间" required>
                <el-col :span="11">
                  <el-form-item prop="date">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="formData.date"
                      style="width: 100%;"
                    >></el-date-picker>
                  </el-form-item>
              </el-col>-->

              <!-- <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker
                      placeholder="选择时间"
                      v-model="ruleForm.date2"
                      style="width: 100%;"
                      format="HH:mm"
                      value-format="HH:mm"
                    ></el-time-picker>
                  </el-form-item>
              </el-col>-->
              <!-- </el-form-item> -->

              <!-- <el-form-item label="大学" prop="university">
                <el-select v-model="formData.university" placeholder="请选择大学">
                  <el-option
                    label="南昌大学"
                    value="0"
                    v-for="(item,index) in university"
                    :key="index"
                  >{{item}}</el-option>
                </el-select>
              </el-form-item>-->

              <!-- <div class="academy">
                <el-form-item label="学院" prop="academy">
                  <el-select v-model="formData.academy" placeholder="请选择学院">
                    <el-option
                      label="人文学院"
                      value="0"
                      v-for="(item,index) in academy"
                      :key="index"
                    >{{item}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                  <el-select v-model="formData.major" placeholder="请选择专业">
                    <el-option
                      label="中文系"
                      value="0"
                      v-for="(item,index) in major"
                      :key="index"
                    >{{item}}</el-option>
                  </el-select>
                </el-form-item>
              </div>-->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { post } from "../api/index.js"
import { isPhone } from '../util/util'


export default {
  data() {

    var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入账号'));
        }
        setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
            if (!isPhone(value)) {
              callback(new Error('账号错误'));
            } else {
              callback();
            }
     //     }
        }, 1000);
      };


    return {
      formData: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.formData);

      this.$refs[formName].validate(valid => {
        if (valid) {

            //向后台请求注册
          post("/api/account/auth/register", {
            account: this.formData.account,
            password: this.formData.password,
            roleId: 1
          }).then(res => {
              console.log(res)

              //注册成功，转向登录页面
              if( res.code == 200) {
                  this.$router.push({ path:"/Login" });
              }
              else {
                  alert(res.message)
              }
            //   else if (res.code == 10004) {
            //       alert(res.message)
            //   }

          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 60px;
  }

  .certification {
    width: 50%;
    align-items: center;

    .el-form {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .academy {
        display: flex;
      }
    }
  }
}
</style>