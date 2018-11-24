<template>
<div class="scroll" ref="scroll">
    <div class="wrap" :style="{width: width+'px'}">
        <slot/>
    </div>
</div> 
</template>

<script>
export default {
    name: 'h-scroll',
    data(){
        return {
            width: 0
        }
    },
    methods:{
        refresh(){
            this.scroll.refresh();
        }
    },
    // created(){
    //     this.scroll.refresh();
    // },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll, {
            scrollX: true,
            scrollY: false
        });

        //动态计算需要滚动的宽度
        this.scroll.on('beforeScrollStart', ()=>{
            let width = 0;
            this.$slots.default.map(item=>{
                width += item.elm.offsetWidth + 18;
            })
            this.width = width;
            this.scroll.refresh();
        })
        this.scroll.on('scrollEnd',()=>{
            console.log(this.scroll.maxScrollX)
            if(this.scroll.x <= this.scroll.maxScrollX){
                this.$emit("moreExpectList")
            }
        })

    }
}
</script>

<style lang="scss" scoped>
.scroll{
    overflow: hidden;
    white-space: nowrap;
}
</style>

