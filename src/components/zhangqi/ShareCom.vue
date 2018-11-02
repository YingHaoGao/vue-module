<template>
    <li>
        <div class="share">
            <div @click="toggleShare">
                <span><i class="fa fa-share-square-o" aria-hidden="true"></i></span>
                <span>分享</span>
            </div>
            <div class="shareIcon bdsharebuttonbox bdshare-button-style0-16" v-show="isShow">
                <a href="#" class="bds_more" data-cmd="more"></a>
                <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                <a href="#" class="bds_tqq" data-cmd="tqq"></a>
                <a href="#" class="bds_renren" data-cmd="renren"></a>
                <a href="#" class="bds_weixin" data-cmd="weixin"></a>
            </div>
        </div>
    </li>
</template>
    
<script>
    export default {
        data(){
            return {
                isShow: false
            }
        },
        beforeCreate() {
            const _this = this;
            setTimeout(() => {
                _this.setup();
            }, 0);
        },
        methods: {
            setup() {
                window._bd_share_config = {
                    common: {
                        bdSnsKey: {},
                        bdText: "",
                        bdMini: "2",
                        bdPic: "",
                        bdStyle: "0",
                        bdSize: "16"
                    },
                    share: {},
                    image: {
                        viewList: ["qzone", "tsina", "tqq", "renren", "weixin"],
                        viewText: "分享到：",
                        viewSize: "16"
                    },
                    selectShare: {
                        bdContainerClass: null,
                        bdSelectMiniList: ["qzone", "tsina", "tqq", "renren", "weixin"]
                    }
                };
                const s = document.createElement("script");
                s.type = "text/javascript";
                s.src =
                    "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" +
                    ~(-new Date() / 36e5);
                document.body.appendChild(s);
            },
            toggleShare(){
                this.isShow = !this.isShow;
            }
        }
    };
</script>
