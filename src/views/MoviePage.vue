<template>
	<div class="MoviePage">
		<div class="topBack">
			<div class="topCon content">
				<div class="video_l">
					<VideoCom/>
					<img class="log" src="../assets/images/header/logo.png"></img>
				</div>
				<div class="video_r">
					<videoNow :info="videoObj" @iconClick="collectClick" @buyVipClick="buyVipClick"/>
					<Scenes v-if="scenesObj.list.length>0" :info="scenesObj" @scenesClick="scenesClick"/>
				</div>
				<div class="video_b">
					<PlotIntroduced :info="plptOmtrpdicedObj"/>
				</div>
			</div>
		</div>
		<div class="bottomCon content">
			<div class="imageList">
				<ImageList v-if="imageListObj.list.length>0" :info="imageListObj" @btnClick="groupClick" @movieClick="groupItemClick"/>
			</div>
			<div class="seniority">
				<Seniority v-if="seniorityInfo.list.length>0" :info="seniorityInfo" @movieClick="seniorityClick"/>
			</div>
			<img src='../assets/images/banner6.jpg'/>
		</div>
	</div>
</template>

<script>
import VideoCom from '@/components/zhangqi/VideoCom.vue'
import videoNow from '@/components/gaoyinghao/videoNow.vue'
import Scenes from '@/components/gaoyinghao/scenes.vue'
import PlotIntroduced from '@/components/gaoyinghao/plotIntroduced.vue'
import ImageList from '@/components/gaoyinghao/imageList.vue'
import Seniority from '@/components/gaoyinghao/seniority.vue'

 export default {
    name: 'moviePage',
    components: {
        VideoCom,
        videoNow,
        Scenes,
        PlotIntroduced,
        ImageList,
        Seniority
    },
    mounted () {
    	this.getData();
    },
    data () {
    	var contentId = this.$route.query.contentId || 40;
    	return {
    		params: {
    			id: contentId
    		},
    		videoObj: {
		        style: {
		        	width: '100%'
		        },
		        isVip: true,
		        price: 0,
		        titleStyle: {
		        	display: "inline-block"
		        },
		        buttons: [
		          {
		            icon: require('../assets/icon/collect.png'),
		            activeIcon: require('../assets/icon/boutique.png'),
		            alt: '收藏',
		            target: 'shoucang',
		            isAction: false
		          }
		        ]
		    },
		    scenesObj: {
		    	contentStyle: {
		    		width: '100%',
		    		height: '469px'
		    	},
		    	title: '精彩花絮',
		      	list: []
		    },
		    plptOmtrpdicedObj: {
		    	title: '剧情简介',
		        icon: require('../assets/icon/word.png'),
		        isShow: true,
		        isModuleShow: false,
		        titleStyle: {
            		"font-size": '10px',
            		"color": '#42B0BD'
            	},
		        coverStyle: {
		        	width: '100px',
		        	height: '125px'
		        },
		        contentStyle: {
		        	background: 'rgb(43, 51, 63)',
		        	"font-size": "10px"
		        },
		        moduleStyle: {
		        	color: 'blue'
		        },     
		        tages: [],
		        list: {}
		    },
		    imageListObj: {
		  		ISSHOW: false,
		    	type: 'guess',
		        title: '猜你喜欢',
		        icon: require('../assets/icon/guess.png'),
		        titleBtn: '',
		        button: [
		        	{
		        		name: '换一组',
		        		target: 'group',
		        		icon: require('../assets/icon/group.png'),
		        		iconStyle: {
		        			width: '13px',
		        			height: '13px',
		        			"margin-right": '5px'
		        		}
		        	}
		        ],
		        list: []
		    },
		    seniorityInfo: {
	          title: '电影排行榜',
	          titleStyle: {
	          	"padding": '20px 40px',
	          	"margin-bottom": '0px'
	          },
	          icon: require('../assets/icon/seniority.png'),
	          type: 'image',
	          list: []
	        },
			horizontalImage: require('../assets/images/banner6.jpg'),
            pageNum: 0, // 第几页
            totalPages: 0, // 一共有几页
            dussVideoLocality: '',
			dussVideoType: ''    	
		}
    },
    methods: {
    	//获取数据
    	getData () {
    		var that = this,
    			params = that.params;

    		that.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    id:params.id,
                    containVideoFile: true
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
            	var data = res.data.result.content[0];
            	var protagonist = data.protagonist.split('、');
            	var protagonistArr = [];
            	var tagesStyle = {
		    		"border-radius": "10px",
		    		"font-size": "10px",
		    		"padding": "3px 10px"
		    	};

            	if(!!data.protagonist){
            		protagonist.map(function(item){
            			protagonistArr.push({ name: item, isActor: true });
            		})
            	}

            	that.horizontalImage = data.horizontalImage;
            	that.plptOmtrpdicedObj.name = data.videoName;
            	that.plptOmtrpdicedObj.grade = data.score;
            	that.plptOmtrpdicedObj.cover = `/realNet/file/uploads/${data.verticalImage}`;
            	that.plptOmtrpdicedObj.list = {
            		'导演': [ { name: data.director } ],
		            '主演': protagonistArr,
		            '看点': { isTarges: true },
		            '简介': [ { name: data.description} ]
            	};
            	that.plptOmtrpdicedObj.tages = [
            		{ title: data.videoLocalityValue, style: tagesStyle },
            		{ title: data.videoTypeValue, style: tagesStyle },
            		{ title: data.language, style: tagesStyle },
            		{ title: data.keywords, style: tagesStyle },
            		{ title: data.year, style: tagesStyle }
            	];

				that.getPayImg(data);
				that.dussVideoLocality = data.videoLocality
				that.dussVideoType = data.videoType
    			that.getDuessList();
    			that.getSeniorityList(data.videoLocality, data.videoType, data.leaderboardSortOrder);
    		})
    	},
    	//获取“猜你喜欢”数据
    	getDuessList () {
    		var that = this;

    		that.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    videoLocality: that.dussVideoLocality,
                    videoType: that.dussVideoType,
					pageSize: 4,
					pageNum: that.pageNum
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
            	var data = res.data.result.content;
            	that.imageListObj.list = data.map(item => {
            		return {
                            id: item.id,
                            img: `/realNet/file/uploads/${item.verticalImage}`,
                            name: item.videoName ? item.videoName : '',
                            intro: item.description ? item.description : '',
                            grade: item.score ? item.score : 8
                        };
				})
				that.totalPages = res.data.result.totalPages;
            })
    	},
    	//获取排行榜数据
    	getSeniorityList (videoLocality, videoType, leaderboardSortOrder) {
    		var that = this;

    		that.$axios({
                url: "/realNet/video/getVideoInfos",
                params: {
                    videoLocality: videoLocality,
                    videoType: videoType,
                    pageSize: 4,
                    orderByField: leaderboardSortOrder
                },
                headers: {'token': '123456789'},
                methods: "get"
            }).then(function(res){
            	var data = res.data.result.content;
            	that.seniorityInfo.list = data.map((item,idx) => {
            		var icon = '';

            		switch(idx){
            			case 0:
            				icon = require('../assets/icon/1.png');
            				break;
            			case 1:
            				icon = require('../assets/icon/2.png');
            				break;
            			case 2:
            				icon = require('../assets/icon/3.png');
            				break;
            			default:
            				icon = require('../assets/icon/4.png');
            				break;
            		}

            		return {
                            id: item.id,
                            icon: icon,
                            src: `/realNet/file/uploads/${item.verticalImage}`,
                            name: item.videoName ? item.videoName : ''
                        };
            	});
            })
    	},
    	//获取“正在播放”数据
    	getPayImg ($data) {
    		var that = this;

    		that.$axios({
      		    url: "/realNet/pay/qrcode",
      		    params: {
      		        videoInfoId: $data.id
      		    },
      		    headers: {'token': '123456789'},
      		    methods: "get"
      		}).then(function(res){
      			// switch($data.chargeType){
         //    		case 1:
         //    			that.videoObj.isVipPrice = false;
         //    			break;
         //    		case 2:
         //    			that.videoObj.isVipPrice = true;
         //    			break;
         //    		case 3:
         //    			that.videoObj.isVipPrice = false;
         //    			break;
         //    		default:

         //    			break;
         //    	};

         //    	that.videoObj.title = $data.videoName;
         //    	that.videoObj.price = $data.money;
         //    	that.videoObj.codeImg = `/realNet/file/uploads/${res.data}`;
         //    	that.videoObj.videoImg = `/realNet/file/uploads/${$data.horizontalImage}`;
      		})
            	switch($data.chargeType){
            		case 1:
            			that.videoObj.isVipPrice = false;
            			break;
            		case 2:
            			that.videoObj.isVipPrice = true;
            			break;
            		case 3:
            			that.videoObj.isVipPrice = false;
            			break;
            		default:

            			break;
            	};

            	that.videoObj.title = $data.videoName;
            	that.videoObj.price = $data.money;
            	that.videoObj.videoImg = `/realNet/file/uploads/${$data.horizontalImage}`;
    	},
        //“电影花絮”点击事件
        scenesClick (option){
            cosnole.log(option)
        },
    	//“猜你喜欢”点击换一组事件
    	groupClick (btnInfo) {
			let that = this;
    		if(btnInfo.target === 'group'){
				if(that.pageNum >= that.totalPages){
					that.pageNum = 0;
				}
				that.getDuessList();
				that.pageNum++;
    		}
    	},
    	//“猜你喜欢”电影点击事件
    	groupItemClick (info) {
    		console.log(info)
    	},
    	//点击收藏事件
    	collectClick (option) {
    		if(option.button.target === 'shoucang'){
    			console.log('点击收藏事件')
    		}
    	},
    	//点击开通VIP事件
    	buyVipClick (info) {
    		console.log(info)
    	},
    	//排行榜内电影点击事件
    	seniorityClick (info) {
    		console.log(info)
    	},
    }
}

</script>

<style scoped>
.topBack{
	width: 100%;
	background: rgb(43, 51, 63);
}
.video_l{
	width: 1280px;
	float: left;
	position: relative;
}
.video_r{
	width: 350px;
	float: left;
	height: 776px;
	background: #10131A;
}
.video_b{
	width: 100%;
	float: left;
}
.content{
	width: 1630px;
	margin: auto;
	overflow: hidden;
}
.imageList,.seniority{
	float: left;
	margin-bottom: 20px;
}
.imageList{
	width: 1400px;
}
.seniority{
	width: 230px;
}
.bottomCon{
	margin-bottom: 20px;
}
.log{
	position: absolute;
	top: 10px;
	right: 10px;
}
</style>
