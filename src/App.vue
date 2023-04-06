<template>
  <div class="main">
    <section class="main_header">【官網限定】 家飾滿千免運</section>
    <nav class="navbar navbar-expand-sm mt-3 mb-4 container">
      <div class="container-fluid justify-content-between align-items-sm-baseline">
        <router-link to="/" class="navbar-brand">首頁 </router-link>
        <!-- phone -->
        <span class="d-block d-sm-none me-auto">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </span>
        <span class="d-block d-sm-none" style="width:14%">            
          <router-link to="/collection" class="nav-link">
            <i class="far fa-heart"></i>
          </router-link>
        </span>
        <span class="d-block d-sm-none" style="width:20%">            
          <router-link to="/cart" class="nav-link">
            <i class="fas fa-cart-arrow-down" style="position:relative">
              <span class="position-absolute top-0 translate-middle-y main_cart">{{ inCart }} </span>
            </i> 
          </router-link>
        </span>
        <span :class="{login:!islogin}" class="nav-item d-block d-sm-none">
          <i class="fas fa-user"></i>
          <div class="log" v-if="!islogin"></div>
          <div class="log" v-else　@click="logout()"></div>

          <span class="loginBtn">
            <router-link to="/login">登入</router-link>
            <div class="underline"></div>
            <router-link to="/register">註冊</router-link>
          </span>
        </span>     


        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex search_form d-none d-sm-block" role="search">
              <input class="form-control" type="search" aria-label="Search" v-model="typing" placeholder="搜尋">
            </form>

            <ul class="navbar-nav mb-2 mb-lg-0">
              <!-- web -->
              <li class="nav-item d-none d-sm-block">
                <router-link to="/" class="nav-link"><i class="far fa-question-circle"></i> 常見問題 </router-link>
              </li>
              <li class="nav-item d-none d-sm-block">                
                <router-link to="/collection" class="nav-link"><i class="far fa-heart"></i> 收藏  </router-link>
              </li>
              <li class="nav-item d-none d-sm-block">                
                <router-link to="/cart" class="nav-link">
                  <i class="fas fa-cart-arrow-down" style="position:relative">
                    <span class="position-absolute top-0 translate-middle-y main_cart">{{ inCart }} </span>
                  </i> 購物車  
                </router-link>
              </li>
              <span :class="{login:!islogin}" class="nav-item d-none d-sm-block">
                <i class="fas fa-user"></i>
                <div class="log" v-if="!islogin">登入/註冊</div>
                <div class="log" v-else　@click="logout()">登出</div>

                <span class="loginBtn">
                  <router-link to="/login">登入</router-link>
                  <div class="underline"></div>
                  <router-link to="/register">註冊</router-link>
                </span>
              </span>

              <!-- phone登入、註冊 -->
              <div class="d-flex my-4 gap-4">
                <router-link class="d-block d-sm-none w-50 login_btn" to="/login" v-if="!islogin">會員登入</router-link>
                <router-link class="d-block d-sm-none w-50 register_btn" to="/register" v-if="!islogin">會員註冊</router-link>
                <span class="d-block d-sm-none w-50 register_btn" v-else @click="logout()">登出</span>
              </div>

              <!-- phone產品分類 -->      
              <div class="phone_list d-flex d-sm-none">
                <section class="col-2">
                  <div class="phone_list_type" v-for="(item,index) in product_type" :key="index+'phone_1'" @click="choose_type(index)">{{item.type}}</div>
                </section>
                <section class="col-10  mt-3">
                  <div v-for="(item,index) in type" :key="index+'phone_2'" :class="{ selected: phone_type.includes(index)}">
                      <ul class="row gap-2">
                          <li v-for="(item,index) in item" :key="index+'phone_3'" class="display phone_list_detail" :class="{selected : phone_detail === index}" @click="choose_detail(item,index)"> {{item}}</li>
                      </ul>
                  </div>
                  <div class="row row-cols-3 phone_list_product">
                    <div class="col" v-for="(item,index) in phone_product" :key="index+'phone_4'">
                      <router-link :to="'/product/'+item.id">
                        <img :src="item.image" alt="" style="max-width:100%">
                        {{ item.name }}
                      </router-link>
                    </div>
                  </div>
                </section>
              </div>
   
            </ul>
        </div>
      </div>
    </nav>

    <!-- phone搜尋 -->
    <form class="d-flex d-block d-sm-none mb-3 phone_search_form" role="search">
      <input class="form-control" type="search" aria-label="Search" v-model="typing" placeholder="搜尋">
    </form>
    
    <router-view />
  </div>
</template>


<script>
import {mapState , mapGetters} from 'vuex';
export default {
  name: 'App',
  async created(){
    await this.$store.dispatch('search/callStart', {name:'product'})
    await this.$store.dispatch('search/callStart', {name:'product_type'})
    await this.$store.commit('auth/checkLogin')
    await this.$store.commit('collect/checkLogin')
    await this.$store.dispatch('cart/reloadCart')
  },
  data(){
    return {
      phone_type:[],
      phone_detail:'',
    };
  },
  watch:{
    product_type:function(){
      this.$store.dispatch('search/callStart', {name:'product_detail_url'})
    },
  },
  methods:{
    logout(){
      this.$store.commit('auth/logout')
      this.$store.commit('collect/logout')
    },
    choose_type(index){
      this.$store.commit('search/detailClear')
      this.$store.dispatch('search/callType')
      this.phone_type = [];
      this.phone_type.push(index)
      this.phone_detail = ''
    },
    choose_detail(type,detail){
      this.$store.commit('search/detailType',type)
      this.phone_detail = detail
    },
  },
  computed:{
    ...mapState({
      text: state => state.search.text,
      islogin: state => state.auth.islogin,
      cart : state => state.cart.cart,
      product_type : state => state.search.product_type,
      type : state =>state.search.type,
      phone_product : state => state.search.phone_product,
    }),
    typing:{
      get(){
        return this.text
      },
      // setter雙向綁定計算屬性
      set(value){ 
        //  導向搜尋頁面
        this.$router.push({path:'/search'}).catch(()=>{});
        this.$store.commit('search/searchResult',value)
      }
    },
    inCart(){
      return this.cart.length
    }
  },
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