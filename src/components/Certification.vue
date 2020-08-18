<template>
  <div class="container">
    <p>实名认证</p>
    <div class="certification">
      <el-timeline>
        <el-timeline-item placement="top">
          <el-card>
            <h4>添加学生</h4>
            <el-form
              :model="formData"
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="studentForm"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            <el-form-item label="身份证号" prop="identityCard">
                <el-input v-model="formData.identityCard" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="workNumber">
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
                </el-col>
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
              </el-form-item>

              <el-form-item label="大学" prop="university">
                <el-select v-model="formData.university" placeholder="请选择大学">
                  <el-option
                    label="南昌大学"
                    value="0"
                    v-for="(item,index) in university"
                    :key="index"
                  >{{item}}</el-option>
                </el-select>
              </el-form-item>
              <div class="academy">
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
              </div>
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
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        date: "",
        university: "",
        academy: "",
        major: "",
        class: "",
        workNumber: "",
        identityCard : "",
      },
      university: ["南昌大学", "江西科技师范大学", "南昌航空大学"],
      academy: ["人文学院", "新闻与传播学院", "外国语学院", "艺术与设计学院"],
      major: ["中文系", "历史系"]
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  .certification {
    width: 40%;
    align-items: center;
    margin-left: 30%;
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