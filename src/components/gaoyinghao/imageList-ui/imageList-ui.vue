<template>
	<div class="imageList">
		<div class="imageCon">
			<div class="title">
				<div class="l_flex">
					<img class="titleIcon" :src="info.title.icon" :style="info.title.iconStyle" onerror="this.src='../../assets/images/no_thumb.png'"/>
					<b class="titleName" :style="info.title.nameStyle" v-html="info.title.name"></b>
					<span class="titleTab" v-for="(item,i) in info.title.tabList" :style="item.style" :key="item.name" @click="tabClick(item, info)" v-html="item.name"></span>
					<span class="title_l_btn" v-for="(item,i) in info.title.l_buttonList" :style="item.style" :key="item.name" @click="btnClick(item, info)">
						<img class="title_l_btn_icon" :src="item.icon" :style="item.iconStyle" onerror="this.src='../../assets/images/no_thumb.png'"/>
						<span class="title_l_btn_name" v-html="item.name"></span>
					</span>
				</div>
				<div class="r_flex">
					<span class="title_r_btn" v-for="(item,i) in info.title.r_buttonList" :style="item.style" :key="item.name" @click="btnClick(item, info)">
						<img class="title_r_btn_icon" :src="item.icon" :style="item.iconStyle" onerror="this.src='../../assets/images/no_thumb.png'"/>
						<span class="title_r_btn_name" v-html="item.name"></span>
					</span>
				</div>
			</div>
			<div class="content" :style="info.content.style">
				<div class="toLeft" 
					:style="info.content.buttonStyle" 
					v-html="info.content.l_button" 
					@click="move('left')"></div>
				<div class="contentFlex" 
					:style="{
						transition: `all ${info.content.speed || 300 }ms ${info.content.timing || 'ease'} 0s`,
						transform: `translate(${ x }px, 0)`
					}">
					<table>
						<tr>
							<td v-for="(item,i) in info.content.list"
								v-if="(info.content.imageType == 'vertical') || (i == 0 || i%2 != 0)"
								:colspan="!!item.col ? item.col : ''"
								:rowspan="!!item.row ? item.row : ''"
								:key="item.name">
								<div class="imageItem" 
									:class="[
										{ 'max_horizontal': item.col == 2 && (!item.row || item.row == 1) },
										{ 'max_vertical'  : (!item.col || item.col == 1) && item.row == 2 },
										{ 'horizontal'    : info.content.imageType == 'horizontal' },
										{ 'vertical'      : info.content.imageType == undefined || info.content.imageType == 'vertical'}
									]"
									:style="[item.style]">
									<div class="imageItemImg">
										<img class="item_img" 
											:class="[
												{ 'max_horizontal': item.col == 2 && (!item.row || item.row == 1) },
												{ 'max_vertical'  : (!item.col || item.col == 1) && item.row == 2 },
												{ 'horizontal'    : info.content.imageType == 'horizontal' },
												{ 'vertical'      : info.content.imageType == undefined || info.content.imageType == 'vertical'}
											]"
											:src="item.image" 
											:style="item.imageStyle" 
											@click="movieClick(item, info)"
											onerror="this.src='../../assets/images/no_thumb.png'"/>
									</div>
									<div class="imageItemIntro">
										<div class="item_name" 
											v-html="item.name" 
											:style="item.nameStyle"
											@click="movieClick(item, info)"></div>
										<div class="item_intro" v-html="item.intro" :style="item.introStyle"></div>
										<span class="item_grade" v-html="item.grade" :style="item.gradeStyle"></span>
									</div>
								</div>
							</td>
						</tr>
						<tr v-if="info.content.imageType == 'horizontal'">
							<td v-for="(item,i) in info.content.list"
								v-if="i > 0 && i%2 == 0"
								:key="item.name">
								<div class="imageItem" 
									:class="[
										{ 'horizontal'    : info.content.imageType == 'horizontal' },
										{ 'vertical'      : info.content.imageType == undefined || info.content.imageType == 'vertical'}
									]"
									:style="[item.style]">
									<div class="imageItemImg">
										<img class="item_img" 
											:class="[
												{ 'horizontal'    : info.content.imageType == 'horizontal' },
												{ 'vertical'      : info.content.imageType == undefined || info.content.imageType == 'vertical'}
											]"
											:src="item.image" 
											:style="item.imageStyle" 
											@click="movieClick(item, info)"
											onerror="this.src='../../assets/images/no_thumb.png'"/>
									</div>
									<div class="imageItemIntro">
										<div class="item_name" 
											v-html="item.name" 
											:style="item.nameStyle"
											@click="movieClick(item, info)"></div>
										<div class="item_intro" v-html="item.intro" :style="item.introStyle"></div>
										<span class="item_grade" v-html="item.grade" :style="item.gradeStyle"></span>
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="toRight" 
					:style="info.content.buttonStyle" 
					v-html="info.content.r_button" 
					@click="move('right')"></div>
			</div>
		</div>
		<div class="seniority"
			v-if="!!info.seniorityInfo"
			:style="{ flex: `0 0 ${!!info.seniority && !!info.seniority.width ? info.seniority.width : 300}px` }">
			<Seniority :info="info.seniorityInfo" @movieClick="seniorityClick"/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.imageList{
	width: 100%;
	display: flex;

	.imageCon{
		width: calc( 100% - 300px );
		flex: 1 0 auto;
		.title{
			width: 100%;
			display: flex;
			justify-content: space-between;

			.l_flex,.r_flex,.title_r_btn,.title_l_btn{
				display: flex;
				align-items: center;
			}
			.titleIcon{
				width: 30px;
				height: 30px;
			}
			.title_l_btn_icon,.title_r_btn_icon{
				width: 20px;
				height: 20px;
				border-radius: 50%;
			}
		}
		.content{
			width: 100%;
			position: relative;
			overflow: hidden;
			
			.toLeft,.toRight{
				position: absolute;
				top: 0px;
				width: 100px;
				height: 100%;
				cursor: pointer;
				color: #fff;
			}
			.toLeft{
				left: 0px;
				background-image: linear-gradient(to right, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .0) 100%)
			}
			.toRight{
				right: 0px;
				background-image: linear-gradient(to left, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .0) 100%)
			}
			.contentFlex{
				white-space:nowrap;

				.imageItem{
					overflow: hidden;
					display: inline-block;
					margin-right: 10px;

					//首图超大横版（之后一排竖版图）
					&.max_horizontal{
						width: 480px !important;
						// height: 360px !important;
					}
					//首图超大竖版（之后两排横版图）
					&.max_vertical{
						width: 640px !important;
						// height: 360px !important;
					}
					//横版
					&.horizontal{
						width: 320px;
						// height: 180px;
					}
					//竖版
					&.vertical{
						width: 240px;
						// height: 360px
					}

					.item_img{
						width: 100%;
						cursor: pointer;
						//首图超大横版（之后一排竖版图）
						&.max_horizontal{
							// width: 480px !important;
							height: 360px !important;
						}
						//首图超大竖版（之后两排横版图）
						&.max_vertical{
							// width: 320px !important;
							height: 360px !important;
						}
						//横版
						&.horizontal{
							// width: 320px;
							height: 180px;
						}
						//竖版
						&.vertical{
							// width: 240px;
							height: 360px
						}
					}
					.imageItemIntro{
						position: relative;
						
						.item_name{
					        font-size: 15px;
					        font-weight: 500;
					        cursor: pointer;
							padding: 5px 0px;

						    &:hover{
						        color: #1FAFC0;
						    }
						}
						.item_grade{
							position: absolute;
							top: 8px;
					        right: 10px;
					        font-size: 23px;
					        color: #FF1E13;
					        font-weight: 700; 
						}
						.item_intro{
							width: calc( 100% - 30px );
							white-space: nowrap;
						    overflow: hidden;
						    text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
	.seniority{
		
	}
}
</style>

<script>
/*组件引入*/
import Seniority from '../seniority.vue';

export default({
	components: { Seniority },
	props: {
		info: Object
	},
	data () {
		return {
			x: 0
		}
	},
	methods: {
		//点击推荐电影标签回调
		tabClick (item, info) {
			var that = this;

			that.$emit('tabClick',{ item, info })
		},
		//点击电影模块回调
		movieClick (item, info) {
			var that = this;

			that.$emit('movieClick',{ item, info })
		},
		//标题区域内按钮点击回调
		btnClick (item, info) {
			var that = this;

			that.$emit('btnClick',{ item, info })
		},
		//排行榜点击回调
		seniorityClick(infoItem) {
            this.$emit('seniorityClick', { infoItem: infoItem, info: this.info })
        },
		//点击方向
		move (dir) {
			var that = this;
			if(dir == 'left'){
				that.x += 200;
			}else{
				that.x = that.x - 200;
			}
		}
	}
});
</script>
