import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Video from '@/components/Video'
import Article from '@/components/Article'
import Joke from '@/components/Joke'
import Videoplayer from '@/components/Videoplayer'
import MusicList from '@/components/MusicList'
import Music from '@/components/Music'
import MusicPlayer from '@/components/MusicPlayer'
import WxList from '@/components/WxList'
import WxArticle from '@/components/WxArticle'
import Sport from '@/components/Sport'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/joke',
      name: 'Joke',
      component: Joke
    },
    {
      path: '/musiclist',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/musicplayer',
      name: 'MusicPlayer',
      component: MusicPlayer
    },
    {path: '/wxlist', component: WxList},
    {path: '/wxarticle', component: WxArticle},
    { path: '/sport', component: Sport },
    {path: '/player', component: Videoplayer},
    {path: '*', redirect: '/login'}
  ]
})
