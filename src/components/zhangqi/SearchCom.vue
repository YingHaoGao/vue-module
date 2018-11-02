<template>
    <div class="header-search">
        <el-input 
            class="header-search-input" 
            v-model="searchText" 
            placeholder="请输入搜索关键字">
            <el-button 
                class="header-search-button" 
                @click="searchClick" 
                slot="append" 
                icon="el-icon-search">查找</el-button>
        </el-input>
    </div>
</template>

<script>
    import bus from '../../utils/eventBus'
    export default {
        data() {
            return {
                searchText: ""
            };
        },
        mounted() {},
        computed: {},
        methods: {
            searchClick() {
                bus.$emit('searchEvent', this.searchText);
                this.$router.push({ path: '/search', query: { searchText: this.searchText }})
            }
        }
    };
</script>

<style lang="scss">
    .header-search {
        width: 400px;
        margin: 10px auto 0;
        .header-search-input {
            input {
                border: none;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                background-color: #292c3b;
                color: #fff;
            }
        }
        .el-input-group__append {
            border: 1px solid #38c6f4;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            overflow: hidden;
            .header-search-button {
                background-color: #38c6f4;
                color: #fff;
                border: none;
                border-radius: 0;
            }
        }
    }
</style>
