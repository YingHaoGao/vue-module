<template>
<div class="videoNow" :style="info.style">
	<div class="title">
		<span :style="info.titleStyle">{{info.title}}</span>
		<!-- <ul>
			<li v-for="(item,idx) in info.buttons" :key="item.target" >
				<img  
					:src="item.isAction ? item.activeIcon : item.icon" 
					:style="item.style"
					@click="iconClick(info,item)" 
					:alt="item.alt">
			</li>
			<ShareCom/>
		</ul> -->
	</div>
	<div class="content">
		<div class="img">
			<img :src="info.videoImg">
			<span class="total" v-if="!!info.price">￥{{info.price}}</span>
		</div>
		<div>
			<div class="price" v-if="!!info.price">本片 <span>{{info.price}}</span> 元({{info.isVipPrice ? "" : "非"}}VIP价)</div>
			<span class="viewCounts" v-if="viewCounts>0">
				<img src="../../assets/icon/video.png"" align="middle">
				&nbsp;{{viewCounts}}
			</span>
		</div>
	</div>
	<div v-if="info.isVip" class="pay">
		<div v-if="info.codeImg" class="codeImg">
			<img :src="info.codeImg"/>
		</div>
		<div class="payCon">
			<div class="buyVipBtn" @click="buyVipClick(info)">开通VIP会员免费观看</div>
			<div class="payText">支付宝或微信扫码，支付成功刷新页面即可观看</div>
		</div>
	</div>
	<slot name="dramas"></slot>
</div>
</template>

<style scoped>
	.videoNow{
		width: 340px;
		box-sizing: border-box;
		background: #10131A;
	}
	.title{
		box-sizing: border-box;
		padding: 10px 15px;
		border: solid 1px #1E212A;
		position: relative;
		text-align: left;
	}
	.title>span,.contentTitle{
		color: #fff;
		font-size: 18px;
		font-weight: 500;
		cursor: pointer;
	}
	.title>ul{
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translate( 0, -50%);
		overflow: hidden;
		margin: 0px;
	}
	.title>ul li{
		float: left;
		list-style: none;
		cursor: pointer;
	}
	.title>ul img{
		width: 20px;
		height: 20px;
		margin-right: 10px;
		cursor: pointer;
	}
	.content{
		box-sizing: border-box;
		padding: 10px 15px;
		text-align: left;
		overflow: hidden;
	}
	.content .total{
		position: absolute;
		bottom: 5px;
		right: 5px;
		background: #F36264;
		padding: 1px 3px;
		color: #fff;
		font-size: 10px;
	}
	.content>img,.content>div{
		float: left;
	}
	.content>.img{
		width: 120px;
		height: 70px;
		position: relative;
	}
	.content>.img>img{
		width: 100%;
		height: 100%;
	}
	.content>div{
		box-sizing: border-box;
		padding-left: 10px;
	}
	.contentTitle{
		font-size: 13px;
		padding-bottom: 20px;
	}
	.price{
		color: #DAAD75;
		line-height: 33px;
		height: 33px;
	}
	.price span{
		color: #F8002C;
	}
	.viewCounts{
		display: block;
		font-size: 10px;
		color: rgba(255, 255, 255, .7);
	}
	.viewCounts>img{
		width: 12px;
		height: 12px;
		transform: translate(0, -5px);
	}
	.pay{
		width: 100%;
		padding: 10px 20px;
		box-sizing: border-box;
		background: #161A21;
		overflow: hidden;
	}
	.pay .codeImg,.pay .payCon{
		float: left;
	}
	.codeImg{
		width: 100px;
		height: 100px;
		margin-right: 20px;
	}
	.codeImg>img{
		width: 100%;
		height: 100%;
	}
	.payCon{
		height: 100px;
		width: 190px;
	}
	.payCon .buyVipBtn{
		text-align: center;
		width: 190px;
		height: 30px;
		background-image: linear-gradient(to bottom, #F1D09F 0%, #CCA16A 100%);
		line-height: 30px;
		font-size: 10px;
		border-radius: 25px;
		margin-bottom: 20px;
		cursor: pointer;
	}
	.payCon .payText{
		font-size: 10px;
	}
</style>

<script>
import ShareCom from './../zhangqi/ShareCom.vue'
import Dramas from './dramas.vue'

export default({
	props: {
		info: Object
	},
	components: { ShareCom, Dramas },
	computed: {
		viewCounts () {
			var viewCounts,
				n = this.$props.info.viewCounts;
			if(n > 10000){
				viewCounts = (n/10000).toFixed(1) + '万';
			}else{
				viewCounts = n
			}
			return n
		},
		headerNum () {
			return Math.ceil(this.$props.info.episode/30);
		}
	},
	data () {
		return {
			headerIdx: 0
		}
	},
	methods: {
		iconClick (info, item) {
			this.$emit('iconClick', { info: info, button: item });
		},
		buyVipClick (info) {
			this.$emit('buyVipClick', info);
		}
	}
});
</script>
