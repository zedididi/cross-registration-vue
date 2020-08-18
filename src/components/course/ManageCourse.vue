<template>
  <div class="container">
    <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
    <div class="left">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>课程查询</h4>
              <el-input placeholder="请输入课程名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
          <el-timeline-item placement="top">
            <el-card>
              <h4>添加课程</h4>
              <el-form
                :model="addCourseData"
                :rules="rules"
                ref="addCourseData"
                label-width="80px"
                class="coursesForm"
              >
                <el-form-item label="课程名" prop="name">
                  <el-input v-model="addCourseData.name" placeholder="请输入课程名"></el-input>
                </el-form-item>
                <el-form-item label="最大人数" prop="maxCount">
                  <el-input v-model.number="addCourseData.maxCount" placeholder="请输入最大人数"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="credit">
                  <el-input v-model.number="addCourseData.credit" placeholder="请输入学分"></el-input>
                </el-form-item>
                <el-form-item label="大学" prop="universityId">
                  <el-select v-model="addCourseData.universityId" placeholder="请选择大学">
                    <el-option
                      v-for="item in universityData"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="老师" prop="teacherId">
                  <el-select v-model="addCourseData.teacherId" placeholder="请选择老师">
                    <el-option
                      v-for="item in teacherData"
                      :label="item.name"
                      :value="item.accountId"
                      :key="item.accountId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- <div class="academy"> -->
                <el-form-item label="学院" prop="academy">
                  <el-input v-model="addCourseData.academy" placeholder="请输入学院"></el-input>
                  <!-- <el-select v-model="addCourseData.academy" placeholder="请选择学院">
                      <el-option
                        v-for="(item,index) in academy"
                        :label="item"
                        :value="item"
                        :key="index"
                      ></el-option> 
                  </el-select>-->
                </el-form-item>
                <el-form-item label="专业" prop="major">
                  <el-input v-model="addCourseData.major" placeholder="请输入专业"></el-input>
                  <!-- <el-select v-model="addCourseData.major" placeholder="请选择专业">
                      <el-option
                        v-for="(item,index) in major"
                        :label="item"
                        :value="index"
                        :key="index"
                      ></el-option>
                  </el-select>-->
                </el-form-item>
                <el-form-item label="课程简介" prop="content">
                  <el-input
                    type="textarea"
                    v-model="addCourseData.content"
                    placeholder="请填写课程信息"
                    maxlength="50"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <!-- </div> -->
                <el-form-item>
                  <el-button type="primary" @click="submitForm('addCourseData')">立即添加</el-button>
                  <el-button @click="resetForm('addCourseData')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-timeline-item>
          <!-- <el-timeline-item placement="top">
            <el-card>
              <h4>
                created by©刘俊超 &nbsp;
                <span style="font-weight:100;font-size:0.7em">深自缄默，如云漂泊</span>
              </h4>
            </el-card>
          </el-timeline-item>-->
        </el-timeline>
      </div>
    </div>
    <div class="right">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="coursesData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
        border
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column type="index" :index="indexMethod" fixed></el-table-column>
        <el-table-column prop="id" label="id" fixed width="100"></el-table-column>
        <el-table-column prop="name" label="课程名" fixed width="150"></el-table-column>
        <el-table-column prop="maxCount" sortable label="最大人数" width="120"></el-table-column>
        <!-- <el-table-column prop="Enrollments.length" sortable label="选修人数" width="120"></el-table-column> -->
        <el-table-column prop="credit" sortable label="学分" width="80"></el-table-column>
        <el-table-column
          prop="universityId"
          sortable
          label="大学"
          width="120"
          :formatter="formatterUniversity"
        ></el-table-column>
        <el-table-column prop="teacherId" label="老师" width="120" :formatter="formatterTeacher"></el-table-column>
        <el-table-column prop="academy" sortable label="学院" width="120"></el-table-column>
        <el-table-column prop="major" sortable label="专业" width="120"></el-table-column>
        <el-table-column prop="content" label="课程简介" width="120" :formatter="checkNull"></el-table-column>
        <el-table-column fixed="right" label="修改" width="200">
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

      <el-dialog title="课程信息" :visible.sync="dialogFormVisibleSelect">
        <el-card>
          <!-- <div class="title">
                  <h3>个人信息</h3>
          </div>-->

          <div class="el-card-col">
            <p class="title">id:</p>
            <p class="content">{{selectCourseData.id}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">课程名:</p>
            <p class="content">{{selectCourseData.name}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">大学:</p>
            <p class="content">{{selectCourseData.university}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">学院:</p>
            <p class="content">{{selectCourseData.academy}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">专业:</p>
            <p class="content">{{selectCourseData.major}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">老师:</p>
            <p class="content">{{selectCourseData.teacherName}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">学分:</p>
            <p class="content">{{selectCourseData.credit}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">最大人数:</p>
            <p class="content">{{selectCourseData.maxCount}}</p>
          </div>
          <div class="el-card-col">
            <p class="title">课程介绍:</p>
            <p class="content">{{selectCourseData.content}}</p>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisibleSelect = false">确 定</el-button>
          <el-button @click="dialogFormVisibleSelect = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="课程信息" :visible.sync="dialogFormVisibleUpdate">
        <el-form :model="updateCourseData" class="content" :rules="rules" ref="updateCourseData">
          <el-form-item label="课程名" prop="name">
            <el-input v-model="updateCourseData.name" placeholder="请输入课程名"></el-input>
          </el-form-item>
          <el-form-item label="最大人数" prop="maxCount">
            <el-input v-model.number="updateCourseData.maxCount" placeholder="请输入最大人数"></el-input>
          </el-form-item>
          <el-form-item label="学分" prop="credit">
            <el-input v-model.number="updateCourseData.credit" placeholder="请输入学分"></el-input>
          </el-form-item>
          <el-form-item label="大学" prop="universityId">
            <el-select v-model="updateCourseData.universityId" placeholder="请选择大学">
              <el-option
                v-for="item in universityData"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>Id
            </el-select>
          </el-form-item>
          <el-form-item label="老师" prop="teacherId">
            <el-select v-model="updateCourseData.teacherId" placeholder="请选择老师">
              <el-option
                v-for="item in teacherData"
                :label="item.name"
                :value="item.accountId"
                :key="item.accountId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <div class="academy"> -->
          <el-form-item label="学院" prop="academy">
            <el-input v-model="updateCourseData.academy" placeholder="请输入学院"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="updateCourseData.major" placeholder="请输入专业"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="content">
            <el-input
              type="textarea"
              v-model="updateCourseData.content"
              placeholder="请填写课程信息"
              maxlength="50"
              :autosize="{ minRows: 4, maxRows: 6}"
              show-word-limit
            ></el-input>
          </el-form-item>
          <!-- </div> -->
          <el-form-item>
            <el-button type="primary" @click="updateForm('updateCourseData')">立即修改</el-button>
            <el-button @click="resetForm('updateCourseData')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStudent('updateForm')">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { post, get } from "../../api";

export default {
  data() {
    return {
      searchName: "",
      coursesData: [],
      coursesIssueData: [],
      coursesNoIssueData: [],
      addCourseData: {
        name: "",
        universityId: "",
        teacherId: "",
        academy: "",
        major: "",
        maxCount: "",
        credit: "",
        content: ""
      },
      selectCourseData: {
        name: "",
        universityId: "",
        teacherId: "",
        academy: "",
        major: "",
        maxCount: "",
        credit: "",
        content: "",
        teacherName: "",
        university: ""
      },
        // 修改时课程信息 表单项设置
      updateCourseData: {
        name: "",
        universityId: "",
        teacherId: "",
        academy: "",
        major: "",
        maxCount: 0,
        credit: 0,
        content: ""
      },
    //  university: ["南昌大学", "江西科技师范大学", "南昌航空大学"],
      universityData: [],
      teacherData: [],
  //    academy: ["人文学院", "新闻与传播学院", "外国语学院", "艺术与设计学院"],
   //   major: ["中文系", "历史系"],
      loading: false,
      // 增加课程 表单项设置
      ruleForm: {
        Title: "",
        Number: "",
        Introduction: ""
      },

      // 校验规则
      rules: {
        name: [
          { required: true, message: "请输入课程名", trigger: "change" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ],
        universityId: [
          { required: true, message: "请选择学校", trigger: "blur" }
        ],
        teacherId: [{ required: true, message: "请选择老师", trigger: "blur" }],
        academy: [
          { required: true, message: "请输入学院", trigger: "blur" }
          // { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        maxCount: [
          { required: true, message: "请输入最大人数" },
          { type: "number", message: "请输入数字"}
        ],
        credit: [
          { required: true, message: "请输入学分"},
          { type: "number", message: "请输入数字"}
        ],
        content: [
          {
            required: true,
            message: "请填写课程信息,否则无法通过喔~",
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
    //初始化获取数据

    //1. 获取所有课程
    this.getAllcourses();

    //2. 获取所有大学信息
    this.getUniversity();

    //3. 获取所有老师信息
    this.getTeacher();
  },
  methods: {
    // 实现添加功能
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("addCourseData:", this.addCourseData);
          // 表单验证成功
          // var strData = {
          //   Title: this.ruleForm.Title,
          //   Introduction: this.ruleForm.Introduction
          // };
          // 改变post的编码格式，适应后台
          post("/api/course/manage/insert/course", this.addCourseData)
            .then(res => {
              console.log(" submitForm(formName) res", res);
              if (res.code == 200) {
                this.$message({
                  message: "添加成功(*￣︶￣)，",
                  type: "success"
                });
                this.getAllcourses();
                this.resetForm(formName);
              }
            })
            .catch(err => {
              this.$message({
                message: "添加失败o(╥﹏╥)o",
                type: "danger"
              });
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
      this.$confirm("此操作将删除该课程所有信息, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          post("/api/course/manage/delete/course",{
            id: row.id
          })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  message: "删除成功(*￣︶￣)，",
                  type: "success"
                });
                this.getAllcourses();
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

    //table 学生信息处理显示
    formatterTeacher(row, column) {
      return this.getTeacherName(row.teacherId);
    },

    //根据id获取学校名
    getTeacherName(teacherId) {
      for (var j = 0, len = this.teacherData.length; j < len; j++) {
        if (this.teacherData[j].accountId == teacherId) {
          return this.teacherData[j].name;
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

    // name: "",
    // universityId: "",
    // teacherId:"",
    // academy: "",
    // major: "",
    // maxCount: "",
    // credit:"",
    // content: "",

    handleClickSelect(row) {
      // 数据回显
      console.log("handleClickSelect", row);
      // this.resetForm(updateForm);
      this.selectCourseData.name = row.name;
      this.selectCourseData.teacherName = this.getTeacherName(row.teacherId);
      this.selectCourseData.university = this.getUniverSityName(
        row.universityId
      );
      this.selectCourseData.major = row.major;
      this.selectCourseData.credit = Number(row.credit);
      this.selectCourseData.id = row.id;
      this.selectCourseData.content = row.content;
      this.selectCourseData.academy = row.academy;
      this.selectCourseData.maxCount = Number(row.maxCount);

      this.dialogFormVisibleSelect = true;
    },

    handleClickUpdate(row) {
      // 数据回显
      console.log("handleClickUpdate row", row);
      // this.resetForm(updateForm);

      this.updateCourseData.name = row.name;
      // this.updateCourseData.teacherName = this.getTeacherName(row.teacherId);
      // this.updateCourseData.university = this.getUniverSityName(
      //   row.universityId
      // );
      this.updateCourseData.major = row.major;
      this.updateCourseData.credit = Number(row.credit);
      this.updateCourseData.universityId = row.universityId;
      this.updateCourseData.teacherId = row.teacherId;
      this.updateCourseData.id = row.id;
      this.updateCourseData.content = row.content;
      this.updateCourseData.academy = row.academy;
      this.updateCourseData.maxCount = Number(row.maxCount);

      this.dialogFormVisibleUpdate = true;
    },

    handleClick(row) {
      // 数据回显
      console.log(row);
      // this.resetForm(updateForm);
      this.updateForm.Title = row.Title;
      this.updateForm.Introduction = row.Introduction;
      this.updateForm.Id = row.Id;
      this.dialogFormVisible = true;
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

          this.dialogFormVisibleUpdate = false;
          //  改变post的编码格式，适应后台  修改！
          post(
              "/api/course/manage/update/course",
              this.updateCourseData
            )
            .then(res => {
              if (res.code == 200) {
                this.$notify({
                  id: "",
                  title: "修改成功",
                  message: "信息已修改完成！请查看",
                  type: "success"
                });
                this.getAllcourses();
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
      return row.content == null
        ? "该课程暂无介绍信息 ￣□￣｜｜"
        : row.content;
    },

    //获取所有课程
    getAllcourses() {
      get("/api/course/manage/select/all").then(res => {
        console.log("getAllcourses", res);
        if (res.code == 200) {
          this.coursesData = res.data;
          this.loading = false;
        } else {
          this.$message({
            message: "课程获取失败o(╥﹏╥)o",
            type: "danger"
          });
        }
      });
    },

        //获取所有已经发布课程
    getAllcoursesIssue() {
      get("/api/course/manage/select/all/issue").then(res => {
        console.log("getAllcoursesIssue", res);
        if (res.code == 200) {
          this.coursesIssueData = res.data;
          this.loading = false;
        } else {
          this.$message({
            message: "课程获取失败o(╥﹏╥)o",
            type: "danger"
          });
        }
      });
    },


        //获取所有没有发布课程
    getAllcoursesNoIssue() {
      get("/api/course/manage/select/all/noIssue").then(res => {
        console.log("getAllcoursesNoIssue", res);
        if (res.code == 200) {
          this.coursesNoIssueData = res.data;
          this.loading = false;
        } else {
          this.$message({
            message: "课程获取失败o(╥﹏╥)o",
            type: "danger"
          });
        }
      });
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
    },
    //获取老师信息
    getTeacher() {
      post("/api/account/user/select/all", {
        roleId: 2
      }).then(res => {
        console.log("teacher", res);
        if (res.code == 200) {
          this.teacherData = res.data;
          this.loading = false;
        } else {
          this.$message({
            message: "老师获取失败o(╥﹏╥)o",
            type: "danger"
          });
        }
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
      // .stydentForm {
      //   .el-form-item__content {
      //     // margin: 0 !important;
      //     .el-input__suffix {
      //       right: 0 !important;
      //     }
      //     .el-input {
      //       width: 70%;
      //     }
      //   }
      // }
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
    // background-color: lightpink;
  }
}
</style>