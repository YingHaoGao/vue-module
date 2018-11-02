<template>
    <div class="main-footer">
        <div v-html="footerData"></div>
    </div>
</template>

<script>
    export default {
        name: 'MainFooter',
        data() {
            return {
                footerData: ''
            }
        },
        mounted() {
            this.getFooterData();
        },
        methods: {
            getFooterData() {
                let _this = this;
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
                    _this.footerData = res.data.result.dataMap.footerList[0].content;
                });
            }
        }
    }
</script>

<style lang="scss">
    .main-footer {
        width: 100%;
        overflow: hidden;
        background-color: #f3f8f7;
        padding: 20px 0;
        .footer {
            width: 80%;
            margin: 0 auto;
            .footer-title {
                font-size: 18px;
                margin-bottom: 10px;
            }
            .footer-text {
                font-size: 14px;
                line-height: 180%;
                a {
                    color: #2c3e50;
                    text-decoration: none;
                }
            }
            .copyright {
                text-align: center;
                font-size: 12px;
                color: #bbb;
                margin-top: 20px;
            }
        }
    }
</style>
