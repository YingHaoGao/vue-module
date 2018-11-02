<template>
    <div class="player">
        <video-player 
            class="vjs-custom-skin" 
            ref="videoPlayer" 
            :options="playerOptions" 
            :playsinline="true" 
            @ready="playerReady"
            @play="onPlayerPlay"
            @timeupdate="onPlayerTimeupdate"
            @ended="endPlay"
            @error="endPlay"
        >
        </video-player>
        <div class="video-information">
            <!-- <ul class="video-left">
                <li>
                    <span class="video-icon"><i class="fa fa-play-circle-o"></i></span>
                    <span>6329万</span>
                </li>
                <li>
                    <span class="video-icon"><i class="fa fa-thumbs-o-up"></i></span>
                    <span>1287</span>
                </li>
                <li>
                    <span class="video-icon"><i class="fa fa-thumbs-o-down"></i></span>
                    <span>23</span>
                </li>
            </ul> -->
            <ul class="video-right">
                <share-com></share-com>
                <!-- <li>
                    <span class="video-icon"><i class="fa fa-download"></i></span>
                    <span>下载</span>
                </li>
                <li>
                    <span class="video-icon"><i class="fa fa-info-circle"></i></span>
                    <span>举报</span>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import ShareCom from "@/components/zhangqi/ShareCom.vue"
    import { getToken, getUser } from '../../utils/auth.js'

    export default {
        components: {
            ShareCom
        },
        props: ["source", "thumb", "mediaInfo"],
        data() {
            return {
                // videojs options
                playerOptions: {
                    height: "576",
                    autoplay: false,
                    preload: true,
                    muted: false,
                    language: "zh-CN",
                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    flash: { hls: { withCredentials: false }},
                    html5: { hls: { withCredentials: false }},
                    sources:[],
                },
                timetick: 0
            }
        },
        watch: {
            source: function() {
                if (this.source) {
                    var that = this
                    if (that.playerOptions.sources.length > 0) {
                        that.source.map(function(src, i) {
                            that.$set(that.playerOptions.sources, i, src)
                        })
                    } else {
                        that.source.map(function(src) {
                            that.playerOptions.sources.push(src)
                        })
                    }
                    that.playerOptions.autoplay = true
                }
            },
            thumb: function() {
                this.playerOptions.poster = this.thumb
            }
        },
        methods: {
            /*
            setForwardControl() {
                var $vjsPlayControl = $("button.vjs-play-control")
                $vjsPlayControl.after(
                    `<button class="vjs-step-forward-control vjs-control vjs-button vjs-paused" type="button" title="step-forward" aria-disabled="false">
                        <span aria-hidden="true" class="fa fa-step-forward"></span>
                        <span class="vjs-control-text" aria-live="polite">step-forward</span>
                    </button>`
                )
                $(".vjs-step-forward-control").click(() => {
                    $vjsPlayControl.after(
                        `<button class="vjs-step-forward-control vjs-control vjs-button vjs-paused" type="button" title="step-forward" aria-disabled="false">
                            <span aria-hidden="true" class="fa fa-step-forward"></span>
                            <span class="vjs-control-text" aria-live="polite">step-forward</span>
                        </button>`
                    )
                })
            },
            setCogControl() {
                var $vjsFullscreenControl = $("button.vjs-fullscreen-control")
                $vjsFullscreenControl.before(
                    `<button class="vjs-cog-control vjs-control vjs-button" type="button" title="step-forward" aria-disabled="false">
                        <span aria-hidden="true" class="fa fa-cog"></span>
                        <span class="vjs-control-text" aria-live="polite">step-forward</span>
                    </button>`
                )
            },
            setClarityControl() {
                var $vjsPlaybackRate = $("div.vjs-playback-rate")
                $vjsPlaybackRate.before(
                    `<div class="vjs-clarity vjs-menu-button vjs-menu-button-popup vjs-control vjs-button">
                        <button class="vjs-clarity vjs-menu-button vjs-menu-button-popup vjs-button" type="button" aria-disabled="false"
                            title="clarity Rate" aria-haspopup="true" aria-expanded="false">
                            <span aria-hidden="true" class="vjs-icon-placeholder"></span>
                            <span class="vjs-control-text" aria-live="polite">Clarity</span>
                        </button>
                        <div class="vjs-menu">
                            <ul class="vjs-menu-content" role="menu">
                                <li class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">
                                    <span class="vjs-menu-item-text">超清</span>
                                    <span class="vjs-control-text" aria-live="polite"></span>
                                </li>
                                
                                <li class="vjs-menu-item vjs-selected" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">
                                    <span class="vjs-menu-item-text">高清</span>
                                    <span class="vjs-control-text" aria-live="polite"></span>
                                </li>
                                    <li class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">
                                    <span class="vjs-menu-item-text">标清</span>
                                    <span class="vjs-control-text" aria-live="polite"></span>
                                </li>
                            </ul>
                        </div>
                        <div class="vjs-clarity-value">高清</div>
                    </div>`
                )
            },
            */
            endPlay(player) {
                this.timetick = 0
                this.saveRemainTime(0)
                localStorage.removeItem(
                    "remainTime_" + this.mediaInfo.videoInfo.id +
                              '_' + this.mediaInfo.videoFileId
                )
                this.$emit("endPlay")
            },
            onPlayerTimeupdate(player) {
                if ( player.duration() ) {
                    var remainTime = player.duration() - player.currentTime()
                    localStorage.setItem(
                        "remainTime_" + this.mediaInfo.videoInfo.id +
                                  '_' + this.mediaInfo.videoFileId,
                        remainTime
                    )
                    if (this.timetick == 0 && remainTime > 0) {
                        this.saveRemainTime(remainTime)
                        if (++this.timetick == 3000)
                            this.timetick = 0
                    }
                }
            },
            onPlayerPlay(player) {
                var curTime = 0
                var remainTime = localStorage.getItem(
                    "remainTime_" + this.mediaInfo.videoInfo.id +
                              '_' + this.mediaInfo.videoFileId
                )
                if ( remainTime && player.duration() ) {
                    curTime = parseFloat(
                        player.duration() - parseFloat(remainTime)
                    )
                }
                player.currentTime(curTime)
            },
            //
            saveRemainTime(remainTime) {
                if ( getUser() && getToken() ) {
                    this.$axios({
                        url: '/realNet/history/insert',
                        method: 'POST',
                        data: Object.assign({
                            customerId: JSON.parse( getUser() ).id, // 客户id
                            remainingTime: remainTime,              // 剩余时长
                            type: 1                                 // 观看历史
                        }, this.mediaInfo),
                        headers:{
                            token: getToken()
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                }
            },
            // player is ready
            playerReady(player) {
                // console.log(player)
                // 下一集
                // this.setForwardControl()
                // 设置
                // this.setCogControl()
                // 清晰度
                // this.setClarityControl()
            },
        }
    }
</script>

<style>
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .player .vjs-progress-control {
        position: absolute !important;
        top: -5px !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 4.2px !important;
    }
    .player .vjs-progress-control .vjs-progress-holder {
        margin: 0 !important;
    }
    .player .vjs-fullscreen-control {
        position: absolute !important;
        right: 0 !important;
    }
    .player .vjs-cog-control {
        position: absolute !important;
        right: 42px !important;
    }
    .player .vjs-playback-rate {
        position: absolute !important;
        right: 42px !important;
    }
    .player .vjs-clarity {
        position: absolute !important;
        right: 126px !important;
    }
    .player .vjs-clarity .vjs-clarity-value {
        font-size: 1.2em;
        line-height: 2.4;
    }
    .player .video-information {
        width: 100%;
        height: 42px;
        background-color: rgb(43, 51, 63);
    }
    .player .video-information .video-left {
        float: left;
    }
    .player .video-information .video-right {
        float: right;
    }
    .player .video-information>ul>li {
        float: left;
        position: relative;
        font-size: 12px;
        line-height: 42px;
        color: #fff;
        margin: 0 12px;
        cursor: pointer;
    }
    .player .video-information>ul>li .video-icon {
        margin-right: 4px;
        font-size: 14px;
    }
</style>
