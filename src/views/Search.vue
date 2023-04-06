<template>
  <div class="container">
    <!-- v-on:keyup.enter="typing" -->
    <h2>搜尋結果：</h2>
    <div v-if="result.length!=0" class="collect_section mt-4">
      <div class="row row-cols-2 row-cols-sm-4 row-cols-lg-5 row-gap-3">
          <div v-for="(item,index) in result" :key="index" class="col">
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
    <h4 v-else>查無搜尋結果</h4>
  </div>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: "Search",
  created(){
    this.$store.commit('collect/reload')
  },
  watch:{
    result:function(){
      this.$store.commit('collect/reload')
    }
  },
  methods:{
        goTo(id){
            this.$router.push({path:`/product/${id}`})
        },
        addCollect(item){
          this.$store.dispatch('collect/add', {item, router:this.$router})
        },
        removeCollect(item){
            this.$store.dispatch('collect/remove', {item, router:this.$router})
        },
    },
   computed:{
    ...mapState({
      result: state => state.search.result,
      collect_id : state=>state.collect.collect_id,
    }),
  },
};
</script>

<style scoped>
</style>