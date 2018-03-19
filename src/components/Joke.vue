<template>
  <div class="joke">
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
      <ul>
        <li v-for="item in joke" class="animated fadeInUp">{{ item.digest }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Loadmore, Indicator} from 'mint-ui';
  import {mapGetters} from 'vuex'

  Vue.component(Loadmore.name, Loadmore);

  export default {
    name: "joke",
    created() {
      this.$emit('title', '笑话段子');
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.getJoke();
    }, computed: {
      ...mapGetters(['joke'])
    },
    methods: {
      loadBottom() {
        // 加载更多数据
        this.$refs.loadmore.onTopLoaded();
        // 得新调用加载的方法
        console.log("loadBottom")
        //this.getJoke();
      },
      getJoke() {
        this.$store.dispatch('jokeAction');
      }
    }
  }
</script>

<style scoped>
  .joke {
    width: 100%;
    background: #f6f6f6;
  }

  .joke li {
    padding: 10px 15px;
    box-shadow: 3px 3px 8px #ddd;
    background: #fff;
    margin-bottom: 10px;
    margin-top: 5px;
    font-size: 16px;
  }
</style>
