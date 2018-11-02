<template>
    <div>
        <div>
            <!-- 轮播图 -->
            <loop-play-images v-if="imageData.length>0"
                :default-classes="defaultClasses" 
                :images-data="imageData" 
                :background-appe-mode="false" 
            />
        </div>
        <div class="searchPage">
            <!-- 分类搜索 -->
            <div class="categorySearchOuter">
                <category-search-com 
                    :category-search-data="categorySearchData" 
                    @categorySearchItemClick="categorySearchItemClick" 
                />
            </div>
            <!-- 排序 -->
            <div class="searchPageSort">
                <span class="searchPageSortTitle">排序</span>
                <template>
                    <el-radio-group v-model="query.orderByField" @change="sortChange">
                        <el-radio :label="'videoName'">名称</el-radio>
                        <el-radio :label="'updatedTime'">更新时间</el-radio>
                        <el-radio :label="'score'">评分</el-radio>
                    </el-radio-group>
                </template>
            </div>
            <!-- 图片列表 -->
            <div class="searchPageImageList">
                <image-list
                    :info="imageListInfo"
                    @movieClick="imageListMovieClick"
                />
            </div>
            <div class="empty" v-show="!query.totalElements">
                <img src="../assets/images/no_data.png" alt="">
            </div>
            <!-- 分页 -->
            <div class="searchPagePagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size = query.pageSize
                    :total = query.totalElements
                    prev-text="<上一页"
                    next-text="下一页>"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
            <div class="Advertisement"></div>
        </div>
    </div>
</template>

