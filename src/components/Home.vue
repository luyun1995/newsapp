<template>

  <div class="home">
    <div class="swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.imgsrc">
          <!--<img :src="'http://cms-bucket.nosdn.127.net/83314a1e964a44c89bb5b8c4ff1f49c120180202100719.jpeg'" alt="">-->
          <span class="swiper-title">{{item.title}}</span>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!--文章 list-->
    <div id="content-list">
      <router-link tag="section" class="m_article clearfix" :to="{ path: 'article', query: { id: item.postid}}"
                   v-for="item in news" :key="item.id">
          <div class="m_article_img">
            <img :src="item.imgsrc">
          </div>
          <div class="m_article_info">
            <div class="m_article_title">
              <span>{{item.title}}</span>
            </div>
            <div class="m_article_desc ">
              <div class="m_article_desc_l">
                <span class="m_article_channel">{{item.source}}</span>
                <span class="m_article_time">  {{item.ptime}}</span>
              </div>
            </div>
          </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "home",
    created() {
        this.getBanners();
        this.getNews();
      this.$emit('title', '首页');
    },
    computed: {
      ...mapGetters(['banner', 'news'])
    },
    methods: {
      getBanners: function () {
        this.$store.dispatch('bannerAction');
      },
      getNews:function () {
        this.$store.dispatch('newsAction');
      }
    }
  }
</script>

<style>
  .swiper{
    width: 100%;
    height: 200px;
  }

  .swiper img{
    width: 100%;
  }


  .swiper-title{
    position: absolute;
    left: 20%;
    bottom: 30px;
    color: #000;
  }

</style>
