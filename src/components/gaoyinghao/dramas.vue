<template>
    <div class="episode" :style="info.episodeStyle">
		<div class="headerList" :style="info.headerStyle">
			<div class="headerItemCon">
				<span 
					class="episodeItem"
					style="background: none;" 
					:class="{ episodeAtiv: idx == headerIdx }" 
					v-for="(item,idx) in headerNum" 
					:style="info.headerItemStyle"
					:key="idx"
					@click="headerClick(idx)">{{idx*30 + 1}} - {{item == headerNum ? info.episode : item*30}}
				</span>
			</div>
		</div>
		<div class="episodeCon" :style="info.contentStyle">
			<span class="episodeItem"
				:class="{ episodeAtiv: (headerIdx*30 + item) == parseInt(info.nowEpisode) }"
				v-for="(item,idx) in 30"
				v-if="(headerIdx*30 + item) <= info.episode"
				:style="info.conItemStyle"
				:key="item" 
				@click="episodeItem(info, (headerIdx*30 + item))">{{(headerIdx*30 + item) < 10 ? '0' + (headerIdx*30 + item) : (headerIdx*30 + item)}}</span>
		</div>
	</div>
</template>

<script>
export default {
  props: {
  	info: Object
  },
  computed: {
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
  	headerClick (idx) {
		this.headerIdx = idx;
	},
	episodeItem (info, num) {
		this.$emit('episodeItem', { info: info, num: num });
	},
  }
}
</script>

<style scoped>
.episode{
	padding-top: 10px;
	background: #10131A;
	overflow: hidden;
}
.episodeItem{
	display: inline-block;
	padding: 10px;
	border-radius: 20px;
	color: rgba( 255, 255, 255, .8 );
	cursor: pointer;
}
.episodeItem:hover,.episodeAtiv{
	background: rgba( 255, 255, 255, .2);
	color: #40CED3;
}
.episodeCon .episodeItem{
	padding: 0px;
	text-align: center;
	width: 37px;
	height: 37px;
	line-height: 37px;
	margin: 0px 0px 0px 17px;
}
.headerList{
	width: 80%;
	margin: auto;
	background: rgba( 255, 255, 255, .2);
	border-radius: 20px;
	margin-bottom: 10px;
    box-sizing: border-box;
    padding: 0px 20px;
    font-size: 15px;
    overflow-x: hidden; 
}
.headerItemCon{
	/*width: 100%;*/
	white-space : nowrap;
	overflow: auto;
}
.headerItemCon::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.headerItemCon::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.headerItemCon::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.episodeCon{
	width: 80%;
	margin: auto;
	text-align: left;
}
</style>
