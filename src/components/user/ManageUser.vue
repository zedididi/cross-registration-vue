<template>
  <div class="container">
    <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
    <div class="left">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>用户查询</h4>
              <el-input placeholder="请输入用户名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>添加用户</h4>
              <el-form
                :model="userFormData"
                :rules="rules"
                ref="userFormData"
                label-width="80px"
                class="coursesForm"
              >
                <el-form-item label="账号" prop="account">
                  <el-input
                    v-model="userFormData.account"
                    placeholder="请输入账号"
                    clearable
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="userFormData.password"
                    placeholder="请输入密码"
                    clearable
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="userFormData.name" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phoneNumber">
                  <el-input
                    v-model.number="userFormData.phoneNumber"
                    placeholder="请输入联系电话"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户身份" prop="roleId">
                  <el-select v-model="userFormData.roleId" placeholder="请选择用户身份">
                    <el-option
                      v-for="item in roleData"
                      :label="item.roleNameZh"
                      :value="item.id"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="大学" prop="universityId">
                  <el-select v-model="userFormData.universityId" placeholder="请选择大学">
                    <el-option
                      v-for="item in universityData"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="right">
      <el-tabs v-model="roleId" type="card" @tab-click="handleClick">
        <!-- <el-tabs type="border-card"> -->
        <el-tab-pane label="学生" name="1"></el-tab-pane>
        <el-tab-pane label="老师" name="2"></el-tab-pane>
        <el-tab-pane label="教务处" name="3"></el-tab-pane>
      </el-tabs>

      <el-table
        v-show="roleId == 1"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="studentData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column type="index" :index="indexMethod" fixed></el-table-column>
        <el-table-column prop="id" label="id" fixed width="100"></el-table-column>
        <!-- <el-table-column prop="accountId" label="账户" fixed width="100"></el-table-column> -->
        <!-- <el-table-column prop="password" label="密码" width="120"></el-table-column> -->
        <el-table-column prop="name" label="用户名" width="120"></el-table-column>
        <!-- <el-table-column prop="roleId" sortable label="角色" width="100" :formatter="formatterRole"></el-table-column>-->
        <el-table-column
          prop="universityId"
          sortable
          label="大学"
          width="120"
          :formatter="formatterUniversity"
        ></el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClickSelect(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClickUpdate(scope.row)" type="primary" size="small">修改</el-button>
            <el-tooltip
              content="删除此人信息？"
              placement="top"
              effect="light"
              :hide-after="1000"
              :enterable="false"
            >
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-show="roleId == 2"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="teacherData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column type="index" :index="indexMethod" fixed></el-table-column>
        <el-table-column prop="id" label="id" fixed width="100"></el-table-column>
        <!-- <el-table-column prop="accountId" label="账户1" fixed width="100"></el-table-column> -->
        <!-- <el-table-column prop="password" label="密码1" width="120"></el-table-column> -->
        <el-table-column prop="name" label="用户名" width="120"></el-table-column>
        <!-- <el-table-column prop="roleId" sortable label="角色" width="100"></el-table-column> -->
        <el-table-column prop="universityId" sortable label="大学" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClickSelect(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClickUpdate(scope.row)" type="primary" size="small">修改</el-button>
            <el-tooltip
              content="删除此人信息？"
              placement="top"
              effect="light"
              :hide-after="1000"
              :enterable="false"
            >
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-show="roleId == 3"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="officeUniversityData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column type="index" :index="indexMethod" fixed></el-table-column>
        <!-- <el-table-column prop="Id" label="课程名" fixed width="150"></el-table-column> -->
        <el-table-column prop="id" label="id" fixed width="100"></el-table-column>
        <!-- <el-table-column prop="password" label="密码1" width="120"></el-table-column> -->
        <el-table-column prop="name" label="用户名" width="120"></el-table-column>
        <!-- <el-table-column prop="roleId" sortable label="角色" width="100"></el-table-column> -->
        <el-table-column prop="universityId" sortable label="大学" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClickSelect(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClickUpdate(scope.row)" type="primary" size="small">修改</el-button>
            <el-tooltip
              content="删除此人信息？"
              placement="top"
              effect="light"
              :hide-after="1000"
              :enterable="false"
            >
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                plain
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="用户信息" :visible.sync="dialogFormVisibleSelect">
        <el-card>
          <!-- <div class="title">
                  <h3>个人信息</h3>
          </div>-->
          <!-- <div class="el-card-col">
                  <p class="title">名字:</p>
                  <p class="content">{{name}}</p>
          </div>-->
          <div class="el-card-col">
            <p class="title">id:</p>
            <p class="content">{{selectData.id}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">用户名:</p>
            <p class="content">{{selectData.name}}</p>
          </div>
          <!--  <div class="el-card-col">
             <p class="title">账户:</p>
            <p class="content">{{studentData[0].account}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">密码:</p>
            <p class="content">{{studentData[0].password}}</p>
          </div>-->
          <div class="el-card-col">
            <p class="title">大学:</p>
            <p class="content">{{selectData.university}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">联系电话:</p>
            <p class="content">{{selectData.phoneNumber}}</p>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisibleSelect = false">确 定</el-button>
          <el-button @click="dialogFormVisibleSelect = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="用户信息" :visible.sync="dialogFormVisibleUpdate">
        <el-card>
          <div class="title">
            <h3>修改信息</h3>
          </div>

          <el-form
            :model="updateData"
            :rules="rules"
            ref="updateData"
            label-width="80px"
            class="coursesForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="updateData.name" placeholder="请输入用户名" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="电子邮件" prop="email">
              <el-input v-model="updateData.email" placeholder="请输入电子邮件" clearable></el-input>
            </el-form-item>-->
            <el-form-item label="联系电话" prop="phoneNumber">
              <el-input v-model.number="updateData.phoneNumber" placeholder="请输入联系电话" clearable></el-input>
            </el-form-item>
            <el-form-item label="大学" prop="universityId">
              <el-select v-model="updateData.universityId" placeholder="请选择大学">
                <el-option
                  v-for="item in universityData"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateForm('updateData')">立即修改</el-button>
              <el-button @click="dialogFormVisibleUpdate = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { post } from "../../api/index.js";
import { isPhone } from "../../util/util";
import qs from "qs";

export default {
  //  name: "course",
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      }
      setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        if (!isPhone(value)) {
          callback(new Error("账号错误"));
        } else {
          callback();
        }
        //     }
      }, 1000);
    };

    return {
      //
      searchName: "",
      userFormData: {
        account: "",
        password: "",
        roleId: "",
        name: "",
        universityId: "",
        phoneNumber: "",
        content: ""
      },
      roleId: "1",
      roleData: [],
      universityData: [],
      studentData: [],
      teacherData: [],
      officeUniversityData: [],
      userData: [],
      updateData: {
        name: "",
        universityId: "",
        university: "",
        id: "",
        phoneNumber: "",
        accountId: ""
      },
      selectData: {
        account: "",
        password: "",
        roleId: 0,
        name: "",
        university: "",
        phoneNumber: "",
        content: "",
        id: ""
      },
      loading: false,
      activeName: "student",
      // 增加课程 表单项设置
      ruleForm: {
        Title: "",
        Number: "",
        Introduction: ""
      },
      // 修改时课程信息 表单项设置
      // updateForm: {
      //   Id: "",
      //   Title: "",
      //   Introduction: "",
      //   roleId: "",
      // },
      // 校验规则
      rules: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择身份", trigger: "blur" }],
        universityId: [
          { required: true, message: "请选择大学", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            type: "number",
            message: "请输入正确的联系电话",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "change" }
          // { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ],

        Introduction: [
          {
            required: false,
            message: "可以填写用户详细信息",
            trigger: "change"
          }
        ]
      },
      dialogFormVisibleSelect: false,
      dialogFormVisibleUpdate: false,
      formLabelWidth: "6em"
    };
  },
  mounted() {
    // 获取初始数据
    //1. 获取角色数据
    post("/api/account/role/allExId", {
      id: 4
    }).then(res => {
      console.log("role", res);
      this.roleData = res.data;
    });

    //2. 获取大学数据
    post("/api/account/university/select/all").then(res => {
      console.log("university", res);
      this.universityData = res.data;
    });

    //3. 获取用户数据
    //3.1 获取学生信息
    this.getStudent();
    //3.2 获取老师信息
    this.getTeacher();
    //3.3 获取教务处信息
    this.getOfficeUn();

    //  this.getMenuList()
    //    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    // 实现添加功能
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("userFormData:", this.userFormData);

          // 表单验证成功
          // var strData = {
          //   Title: this.ruleForm.Title,
          //   Introduction: this.ruleForm.Introduction
          // };

          post("/api/account/user/add", {
            account: this.userFormData.account,
            password: this.userFormData.password,
            roleId: this.userFormData.roleId,
            name: this.userFormData.name,
            universityId: this.userFormData.universityId,
            phoneNumber: this.userFormData.phoneNumber
          }).then(res => {
            console.log("add submitForm: ", res);
            if (res.code == 200) {
              switch (this.userFormData.roleId) {
                case 1:
                  this.getStudent();
                  break;
                case 2:
                  this.getTeacher();
                  break;
                case 3:
                  this.getOfficeUn();
                  break;
              }

              userFormData.account = "";
              userFormData.password = "";
              userFormData.roleId = "";
              userFormData.name = "";
              userFormData.universityId = "";
              userFormData.phoneNumber = "";
              this.$message({
                message: "添加成功(*￣︶￣)，",
                type: "success"
              });
            } else {
              this.$message({
                message: res.message + "o(╥﹏╥)o",
                type: "danger"
              });
            }
          });
        } else {
          this.$message.error("阁下填写不完整喔！刘大侠我快马加鞭前来提示！");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //为表格添加序号
    indexMethod(index) {
      return index + 1;
    },

    // 实现删除功能
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将删除该用户所有信息, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          post("/api/account/user/delete/user", {
            accountId: row.accountId
          })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  message: "删除成功(*￣︶￣)，",
                  type: "success"
                });
                if (this.roleId == 1) {
                  this.getStudent();
                } else if (this.roleId == 2) {
                  this.getTeacher();
                } else if (this.roleId == 3) {
                  this.getOfficeUn();
                }
              }
            })
            .catch(err => {
              this.$message({
                message: "删除失败o(╥﹏╥)o",
                type: "danger"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleClickSelect(row) {
      // 数据回显
      console.log(row);
      // this.resetForm(updateForm);
      this.selectData.name = row.name;
      this.selectData.phoneNumber = row.phoneNumber;
      this.selectData.university = this.getUniverSityName(row.universityId);
      // this.selectData.Title = row.Title;
      // this.selectData.Introduction = row.Introduction;
      this.selectData.id = row.id;
      this.dialogFormVisibleSelect = true;
    },

    handleClickUpdate(row) {
      // 数据回显
      console.log("handleClickUpdate row", row);
      // this.resetForm(updateForm);

      this.updateData.name = row.name;
      this.updateData.phoneNumber = row.phoneNumber;
      this.updateData.universityId = row.universityId;
      this.updateData.id = row.id;
      this.updateData.accountId = row.accountId;

      this.dialogFormVisibleUpdate = true;
    },

    formatterRole(row, column) {
      for (var j = 0, len = this.roleData.length; j < len; j++) {
        if (this.roleData[j].id == row.roleId) {
          return this.roleData[j].roleNameZh;
        }
      }
    },

    //table 学校信息处理显示
    formatterUniversity(row, column) {
      return this.getUniverSityName(row.universityId);
    },

    //根据id获取学校名
    getUniverSityName(universityId) {
      for (var j = 0, len = this.universityData.length; j < len; j++) {
        if (this.universityData[j].id == universityId) {
          return this.universityData[j].name;
        }
      }
    },

    // 提交修改
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // var updateData = {
          //   Id: this.updateForm.Id,
          //   Title: this.updateForm.Title,
          //   Introduction: this.updateForm.Introduction
          // };
          console.log("update", this.updateData);
          this.dialogFormVisibleUpdate = false;
          //  改变post的编码格式，适应后台  修改！
          var url = "/api/account/user/update/";
          if (this.roleId == 1) {
            url += "student";
          } else if (this.roleId == 2) {
            url += "teacher";
          } else if (this.roleId == 3) {
            url += "officeUn";
          }

          console.log("update url", url);
          post(url, {
            id: this.updateData.id,
            name: this.updateData.name,
            universityId: this.updateData.universityId,
            accountId: this.updateData.accountId,
            phoneNumber: this.updateData.phoneNumber
          })
            .then(res => {
              if (res.code == 200) {
                this.$notify({
                  id: "",
                  title: "修改成功",
                  message: "信息已修改完成！请查看",
                  type: "success"
                });
                if (this.roleId == 1) {
                  this.getStudent();
                } else if (this.roleId == 2) {
                  this.getTeacher();
                } else if (this.roleId == 3) {
                  this.getOfficeUn();
                }
              }
            })
            .catch(err => {
              this.$message({
                message: "添加失败o(╥﹏╥)o",
                type: "danger"
              });
            });
        } else {
          this.$message.error("阁下网络错误！刘大侠我快马加鞭前来提示！");
          return false;
        }
      });
    },
    handleClick(tab, event) {
      console.log("handleClick", tab, event);
    },
    // 查验简介是否为空
    checkNull(row, column) {
      // console.log(row)
      return row.Introduction == null
        ? "该课程暂无介绍信息 ￣□￣｜｜"
        : row.Introduction;
    },

    //获取学生信息
    getStudent() {
      post("/api/account/user/select/all", {
        roleId: 1
      }).then(res => {
        console.log("student", res);
        this.studentData = res.data;
      });
    },
    //获取老师信息
    getTeacher() {
      post("/api/account/user/select/all", {
        roleId: 2
      }).then(res => {
        console.log("teacher", res);
        this.teacherData = res.data;
      });
    },
    //获取教务处信息
    getOfficeUn() {
      post("/api/account/user/select/all", {
        roleId: 3
      }).then(res => {
        console.log("office university", res);
        this.officeUniversityData = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  margin-top: 20px;
  //   height: 42em;
  .left {
    width: 45%;
    padding-right: 5%;
    flex: 2;
    .searchName {
      width: 70%;
    }
    .menu {
      //   padding: 5% 10% 0 10%;
      h4 {
        margin: 0.2em;
        padding-bottom: 0.5em;
      }
      .stydentForm {
        .el-form-item__content {
          // margin: 0 !important;
          .el-input__suffix {
            right: 0 !important;
          }
          .el-input {
            width: 70%;
          }
        }
      }
    }
  }
  .right {
    width: 65%;
    flex: 3;
    text-align: center;
    .el-table {
      text-align: center !important;
      float: right;
      // padding: 5%
      margin: 2%;
    }
    .el-card {
      .title {
        display: flex;
        justify-content: space-around;
        align-items: center;
        // height: 60px;
        .el-button {
          height: 40px;
          width: 70px;
          padding: 0;
          font-size: 12px;
        }
        .p {
          font-size: 30px;
        }
      }

      .el-card-col {
        margin-left: 30px;
        display: flex;
        align-items: center;
        line-height: 10px;
        // justify-content: center;
        .title {
          font-size: 15px;
        }
        .content {
          font-size: 20px;
        }
        p {
          padding-right: 10px;
        }
      }
    }
    // background-color: lightpink;
  }
}
</style>