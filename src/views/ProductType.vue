<template>
    <div>
        <div class="container collect_section" style="margin-bottom: 100px;">
            <div class="title_link">
                <i class="fa-solid fa-location-dot"></i>&nbsp; 
                <span @click="backTo('/')">首頁</span>  > {{type}}
            </div> 
            <div class="row row-cols-2 row-cols-sm-4 row-cols-lg-5 row-gap-3">
                <div v-for="(item,index) in current" :key="index" class="col">
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
import {mapState} from 'vuex';
import foot from '../components/foot.vue';

export default {
    name:'ProductType',
    components: {
        foot
    },
    created(){
        this.$store.commit('home/getProduct', {id:this.$router.currentRoute.params.id})
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
            current : state => state.home.current_type,
            collect_id : state=>state.collect.collect_id,
            type : state=>state.home.type,
        })
    }
}
</script>

<style scoped>

</style>