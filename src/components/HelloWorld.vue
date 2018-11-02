<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div> -->
  <div>
    <PlotIntroduced :info="info5" @close="info5.isModuleShow = false">
      <template slot="title">
        <b>电影</b>
        <b @click="info5.isModuleShow = true">内容</b>
      </template>
    </PlotIntroduced>
    
  <ImageList :info="info1" @moreClick="info1MoreClick" @movieClick="info1MovieClick" @recommendClick="recommendClick" @btnClick="btnClick"/>
    <!--
    <KeywordList :info="info4" @moreClick="info4MoreClick" @targetChange="info4TargetChange"/>
    <Seniority :info="info6" @movieClick="info6MoreClick"/>
    <Seniority :info="info7" @movieClick="info6MoreClick"/>
    <PlotIntroduced :info="info5"/>
    <ImageList :info="info2" @moreClick="info1MoreClick" @movieClick="info1MovieClick"/>
    <ImageList :info="info3" @moreClick="info1MoreClick" @movieClick="info1MovieClick"/>
    <Scenes :info='info11' @scenesClick="scenesClick"/>
    <VideoNow :info='info8' 
      @iconClick="iconClick" 
      @movieClick="info8MoreClick"
      @buyVipClick="buyVipClick">
      <template slot="dramas">
      	<Dramas :info="info9" @episodeItem="episodeItem"/>
      </template>
  	</VideoNow>
    -->
  </div>
</template>

