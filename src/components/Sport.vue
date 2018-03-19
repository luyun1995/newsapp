<template>
  <div class="sport">
    <li v-for="item in sportList" @click=" pushUrl(item.postid)" :id="item.postid">
      <img :src="item.imgsrc" :alt="item.title">
      <p>{{item.title}}</p>
    </li>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui';
  export default {
    name: "sport",
    created() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.$emit('title', '体育快讯');
      this.getSportList();

    },
    computed: {
      ...mapGetters(['sportList'])
    },
    methods: {
      getSportList: function () {
        this.$store.dispatch('sportListAction');
      },
      pushUrl:function (id) {
        if(!id){
          alert("该文章已被删除");
          return false;
        }
        this.$router.push({ path: '/article', query: { id: id }})
      }
    }
  }
</script>

<style>
  .sport {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }

  .sport img {
    width: 100%;
  }

  .sport li p {
    line-height: 24px;
    padding: 8px 0;
  }
</style>
