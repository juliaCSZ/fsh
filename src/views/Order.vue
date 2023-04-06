<template>
    <div class="container order">
        <h3 @click="getData">訂單資訊</h3>
       
        <section v-for="(item,index) in list" :key="index">
            金額：  {{ item.amount }} <br>
            訂單編號：　{{ item.dealno }} <br>
            訂單成立時間：  {{item.created_at}} <br>
            訂單狀態：  已完成 <br>
            配送資訊：  <br>
            地址  {{ item.addr }}
            手機號碼 {{item.phone}}  <br>

            <button type="button" @click="change(index)">展開</button>
            <table :class="{display: display[index]}">
                <tbody>
                    <tr v-for="(p,p_key) in product[index]" :key="p_key">
                        <td><img :src="p.image" alt=""></td>
                        <td>{{p.name}} &emsp;</td>
                        <td>${{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
                    </tr>
                </tbody>
            </table>
             _________________________________
        </section>
       
        
    </div>
</template>

<script>
import {mapState , mapGetters} from 'vuex';

export default {
    name:'Order',
    watch:{
        product:function(){
            this.$store.commit('order/createArr')
        }
    },
    methods:{
        getData(){
            this.$store.commit('order/orderlist')
        },
        change(index){       
            this.$store.commit('order/changeArr',index)
        }
    },
    computed:{
        ...mapState({
            display:state => state.order.display,
            list : state => state.order.list,
            product : state => state.order.product,
            qty : state => state.order.qty,
        }),
    }

}
</script>

<style scoped>
img{
    max-width: 100px;
}

</style>