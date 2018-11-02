<template>
	<div class="content">
		<div class="title" :style="info.titleStyle">
			{{info.title}}
		</div>
		<div class="itemCon" :style="info.contentStyle">
			<div class="item" v-for="(item,idx) in info.list" :key="idx" @click="scenesClick(item)">
				<div class="img" :style="item.imgStyle">
					<img :src="item.videoImg">
					<span class="total" v-if="item.total.length > 0" v-for="totalItem in item.total" :key="totalItem.title" :style="totalItem.totalStyle">{{totalItem.title}}</span>
				</div>
				<div class="text"> 
					<span class="contentTitle" :style="item.titleStyle">{{item.title}}</span>
					<div class="price" v-if="!!item.price">本片 <span>{{item.price}}</span> 元(非VIP价)</div>
					<div class="price" v-if="!item.price"></div>
					<span class="viewCounts">
						<img :src="item.icon" align="middle">
						&nbsp;{{item.viewCounts>10000 ? (item.viewCounts/10000).toFixed(1) + '万' : item.viewCounts}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.content{
		box-sizing: border-box;
		padding: 10px 15px;
		text-align: left;
		overflow: hidden;
		width: 340px;
		box-sizing: border-box;
		background: #10131A;
	}
	.itemCon{
		width: 100%;
		overflow: auto;
	}
	.itemCon::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .itemCon::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .itemCon::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
	.content .total{
		position: absolute;
		bottom: 5px;
		right: 5px;
		background: rgba(0, 0, 0, .5);
		border-radius: 10px;
		padding: 1px 3px;
		color: #fff;
		font-size: 10px;
	}
	.title{
		padding-bottom: 10px;
		color: #fff;
	}
	.item{
		overflow: hidden;
		margin-bottom: 10px;
	}
	.content>.itemCon>.item>img,.content>.itemCon>.item>div{
		float: left;
	}
	.content>.itemCon>.item>.img{
		width: 120px;
		height: 70px;
		position: relative;
	}
	.content>.itemCon>.item>.img>img{
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.content>.itemCon>.item>.text{
		box-sizing: border-box;
		padding-left: 10px;
	}
	.contentTitle{
		font-size: 13px;
		padding-bottom: 20px;
		cursor: pointer;
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
</style>

<script>
export default({
	props: {
		info: Object
	},
	data () {
		return {}
	},
	methods: {
		scenesClick (info) {
			this.$emit('scenesClick', { info: info });
		}
	}
});
</script>