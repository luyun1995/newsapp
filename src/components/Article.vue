<template>
  <div class="content">
    <h3>{{article.title}}</h3>
    <p class="ptime">{{article.ptime}} {{article.source}}</p>
    <p v-for="imgs in article.img ">
      <img :src="imgs.src" alt="" width="100%">
    </p>
    <div class="textcontent" v-html="article.body"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { Indicator } from 'mint-ui';
  export default {
    name: "articleComponent",
    created() {
      this.$emit('title', '文章详情');
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.getArticle();
      // 置顶
      window.scrollTo(0,0);
    },
    computed: {
      ...mapGetters(['article'])
    },
    methods: {
      getArticle: function () {
        this.$store.dispatch('articleAction', this.$route.query.id);
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 5%;
  }

  .ptime {
    color: #888;
    line-height: 30px;
  }

  .textcontent {
    line-height: 28px;
  }
</style>
