<template>
<div class="seniority" :style="info.style">
	<div class="title" :style="info.titleStyle">
		<img :src="info.icon" class="icon">
		<b>{{info.title}}</b>
	</div>
	<ul v-if="info.type == 'name'" class="list" :style="info.contentStyle">
		<li class="movie" v-for="(item, idx) in info.list" :key="item.id" :style="info.listStyle">
			<span class="index">{{idx + 1}}</span>
			<span class="name" @click="movieClick(item)" :style="item.style">
				{{item.name}}
			</span>
			<span class="grade">{{item.grade}}</span>
		</li>
	</ul>
	<ul v-if="info.type == 'image'" class="list_img" :style="info.contentStyle">
		<li class="movie" v-for="(item, idx) in info.list" :key="item.id" :style="info.listStyle" @click="movieClick(item)">
			<div class="index_img">
				<span>{{idx + 1}}</span>
				<img class="imgIcon" :src="!!item.icon ? item.icon : defaultImgIcon ">
			</div>
			<span class="name_img" :style="item.style">{{item.name}}</span>
			<img :src="item.src">
		</li>
	</ul>
</div>
</template>

<style scoped>
	ul,li{ padding:0;margin:0;list-style:none}
	a{ text-decoration:none; }
	*{ text-align: left; }
	.seniority{
		width: 185px;
	}
	.title{
		position: relative;
		box-sizing: border-box;
		padding-left: 40px;
		margin-bottom: 30px;
	}
	.title>b{
		font-size: 24px;
	}
	.icon{
		width: 27px;
		height: 27px;
		position: absolute;
		top: 50%;
		left: 0px;
		transform: translate(0, -50%);
	}
	.list{
		overflow: hidden;
	}
	.list,.list_img{
		display: block;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 5px 0px;
		background: #e7e7e7;
	}
	.list>li{
		display: block;
		padding: 5px;
		cursor: pointer;
		overflow: hidden;
		position: relative;
	}
	.list_img>li{
		display: block;
		height: 85px;
		margin-bottom: 10px;
		cursor: pointer;
		overflow: hidden;
		position: relative;
	}
	.list_img{
		background: none;
	}
	.index{
		display: inline-block;
		width: 17px;
		height: 17px;
		border-radius: 50%;
		color: #fff;
		font-weight: 700;
		line-height: 17px;
		text-align: center;
		margin-right: 10px;
		background: #CCD3D2;
		font-size: 10px;
		line-height: 19px;
	}
	.index_img{
		width: 50px;
		height: 100%;
		border-radius: 0px 55% 55% 0px;
		overflow: hidden;
		position: absolute;
		left: 0px;
		top: 0px;
		/*font-size: 30px;
		color: #fff;
		line-height: 140px;
		font-weight: 500;
		text-align: right;
		padding-right: 20px;
		box-sizing: border-box;*/
	}
	.movie>.index_img{
		background: #C0E1E6;
	}
	.movie>.index_img>span{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate( -50%, -50%);
		z-index: 10;
		color: #fff;
		font-weight: 500;
		font-size: 30px;
	}
	.movie>.index_img>.imgIcon{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	.movie:first-child>.index,.movie:first-child>.index_img{
		background: #FE4B5D;
	}
	.movie:nth-child(2)>.index,.movie:nth-child(2)>.index_img{
		background: #FF9D48;
	}
	.movie:nth-child(3)>.index,.movie:nth-child(3)>.index_img{
		background: #FFD66D;
	}
	.movie>img{
		width: 100%;
		height: auto;
	}
	.name_img{
		position: absolute;
		left: 55px;
		bottom: 7px;
		color: #fff;
		font-weight: 400;
	}
	.name_img{
		color: #fff;
		font-weight: 400;
	}
	.name{
		font-size: 10px;
		color: #333;
		cursor: pointer;
	}
	.name:hover{
		color: blue;
	}
	.grade{
		float: right;
		color: #FB2C23;
		line-height: 20px;
	}
</style>

<script>
export default({
	props: {
		info: Object
	},
	data () {
		return {
			defaultImgIcon: require('../../assets/icon/special.png')
		}
	},
	methods: {
		/*点击电影事件 参数： info - object - 电影数据对象*/
		movieClick (info) {
			this.$emit('movieClick', info)
		}
	}
});
</script>
