<template>
    <div class="cart">
        <section class="h-100 my-5" style="background-color: rgb(255 255 255);">
        <div class="container h-100 outer">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-11 col-md-12">

                <div class="d-flex justify-content-center align-items-center mb-4">
                    <h3 class="mb-0 text-black">購物車</h3>
                </div>

                <div class="card-header py-3 d-none d-sm-block" v-if="cart.length!=0">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-4 col-lg-4 col-xl-4">
                            <h5 class="mb-0">商品明細</h5>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xl-1">
                            <h5 class="mb-0">售價</h5>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2">
                            <h5 class="mb-0">數量</h5>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <h5 class="mb-0">小計</h5>
                        </div>
                    </div>
                </div>

                
                <div class="card mb-4"  v-for="(item,index) in cart" :key="index">
                    <div class="card-body p-3">
                        <div class="row row-gap-3 d-flex justify-content-between align-items-center">
                            <div class="col-4 col-md-1 col-lg-1 col-xl-1">
                                <router-link :to="'/product/'+item.id">
                                    <img :src="item.image" class="img-fluid">
                                </router-link>
                            </div>
                            <div class="col-8 col-md-3 col-lg-3 col-xl-3">
                                <router-link :to="'/product/'+item.id">
                                    <p class="product_name mb-2">{{item.name}}</p>
                                </router-link>
                                <p class="delivery_day text-muted mb-2">{{item.delivery_day}}</p>
                                <h5 class="d-sm-none d-block">$ {{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h5>
                            </div>
                            <div class="col-md-2 col-lg-2 col-xl-2 d-flex d-none d-sm-block p-0">
                                <h5 class="mb-0">$ {{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h5>
                            </div>
                            <div v-if="outOfStock.includes(item.id)" class="col-12 col-md-3 col-lg-3 col-xl-3 d-flex">
                                <strong>商品銷售完畢</strong> 
                            </div>
                            <div v-else class="col-12 col-md-3 col-lg-3 col-xl-3 d-flex">
                                <span class="number-input">
                                    <button @click="numberBtn('minus',item.id,item.qty)" ></button>
                                    <input class="quantity" :value="item.qty" type="number" disabled>
                                    <button @click="numberBtn('plus',item.id,item.qty)" class="plus"></button>
                                </span> &emsp;
                            </div>                      
                            <h5 class="col-12 col-md-2 col-lg-1 col-xl-1 text-end">
                                $ {{ item.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                            </h5>
                        </div>
                        <div class="card-footer mt-2">
                            <span class="delete" @click="remove(item.id)"><i class="fas fa-trash-alt"></i> 刪除</span>
                        </div>
                    </div>
                </div>


                <div class="card-footer mt-2" v-if="cart.length!=0">
                    <div class="total mb-4">
                        訂單金額（<span class="total-len">{{cart.length}}</span>）商品  
                        <div>合計 <span class="amount">$ {{ amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span></div>
                    </div>
                    <button type="button" class="btn btn-block btn-lg" @click="checkout">前往結帳</button>
                </div>

                <div v-else style="text-align:center">
                    您的購物車尚未加入任何商品！
                    <router-link to="/">立即前往選購</router-link>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'cart',
    created(){
        this.$store.commit('cart/getData')
    },
    methods:{
        numberBtn(action,id,qty){
            this.$store.dispatch('cart/numberChange',{action,id,qty})
        },
        remove(id){
            this.$store.dispatch('cart/removeItem',{id})
        },
        checkout(){
            this.$store.commit('cart/checkout',{router:this.$router})
        }
    },
    computed:{
        ...mapState({
            cart : state => state.cart.cart,
            amount : state => state.cart.amount,
            outOfStock : state => state.cart.outOfStock,
        }),
    }
}
</script>

