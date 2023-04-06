import {firebaseAuth} from '../../main.js';

const state = {
    islogin:'',
    // register_success:'',
}

const mutations = {
    //登入
    login(state,payload){
        firebaseAuth
        .signInWithEmailAndPassword(payload.email , payload.password)
        .then(()=>{
            // console.log(firebaseAuth.currentUser.emailVerified)
            if(firebaseAuth.currentUser.emailVerified){
                alert('登入成功');
                state.islogin=true;
                payload.router.push({path:'/'})
            }else{
                firebaseAuth.signOut()
                alert('電子信箱尚未驗證')
                location.reload()
            }
        })
        .catch(error => {
            error.message.includes('password') ? alert('密碼輸入錯誤') : alert('帳號輸入錯誤')
        })
      },

    //登出  
    logout(){
        firebaseAuth
        .signOut()
        .then(() => {
          alert('登出成功');
          state.islogin=''
        })
        .catch(error => {
          alert(error.message);
        });   
    },

    //註冊
    register(state,payload){
        if(payload.password == payload.confirm_password){
            firebaseAuth
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((res) => {
                res.user.updateProfile({
                    displayName:payload.name,
                })
                .then(() => {
                    const user = firebaseAuth.currentUser;
                    user.sendEmailVerification();
                    firebaseAuth.signOut()
                    alert('註冊成功!請先前往信箱點擊驗證信件，並重新登入');
                    // state.register_success = true;
                    window.location.href="/login"
                })
            })
            .catch(error => {
                error.message.includes('already in use')? alert('此電子信箱已註冊過，請重新輸入!') : alert(error.message);
            });
        }else{
            alert('確認密碼輸入錯誤')
        }
    },

    //重整頁面時，檢查有無使用者
    checkLogin(state){
        firebaseAuth.onAuthStateChanged(function(user){
            if(user){
                state.islogin = true
            }
            // console.log(firebaseAuth.currentUser)
        })
    },

    //忘記密碼，寄送email
    sendEmail(state,payload){
        firebaseAuth
        .sendPasswordResetEmail(payload.email)
        .then(()=>{
            alert('請至電子信箱點擊連結修改密碼!')
            location.reload()
        })
        .catch(error => {
            error.message.includes('no user') ? alert('查無此會員，請檢查電子信箱是否輸入正確') : alert(error.message)
        })
    }

}

const getters = {
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}