<template>
    <div class="container text-center auth_login">
        <form @submit.prevent="login">
            <h4 class="mb-4">登入</h4>
            <label for="">Email</label><br/>
            <input type="email" placeholder="輸入你的電子信箱" v-model="email" required><br/>
            <label for="" class="mt-2">密碼</label><br/>
            <input type="password" placeholder="輸入你的密碼" v-model="password" required autocomplete="on"><br/>
            <router-link to="/forgetPassword" class="d-inline-block mt-2 forget">忘記密碼?</router-link><br/>
            <button type="submit" class="auth_login_btn mt-3">登入</button>
            <router-link to="/register" class="d-inline-block auth_register_btn mt-3">我要註冊</router-link>
        </form>
    </div>
</template>

<script>
import {mapState , mapGetters} from 'vuex';
export default {
    name:"login",
    data(){
        return {
            email:"",
            password:""
        }
    },
    methods:{
        login(){
            this.$store.commit('auth/login',{email:this.email,password:this.password,router:this.$router})
        },
    },
    computed:{
        ...mapState({
            islogin: state => state.auth.islogin
        })
    }
}
</script>