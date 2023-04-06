<template>
    <div class="collection">
        <section class="h-100 my-5">
        <div class="container h-100 outer">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-11">

                <div class="d-flex justify-content-center align-items-center mb-4">
                <h3 class="mb-0 text-black">收藏</h3>
                </div>

                <div class="card-header py-3" v-if="collections.length!=0">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-5 col-lg-5 col-xl-5">
                            <h5 class="mb-0">商品</h5>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-4" v-for="(item,index) in collections" :key="index">
                    <div class="card-body p-3">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="col-10">
                                <router-link :to="'/product/'+item.id">
                                    <img :src="item.image" class="img-fluid d-inline-block d-sm-none" style="width:23vw">
                                    <img :src="item.image" class="img-fluid d-none d-sm-inline-block" style="width:100px">
                                </router-link> &nbsp;
                                <span class="d-inline-block" style="width:55%">
                                    <router-link :to="'/product/'+item.id">
                                        <p class="product_name mb-2 d-inline-block" style="overflow-wrap:anywhere">{{item.name}}</p>
                                    </router-link>
                                    <h6 class="mb-0">$ {{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</h6>
                                </span>
                            </div>
                            <div class="col text-end">
                                <i class="fas fa-trash-alt" @click="removeCollect(item)"></i>
                            </div>
                        </div>
                        
                        <!-- <div class="card-footer mt-2"> -->
                            <!-- <span class="delete" @click="removeCollect(item)"><i class="fas fa-trash-alt"></i> 移除</span> -->
                        <!-- </div> -->
                    </div>
                </div>

                <div v-if="collections.length==0" style="text-align:center">
                        尚未收藏任何商品！
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
    name:'collection',
    created(){
        this.$store.commit('collect/reload')
    },
    methods:{
        removeCollect(item){
            this.$store.dispatch('collect/remove', {item , router:this.$router})
        },
    },
    computed:{
        ...mapState({
            collections : state=>state.collect.collections
        })
    }
}
</script>