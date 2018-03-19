<template>
  <div>
    <!--{{list.creator.avatarUrl}}-->
    <div id="music-head">
      <img :src="replaceImg(musicBannerurl)">
    </div>
    <section class="m-bill">
      <h2 class="f-bd u-hd">歌曲列表</h2>
      <ul class="list">
        <!--<router-link tag="section" class="video-item" :to="{ path: '/player', query: { id: item.mp4_url}}"-->
        <router-link tag="li" class="f-bd" :to="{ path: '/musicplayer', query: { id: item.hash}}"
                     v-for="(item,index) in list" :key="item.id">
          <a :href="{ path: '/musicplayer', query: { id: item.hash}}" data-action="res" data-res-type="song"
             data-log="hitsong">
            <span class="num s-fc4">{{index+1}}</span>
            <span class="detail">
                <h3 class="s-fc1">{{item.filename}}</h3>
              <!--<p class="s-fc8">{{item.artists[0].name}}-{{item.album.name}}</p>-->
            </span>
            <span href="#" class="play"></span>
          </a>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui';

  export default {
    name: "music",
    created() {
      this.$emit('title', '音乐播放');
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.getMusic();
    },
    computed: {
      ...mapGetters(['music']),
      list(){
        if(this.music.songs!=undefined)
        return this.music.songs.list;
      },
      musicBannerurl(){
        if( this.music.info!=undefined)
        return this.music.info.bannerurl;
      }
    },
    methods: {
      getMusic() {
        var id = this.$route.query.id;
        this.$store.dispatch('musicAction', id);
      },
      replaceImg(param) {
        if (param!=undefined) {
          var img = param.replace('{size}', 400);
          return img;
        }
      }
    }
  }
</script>

<style scoped>
  .m-intr {
    position: relative;
    margin: 0 10px 5px 15px;
    font-size: 14px;
    line-height: 19px;
    float: left;
    font-weight: normal;
    font-style: normal;
    max-height: 135px;
    overflow: hidden;
  }

  .m-intr .tags {
    margin: 10px 0;
    color: #666;

  }

  .m-intr .tag {
    margin-right: 10px;
    padding: 1px 7px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 9999px;
    font-size: 12px;
    font-style: normal;
  }

  .m-intr .desc {
    margin-top: 10px;
    padding-bottom: 18px;
    word-wrap: break-word;
    white-space: normal;
    color: #666;
  }
</style>
