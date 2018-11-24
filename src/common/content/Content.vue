<template>
<div class="content" ref="content">
  <div class="wrap">
        <slot/>
  </div>
</div>
</template>

<script>
export default {
  name: "app-content",
  props:{
    isloadmore:Boolean,
    canloadmore:Boolean,
  },
  methods: {
    refresh() {
      this.contentScroll.refresh();
    },
    scrollTo(y){
        this.contentScroll.refresh();
        this.contentScroll.scrollTo(0, y*(-1), 200);
    }
  },
  mounted() {
    // 创建滚动视图
    this.contentScroll = new IScroll(this.$refs.content, {});
    this.contentScroll.on("beforeScrollStart", () => {
      this.contentScroll.refresh();
    });
    this.contentScroll.on("scrollEnd", () => {
      if (this.contentScroll.y <= this.contentScroll.maxScrollY && this.isloadmore == true){
        // 触发正在热映页面的事件
        this.$emit("loadmore");
      }
      if (this.contentScroll.y <= this.contentScroll.maxScrollY && this.canloadmore == true){
        // 触发预售热映页面的事件
        this.$emit("loadmoreComing");
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
}
</style>

