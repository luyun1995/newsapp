<template>
  <div id="m-box">
    <div id="m-bg" :style="{backgroundImage: 'url(' + music.pic + ')'}">
      <!--  {{lyric.lyric}}-->
      <!-- {{newLyric}}-->
    </div>
    <div class="m-circle">
      <img class="rat-img roation" :src="music.pic"/>
    </div>

    <div id="lyric">

      <ul :style="{ top: top + 'px' }" id="lyriclist">
        <li v-for="(item,index) in newLyric">
          {{item[1]}}
        </li>
      </ul>

    </div>

    <div id="audio-play">
      <div class="progressbar">
        <div id="current_line" :style="{ width:  currentTime*100/music.playTime + '%' }"></div>
      </div>
      <audio id="audio" :src="music.url"></audio>
      <!-- <audio id="audio" src="http://code.it919.cn/gbqq.mp3"></audio>-->
      <p><i class="fl">{{ currentTime | minutes}}</i><i class="fr">{{music.playTime | minutes}}</i></p>
      <h3 class="song-title">{{music.title}}</h3>

      <ul class="song-btn">
        <button class="iconfont icon-prev"></button>
        <button :class="{ 'iconfont icon-play' : !isPlaying,'iconfont icon-pause': isPlaying}"
                @click="togglePlay">
          <!-- {{isPlaying}}-->
        </button>
        <button class="iconfont icon-next"></button>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui';

  export default {
    name: "music-player",
    data() {
      return {
        isPlaying: false,
        currentTime: 0, //当前时间
        top: 200,
      }
    },
    mounted() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'double-bounce'
      });
      this.getMusicPlayer();
      this.ajaxLyric();//重新获取一次歌词
      this.audioEvent();
    },
    computed: {
      ...mapGetters(['musicPlayer', 'lyric']),
      music() {
        if (this.musicPlayer.songName != undefined) {
          this.$emit('title', this.musicPlayer.songName);
          let music = {};
          music.playTime = this.musicPlayer.timeLength;
          music.title = this.musicPlayer.songName;
          music.author = this.musicPlayer.fileName;
          music.url = this.musicPlayer.url;
          music.pic = (this.musicPlayer.imgUrl).replace('{size}', 400);
          return music
        }
        return {};
      },
      newLyric() {
        //歌词
        if (this.lyric.data != undefined) {
          let newLyric = {};
          newLyric = this.parseLyric(this.lyric.data.lyrics);
          this.scrollLyrics(); //歌词滚动
          return newLyric;
        }
        return {};
      }
    },
    methods: {
      getMusicPlayer() {
        var id = this.$route.query.id;
        this.$store.dispatch('musicPlayerAction', id);
      },
      ajaxLyric() {
        var id = this.$route.query.id;
        this.$store.dispatch('lyricAction', id);
      },
      audioEvent: function () {
        var audio = document.querySelector('#audio');
        var _this = this;

        //判断是否加载完 (有个问题:ios浏览器下面audio不会自动播放)
        audio.addEventListener("loadedmetadata", function () {
          audio.play();
          _this.isPlaying = true;
          Indicator.close();
          console.info("加载完毕，能播放了2");
        });

        //获取播放时间
        audio.addEventListener("timeupdate", function () {
          _this.currentTime = this.currentTime;
        });

        //判断结束
        audio.addEventListener("ended", function () {
          console.log("播放完");
          _this.isPlaying = false;
        });
      },
      //播放
      togglePlay: function () {
        var audio = document.querySelector('#audio');
        if (this.isPlaying == false) {
          audio.play();
          this.isPlaying = true;
        } else {
          audio.pause();
          this.isPlaying = false;
        }
      },
      //上一首
      prev: function () {

      },
      //下一首
      next: function () {

      },
      //接收歌词转化格式
      parseLyric: function (text) {
        var lines = text.split('\n'),
          //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
          pattern = /\[\d{0,4}:\d{0,4}.\d{0,4}\]/g,
          //保存最终结果的数组
          result = [];
        //去掉不含时间的行
        while (!pattern.test(lines[0])) {
          lines = lines.slice(1);
        }
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function (v, i, a) {
          //提取出时间[xx:xx.xx]
          var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
          //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
          time.forEach(function (v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          });
        });
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
        result.sort(function (a, b) {
          return a[0] - b[0];
        });

        return result;
      },
      scrollLyrics: function () {
        var audio = document.querySelector('#audio');
        if(audio==null)
          return;
        var uls = document.getElementById("lyriclist");
        var lis = uls.getElementsByTagName("li");

        var _this = this;

        audio.addEventListener("timeupdate", function () {
          for (var i = 0, l = _this.newLyric.length; i < l; i++) {
            if (this.currentTime > _this.newLyric[i][0]) {
              _this.top = -i * 25;
              lis[i].className = "current";
            }
          }
        });
      }
    }
  }
</script>

<style scoped>
  #m-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    float: left;
    position: relative;
    min-height: 100%;
    _height: 100%;
  }

  #m-bg {
    width: 100%;
    background-repeat: no-repeat;
    position: absolute;
    height: 100%;
    min-height: 100%;
    _height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background-size: 100% 100%;
    background-position: center center;
    opacity: 0.5;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-transform-origin: center top;
    -ms-transform-origin: center top;
    transform-origin: center top;
    clear: both;

  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg)
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }

  .roation {
    -webkit-transform: rotate(360deg);
    animation: rotation 10s linear infinite;
    -moz-animation: rotation 10s linear infinite;
    -webkit-animation: rotation 10s linear infinite;
    -o-animation: rotation 10s linear infinite;

  }

  .m-circle {
    opacity: 1;
    z-index: 999;
    width: 40%;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 30%;
    padding-bottom: 20px;
  }

  .m-circle img {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border-radius: 50%;
    border: 20px solid #333;
    box-sizing: border-box;
  }

  /*audio player*/
  #audio-play {
    position: fixed;
    width: 100%;
    left: 0;
    padding: 20px 20px;
    bottom: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 3px 3px 8px #ddd;
    background: rgba(152, 152, 150, 0.7);
  }

  .progressbar {
    margin-top: 10px;
    width: 100%;
    height: 3px;
    background: #666;
  }

  #current_line {
    height: 3px;
    background: #cb5d5d
  }

  #audio-play p i {
    color: #333;
    font-size: 12px;
  }

  .song-title {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    padding: 20px 10px;
    color: #262424;
  }

  .song-btn button {
    width: 33.3%;
    display: inline-block;
    margin-left: -4px;
    text-align: center;
    padding: 15px 0;
    background: transparent;
    border: 0;
    outline: none;
    font-size: 30px;
    color: #262424;
  }

</style>
