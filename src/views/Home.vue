<template>
    <div class="home">
        <div class="list_outline d-none d-sm-block">
            <div class="list-group list-group-horizontal container">
                <div class="col-2" @mouseover="choose_all(1)">所有分類</div>
                <div class="col-2" @mouseover="choose_all(2),choose_menu('新春優惠','sales')">優惠專區</div>
                <div class="col-2" @mouseover="choose_all(3),choose_menu('客廳家具','product_type')">客廳家具</div>
                <div class="col-2" @mouseover="choose_all(4),choose_menu('床、化妝台','product_type')">床、化妝台</div>
                <div class="col-2" @mouseover="choose_all(5),choose_menu('衣櫃、鞋櫃','product_type')">衣櫃、鞋櫃</div>
                <div class="col-2" @mouseover="choose_all(6),choose_menu('寢具','product_type')">寢具</div>
            </div>
        </div>

        <!-- munu1 -->
        <div class="menu menu1 display container" @mouseleave="unset">
            <div class="d-flex container">
                <div class="col-4 sel_item1">
                    <ul>
                        <li v-for="(item,type_index) in product_type" :key="type_index" @mouseover="choose_type(type_index)">{{item.type}}</li>
                    </ul>
                </div>
                <div class="col-4 sel_item2">
                    <div v-for="(item,deep_type_index) in type" :key="deep_type_index" :class="{ selected: selected_type.includes(deep_type_index)}">
                        <ul>
                            <li v-for="(item,index) in item" :key="index" class="display" @mouseover="choose_detail(item)"> {{item}}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-4 sel_item3">
                    <router-link :to="'/category/'+item.link" v-for="(item,detail_type_index) in detail" :key="detail_type_index">{{item.name}}<br /></router-link>
                </div>
            </div>
        </div>

        <!-- munu2 優惠專區-->
        <div class="menu menu2 display container" @mouseleave="unset">
            <div class="d-flex container">
                <div class="col-4 sel_item2">
                    <ul>
                        <li v-for="(item,index) in sales" :key="index" @mouseover="choose_menu(item.type,'sales')">{{item.type}}</li>
                    </ul>
                </div>
                <div class="col-8 sel_item3">
                    <a @click="goToSales(item)" v-for="(item,index) in menu_type" :key="index">{{item}}</a>
                </div>
            </div>
        </div>


        <!-- munu3 ~ 6 -->
        <div v-for="(item,menu_index) in repeat_menu" :key="menu_index" class="menu display container" :class="class_menu+item" @mouseleave="unset"> 
            <div class="d-flex container">
                <div class="col-4 sel_item2">
                    <ul>
                        <li v-for="(item,index) in menu_type" :key="index"  @mouseover="choose_detail(item)">{{item}}</li>
                    </ul>
                </div>
                <div class="col-8 sel_item3">
                    <router-link :to="'/category/'+item.link" v-for="(item,detail_type_index) in detail" :key="detail_type_index">{{item.name}}<br /></router-link>
                </div>
            </div>
        </div>

        <!-- 幻燈片 -->
        <!-- @swiper="onSwiper" @slideChange="onSlideChange" -->
        <!-- <section class="slide">
            <swiper :slides-per-view="1" :space-between="30" :pagination="true" :navigation="true" :autoplay="true" :loop="true">
                <swiper-slide><img src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></swiper-slide>
                <swiper-slide><img src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></swiper-slide>
                <swiper-slide><img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></swiper-slide>
            </swiper>
        </section> -->
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" class="d-block">
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <img src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" class="d-block">
                </div>
                <div class="carousel-item">
                    <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" class="d-block">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <!-- 暢銷商品 -->
        <section class="best_seller container">
            <strong>暢銷商品</strong>
            <ul class="row row-cols-auto justify-content-center">
                <li :class="{active: isActive[0]}" @click="seller_newest('寢具',0,'best_seller')">寢具</li>
                <li :class="{active: isActive[1]}"  @click="seller_newest('客廳家具',1,'best_seller')">客廳家具</li>
                <li :class="{active: isActive[2]}" @click="seller_newest('衣櫃、鞋櫃',2,'best_seller')">衣櫃、鞋櫃</li>
                <li :class="{active: isActive[3]}" @click="seller_newest('洗曬、衛浴',3,'best_seller')">洗曬、衛浴用品</li>
                <li :class="{active: isActive[4]}" @click="seller_newest('餐廳家具',4,'best_seller')">餐廳家具</li>
                <li :class="{active: isActive[5]}" @click="seller_newest('廚房家具',5,'best_seller')">廚房家具</li>
            </ul>
            <div class="row row-cols-3 row-cols-sm-6 collect_section">
                <div v-for="(item,seller_index) in best_seller" :key="seller_index" class="col">
                    <div class="card">
                        <div @click="goTo(item.id)">
                            <img :src="item.image" alt="">
                        </div>
                        <div class="card-body row">
                            <div class="card-title" @click="goTo(item.id)">{{item.name}}</div>
                            <p class="card-text">
                                ${{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                            </p>
                            <div class="collect">
                                <i class="fas fa-heart" v-if="collect_id.includes(item.id)" @click="removeCollect(item)"></i>
                                <i class="far fa-heart" v-else @click="addCollect(item)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </section>

        <!-- 最新上架 -->
        <section class="newest container">
            <strong>最新上架</strong>
            <ul class="row row-cols-auto justify-content-center">
                <li :class="{active: isActive[6]}" @click="seller_newest('餐廚用品',6,'newest')">餐廚用品</li>
                <li :class="{active: isActive[7]}"  @click="seller_newest('寢具',7,'newest')">寢具</li>
                <li :class="{active: isActive[8]}" @click="seller_newest('衣櫃、鞋櫃',8,'newest')">衣櫃、鞋櫃</li>
                <li :class="{active: isActive[9]}" @click="seller_newest('客廳家具',9,'newest')">客廳家具</li>
                <li :class="{active: isActive[10]}" @click="seller_newest('廚房家具',10,'newest')">廚房家具</li>
                <!-- <li :class="{active: isActive[11]}" @click="seller_newest('書房、辦公家具',11,'newest')">書房、辦公家具</li> -->
            </ul>
            <div class="row row-cols-3 row-cols-sm-6 collect_section">
                <div v-for="(item,newest_index) in newest" :key="newest_index" class="col">
                    <div class="card">
                        <div @click="goTo(item.id)">
                            <img :src="item.image" alt="">
                        </div>
                        <div class="card-body row">
                            <div class="card-title" @click="goTo(item.id)">{{item.name}}</div>
                            <p class="card-text">
                                ${{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                            </p>
                            <div class="collect">
                                <i class="fas fa-heart" v-if="collect_id.includes(item.id)" @click="removeCollect(item)"></i>
                                <i class="far fa-heart" v-else @click="addCollect(item)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </section>

        <!-- 商品分類 -->
        <section class="classification container">
            <strong>商品分類</strong>
            <div class="row row-cols-3 row-cols-sm-6">
                <div class="class_type " v-for="(item,type_index) in product_type" :key="type_index" @click="classification(item.id)">
                    <i :class="item.icon"></i>
                    <span>{{item.type}}</span> 
                </div>
            </div>
        </section>

        <!-- footer -->
        <foot></foot>
    </div>
</template>

<script>
import {mapState , mapGetters} from 'vuex';
import foot from '../components/foot.vue'

// import { Navigation, Pagination } from 'swiper';
// import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2';

// import "swiper/swiper-bundle.css";
// SwiperCore.use([Navigation, Pagination]);

export default {
     components: {
    //   Swiper,
    //   SwiperSlide,
      foot,
    },
    created(){
        this.$store.dispatch('search/callStart', {name:'sales'})
        this.$store.commit('collect/reload')
        this.$store.dispatch('home/checkActive',{active:this.isActive})
    },
    watch:{
        product_type:function(){
            this.$store.commit('collect/reload')
        }
    },
    name:"Home",
    data(){
        return {
            selected_type: [],
            repeat_menu:[3,4,5,6],
            class_menu:'menu',
        };
    },
    methods:{
        // onSwiper (swiper) {
        // console.log(swiper)
        // },
        // onSlideChange () {
        // console.log('slide change')
        // },
        choose_type(type_index){
            this.$store.dispatch('search/callType')
            this.selected_type = [];
            this.selected_type.push(type_index)
        },
        unset(){
            this.selected_type = [];
            document.querySelectorAll('.menu').forEach(m=>{
                m.classList.add('display')
            });
            this.$store.commit('search/detailClear')
        },
        choose_all(number){
            document.querySelector(`.menu${number}`).classList.remove('display');
            document.querySelectorAll('.menu').forEach(m=>{
                if(!m.classList.contains(`menu${number}`)){
                    m.classList.add('display')
                }
            })
        },
        choose_detail(type){
            this.$store.commit('search/detailType',type)
        },
        choose_menu(type_name,collection){
            this.$store.commit('search/menuType',{type_name , collection})
        },        
        goToSales(type){
            this.$store.commit('search/getUrl',{type,router:this.$router})
        },
        seller_newest(id,index,type){
            this.$store.commit('home/getData',{id,type});

            this.isActive.forEach((item,key)=>{
                if(index < 6 && key < 6){
                    this.isActive[key]=false
                }else if(index >= 6 && key >= 6){
                    this.isActive[key]=false
                }
               index == key? this.isActive[key]=true : "";
            })
        },
        goTo(id){
            this.$router.push({path:`/product/${id}`})
        },
        addCollect(item){
            this.$store.dispatch('collect/add', {item , router:this.$router})
        },
        removeCollect(item){
            this.$store.dispatch('collect/remove', {item , router:this.$router})
        },
        classification(id){
            this.$router.push(`/productType/${id}`)
        },
    },
    computed:{
        ...mapState({
            product_type : state => state.search.product_type,
            type : state =>state.search.type,
            detail : state => state.search.detail,
            menu_type : state => state.search.menu_type,
            sales : state => state.search.sales,
            best_seller : state => state.home.best_seller,
            collect_id : state=>state.collect.collect_id,
            newest : state => state.home.newest,
        }),
        ...mapGetters({
            isActive : "home/isActive"
        })
    }
}
</script>

<style scoped>
.selected .display{
    display: block;
}
.display{
    display: none;
}
</style>