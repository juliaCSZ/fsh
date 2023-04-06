<template>
    <div class="container text-center auth_forgetPw">
        <form @submit.prevent="sendEmail">
            <h4 class="mb-3">忘記密碼</h4>
            <span class="mb-2"></span>
            <label for="">帳號</label>
            <input type="email" placeholder="輸入你的email" v-model="email" required>
            <button type="submit" class="mt-4 auth_login_btn">寄送臨時密碼</button>
            <router-link to="/login" class="back mt-4 d-inline-block">返回登入</router-link>
        </form>
    </div>
</template>

<script>
export default {
    name:'forgetPw',
    data(){
        return{
            email:''
        }
    },
    methods:{
        sendEmail(){
            this.$store.commit('auth/sendEmail',{email:this.email})
        }
    }
}
</script>