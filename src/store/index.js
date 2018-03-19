/**
 * User: ecitlm@163.com
 * Date: Created  on 2017/2/25 14:04.
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import api from '../../src/api/api.js'
import {Indicator} from 'mint-ui'
//数据
const state = {
  // 新闻图片广告对象
  BannerList: {},
  // 新闻对象
  IndexNewsList: {},
  // 当前文章
  artice: {},
  // 笑话段子
  joke: {},
  // 视频
  video: {},
  // 音乐排行
  musicList: {},
  // 音乐
  music: {},
  // 音乐背景图片
  musicBannerurl: {},
  // 音乐播放
  musicPlayer: {},
  // 歌词
  lyric: {},
  // 微信列表
  wxList:{},
  // 体育列表
  sportList:{}
}

const getters = {
  banner: state => {
    return state.BannerList
  },
  news: state => {
    return state.IndexNewsList
  },
  article: state => {
    return state.artice
  },
  joke: state => {
    return state.joke
  },
  video: state => {
    return state.video
  },
  musicList: state => {
    return state.musicList;
  },
  music: state => {
    return state.music;
  },
  musicPlayer: state => {
    return state.musicPlayer;
  },
  lyric: state => {
    return state.lyric;
  },
  wxList:state=>{
    return state.wxList;
  },
  sportList:state=>{
    return state.sportList;
  }


};

const mutations = {
  banner(state, data) {
    state.BannerList = data
  },
  news(state, data) {
    state.IndexNewsList = data
  },
  article(state, data) {
    state.artice = data
  },
  joke(state, data) {
    state.joke = data
  },
  video(state, data) {
    state.video = data;
  },
  musicList(state, data) {
    state.musicList = data;
  },
  music(state, data) {
    state.music = data;
  },
  musicPlayer(state, data) {
    state.musicPlayer = data;
  },
  lyric(state, data) {
    state.lyric = data;
  },
  wxList(state,data){
    state.wxList=data;
  },
  sportList(state,data){
    state.sportList=data;
  }
}

const actions = {
  bannerAction({commit}) {
    // 连接后台,获取首页banner数据
    api.banner()
      .then(res => {
        commit('banner', res.ads)
      }).catch(err => console.log(err))
  },

  newsAction({commit}) {
    // 获取首页新闻列表
    var data = {
      page: 20,
      type: 0
    }
    api.new_list(data)
      .then(res => {
        commit('news', res.data)
      }).catch(err => console.log(err))
  },
  articleAction({commit}, id) {
    var data = {
      postid: id
    }
    api.article(data)
      .then(res => {
        Indicator.close();
        commit('article', res.data)
      }).catch(err => console.log(err))
  },
  jokeAction({commit}) {
    var data = {
      page: 10
    }
    api.joke(data)
      .then(res => {
        Indicator.close();
        commit('joke', res.data)
      }).catch(err => console.log(err))
  },
  videoAction({commit}) {
    var data = {
      type: 0,
      page: 0
    };
    api.video_type(data)
      .then(function (res) {
        commit('video', res.data)
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  },
  musicListAction({commit}) {
    var data = {};
    api.music_list(data)
      .then(function (res) {
        commit('musicList', res.rank.list)
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  },
  musicAction({commit}, id) {
    var data = {};
    api.music(data, id)
      .then(function (res) {
        commit('music', res);
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  },
  musicPlayerAction({commit}, id) {
    var data = {};
    api.music_player(data, id)
      .then(function (res) {
        commit('musicPlayer', res);
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  },
  lyricAction({commit}, id) {
    var data = {};
    api.music_lyric(data, id)
      .then(function (res) {
        commit('lyric', res);
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  },
  wxListAction({commit}) {
    var data = {
      ps: 10
    }
    api.WxUrl(data)
      .then(function (res) {
        commit('wxList', res);
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  },
  sportListAction({commit}){
    var data={
      page:0,
      type:3
    }
    api.new_list(data)
      .then(function (res) {
        commit('sportList', res.data);
        Indicator.close();
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