<script>
    import loopPlayImages from '@/components/loopPlayImages/loopPlayImages.vue'
    import imageList from '@/components/gaoyinghao/imageList.vue'
    import categorySearchCom from "@/components/zhangqi/CategorySearchCom.vue"
    import bus from '../utils/eventBus'
    export default {
        components: {
            loopPlayImages,
            categorySearchCom,
            imageList,
        },
        data() {
            return {
                // 轮播图
                defaultClasses: {
                    outerRotateStage: 'loopImages',
                    rotateStageClass: 'loopStage',
                    innerShowClass: 'container',
                    btnClass: 'btnOuter',
                    circularClass: 'dots'
                },
                imageData: [],
                // 分类搜索 
                categorySearchData: [],
                // 图片列表
                imageListInfo: {
                    type: 'free',
                    title: '搜索列表',
                    icon: require('../assets/icon/host.png'),
                    list: []
                },
                query: {
                    pageSize: 16, //每页几条数据
                    totalElements: 0, // 总条数
                    pageNum: 0, // 第几页
                    orderByField: 'videoName', //排序
                    orderByType: 'DESC', //排序
                }
            }
        },
        mounted() {
            var _this = this
            // 第一次点击顶栏搜索按钮跳转到搜索页面需要查找的关键词
            _this.query.videoName = _this.$route.query.searchText
            // 进入搜索页面后点击顶栏搜索按钮
            bus.$on('searchEvent', function(videoName) {
                _this.query.videoName = videoName
                _this.getImageListData()
            })
            // 获取banner数据      
            _this.getBannerData()
            // 获取图片列表
            _this.getImageListData()
            // 获取分类搜索数据
            _this.getSearchData()
        },
        methods: {
            // 获取banner数据
            getBannerData() {
                var _this = this
                _this.$axios({
                    url: '/realNet/pageManager/findOne',
                    method: 'get',
                    headers: {
                        token: 123456789
                    },
                    params: {
                        title: '搜索'
                    }
                }).then(res => {
                    var data = res.data.result.dataMap.bannerList
                    _this.imageData = data.map(item => {
                        return {
                            backgroundImage: `/realNet/file/${item.image}`,
                            imageLinkRouterName: item.link
                        }
                    })
                }).catch(function(error) {
                    console.log(error)
                })
            },
            // 获取图片列表
            getImageListData() {
                var _this = this
                _this.$axios({
                    url: '/realNet/video/getVideoInfos',
                    method: 'get',
                    headers: {
                        token: 123456789
                    },
                    params: _this.query
                }).then(res => {
                    if (res.data.result && res.data.result.content) {
                        res.data.result.content.map(videoInfo => {
                            _this.imageListInfo.list.push({
                                id: videoInfo.id,
                                img: `/realNet/file/uploads/${videoInfo.verticalImage}`,
                                name: videoInfo.videoName ? videoInfo.videoName : '',
                                intro: videoInfo.description ? videoInfo.description : '',
                                grade: videoInfo.score ? videoInfo.score : 6,
                            })
                        })
                    }
                    _this.query.totalElements = res.data.result.totalElements
                }).catch(function(error) {
                    console.log(error)
                })
            },
            // 获取分类搜索数据
            getSearchData() {
                var _this = this
                _this.$axios({
                    url: "/realNet/pageManager/getSearchPageMenuList",
                    method: "get",
                    headers: {
                        "token": 123456789
                    }
                }).then(res => {
                    var arr = []
                    if (res.data.result && res.data.result.menuList) {
                        res.data.result.menuList.forEach(item => {
                            var isActive = false

                            item.menuList.some(item => {
                                isActive = (item.name == _this.query.videoName)
                                item.isActive = isActive
                                return isActive
                            })

                            var newArr = [{
                                name: '全部',
                                searchField: {},
                                isActive: !isActive
                            }].concat(item.menuList)
                            item.menuList = newArr
                        })
                    }
                    _this.categorySearchData = res.data.result.menuList
                }).catch(function(error) {
                    console.log(error)
                })
            },
            // 当前页数改变时，调用该函数
            handleCurrentChange(val) {
                var _this = this
                var orderByField = _this.query.orderByField
                _this.query.pageNum = val-1
                _this.getImageListData()
            },
            // 排序
            sortChange(val) {
                var _this = this
                var pageNum = _this.query.pageNum - 1
                _this.query.orderByField = val
                _this.getImageListData()
            },
            // 分类搜索的按钮
            categorySearchItemClick(val) {
                var _this = this
                var arr = []
                val.forEach(item => {
                    arr.push(typeof(item) == 'string' ? JSON.parse(item) : {})
                })
                _this.query.categoryId = arr[0].categoryId || '' // 分类
                _this.query.videoLocality = arr[1].videoLocality || '' //地区
                _this.query.videoType = arr[2].videoType || '' //类型
                _this.query.yearStr = arr[3].yearStr || '' //年份
                _this.query.chargeTypeStr = arr[4].chargeTypeStr || '' //资费
                _this.query.keywords = arr[5].keywords || '' //关键词
                _this.query.videoName = ''
                _this.getImageListData()
            },
            imageListMovieClick(option) {
                this.$router.push({
                    name: "TVplayPage",
                    query: {
                        contentId: option.infoItem.id
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    .searchPage {
        width: 1186px;
        margin: 0 auto;
        .categorySearchOuter {
            margin-top: 30px;
            padding: 30px;
            border: solid 1px #ddd;
        }
        .searchPageSort {
            margin-top: 25px;
            padding: 15px;
            background-color: #f3f7f8;
            .searchPageSortTitle {
                font-size: 14px;
                margin-right: 30px;
            }
            .el-radio__input.is-checked .el-radio__inner {
                border-color: #3bc0d0;
                background-color: #3bc0d0;
            }
            .el-radio__input.is-checked+.el-radio__label {
                color: #3bc0d0;
            }
        }
        .searchPageImageList {
            margin-top: 25px;
            .imageList {
                width: 100%;
                .title {
                    display: none;
                }
                .content {
                    padding-top: 0;
                    margin: 0 -1%;
                    .movieImage {
                        width: 23%;
                        margin: 0 1% 35px;
                        >img {
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }
        }
        .searchPagePagination {
            text-align: center;
            margin-bottom: 40px;
            .el-pagination {
                display: inline-block;
            }
            .el-pagination.is-background .el-pager li:not(.disabled).active {
                background-color: #3bc0d0;
            }
            .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
                color: #fff;
            }
            .el-pagination.is-background .el-pager li:not(.disabled):hover {
                color: #3bc0d0;
            }
            .el-pagination button,
            .el-pagination span:not([class*=suffix]) {
                padding: 0 4px;
            }
        }
        .empty{
            text-align: center;
        }
    }
</style>



