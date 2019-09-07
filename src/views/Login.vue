<template>
  <div class="login">
    <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
      <h2 class="login-title">乐促信息管理系统</h2>
      <el-form-item prop="username">
        <div class="login-icon">
          <i class="el-icon-user-solid"></i>
        </div>
        <el-input class="login-input" v-model="loginForm.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <div class="login-icon">
          <i class="el-icon-more"></i>
        </div>
        <el-input
          class="login-input"
          type="password"
          placeholder="密码"
          v-model="loginForm.password"
          @keyup.enter.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          @click="submitForm('loginForm')"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
      <span class="login-footer">还没有注册？</span>
      <el-button type="text" @click="$router.push({ path: '/signup' })">免费注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import crypto from 'crypto'
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能小于6位', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    ...mapActions(['Login']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // MD5 求 hash 值
          let md5 = crypto.createHash('md5')
          let passMD5 = md5.update(this.loginForm.password).digest('hex')
          this.logining = true
          this.Login({
            username: this.loginForm.username,
            password: passMD5,
          })
            .then(res => {
              this.logining = false
              if (res.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.message,
                })
                this.$router.push({ path: '/' })
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.message,
                })
              }
            })
            .catch(err => {
              this.$notify.error({
                title: '失败',
                message: err.error.message ? err.error.message : '登录失败！',
              })
              this.logining = false
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #2d3a4b;
}

.login-form {
  width: 320px;
}

.login-title {
  color: #eee;
  text-align: center;
}

.login-icon {
  margin-left: 15px;
  line-height: 46px;
  color: #889aa4;
}

.login-input.el-input {
  width: 280px;
  height: 46px;
}

.login-input.el-input input {
  color: #eee;
  border: none;
  background: transparent;
  height: 46px;
}

.login-form .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.login-form .el-form-item__content {
  display: flex;
}

.login-footer {
  font-size: 14px;
  color: #eee;
}
</style>