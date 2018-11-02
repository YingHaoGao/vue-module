<template>
    <div>
        <div class="categorySearch" v-for="(list, i) in keywords">
            <div class="title">{{list.name}}：</div>
            <div class="list">
                <span v-for="(item,i) in list.menuList" @click="categorySearchItemClick(list.name,item)" :class="{ active: item.isActive }">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "categorySearchCom",
        props: {
            categorySearchData: Array,
        },
        data() {
            return {
                itemId: '',
                isActive: true,
                list: [],
                keywords: this.categorySearchData,
                objList: []
            }
        },
        watch: {
            categorySearchData: function(v1, v2) {
                this.keywords = v1;
            }
        },
        methods: {
            categorySearchItemClick(listName, item) {
                let _this = this;
                var arr = [];
                let queryParams = [];
                _this.categorySearchData.forEach(x => {
                    if (x.name == listName) {
                        x.menuList.forEach(d => {
                            if (d.searchField == item.searchField) {
                                d.isActive = !x.isActive
                            }else{
                                d.isActive=false;
                            }
                        })
                    }
                    arr.push(x);
                })
                _this.keywords = arr;
                arr.forEach(x=>{
                    x.menuList.forEach(d=>{
                        if(d.isActive){
                            queryParams.push(d.searchField)
                        }
                    })
                });
                _this.$emit('categorySearchItemClick', queryParams);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .categorySearch {
        zoom: 1;
        margin-bottom: 10px;
        &:after {
            content: "020";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
        &:last-child {
            margin-bottom: 0;
        }
        >div {
            float: left;
            font-size: 14px;
        }
        .title {
            color: #666;
            padding: 4px 10px;
            min-width: 80px;
        }
        .list {
            width: 90%;
            >span {
                display: inline-block;
                padding: 4px 10px;
                cursor: pointer;
                &.active {
                    background-color: #3bc0d0;
                    color: #fff;
                    border-radius: 20px;
                }
            }
        }
    }
</style>


