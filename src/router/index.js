import Vue from 'vue';
import VueRouter from 'vue-router';
// import {firebaseAuth} from '../main';
import store from '../store/index.js';

import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import QA from '../views/Q&A.vue';
import Category from '../views/Category.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Order from '../views/Order.vue';
import Delivery from '../views/Delivery.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import ForgetPw from '../views/ForgetPw.vue';
import Collection from '../views/Collection.vue';
import ProductType from '../views/ProductType.vue'


Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        name:'Home',
        component:Home,
    },
    {
        path:'/search',
        name:'Search',
        component:Search,
    },
    {
        path:'/QA',
        name:'QA',
        component:QA,
    },
    {
        path:'/category/:id',
        name:'Category',
        component:Category
    },
    {
        path:'/product/:id',
        name:'Product',
        component:Product
    },
    {
        path:'/login',
        name:'Login',
        component:Login
    },
    {
        path:'/register',
        name:'Register',
        component:Register
    },
    {
        path:'/forgetPassword',
        name:'ForgetPw',
        component:ForgetPw
    },
    {
        path:'/cart',
        name:'Cart',
        component:Cart
    },
    {
        path:'/checkout',
        name:'Checkout',
        component:Checkout
    },
    {
        path:'/order',
        name:'Order',
        component:Order
    },
    {
        path:'/delivery/:issue',
        name:'Delivery',
        component:Delivery
    },
    {
        path:'/collection',
        name:'Collection',
        component:Collection
    },
    {
        path:'/productType/:id',
        navigator:'ProductType',
        component:ProductType
    }
    // {
    //     path:"/404",
    //     name:"notFound",
    //     component:() => import("../views/NotFound.vue"),
    // }
]


const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
});

router.beforeResolve((to, from, next)=>{
    /**
     to 要前往的路由位置。
     from 從哪個路由位置進來，如果沒有，預設是 null。
     next() 繼續往下執行的回呼函式，必須呼叫它才能往下執行。
     */
    if(!to.matched.length){
        //沒有對應到設定的路由，回重新導向404
        next("/404");
    }else{
        if(to.name == 'Checkout' || to.name == 'Collection' || to.name == 'Order'){
            setTimeout(() => {
                    // if(firebaseAuth.currentUser){
                    if(store.state.auth.islogin){
                        next()
                    }else{
                        alert('請先登入!')
                        next("/login")
                    }
                }, 500);
            
        }else{
            next();
            try{
                $("#navbarSupportedContent").collapse("hide")
            }catch(e){}
        }
    }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject){
    if(onResolve || onReject) return originalPush.call(this, location , onResolve , onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router;