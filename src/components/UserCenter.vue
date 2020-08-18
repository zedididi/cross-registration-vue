<template>
  <div class="container">
    <div>
      <el-dialog title="修改个人信息" modal :visible.sync="dialogFormVisible">
        <el-form :model="userInfo" >
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="userInfo.phone"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="email" :label-width="formLabelWidth">
            <el-input v-model="userInfo.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ" :label-width="formLabelWidth">
            <el-input v-model="userInfo.qq" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="微信" :label-width="formLabelWidth">
            <el-input v-model="userInfo.wchat" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="formClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="left">
      <div class="user-info">
        <p>个人信息</p>
        <div class="user-info-item">
          <el-timeline>
            <el-timeline-item placement="top">
              <el-card>
                <div class="title">
                  <h3>个人信息</h3>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="dialogFormVisible = true"
                    round
                  >修改</el-button>
                </div>

                <div class="el-card-col">
                  <p class="title">名字:</p>
                  <p class="content">{{userInfo.name}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">大学:</p>
                  <p class="content">{{userInfo.university}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">学院:</p>
                  <p class="content">{{userInfo.academy}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">专业:</p>
                  <p class="content">{{userInfo.major}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">手机:</p>
                  <p class="content">{{userInfo.phone}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">email:</p>
                  <p class="content">{{userInfo.email}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">QQ:</p>
                  <p class="content">{{userInfo.qq}}</p>
                </div>
                <div class="el-card-col">
                  <p class="title">微信:</p>
                  <p class="content">{{userInfo.wchat}}</p>
                </div>
                <!-- <div class="el-card-col" v-for="(value,name) in userInfo" >
                  <p class="title">{{name}}:</p>
                  <p class="content">{{value}}</p>
                </div>-->
              </el-card>
            </el-timeline-item>
            <!-- <el-timeline-item placement="top">
              <el-card>
                <h4>修改个人信息</h4>
                <p>修改个人信息</p>
              </el-card>
            </el-timeline-item>-->
            <!-- <el-timeline-item placement="top">
              <el-card>
                <h4>实名认证</h4>
                <p>实名认证</p>
              </el-card>
            </el-timeline-item>-->
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="class-table">
        <p>课程表</p>
        <div class="class-table-item">
          <el-row>
            <el-col :span="3" style="background: rgba(218,218,218,0.65)">
              <div class="grid-content bg-purple-dark">时间/星期</div>
            </el-col>
            <el-col :span="3" v-for="(week, index) in weeks" :key="index">
              <div class="grid-content bg-purple-dark">{{week}}</div>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in classTableData" :key="index">
            <el-col :span="3" v-for="(value,name) in item" :key="name">
              <div
                :class="[name =='classesTime' ? 'bg-purple-dark': 'is-class', 'grid-content']"
              >{{value}}</div>
              <!-- <div class='[1 > 2 ? "grid-content": "test" "bg-purple-dark"]'>{{value}}</div> -->
            </el-col>
            <!-- <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.monday}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.tuesday}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.wednesday}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.tuesday}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.friday}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.saturday}}</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple-dark">{{item.sunday}}</div>
            </el-col>-->
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      weeks: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      classTableData: [
        {
          classesTime: "08:00-09:00",
          monday: "1",
          tuesday: "1",
          wednesday: "1",
          thursday: "1",
          friday: "1",
          saturday: "1",
          sunday: "1"
        },
        {
          classesTime: "09:00-10:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "10:00-11:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "11:00-12:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "13:00-14:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "14:00-15:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "15:00-16:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "16:00-17:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "17:00-18:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "18:00-19:00",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        },
        {
          classesTime: "19:00-20:00",
          monday: "三班",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: ""
        }
      ],
      userInfo: {
        name: "刘泽迪",
        university: "南昌大学",
        academy: "学院",
        major: "计算机",
        sex: "男",
        phone: "13133827824",
        email: "zedididi@qq.com",
        qq: "1605103328",
        wchat: "a1605183328"
      },
      dialogFormVisible: false,
        formLabelWidth: '120px'
    };
  },
  methods: {
    formClick(e) {
      //关闭对话框
      this.dialogFormVisible = false
      localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
      console.log(localStorage.getItem('userInfo'))
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 32%;
    margin-right: 40px;
    .user-info {
      .user-info-item {
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
    }
  }

  .right {
    width: 60%;
    margin-right: 0px;

    .class-table {
      margin-right: 0px;

      .class-table-item {
        align-items: center;
        .el-row {
          margin: 3px;
          /* &:last-child {
             margin-bottom: 0;
           } */
        }

        .el-col {
          border-radius: 4px;
          margin: 3px;
          width: 110px;
        }

        .bg-purple-dark {
          background: #99a9bf;
        }

        .grid-content {
          font-size: 12px;
          border-radius: 4px;
          line-height: 80px;
          //  background: #99a9bf;
          /* min-height: 20px; */
        }

        .is-class {
          background: #f56c6c;
        }

        .row-bg {
          /* padding: 10px 0; */
          background-color: #f9fafc;
        }
      }
    }
  }
}
</style>