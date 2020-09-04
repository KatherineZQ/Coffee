//加载Express模块
const express = require("express");

//加载cors模块
const cors = require("cors");

//加载MySQL模式
const mysql = require("mysql");

//创建MySQL连接池
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'xzqa',
    connectionLimit:15
});

//创建Express应用
const server = express();

//使用CROS模块

server.use(cors({
    origin:['http://localhost:8080','http://127.0.0.1:8080']
}));

//获取所有文章分类的接口
server.get('/categories',(req,res)=>{

    //获取xzqa_category数据表的全部记录
    let sql ='SELECT id,category_name FROM xzqa_category';

    //通过MySQL连接池执行SQL语句
    pool.query(sql,(err,results)=>{
         if(err) throw err;
         res.send({message:'查询成功',code:1,results:results});
    });
});

//获取所有文章的接口(后续要调整)

server.get('/articles',(req,res)=>{

    //获取xzqa_article数据表全部记录
    let sql = 'SELECT id,subject,description,image FROM xzqa_article';

    //通过MySQL连接池执行SQL语句
    pool.query(sql,(err,results)=>{
      
        if(err) throw err;

        res.send({message:'查询成功',code:1,results:results})
    })
});


//指定WEB服务器的监听端口
server.listen(3000,()=>{
  console.log('服务器启动...');
});