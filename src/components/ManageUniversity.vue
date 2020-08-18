<template>
  <div class="container">
    <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
    <div class="left">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>大学查询</h4>
              <el-input placeholder="请输入用户名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>添加大学</h4>
              <el-form
                :model="universityFormData"
                :rules="rules"
                ref="universityFormData"
                label-width="80px"
                class="coursesForm"
              >
                <el-form-item label="大学" prop="name">
                  <el-input v-model="universityFormData.name" placeholder="请输入大学" clearable></el-input>
                </el-form-item>
                <el-form-item label="电子邮件" prop="email">
                  <el-input v-model="universityFormData.email" placeholder="请输入电子邮件" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phoneNumber">
                  <el-input
                    v-model.number="universityFormData.phoneNumber"
                    placeholder="请输入联系电话"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                  <el-input v-model="universityFormData.address" placeholder="请输入地址" clearable></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('universityFormData')">立即添加</el-button>
                  <el-button @click="resetForm('universityFormData')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="right">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="universityData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column type="index" :index="indexMethod" fixed></el-table-column>
        <el-table-column prop="id" label="id" fixed width="100"></el-table-column>
        <el-table-column prop="name" label="大学名" width="120"></el-table-column>
        <el-table-column prop="phoneNumber" sortable label="联系电话" width="120"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClickSelect(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClickUpdate(scope.row)" type="primary" size="small">修改</el-button>
            <el-tooltip
              content="删除这门课程？"
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

      <el-dialog title="大学信息" :visible.sync="dialogFormVisibleSelect">
        <el-card>
          <div class="el-card-col">
            <p class="title">大学:</p>
            <p class="content">{{selectData.name}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">联系电话:</p>
            <p class="content">{{selectData.phoneNumber}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">电子邮箱:</p>
            <p class="content">{{selectData.email}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">地址:</p>
            <p class="content">{{selectData.address}}</p>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisibleSelect = false">确 定</el-button>
          <el-button @click="dialogFormVisibleSelect = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="大学信息" :visible.sync="dialogFormVisibleUpdate">
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
            <el-form-item label="大学" prop="name">
              <el-input v-model="updateData.name" placeholder="请输入大学" clearable></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="updateData.email" placeholder="请输入电子邮件" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNumber">
              <el-input v-model.number="updateData.phoneNumber" placeholder="请输入联系电话" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="updateData.address" placeholder="请输入地址" clearable></el-input>
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
import { post } from "../api/index.js";
import { isPhone } from "../util/util";
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
 //     name: "liudaxia",
      searchName: "",
      universityFormData: {
        name: "",
        email: "",
        phoneNumber: "",
        address: ""
      },
      updateData: {
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        address: ""
      },
      selectData: {
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        address: ""
      },
      universityData: [],
      loading: false,

      // 增加课程 表单项设置
      ruleForm: {
        Title: "",
        Number: "",
        Introduction: ""
      },
      // 修改时课程信息 表单项设置
      //   updateForm: {
      //     Id: "",
      //     Title: "",
      //     Introduction: ""
      //   },
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入大学名", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            type: "number",
            message: "请输入正确的联系电话",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" }
          //   { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ]
      },
      dialogFormVisibleSelect: false,
      dialogFormVisibleUpdate: false,
      formLabelWidth: "6em"
    };
  },
  mounted() {
    // 获取初始数据
    //1. 获取大学数据
       this.getUniversity()
    //  this.getMenuList()
    //    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    // 实现添加功能
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("universityFormData:", this.universityFormData);

          // 表单验证成功
          //   var strData = {
          //     Title: this.ruleForm.Title,
          //     Introduction: this.ruleForm.Introduction
          //   };

          post("/api/account/university/add", {
            name: this.universityFormData.name,
            email: this.universityFormData.email,
            phoneNumber: this.universityFormData.phoneNumber,
            address: this.universityFormData.address
          }).then(res => {
            //      this.$message.error();
            console.log("add submitForm: ", res);
            if (res.code == 200) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
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
       console.log(index, row);
      this.$confirm("此操作将删除该课程所有信息, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
            post("/api/account/university/delete/id",{
                id: row.id
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  message: "删除成功(*￣︶￣)，",
                  type: "success"
                });
                this.getUniversity();
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

    //查看大学信息
    handleClickSelect(row) {
      // 数据回显
      console.log(row);
      // this.resetForm(updateForm);
      this.selectData.id = row.id;
      this.selectData.name = row.name;
      this.selectData.email = row.email;
      this.selectData.phoneNumber = row.phoneNumber;
      this.selectData.address = row.address;
      this.dialogFormVisibleSelect = true;
    },

    //点击更新大学信息
    handleClickUpdate(row) {
      // 数据回显
      console.log(row);
      // this.resetForm(updateForm);
      this.updateData.id = row.id;
      this.updateData.name = row.name;
      this.updateData.email = row.email;
      this.updateData.phoneNumber = row.phoneNumber;
      this.updateData.address = row.address;
      this.dialogFormVisibleUpdate = true;
    },

    // 提交修改
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("updateData:", this.updateData);

          this.dialogFormVisibleUpdate = false;
          //  改变post的编码格式，适应后台  修改！
          post("/api/account/university/update", this.updateData)
            .then(res => {
              if (res.code == 200) {
                this.$notify({
                  id: "",
                  title: "修改成功",
                  message: "信息已修改完成！请查看",
                  type: "success"
                });
                this.getUniversity();
                //           this.getAllcourses();
              } else {
                this.$message({
                  message: res.message,
                  type: "danger"
                });
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

    // 查验简介是否为空
    checkNull(row, column) {
      // console.log(row)
      return row.Introduction == null
        ? "该课程暂无介绍信息 ￣□￣｜｜"
        : row.Introduction;
    },

    //获取大学信息
    getUniversity() {
      post("/api/account/university/select/all").then(res => {
        console.log("university", res);
        if (res.code == 200) {
          this.universityData = res.data;
          this.loading = false;
        } else {
          this.$message({
            message: "大学获取失败o(╥﹏╥)o",
            type: "danger"
          });
        }
      });
    }
  }
}
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