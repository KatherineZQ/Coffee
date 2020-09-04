<template>
  <div>
    <div class="container">
      <!-- 顶部导航开始 -->
      <mt-header title="精品咖啡">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <!-- 顶部导航结束 -->
      <!-- 文章区域开始 -->
      <div>
        <!-- 文章头部开始 -->
        <div class="article-header">
          <div class="article-header-title">{{articleInfo.subject}}</div>
        </div>
        <!-- 文章头部结束 -->
        <!-- 作者信息开始 -->
        <div></div>
        <!-- 作者信息结束 -->
        <!-- 文章正文开始 -->
        <div class="article-content" v-html="articleInfo.content"></div>
        <!-- 文章正文结束 -->
      </div>
      <!-- 文章区域结束 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用于存储文章的信息
      articleInfo: {},
    };
  },
  mounted() {
    //获取路由参数
    let id = this.$route.params.id;
    this.axios.get("/article?id=" + id).then((res) => {
      //将WEB服务器返回的文章信息存储到articleInfo变量中
      this.articleInfo = res.data.result;
      //console.log(this.articleInfo);
    });
  },
};
</script>

	<style scoped>
.container {
  background: #f6f6f6;
  min-height: 100vh;
}
.article-header {
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
}
.article-header-title {
  font-size: 20px;
  line-height: 1.75;
  color: #1a1a1a;
}
.article-content {
  margin-top: 10px;
  font-size: 17px;
  background: #fff;
  padding: 10px;
}
</style>
<style>
.article-content p,
.article-content li {
  padding: 10px 0;
  line-height: 1.8em;
}
.article-content img {
  display: block;
  max-width: 100%;
}
.article-content p img {
  display: block;
  max-width: 100%;
}
</style>