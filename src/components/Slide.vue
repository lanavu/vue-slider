<template>
    <div class="slide" :style="{ backgroundImage: 'url(' + slide.src + ')' }">

    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        props: {
            slide: {
                type: Object,
                required: true
            }
        }
    }
</script>
<style scoped>
    img {
        max-width: 100%;
    }
    .slide {
        height: 100%;
        width: 100%;
        display: inline-block;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
        background-color: black;
    }
</style>
