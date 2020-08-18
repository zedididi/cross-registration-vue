<template>
  <div class="container">
    <!-- <h2>这里是课程界面啊啊啊啊</h2> -->
    <div class="left">
      <!-- 查询 -->
      <div class="menu">
        <el-timeline>
          <el-timeline-item placement="top">
            <el-card>
              <h4>未选课程查询</h4>
              <el-input placeholder="请输入课程名" class="searchName" v-model="searchName">
                <!-- <el-button slot="append" type="primary" icon="el-icon-search">搜索</el-button> -->
              </el-input>
              <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="right">

      <div class="selectedCourse">
        <p>课程列表</p>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="userSelectedCoursesData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"
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
          <el-table-column fixed="right" label="修改" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClickRead(scope.row)" type="primary" size="small">查看</el-button>
              <!-- <el-button @click="handleClickNoSelect(scope.row)" type="danger" size="small">退课</el-button>
              <el-tooltip
                content="删除这门课程？"
                placement="top"
                effect="light"
                :hide-after="1000"
                :enterable="false"
              > -->
                <!-- <el-button
                  @click="handleDelete(scope.$index, scope.row)"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  circle
                  plain
                ></el-button> -->
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
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
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
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
      userSelectedCoursesData: [],  
      loading: false,
      universityData: [],
      teacherData: [],
      // 校验规则
      rules: {},
      dialogFormVisible: false,
      formLabelWidth: "6em"
    };
  },
  mounted() {
      //初始化获取数据

    //1. 获取已经发布的课程
    this.getSelectAndIssueCourse()

        //2. 获取所有大学信息
    this.getUniversity();

    //3. 获取所有老师信息
    this.getTeacher();


  },
  methods: {
   
    //为表格添加序号
    indexMethod(index) {
      return index + 1;
    },

    //查看课程
    handleClickRead(row) {
      // 数据回显
      console.log(row);
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

      this.dialogFormVisible = true;
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

    // 查验简介是否为空
    checkNull(row, column) {
      // console.log(row)
      return row.content == null
        ? "该课程暂无介绍信息 ￣□￣｜｜"
        : row.content;
    },

    //获取学生已经所有已发布且已选课程
    getSelectAndIssueCourse() {
      console.log("window.sessionStorage.getItem('account')",window.sessionStorage.getItem('account'))
      post("/api/course/manage/select/all/issue/select",{
         studentAccount: window.sessionStorage.getItem('account')
      }).then(res => {
    
        console.log("getSelectAndIssueCourse", res);
        if (res.code == 200) {
          this.userSelectedCoursesData = res.data;
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