<script>
import ImageList from './gaoyinghao/imageList.vue'
import KeywordList from './gaoyinghao/keywordList.vue'
import PlotIntroduced from './gaoyinghao/plotIntroduced.vue'
import VideoNow from './gaoyinghao/videoNow.vue'
import Seniority from './gaoyinghao/seniority.vue'
import Dramas from './gaoyinghao/dramas.vue'
import Scenes from './gaoyinghao/scenes.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      info1: {
        type: 'vip',
        title: '图片列表1',
        icon: require('../assets/icon/host.png'),
        titleBtn: '测试',
        isSeniority: true,
        divisor: 6,
        button: [
        	{
        		name: '换一组'
        	}
        ],
        recommendList: [
          {
            id: 'sww',
            name: '甩尾王'
          },
          {
            id: 'zjwk',
            name: '拯救悟空'
          },
          {
            id: 'xfmsl',
            name: '幸福马上来'
          }
        ],
        seniorityInfo: {
          title: '排行榜',
          icon: require('../assets/icon/comedy.png'),
          type: 'name',
          list: [
            {
              id: '2364',
              name: '电影'
            },
            {
              id: '2374',
              name: '电影'
            },
            {
              id: '2834',
              name: '电影'
            },
            {
              id: '2324',
              name: '电影'
            },
            {
              id: '2334',
              name: '电影'
            }
          ]
        },
        list: [
          {
            id: '232323',
            img: require('../assets/icon/free.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4,
            total: '50集',
            imgStyle: {
              height: '300px'
            },
            total: '40:00'
          },
          {
            id: '232342',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '223423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '323423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23223',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '233',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23234',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
        ]
      },
      info2: {
        type: 'special',
        title: '图片列表2',
        icon: require('../assets/icon/host.png'),
        list: [
          {
            id: '232323',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '232342',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '223423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '323423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23223',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '233',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23234',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
        ]
      },
      info3: {
        type: 'boutique',
        title: '图片列表2',
        icon: require('../assets/icon/host.png'),
        list: [
          {
            id: '232323',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '232342',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '223423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '323423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23223',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '233',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23423',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
          {
            id: '23234',
            img: require('../assets/icon/collect.png'),
            name: '电影',
            intro: '这是一部不错的电影',
            grade: 8.4
          },
        ]
      },
      info4: {
        type: 'pianku',
        title: '片库',
        move: 'bbb',
        list: [
          {
            name: '近期热门',
            target: 'host'
          },
          {
            name: '精品推荐',
            target: 'boutique'
          },
          {
            name: '免费电影',
            target: 'free'
          },
          {
            name: '会员专享',
            target: 'vip'
          },
          {
            name: '爆笑喜剧',
            target: 'comedy'
          }
        ]
      },
      info5: {
        title: '剧情简介',
        icon: require('../assets/icon/host.png'),
        cover: require('../assets/icon/moreImg.png'),
        isShow: true,
        isNotTitle: true,
        total_r: '全集50',
        isModuleShow: false,
        moduleContent: '按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方',
        coverStyle: {
        	width: '100px',
        	height: '150px'
        },
        moduleStyle: {
        	color: 'blue'
        },     
        tages: [
          {
            title: '灾难',
            target: 'zainan'
          },
          {
            title: '美国',
            target: 'meiguo'
          },
          {
            title: '2018',
            target: '2018'
          }
        ],
        list: {
          '导演': [ { name: '高英豪' }, { name: '高英豪' } ],
          '主演': [ { name: '高英豪', isActor: true }, { name: '高英豪', isActor: true } ],
          '其他': [ { name: '其他展示内容', isActor: true } ],
          '简介': [ { name: '按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方按时发大水范德萨尽快发货就卡萨发哈世纪东方'} ],
        }
      },
      info6: {
        title: '排行榜',
        icon: require('../assets/icon/comedy.png'),
        type: 'name',
        list: [
          {
            id: '2364',
            name: '电影'
          },
          {
            id: '2374',
            name: '电影'
          },
          {
            id: '2834',
            name: '电影'
          },
          {
            id: '2324',
            name: '电影'
          },
          {
            id: '2334',
            name: '电影'
          }
        ]
      },
      info7: {
        title: '排行榜',
        icon: require('../assets/icon/comedy.png'),
        type: 'image',
        list: [
          {
            id: '2364',
            name: '电影',
            icon: require('../assets/icon/collect.png'),
            src: require('../assets/icon/moreImg.png'),
            style: {
              fontSize: '20px',
              color: 'red'
            }
          },
          {
            id: '2374',
            name: '电影',
            icon: require('../assets/icon/boutique.png'),
            src: require('../assets/icon/moreImg.png')
          },
          {
            id: '2834',
            name: '电影',
            icon: require('../assets/icon/comedy.png'),
            src: require('../assets/icon/moreImg.png')
          },
          {
            id: '2324',
            name: '电影',
            src: require('../assets/icon/moreImg.png')
          },
          {
            id: '2334',
            name: '电影',
            src: require('../assets/icon/moreImg.png')
          }
        ]
      },
      info8: {
        id: '23424',
        title: '电视剧',
        viewCounts: 40000,
        img: require('../assets/icon/moreImg.png'),
        isVip: true,
        codeUrl: 'http://www.xsyrz.cn',
        episode: 63,
        nowEpisode: 4,
        price: 5,
        buttons: [
          {
            icon: require('../assets/icon/collect.png'),
            activeIcon: require('../assets/icon/boutique.png'),
            alt: '分享',
            target: 'fenxiang',
            isAction: false
          },
          {
            icon: require('../assets/icon/collect.png'),
            activeIcon: require('../assets/icon/boutique.png'),
            alt: '其他',
            target: 'qita',
            isAction: true
          }
        ]
      },
      info9: {
    		episode: 63,
    		nowEpisode: 4
      },
      info11: {
      	title: '精彩花絮',
      	list: [
      		{
      			viewCounts: 40000,
        		videoImg: require('../assets/icon/moreImg.png'),
        		title: '花絮',
				total: [
					{
						title: '20：00'
					}
				]
      		},
      		{
      			viewCounts: 40000,
        		videoImg: require('../assets/icon/moreImg.png'),
        		title: '花絮',
				total: [
					{
						title: '20：00'
					}
				]
      		}
      	]
      }
    }
  },
  components: { ImageList, KeywordList, PlotIntroduced, VideoNow, Seniority, Dramas, Scenes },
  props: {
    msg: String
  },
  methods: {
    /*图片列表 点击 ‘更多’ 回调*/
    info1MoreClick (type) {
      // this.info1.type= 'vip';
      this.info1.list[1].name = 'aaaa';
      this.info1.nameStyle = {
          color: 'black'
        },
      console.log(type);
    },
    /*图片列表 点击右侧按钮 回调*/
    btnClick (info) {
    	console.log(info);
    },
    /*点击“更多”左侧推荐电影名称的回调*/
    recommendClick (info) {
      console.log(info);
    },
    /*图片列表 点击每个电影的回调*/
    info1MovieClick (info) {
      console.log(info);
    },
    /*关键字列表 点击 ‘更多’ 回调*/
    info4MoreClick (type) {
      this.info4.move = 'a'
      console.log(type);
    },
    /*关键字列表 修改类型列表回调*/
    info4TargetChange (list) {
      console.log(list);
    },
    /*排行榜点击电影回调*/
    info6MoreClick (info) {
      console.log(info);
    },
    /*正在播放电影点击回调*/
    info8MoreClick (info) {
      this.info8.viewCounts = 100;
      this.info9.episode = 100;
      console.log(info)
    },
    /*正在播放电影右上角按钮点击回调*/
    iconClick (option) {
      console.log(option)
    },
    /*点击开通VIP按钮回调*/
    buyVipClick (info) {
      console.log(info);
    },
    /*点击集数回调*/
    episodeItem (option) {
      console.log(option)
    },
    /*点击花絮回调*/
    scenesClick (info) {
    	console.log(info)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
