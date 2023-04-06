<template>
    <div>
        <div class="container product">
            <div class="title_link">
                <i class="fa-solid fa-location-dot"></i>&nbsp; 
                <span @click="backTo('/')">首頁</span>  > <span @click="backTo(`/productType/${productTypeId}`)">{{ productType }}</span>  > {{ productDeepType }} > {{categoryName}}
            </div>
            <h4 class="mt-5"><span>◎</span>{{current.name}}</h4>
            <div class="d-flex flex-wrap gap-5">
                <div class="col-sm-4">
                    <figure class="zoom" @mousemove="zoom($event)" :style="{'background-image':'url('+current.image+')'}">
                        <img class="image" :src="current.image">
                    </figure>
                </div>
                <div class="col-sm-3">
                    <p>{{current.introduce}}</p>

                    <p class="price" v-if="current.sales_type">
                        單價 &nbsp;<span class="cur-price">${{current.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span> &nbsp;
                        <span class="text-line">${{current.old_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span>
                    </p>
                    <p class="price" v-else>
                        單價 &nbsp;<span class="cur-price">${{current.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span>
                    </p>
                </div>
                <div class="delivery-outer">
                    <p class="delivery">
                        <span>配送方式</span>　&emsp;
                        <span class="text">{{current.delivery_way}}</span>
                    </p>
                    <div class="border-bt"></div>
                    <p class="delivery">
                        <span>預計可配送日</span>  &emsp;
                        <span class="text">{{current.delivery_day}} <i class="fas fa-info-circle"></i></span>
                        <!-- <router-link to="/delivery/delivery_day"></router-link> -->
                    </p>
                    <div class="border-bt"></div>
                    <p class="delivery">
                        <span>退貨、換貨</span>  &emsp;
                        <span class="text">7天內可退貨 <i class="fas fa-info-circle"></i></span>
                        <!-- <router-link to="/delivery/delivery_exchange"></router-link> -->
                    </p>
                    <div class="border-bt"></div>
                    <p class="delivery">
                        <span>運費</span>  &emsp;
                        <span class="text">{{current.delivery_fee}} <i class="fas fa-info-circle"></i></span>
                        <!-- <router-link to="/delivery/delivery_fee"></router-link> -->
                    </p>
                    <div class="border-bt"></div>
                    <p  class="delivery">
                        <span>數量</span>  &emsp; 
                        <span class="number-input">
                            <button @click="numberBtn('minus')"></button>
                            <input class="quantity" :value="quantity" type="number" disabled>
                            <button @click="numberBtn('plus')" class="plus"></button>
                        </span>
                    </p>
                    <div class="border-bt"></div>
                    <p class="delivery">
                        <span>訂購金額</span>  &emsp;
                        <span class="changePrice">$ {{changePrice}}</span>
                    </p>
                    <div class="border-bt"></div>
                    <p class="delivery justify-content-center">
                        <button class="addToCart" @click="addToCart" v-if="current.stock>0">加入購物車</button>
                        <button class="outOfStock" v-else disabled>尚無存貨</button>
                    </p>
                    <div class="delivery justify-content-center">
                        <span class="collect" v-if="collect_id.includes(current.id)" @click="removeCollect()">
                            <i class="fas fa-heart"></i>
                        </span>
                        <span class="collect" v-else  @click="addCollect()">
                            <i class="far fa-heart"></i>
                        </span>
                    </div>
                    <p class="d-flex justify-content-center mt-2">
                        收藏
                    </p>
                </div>
            </div>

            <!-- 商品說明 -->
            <strong>商品說明</strong>
            <div class="introduce_outer">
                <section v-if="current.image2">
                    <img class="image2" :src="current.image2">
                </section>
                <section v-if="current.image3">
                    <img class="image3"  :src="current.image3">
                </section>
                <p class="bt_intro" v-if="current.introduce2">{{current.introduce2}}</p>            
            </div>
        </div>

        <!-- footer -->
        <foot></foot>
    </div>
</template>

<script>
import {mapState , mapGetters} from 'vuex';
import foot from '../components/foot.vue';

export default {
    name:'product',
    components: {
        foot
    },
    created(){
         this.$store.commit('search/getID',{id:this.$router.currentRoute.params.id,name:'current_product',bool:false,match:'id'});
         this.$store.commit('collect/reload');
         window.addEventListener('scroll', this.checkOffset);
    },
    watch:{
        product:function(){
            this.$store.commit('search/getID',{id:this.$router.currentRoute.params.id,name:'current_product',bool:false,match:'id'})
            this.$store.commit('collect/reload')
        },
        $route(to,from){
            this.$store.commit('search/getID',{id:this.$router.currentRoute.params.id,name:'current_product',bool:false,match:'id'});
        }
    },
    methods:{
        zoom(event){
            let zoomer = event.currentTarget;
            let offsetX,offsetY,x,y

            if(event.offsetX!=0 && event.offsetY!=0){
                event.offsetX ? offsetX = event.offsetX : offsetX = event.touches[0].pageX
                event.offsetY ? offsetY = event.offsetY : offsetX = event.touches[0].pageX
                x = offsetX/zoomer.offsetWidth*100
                y = offsetY/zoomer.offsetHeight*100
              
                zoomer.style.backgroundPosition = x + '% ' + y + '%';
            }
        },
        numberBtn(action){
            this.$store.commit('cart/numberBtn',{action})
        },
        addToCart(){
            if(this.quantity > this.current.stock){
                alert('已超出庫存數量')
            }else{
                this.$store.dispatch('cart/addCart',{ qty:this.quantity , current:this.current})
            }
        },
        addCollect(){
            this.$store.dispatch('collect/add', {item:this.current , router:this.$router})
        },
        removeCollect(){
            this.$store.dispatch('collect/remove', {item:this.current , router:this.$router})
        },
        backTo(to){
            this.$store.commit('home/backTo',{to:to,router:this.$router})
        },
        checkOffset() {
            if (window.innerWidth > 576) {
                if($('.delivery-outer').offset().top + $('.delivery-outer').height() >= $('footer').offset().top - 10){
                    $('.delivery-outer').css('position', 'absolute');
                    $('.delivery-outer').css('bottom', '0');                
                }
                if($(document).scrollTop() + window.innerHeight < $('footer').offset().top){
                    $('.delivery-outer').css('position', 'fixed'); // restore when you scroll up
                    $('.delivery-outer').css('top', '14vw');
                }
            }

            //  if (window.innerWidth > 576) {
            //     this.media = true
            //     } else {
            //     this.media = false
            //     }
        }
    },
     computed:{
        ...mapState({
            product : state=>state.search.product,
            current : state=>state.search.current_product,
            quantity : state=>state.cart.quantity,
            collect_id : state=>state.collect.collect_id,
            productDeepType : state=>state.search.productDeepType,
            productType : state=>state.search.productType,
            productTypeId : state=>state.search.productTypeId,
            categoryName : state=>state.search.categoryName,
        }),
        ...mapGetters({
            changePrice : "cart/changePrice"
        })
    }
}
</script>

