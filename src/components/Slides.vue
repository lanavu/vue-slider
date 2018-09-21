<template>
    <div class="slides" v-touch:swipe.left="goToNext" v-touch:swipe.right="goToPrev">
        <div :style="{ width: innerWidth + 'px', transform: 'translate(-'+slidesInnerMarginLeft+'px)' }" class="slides-inner">
            <Slide v-for="(slide, key) in slides" 
                :key="key" 
                :style="{ width: singleWidth+'px', height : singleHeight+'px' }" 
                :slide="slide">
            </Slide> 
        </div>
        <div role="button" class="nav-button prev" @click="goToPrev() + stopAutoPlay()"><span>&lt;</span></div>
         <div role="button" class="nav-button next" @click="goToNext() + stopAutoPlay()"><span>&gt;</span></div>
        <div class="navigation">
            <span role="navigation" class="nav-number" v-for="(slide, key) in slides" @click="goToIndex(key) + stopAutoPlay()" :key="key" :class="{ active : key === currentIndex}">
            </span> 
        </div>
    </div>
</template>

<script>
    import Slide from './Slide';

    export default {
        name: 'Slides',
        data () {
            return {
                slides: [
                    { src: 'static/img/slide1.png' },
                    { src: 'static/img/slide2.png' },
                    { src: 'static/img/slide3.png' },
                    { src: 'static/img/slide4.png' },
                    { src: 'static/img/slide5.png' }
                ],
                innerWidth: 0,
                singleWidth: 0,
                singleHeight: 0,
                currentIndex : 0,
                autoPlayInstance: null
            }
        },
        computed : {
            slidesInnerMarginLeft () {
                return this.currentIndex * this.singleWidth;
            }
        },
        props : {
            itemsPerSlide : {
                type: Number,
                default: 1,
                require: false
            }
        },
        components: {
            Slide

        },
        mounted : function() {
            window.addEventListener('resize', () => {
               this.setDimensions();
            });
            this.autoPlayInstance = this.autoPlay();
        },

        methods :{
            autoPlay() {
                return window.setInterval(() => {
                    this.goToNext();
                }, 5000);
            },
            stopAutoPlay() {
                window.clearInterval(this.autoPlayInstance);
            },
            goToPrev() {
                if(this.currentIndex == 0){
                    this.currentIndex = this.slides.length-1;
                }else {
                    this.currentIndex--;
                }  
            },
            goToNext() {
                if(this.currentIndex == this.slides.length-1){
                    this.currentIndex = 0;
                } else {
                    this.currentIndex++;
                }
            },
            goToIndex(index) {
                this.currentIndex = index;
            },
            setDimensions() {
                this.singleWidth = window.innerWidth;
                this.singleHeight = window.innerHeight;
                this.innerWidth =  this.singleWidth * this.slides.length; 
            }
        },
        created () {
           this.setDimensions();
        }
    }
</script>

<style scoped>
    .slides {
        position: relative;
    }
    .slides-inner {
        transition: transform 1000ms;
    }
    @media screen and (max-width: 600px) {
        .slides-inner {
            transition: transform 500ms;
        }
    }
    .navigation {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        cursor: pointer;
    }
    .navigation .nav-number, .navigation .nav-button{
        background: rgba(255,255,255, 0.6);
        display: inline-block;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        margin: 0 3px;
    }
    .navigation .nav-number.active {
        background: white;
    }
    .nav-button {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        font-size: 36px;
        font-weight: bold;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color: rgba(255,255,255, 0.8);
        cursor: pointer;
        height: 100%;
        width: 20%;
        display: flex;
        align-items: center;
        opacity: 0;
        transition: opacity 0.2s linear;
    }

    @media screen and (max-width: 600px) {
        .nav-button {
            font-size: 16px;
        }
    }
    .nav-button:hover{
        opacity: 1;
    }

    .nav-button.prev {
        left: 0;  
        justify-content: flex-start;
    }
    .nav-button.prev:hover{
        background: linear-gradient(to right,  rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
    }
    .nav-button.prev span {
        margin-left: 20px;
    }
    .nav-button.next {
        right: 0;
        justify-content: flex-end;
    }
    .nav-button.next:hover{
        background: linear-gradient(to left,  rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
    }
    .nav-button.next span {
        margin-right: 20px;
    }
    .navigation .nav-button:hover {
        color: white;
    }
</style>
