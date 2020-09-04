<template>
    <div>
        <!--顶部导航开始-->
        <mt-header title="用户注册">
            <router-link slot="left" to="/">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--顶部导航结束-->

        <!--表单区域开始-->
        <mt-field
            type="text" 
            label="用户名"
            placeholder="请输入用户名"
            v-model="username"
            :attr="{maxlength:'12',autocomplete:'on'}"
            @blur.native.capture=checkUsername
            :state="usernameState">
        </mt-field>
        <mt-field
            type="password" 
            label="密码"
            placeholder="请输入密码"
            v-model="password"
            :attr="{maxlength:'20',autocomplete:'off'}"
            @blur.native.capture=checkPassword
            :state="passwordState">
        </mt-field>
        <mt-field
            type="password" 
            label="确认密码"
            placeholder="请再次输入密码"
            v-model="conpassword"
            :attr="{maxlength:'20',autocomplete:'off'}"
            @blur.native.capture=checkConpassword
            :state="conpasswordState">
        </mt-field>
         <!--表单区域结束-->
        <mt-button type="primary" size="large" @click=register>快速注册</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            conpassword:'',
                //用户名状态的初始值
            usernameState:'',
            passwordState:'',
            conpasswordState:''
        }
    },
    methods:{
        //检测
        checkUsername(){
            let usernameReg=/^\w{6,12}$/;
            //this.usernameState=usernameReg.test(this.username)?'success':'error';
            //return usernameReg.test(this.username);
            if(usernameReg.test(this.username)){ 
                //console.log("用户名合法");
                this.usernameState='success';
                return true;
            }else{
                this.usernameState='error';
                return false;
            }
        },
        checkPassword(){
            let passwordReg=/^\w{8,20}$/;
            if(passwordReg.test(this.password)){
                this.passwordState='success';
                return true;
            }else{
                this.passwordState='error';
                return false;
            }
        },
        checkConpassword(){
            if(this.password!=this.conpassword){
                this.conpasswordState='error';
                return false;
            }else{
                this.conpasswordState='success';
                return true;
            }
            //可简化：this.conpasswordState= this.password!=this.conpassword?'error':'success'
            //return this.password!=this.conpassword;
        },
        //用户单击注册按钮时进行验证
        register(){
            if(this.checkUsername() && this.checkPassword() && this.checkConpassword()){
                console.log('要发送ajax请求到web服务器');
            }else{
                 console.log('你肯定有不对的地方');
            }
        }
    }
}
</script>