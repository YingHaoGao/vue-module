<template>
<div class="plotIntroduced">
	<div class="title" v-if="!isNotTitle" :style="info.isTitle" :class="{ notShow: !info.isShow }">
		<span class="showTitle">
			<span class="name">{{info.name}}</span>
			<span class="grade">{{info.grade}}</span>
			<i class="icon"><img :src="info.icon"></i>
			<span :style="info.titleStyle">{{info.title}}</span>
			&nbsp;&nbsp;
			<i class="upDownIcon" :class="{ downIcon: info.isShow }"></i>
		</span>
		<span class="tags" v-for="(item,idx) in info.tages" :style="item.style" :key="idx">{{item.title}}</span>
	</div>
	<div class="content" :class="{ notShow: !info.isShow }">
		<div class="imgCon" :style="info.coverStyle">
			<div class="img">
				<img :src="info.cover" align="top">
				<span v-if="info.total_l" class="total_l" :style="info.total_lStyle">{{info.total_l}}</span>
				<span v-if="info.total_r" class="total_r" :style="info.total_rStyle">{{info.total_r}}</span>
			</div>
		</div>
		<div class="introduced" :style="info.contentStyle">
			<slot name="title"></slot>
			<div class="div" v-for="(item,key) in info.list" :key="key">
				<div>{{key}}：</div>
				<div class="span" v-if="!item.isTarges" v-for="(_item,_idx) in item" :key="_idx">
					<b>{{_item.name}}</b>&nbsp;
				</div>
				<div v-if="!!item.isTarges" class="tags span" :style="_item.style" v-for="(_item,_idx) in info.tages" :key="_idx">{{_item.title}}</div>
			</div>
		</div>
	</div>
	<div v-if="info.isModuleShow" 
		class="moduleContent" 
		:class="[info.isModuleShow ? '' : 'right100']"
		:style="info.moduleStyle"
		@click="moduleClick">
		{{info.moduleContent}}
	</div>
</div>
</template>

<style scoped>
	*{
		color: #626873;
	}
	.plotIntroduced{
		box-sizing: border-box;
		padding: 20px;
		background: rgb(43, 51, 63);
		text-align: left;
		position: relative;
	}
	.tags{
		display: inline-block;
		padding: 5px 10px;
		border-radius: 5px;
		background: LightYellow;
		line-height: 18px;
		margin: 0px 5px;
	}
	.title{
		padding-bottom: 20px;
		border-bottom: solid 1px gray;
	}
	.title.notShow{
		padding-bottom: 0px;
		border-bottom: none;
	}
	.showTitle{
		color: #398080;
		cursor: pointer;
		padding-right: 20px;
	}
	.showTitle .icon{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.showTitle .icon img{
		width: 100%;
	    height: 100%;
	    /*transform: translate(0, 5px);*/
	}
	i.upDownIcon{
		display: inline-block;
		width: 7px;
		height: 7px;
		border-top: solid 2px #2A3039;
		border-left: solid 2px #2A3039;
		transform: rotate(45deg);
		transition: all 300ms linear 0s;
	}
	i.downIcon{
		transform: rotate(225deg) !important;
	}
	.content{
		box-sizing: border-box;
		/*border-top: solid 1px #2A3039;*/
		padding-top: 20px;
		display: table;
		/*margin-top: 20px;*/
		overflow: hidden;
	}
	.content .imgCon,.content .introduced{
		float: left;
		display: table-cell;
	}
	.content.notShow{
		height: 0px !important;
		padding-top: 0px;
		margin-top: 0px;
		border-top: none;
	}
	.imgCon{
		width: calc(50% - 20px);
	}
	.img{
		display: inline-block;
		position: relative;
	}
	.img img{
		width: 100%;
		height: 100%;
	}
	.total_l,.total_r{
		padding: 3px 10px;
		font-size: 10px;
		color: #fff;
		background: rgba(0,0,0, .5);
		border-radius: 10px;
		position: absolute;
		bottom: 10px;
	}
	.total_l{
		left: 10px;
	}
	.total_r{
		right: 10px;
	}
	.introduced{
		display: inline-block;
		position: relative;
		width:  calc(50% - 20px);
	}
	.moduleContent.right100{
		right: -100%;
	}
	.moduleContent{
		position: absolute;
		top: 0px;
		right: 0%;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0, .7);
		color: #fff;
		box-sizing: border-box;
		padding: 10px 20px;
		overflow: auto;
		transition: all 3000ms ease 0s;
	}
	.introduced>div{
		padding: 5px 0px 0px 20px;
		text-align: left;
	}
	.introduced>div div{
		float: left;
		display: inline-block;
	}
	.div{
		overflow: hidden;
		margin-bottom: 10px;
	}
	.introduced>div .span{
		/*max-width: 30%;*/
	}
	.introduced>div b{
		color: #fff;
	}
	.grade{
		font-size: 20px;
		color: #FF1E13;
		padding-right: 10px;
		border-right: solid 1px #ccc;
	}
	.name{
		font-size: 20px;
	    font-weight: 500;
	    color: #fff;
	    padding-right: 10px;
	}
</style>

<script>
export default({
	props: {
		info: Object
	},
	computed: {
		isNotTitle () {
			return !!this.$props.info.isNotTitle;
		}
	},
	data () {
		return {}
	},
	methods: {
		/*module关闭详情回调*/
		moduleClick () {
			this.$emit('close');
		}
	}
});
</script>
