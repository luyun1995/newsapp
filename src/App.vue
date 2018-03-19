<template>
  <div id="app">
    <HeaderElement :title="title"></HeaderElement>
    <transition
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight"
    >
      <!--<keep-alive>-->
        <router-view @title="change"></router-view>
     <!-- </keep-alive>-->
    </transition>
  </div>
</template>

<script>
  import HeaderElement from './components/Header.vue'

  export default {
    name: 'App',
    components: {
      HeaderElement
    },
    data(){
      return{
        title:''
      }
    },
    methods:{
      change(title) {
        this.title = title;
      }
    }
  }
</script>

<style>
  #app,body {
    margin: 0px;
    padding: 0px;
  }
</style>
