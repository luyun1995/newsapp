<template>
  <div>
    <div id="content-list">
      <router-link tag="section" class="m_article clearfix" :to="{ path: 'wxarticle', query: { id: item.id}}"
                   v-for="item in list" :key="item.id">
        <a>
          <div class="m_article_img">
            <img :src="item.firstImg">
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
              <!--<div class="m_article_desc_r">
                <div class="">
                  {{item.ptime}}
                </div>
              </div>-->
            </div>
          </div>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui';

  export default {
    name: "wx-list",
    created() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.$emit('title', '微信精选');
      this.getWxList();

    },
    computed: {
      ...mapGetters(['wxList']),
      list() {
        if (this.wxList.result != undefined)
          return this.wxList.result.list;
        return {}
      }
    },
    methods: {
      getWxList: function () {
        this.$store.dispatch('wxListAction');
      }
    }
  }
</script>

<style scoped>

</style>
