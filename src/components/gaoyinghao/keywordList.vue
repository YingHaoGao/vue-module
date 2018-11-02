<template>
<div class="keywordList" v-if="info != {}">
	<div class="title">
		<b style="cursor:pointer" :style="info.titleStyle" @click="moreClick(info)">{{info.title}}</b>
		<span :style="info.moveStyle" @click="moreClick(info)">{{move}}</span>
	</div>
	<div class="list">
		<span class="moreType" 
			v-for="(item, idx) in info.list" 
			:class="{ active: !!isRadio ? (item.target == targetActive) : (list.indexOf(item.target) >= 0) }" 
			:style="info.movieStyle" 
			:key="idx" 
			@click="listClick(item)">{{item.name}}</span>
	</div>
</div>
</template>

<style scoped>
	.keywordList{
		
	}
	.title{
		text-align: left;
	}
	.title b{
		padding: 0px 5px;
		font-size: 20px;
		font-weight: 600;
	}
	.title span{
		font-size: 15px;
		color: #ccc;
		cursor: pointer;
	}
	.list{
		text-align: left;
		padding: 20px 0px;
	}
	.moreType{
		padding: 0px 5px;
		display: inline-block;
		margin: 0px 5px;
		cursor: pointer;
	}
	.moreType.active,.moreType:hover{
		color: #46B1C0;
	}
</style>

<script>
export default({
	props: {
		info: Object
	},
	computed: {
		move () {
			return !!this.$props.info.move ? this.$props.info.move : '更多 >';
		},
		isRadio () {
			return this.$props.info.isRadio;
		}
	},
	watch: {
		'info.list': function() {
			this.setActive();
		}
	},
	data () {
		return {
			list: [],
			objList: [],
			targetActive: ''
		}
	},
	methods: {
		/*添加默认选中*/
		setActive () {
			var that = this,
				list = that.$props.info.list,
				activeList = [];

			if(!!list && list instanceof Array){
				list.map(function(item){
					if(item.isActive){
						that.list.push(item.target);
						that.objList.push(item);
						that.targetActive = item.target;
					}
				})
			}
		},
		/*点击 ‘更多’ 回调*/
		moreClick (info) {
			this.$emit('moreClick', info);
		},
		/*点击单个类型  参数： item - obj - 单个类型对象*/
		listClick (item) {
			var nIdx = this.list.indexOf(item.target),
				callback;

			if(this.isRadio){
				this.targetActive = item.target;
				callback = item;
			}else{
				if(nIdx < 0){
					this.list.push(item.target);
					this.objList.push(item);
				}else{
					this.list.splice(nIdx, 1);
					this.objList.splice(nIdx, 1);
				}
				callback = this.objList;
			}
			//返回 标签类型数组
			this.$emit('targetChange', callback);
		}
	}
});
</script>
