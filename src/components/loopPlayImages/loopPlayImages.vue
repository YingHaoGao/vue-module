<template>
    <div id="loopImages" :class="outerRotateStage">
        <div @mouseover="stop" @mouseleave="play" :class="rotateStageClass" id="loopStage">
            <ul v-if="!!imagesData && imagesData.length>0" :class="innerShowClass" :style="containerStyle">
                <li>
                    <a :href="imagesData[imagesData.length - 1].imageLinkRouterName">
                        <img :src="imagesData[imagesData.length - 1].backgroundImage" alt="">
                    </a>    
                </li>
                <li v-for="(item, index) in imagesData" :key="index">
                    <a :href="item.imageLinkRouterName">
                        <img :src="item.backgroundImage" alt="">
                    </a>
                </li>
                <li>
                    <a :href="imagesData[0].imageLinkRouterName">
                        <img :src="imagesData[0].backgroundImage" alt="">
                    </a>    
                </li>
            </ul>
            <ul :class="btnClass">
                <li @click="move(loopStageWidth, 1, speed)">
                </li>
                <li @click="move(loopStageWidth, -1, speed)">
                </li>
            </ul>
            <ul :class="circularClass">
                <li v-for="(dot, i) in imagesData" :key="i" :class="{dotted: i === (currentIndex-1)}" @click=jumpControlImages(i+1)>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'slider',
        props: ["imagesData", "backgroundAppeMode", "defaultClasses"],
        data: function () {
            return {
                currentIndex: 1,
                distance: 0,
                transitionEnd: true,
                speed: this.backgroundAppeMode ? 3600 : 30,
            }
        },
        mounted () {
            this.loopImagesStyle()
            this.DefaultloopImagesEvent()
        },
        computed: {
            loopStageWidth() {
                return this.loopStage.clientWidth
            },
            loopStage() {
                return document.getElementById("loopStage")
            },
            //向左移动总距离
            containerStyle() {
                return {
                    transform: `translate3d(${this.distance}px, 0, 0)`
                }
            },
            //动画间隔时间
            interval () {
                return 4000
            },
            outerRotateStage () {
                return(
                    this.defaultClasses && this.defaultClasses.outerRotateStage
                ) ? this.defaultClasses.outerRotateStage : "";
            },
            rotateStageClass () {
                return(
                    this.defaultClasses && this.defaultClasses.rotateStageClass
                ) ? this.defaultClasses.rotateStageClass : "";
            },
            innerShowClass () {
                return(
                    this.defaultClasses && this.defaultClasses.innerShowClass
                ) ? this.defaultClasses.innerShowClass : "";
            },
            btnClass () {
                return(
                    this.defaultClasses && this.defaultClasses.btnClass
                ) ? this.defaultClasses.btnClass : "";
            },
            circularClass () {
                return(
                    this.defaultClasses && this.defaultClasses.circularClass
                ) ? this.defaultClasses.circularClass : "";
            },
        },
        methods: {
            DefaultloopImagesEvent () {
                this.play()
                window.onblur = function () {
                    this.stop()
                }.bind(this)
                window.onfocus = function () {
                    this.play()
                }.bind(this)
            },
            loopImagesStyle () {
                var self = this;
                this.distance = -this.loopStageWidth;
                var roolImgs = self.loopStage.getElementsByTagName("img")
                Array.prototype.slice.call(roolImgs).map(function(value, index) {
                    value.style.width = self.loopStage.clientWidth + "px";
                    value.style.height = self.loopStage.clientHeight + "px";
                })
            },
            move (currentPosition, direction, speed) {
                if(!this.transitionEnd) return
                this.transitionEnd = false
            
                direction === -1 ? this.currentIndex += currentPosition / this.loopStageWidth : this.currentIndex -= currentPosition / this.loopStageWidth
                    if(this.currentIndex > this.imagesData.length) this.currentIndex = 1
                if(this.currentIndex < 1) this.currentIndex = this.imagesData.length

                var destination = this.distance + currentPosition * direction
                this.animate(destination, direction, speed)
            },
            animate (des, direc, speed) {
                if(this.temp) {
                    window.clearTimeout(this.temp)
                    this.temp = null
                }
                var totolWidth = this.loopStageWidth * this.imagesData.length;
                if((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                    this.distance += speed * direc
                    this.temp=window.setTimeout(() => {
                        this.animate(des, direc, speed)
                    }, 20)
                } else {
                    this.transitionEnd = true
                    this.distance = des
                    window.clearTimeout(this.temp)
                    if(des < -totolWidth) this.distance = -this.loopStageWidth
                    if(des > -this.loopStageWidth) this.distance = -totolWidth
                }
            },
            jumpControlImages (index) {
                var direction = index - this.currentIndex >= 0 ? -1 : 1
                var currentPosition = Math.abs(index - this.currentIndex) * this.loopStageWidth
                var triggerControlPointSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
                this.move(currentPosition, direction, triggerControlPointSpeed)
            },
            play () {
                if(this.timer) {
                    window.clearInterval(this.timer)
                    this.timer = null
                }
                this.timer = window.setInterval(() => {
                    this.move(this.loopStageWidth, -1, this.speed)
                }, this.interval)
            },
            stop () {
                window.clearInterval(this.timer)
                this.timer = null
            }
        }
    }
</script>
