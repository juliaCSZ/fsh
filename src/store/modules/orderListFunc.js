import axios from 'axios';
import {firebaseAuth , db} from '../../main.js';
import Vue from 'vue';

const state = {
    display:[],
    list : '',
    product : [],
    qty : [],
}

const mutations = {
    orderlist(state){
        const user = firebaseAuth.currentUser;

        axios.get(`/orderlist/${user.uid}`)
        .then(res => {
            //目前使用者的訂單紀錄
            state.list = res.data

            //從訂單product ID，撈產品資訊
            res.data.forEach((d,key)=> {
                const product = d.product.split(',');
                const qty = d.qty.split(',');

                const this_order = [];
                state.qty.push(qty)

                db.collection('product').get().then(
                    querySnapshot => {
                        //所有產品中撈出此訂單產品
                        querySnapshot.docs.forEach(doc => {
                            if(product.includes(doc.data().id)){
                                this_order.push(doc.data()) 
                                
                                
                                //此訂單資料已撈完
                                if(this_order.length == product.length){
                                    state.product.push(this_order)
                                    // console.log(state.product)
                                }
                            }
                        });
                })
            })
        })
    },
    createArr(state){
       state.display = Array(state.product.length).fill(true);
    },
    changeArr(state,index){
        state.display[index]==true ? Vue.set(state.display,index,false) : Vue.set(state.display,index,true);
    }

}



export default {
    namespaced: true,
    state,
    mutations,
    // actions,
    // getters
  };