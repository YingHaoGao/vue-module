<template>
    <li>
        <div class="video-share">
            <span class="video-icon"><i class="fa fa-share-square-o" aria-hidden="true"></i></span>
            <span>分享</span>
            <div class="share-list">
                <span class="share-item"><i class="fa fa-weixin" aria-hidden="true"></i></span>
                <span class="share-item"><i class="fa fa-weibo" aria-hidden="true"></i></span>
                <span class="share-item"><i class="fa fa-qq" aria-hidden="true"></i></span>
            </div>
        </div>
    </li>
</template>

<script>
export default {
  name: 'ShareCom',
}
</script>

<style lang="scss" scoped>
.video-share{
    &:hover .share-list{
        display: block;
    }
    .share-list{
        background-color: rgba(43, 51, 63, 0.7);
        position: absolute;
        top: 42px;
        left: -40px;
        right: -40px;
        display: none;
        .share-item{
            font-size: 18px;
            margin: 0 10px;
        }
    }
}
</style>
