<template>
    <div>
        <div class="container collect_section" style="margin-bottom: 100px;">
            <div class="title_link">
                <i class="fa-solid fa-location-dot"></i>&nbsp; 
                <span @click="backTo('/')">首頁</span>  > <span @click="backTo(`/productType/${productTypeId}`)">{{ productType }}</span>  > {{ productDeepType }} > {{categoryName}}
            </div>
            <div class="row row-cols-2 row-cols-sm-4 row-cols-lg-5 row-gap-3">
                <div v-for="(item,index) in category_product" :key="index" class="col">
                    <div class="card">
                        <div class="card-img-top" @click="goTo(item.id)" :style="{'background-image': 'url(' +item.image + ')'}">
                            <div v-if="item.sales_type" class="tag">{{item.sales_type}}</div>
                        </div>
                        <div class="card-body row">
                            <div class="card-title" @click="goTo(item.id)">{{item.name}}</div>
                            <p v-if="item.sales_type" class="card-text">
                            <span class="text-line">${{item.old_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span><br/>
                                ${{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                            </p>
                            <p v-else class="card-text">
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
        </div>

         <!-- footer -->
        <foot></foot>
    </div>
</template>

<script>
import {mapState , mapGetters} from 'vuex';
import foot from '../components/foot.vue';

export default {
    name:"Category",
    components: {
        foot
    },
    created(){
        this.$store.commit('search/getID',{id:this.$router.currentRoute.params.id,name:'category_product',bool:true,match:'detail_url'})
         this.$store.commit('collect/reload')
    },
    //監聽product
    watch:{
        product:function(){
            this.$store.commit('search/getID',{id:this.$router.currentRoute.params.id,name:'category_product',bool:true,match:'detail_url'})
            this.$store.commit('collect/reload')
        }
    },
    methods:{
        goTo(id){
            this.$router.push({path:`/product/${id}`})
        },
        addCollect(item){
            this.$store.dispatch('collect/add', {item , router:this.$router})
        },
        removeCollect(item){
            this.$store.dispatch('collect/remove', {item , router:this.$router})
        },
        backTo(to){
            this.$store.commit('home/backTo',{to:to,router:this.$router})
        }
    },
    computed:{
        ...mapState({
            product : state=>state.search.product,
            category_product : state=>state.search.category_product,
            categoryName : state=>state.search.categoryName,
            collect_id : state=>state.collect.collect_id,
            productDeepType : state=>state.search.productDeepType,
            productType : state=>state.search.productType,
            productTypeId : state=>state.search.productTypeId,
        }),
    }
}
</script>

<style scoped>
</style>