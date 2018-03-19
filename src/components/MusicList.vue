<template>
  <div id="musiclist">
    <ul class="m-type">
      <li v-for="item in musicList" :data="item.rankid" @click="pushUrl(item.rankid)">
        <img :src="item.imgurl.replace('{size}',400)" :alt="item.rankname">
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui';

  export default {
    name: "music-list",
    created() {
      this.$emit('title', '音乐特色榜');
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
        this.getMusicList();
    },
    computed: {
      ...mapGetters(['musicList'])
    },
    methods: {
      getMusicList() {
        this.$store.dispatch('musicListAction');
      },
      pushUrl(id){
        this.$router.push({ path: '/music', query: { id: id } });
      }
    }
  }
</script>

<style scoped>
  .m-type {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }

  .m-type li {
    width: 33.33%;
    float: left;
    box-sizing: border-box;
    padding: 5px;
  }

  .m-type li img {
    width: 100%;
  }
</style>
