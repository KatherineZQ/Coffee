<template>
    <div>
        <!--顶部导航开始-->
        <mt-header title="个人资料">
            <router-link to="/me" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--顶部导航结束-->
        <!--个人资料区域开始-->
        <div>
            <div class="avatar">
                <img src="../assets/avatar/1.jpg" alt="">
            </div>
            <div class="info">
                <p>昵称：淘气的松鼠</p>
                <p>上次登录时间：2020-5-1 15：30</p>
                <p>发表文章数量：300篇</p>
            </div>
        </div>
        <!--个人资料区域结束-->
    </div>
</template>

<style scoped>
    .avatar{
        margin:20px 0;
        text-align:center;
    }
    .avatar img{
        border-radius:50%;
    }
    .info{
        margin-left:30px;
    }
    .info p{
        padding:5px 0;
    }
</style>