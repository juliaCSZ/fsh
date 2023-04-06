<template>
    <div class="container auth_register">
        <form @submit.prevent="register">
            <h4 class="mb-3 text-center">會員註冊</h4>
            <span class="mb-2"></span>
            <label for="">姓名</label>
            <input type="text" placeholder="輸入你的名字" v-model="name" required><br/>
            <label for="" class="mt-2">帳號</label>
            <input type="email" placeholder="輸入你的email" v-model="email" required><br/>
            <label for="" class="mt-2">密碼</label>
            <input type="password" placeholder="輸入你的密碼" v-model="password" required minlength="6"><br/>
            <label for="" class="mt-2">確認密碼</label>
            <input type="password" placeholder="再次輸入你的密碼" v-model="confirm_password" required minlength="6"><br/>
            <button type="submit" class="mt-4 auth_login_btn">註冊</button>
        </form>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name:'register',
    data(){
        return {
            name:'',
            email:'',
            password:'',
            confirm_password:'',
        }
    },
    methods:{
        register(){
            this.$store.commit('auth/register',{email:this.email,password:this.password,confirm_password:this.confirm_password,name:this.name})
        }
    },
    computed:{
        ...mapState({
            register_success: state =>state.auth.register_success
        })
    }
}
</script>