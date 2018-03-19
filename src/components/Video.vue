<template>
  <div class="video">
    <section class="video-item" v-for="(item,index) in video" @click="pushUrl(index)">
      <div class="v-poster">
        <img :src="item.cover">
      </div>
      <div class="v-mask">
        <div class="v-head">
          <div class="v-play"></div>
          <div class="v-title">{{item.title}}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui';

  export default {
    name: "videoComponent",
    created() {
      this.$emit('title', '热门视频');
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.getVideo();
    },
    computed: {
      ...mapGetters(['video'])
    },
    methods: {
      getVideo() {
        var data = {
          type: 0,
          page: 0
        };
        this.$store.dispatch('videoAction');
      },
      pushUrl(index) {
        sessionStorage.setItem("videodetail", JSON.stringify(this.video[index]));
        this.$router.push({path: '/player'});
      }
    }
  }
</script>

<style>
  .type-list {
    padding: 10px 0;
  }

  .type-list li {
    padding: 3px 15px;
    display: inline-block;
  }
</style>
