<template>
  <div>
    <!--顶部导航开始-->
    <mt-header title="精品咖啡">
      <div slot="right" class="shortcut">
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登陆</router-link>
      </div>
    </mt-header>
    <!--顶部导航结束-->
    <!--顶部选项卡开始-->
    <mt-navbar v-model="active">
      <mt-tab-item
        v-for="(category,index) of categories"
        :id="category.id"
        :key="index"
      >{{category.category_name}}</mt-tab-item>
    </mt-navbar>
    <!--顶部选项卡结束-->
    <!--面板区域开始-->
    <div
      class="panel"
      infinite-scroll-distance="10"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      :infinite-scroll-immediate-check="true"
    >
      <mt-tab-container v-model="active">
        <mt-tab-container-item
          v-for="(category,index) of categories"
          :key="index"
          :id="category.id"
        >
          <!--单一文章信息开始-->
          <div class="info-item" v-for="(article,index) of articles" :key="index">
            <!--标题区域开始-->
            <div class="info-item-head">
              <router-link :to="`/article/${article.id}`">{{article.subject}}</router-link>
            </div>
            <!--标题区域结束-->
            <!--内容区域开始-->
            <div class="info-item-content">
              <!--图像区域开始-->
              <div class="info-item-img" v-if="article.image!=null">
                <router-link :to="`/article/${article.id}`">
                  <img v-lazy="article.image" alt />
                </router-link>
              </div>
              <!--图像区域结束-->
              <!--内容简介区域开始-->
              <div class="info-item-des">{{article.description}}</div>
              <!--内容简介区域结束-->
            </div>
            <!--内容区域结束-->
          </div>
          <!--单一文章信息结束-->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!--面板区域结束-->
    <!--底部选项卡开始-->
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="home">
        <img src="../assets/imgs/home_enable.png" slot="icon" v-show="selectedTab=='home'" />
        <img src="../assets/imgs/home_disable.png" slot="icon" v-show="selectedTab!='home'" />
        首页
      </mt-tab-item>
      <mt-tab-item id="me">
        <img src="../assets/imgs/me_enable.png" slot="icon" v-show="selectedTab=='me'" />
        <img src="../assets/imgs/me_disable.png" slot="icon" v-show="selectedTab!='me'" />
        我的
      </mt-tab-item>
    </mt-tabbar>
    <!--底部选项卡结束-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 3,
      selectedTab: "home",
      //存储服务器返回的文章分类数据
      categories: [],
      articles: [],
      //存储页码，初始值为1
      page: 1,
      //用于标识当前是否正在处理请求
      busy: false,
      //用于存储总页数
      pagecount: 0,
    };
  },
  methods: {
    //无限滚动指令需要调用的函数名称
    loadMore() {
      this.page++;
      //判断当前页码是否在总页数范围内
      if (this.page < this.pagecount) {
        this.loadData();
      }
    },
    loadData() {
      //显示加载提示框
      this.$indicator.open();
      //标识当前服务器是否正在处理相关的请求，如果在处理中，此时即使再次滚动到指定范围内也不再触发滚动函数
      this.busy = true;
      this.axios
        .get("/articles", {
          params: {
            //当前分类的ID
            cid: this.active,
            //当前页码
            page: this.page,
          },
        })
        .then((res) => {
          //接收服务器返回的文章数据
          let data = res.data.results;
          //接收服务器返回的总页数
          this.pagecount = res.data.pagecount;
          //动态加载图像
          data.forEach((item) => {
            if (item.image != null) {
              item.image = require("../assets/articles/" + item.image);
            }
            this.articles.push(item);
          });
          //关闭加载提示框
          this.$indicator.close();
          //标识服务器已经响应了，如再次滚动了指定范围内可继续触发滚动函数
          this.busy = false;
        });
    },
  },
  watch: {
    active() {
      //清空之前保存的文章数据
      this.articles = [];
      //获取当前分类的文章第一页的数据
      this.page = 1;
      this.loadData();
    },
  },
  mounted() {
    //获取文章分类数据
    this.axios.get("/categories").then((res) => {
      this.categories = res.data.results;
    });
    //获取当前分类的文章数据
    this.loadData();
  },
};
</script>
<style scoped>
.shortcut a {
  color: #fff;
  text-decoration: none;
  padding-right: 5px;
}
.panel {
  margin-top: 10px;
  margin-bottom: 55px;
}
.info-item {
  margin: 10px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d3d3d3;
}
.info-item-head a {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
  text-decoration: none;
}
.info-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}
.info-item-img img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
  margin-right: 10px;
}
.info-item-des {
  height: 63px;
  line-height: 21px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  display: -webkit-box;
  color: #444;
}

</style>
