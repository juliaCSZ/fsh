<template>
    <div class="checkout py-5" style="min-height:100vh">
        <section class="h-100 mt-5" style="background-color: rgb(255 255 255);">
            <div class="container h-100 outer">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-11">

                        <div class="d-flex justify-content-center align-items-center mb-4">
                        <h3 class="mb-0 text-black">訂單填寫</h3>
                        </div>

                        <div class="card-header py-3" v-if="cart.length!=0">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-md-5 col-lg-5 col-xl-5 d-none d-sm-block">
                                    <h5 class="mb-0">商品清單</h5>
                                </div>
                                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 d-none d-sm-block">
                                    <h5 class="mb-0">數量</h5>
                                </div>
                                <div class="col-md-2 col-lg-2 col-xl-2 text-end">
                                    <h5 class="mb-0">小計</h5>
                                </div>
                            </div>
                        </div>

                        
                        <div class="card mb-4"  v-for="(item,index) in cart" :key="index">
                            <div class="card-body p-3">
                                <div class="row d-flex justify-content-between align-items-center">
                                    <div class="col-4 col-md-2 col-lg-2 col-xl-2">
                                    <router-link :to="'/product/'+item.id">
                                        <img :src="item.image" class="img-fluid" alt="Cotton T-shirt">
                                    </router-link>
                                    </div>
                                    <div class="col-8 col-md-3 col-lg-3 col-xl-3">
                                        <router-link :to="'/product/'+item.id">
                                            <p class="product_name mb-2">{{item.name}}</p>
                                        </router-link>
                                        <p class="delivery_day text-muted">{{item.delivery_day}}</p>
                                    </div>
                                    <div class="col-md-3 col-lg-2 col-xl-2 d-flex">
                                        <span class="d-block d-sm-none delivery_day">數量：</span>  {{item.qty}}
                                    </div>
                                    <h5 class="col-md-2 col-lg-2 col-xl-2 text-end">
                                       $ {{ item.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div class="card-footer mt-2" v-if="cart.length!=0">
                            <div class="total">
                                訂單金額（<span class="total-len">{{cart.length}}</span>）商品 
                                <div>合計 <span class="amount">$ {{ amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} </span></div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <form action="/pay" method="post">
            <section class="container row justify-content-between p-0 mt-5 mx-auto">
                <div class="outer-bt">
                    <div class="top_title"><i class="fab fa-wpforms"></i> &nbsp; 訂購人資料</div>
                    <div class="form">
                        <div class="mb-4 outer-input">
                            <label class="form1_label"><span style="color:red">*</span>訂購人</label><br>
                            <input type="text" class="form1_input" required name="buyer">
                            <span class="input_animate"></span>
                        </div>
                        <div class="mb-4 outer-input">
                            <label class="form1_label"><span style="color:red">*</span>手機號碼</label><br>
                            <input type="text" pattern="[0-9]*" class="form1_input" required name="phone">
                            <span class="input_animate"></span>
                        </div>
                        <div class="mb-4 outer-input">
                            <label class="form1_label"><span style="color:red">*</span>Email（訂單通知、電子發票寄送）</label><br>
                            <input type="email" class="form1_input" required name="email">
                            <span class="input_animate"></span>
                        </div>
                        <div class="mb-4 outer-input">
                            <label class="form1_label"><span style="color:red">*</span>地址（同中獎發票寄送）</label><br>
                            <input type="text" class="form1_input" required name="addr">
                            <span class="input_animate"></span>
                        </div>
                        <div class="ps_title"><i class="far fa-comment-dots"></i> &nbsp; 訂單備註</div>
                        <textarea cols="60" rows="5" placeholder="訂單相關資訊留言" name="ps"></textarea>
                    </div>
                </div>

                <div class="outer-bt">
                    <div class="top_title"><i class="fas fa-truck"></i> &nbsp; 運送方式</div>
                </div>
            </section>

            <section class="h-100 mt-5 container outer p-0" style="background-color: rgb(255 255 255);">
                <div class="pay_title"><i class="far fa-credit-card"></i> &nbsp; 付款資訊</div>
                <div class="form">
                    <div class="ps_title">付款方式</div>
                    <input type="radio" name="payway" value="Credit" required><label for="">信用卡</label><br>
                    <input type="radio" name="payway" value="ATM"><label for="">ATM</label>
                </div>
            </section>
            <input type="number" name="amount" :value="totalprice" hidden>
            <input type="text" name="product" :value="product" hidden>
            <input type="text" name="qty" :value="qty" hidden>
            <input type="text" name="uid" :value="uid" hidden>
            <!-- <input type="hidden" name="_token" :value="csrf"> -->
            
            <section class="h-100 mt-5 container" style="text-align:center">
                <router-link to="/cart" class="back_btn">回購物車</router-link>
                <button class="done_btn" type="button">完成訂單</button>
            </section>
        </form>

    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'checkout',
    methods:{
        pay(){
            this.$store.commit('cart/pay')
        }
    },
    computed:{
        ...mapState({
            cart : state => state.cart.cart,
            amount : state => state.cart.amount,
            product : state => state.cart.id,
            qty : state => state.cart.qty,
            totalprice : state => state.cart.totalprice,
            uid : state => state.cart.uid,
        }),
        // csrf() {
        //     return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        // },
    }
}
</script>
