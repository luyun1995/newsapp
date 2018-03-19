<template>
  <div id="login">
    <ul>
      <li> <mt-field label="邮箱" placeholder="请输入邮箱" :state="'success'"  type="email" v-model="email"></mt-field></li>
      <li> <mt-field label="密码" placeholder="请输入密码" :state="'success'" type="password" v-model="password"></mt-field></li>
      <li> <mt-button type="primary" size="large" plain @click.native="login">登录</mt-button></li>
      <li> <mt-button type="danger" size="large" plain @click.native="register">注册</mt-button></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "login",
    created() {
      this.$emit('title', '登录');
    },
    data() {
      return {
        "email": '',
        "password": ''
      }
    },
    methods: {
      login() {
        console.log('login');
        this.$router.push({ path: '/home' })
      },
      register() {
        console.log('register');
      }
    }
  }
</script>

<style>
  #login {
    margin-top: 100px;
  }


  #login ul{
    list-style: none;
    margin: 0;
    padding: 0;

  }
  #login ul>li{
    height: 50px;
  }

</style>
