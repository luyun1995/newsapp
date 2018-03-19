<template>
  <div >
    <div >
      <mt-header :title="title">
        <a href="javascript:window.history.back()" slot="left">
          <mt-button icon="back">返回</mt-button>
        </a>
        <mt-button icon="more" slot="right"  @click.native="show"></mt-button>
      </mt-header>
    </div>

    <div>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
        <ul id="title-list">
          <li>
            <router-link to="/home" slot="">
              <i class="iconfont icon-home"></i>
              首页
            </router-link>
          </li>
          <li>
            <router-link to="/video" slot="">
              <i class="iconfont icon-video"></i>
              视频
            </router-link>
          </li>

          <li data="">
            <router-link to="/musiclist" slot="">
              <i class="iconfont icon-music"></i>
              音乐
            </router-link>
          </li>

          <li>
            <router-link to="/movie" slot="">
              <i class="iconfont icon-player"></i>
              电影
            </router-link>
          </li>
          <li>
            <router-link to="/photo" slot="">
              <i class="iconfont icon-meinv"></i>
              美图
            </router-link>
          </li>
          <li data="">
            <router-link to="/joke" slot="">
              <i class="iconfont icon-duanzi"></i>
              段子
            </router-link>
          </li>

          <li data="T1348648517839">
            <router-link to="/wxlist" slot="">
              <i class="iconfont icon-wx"></i>
              微信精选
            </router-link>
          </li>

          <li data="T1348648517839">
            <router-link to="/sport" slot="">
              <i class="iconfont icon-sport"></i>
              体育
            </router-link>
          </li>
          <li data="T1348648517839">
            <router-link to="#" slot="">
              <i class="iconfont icon-edu"></i>
              教育
            </router-link>
          </li>

          <li data="T1348648517839">
            <router-link to="/zhihu" slot="">
              <i class="iconfont icon-code"></i>
              IT科技
            </router-link>
          </li>

        </ul>
      </mt-popup>
    </div>
  </div>
</template>

<script>
  export default {
    name: "headerComponent",
    props: ["title"],
    data() {
      return {
        popupVisible: false
      }
    },
    watch: {
      $route: "changed"
    },
    methods: {
      show: function () {
        this.popupVisible = true
      },
      changed: function () {
        this.popupVisible = false;
      }
    },
  }
</script>

<style>

  div:nth-of-type(0){
    width: 100%;
    position: relative;
  }

  .mint-popup{
    width: 100%;
    position: absolute;
    top: 108px;
  }

  .mint-popup li{
    float: left;
    display: inline-block;
    text-align: center;
    width: 20%;
    padding: 10px 0;
  }

  .mint-popup li i{
    display: block;
    font-size: 30px;
  }

  .mint-popup li  a {
    color: #666;
    font-size: 14px;
  }



</style>
