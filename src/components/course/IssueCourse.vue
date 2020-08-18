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
              <h4>发布课程</h4>
              <el-form
                :model="issueCourseData"
                :rules="rules"
                ref="issueCourseData"
                label-width="80px"
                class="coursesForm"
              >
                <el-form-item label="开始时间"  required>
                  <el-col :span="11">
                    <el-form-item prop="startDate">
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        v-model="issueCourseData.startDate"
                        style="width: 100%;"
                        default-time="12:00:00"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="结束时间" required>
                  <el-col :span="11">
                    <el-form-item prop="endDate">
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        v-model="issueCourseData.endDate"
                        style="width: 100%;"
                        default-time="12:00:00"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item class="el-form-item-button">
                  <el-button type="primary" @click="submitForm('issueCourseData')">确认发布</el-button>
                  <el-button @click="resetForm('issueCourseData')">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="right">
      <el-tabs v-model="isIssue" type="card" @tab-click="handleClick">

        <el-tab-pane label="未发布课程" name="0"></el-tab-pane>
        <el-tab-pane label="已发布课程" name="1"></el-tab-pane>
      </el-tabs>

        <el-table
          v-show="isIssue == 0"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="coursesNoIssueData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
          border
          ref="coursesData"
          style="width: 100%"
          max-height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" :index="indexMethod" fixed></el-table-column>
          <el-table-column prop="id" label="id" fixed width="100"></el-table-column>
          <el-table-column prop="name" label="课程名" fixed width="150"></el-table-column>
          <el-table-column prop="maxCount" sortable label="最大人数" width="120"></el-table-column>
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
              <el-tooltip
                content="删除这门课程？"
                placement="top"
                effect="light"
                :hide-after="1000"
                :enterable="false"
              >
                <!-- <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                plain
                ></el-button>-->
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div style="margin-top: 20px" v-show="isIssue == 0">
         
          <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        </div> -->
      <!-- </div> -->
      <el-table
        v-show="isIssue == 1"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="coursesIssueData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
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
            <el-tooltip
              content="删除这门课程？"
              placement="top"
              effect="light"
              :hide-after="1000"
              :enterable="false"
            >
              <!-- <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="small"
                icon="el-icon-delete"
                circle
                plain
              ></el-button>-->
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="课程信息" :visible.sync="dialogFormVisibleSelect">
        <el-card>
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
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { post, get } from "../../api";

export default {
  data() {
    return {
      searchName: "",
      coursesData: [],
      coursesIssueData: [],
      coursesNoIssueData: [],
      accountId: "",
      issueCourseData: {
        startDate: "",
        endDate: "",
        startDate1: "",
        startDate2: "",
        endDate1: "",
        endDate2: ""
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
      universityData: [],
      teacherData: [],
      isIssue: "0",
      loading: false,
      multipleSelection: [],
      multipleSelectionId: [],
      multipleSelectionIdS: "",

      // 校验规则
      rules: {
        startDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      },
      dialogFormVisibleSelect: false,
      formLabelWidth: "6em"
    };
  },
  mounted() {
    //初始化获取数据

    //1. 获取所有课程
    this.getAllcourses();
    this.getAllcoursesIssue();
    this.getAllcoursesNoIssue()

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
          // 表单验证成功
          // var strData = {
          //   Title: this.ruleForm.Title,
          //   Introduction: this.ruleForm.Introduction
          // };

          console.log("submitForm issueCourseData", this.issueCourseData);

          // 改变post的编码格式，适应后台
          post("api/course/issue/courseAndIssue/add1",{
            // startTime: new Date(this.getDateTime(this.issueCourseData.startDate)),
            // endTime: new Date(this.getDateTime(this.issueCourseData.endDate)),
            startTimeS: new Date(this.issueCourseData.startDate),
            endTimeS: new Date(this.issueCourseData.endDate),
            courseId: this.multipleSelectionIdS
          })
            .then(result => {

              console.log("submitForm", res);
              if (res.code == 200) {
                this.$message({
                  message: "添加成功(*￣︶￣)，",
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.coursesData.toggleRowSelection(row);
        });
      } else {
        this.$refs.coursesData.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
      this.multipleSelection = val;
      this.dealSelection()
    },

    dealSelection() {
      var multipleSelectionIdS = this.multipleSelection[0].id
      for (var j = 0, len = this.multipleSelection.length; j < len; j++) {
        this.multipleSelectionId.push(this.multipleSelection[j].id);
        if(j > 0){
          multipleSelectionIdS = multipleSelectionIdS + ":" + this.multipleSelection[j].id
        }
        
      }
      this.multipleSelectionIdS = multipleSelectionIdS
      console.log("this.multipleSelectionId", this.multipleSelectionId);
      console.log("this.multipleSelectionIdS", multipleSelectionIdS);
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

    // 实现删除功能
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("此操作将删除该课程所有信息, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("http://localhost:8004/Courses/Delete?id=" + row.Id)
            .then(result => {
              if (result.status == 200 || result.status == 302) {
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

    handleClick(row) {
      // 数据回显
      console.log(row);
    },

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

    // 提交修改
    updateStudent(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var updateData = {
            Id: this.updateForm.Id,
            Title: this.updateForm.Title,
            Introduction: this.updateForm.Introduction
          };
          this.dialogFormVisible = false;
          //  改变post的编码格式，适应后台  修改！
          this.axios
            .post(
              "http://localhost:8004/Courses/Edit",
              qs.stringify(updateData)
            )
            .then(result => {
              if (result.status == 200 || result.status == 302) {
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
      return row.content == null ? "该课程暂无介绍信息 ￣□￣｜｜" : row.content;
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

        //获取所有课程
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


        //获取所有课程
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
      .el-timeline {
        //   padding: 5% 10% 0 10%;
        h4 {
          margin: 0.2em;
          padding-bottom: 0.5em;
        }

        .el-form {
          width: 100%;
          .el-form-item {
            width: 200px;
          }

          .el-form-item-button {
            margin-left: 10px;
            .el-button {
              margin-left: 10px;
            }
         //   display: flex;

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
    // background-color: lightpink;
  }
}
</style>