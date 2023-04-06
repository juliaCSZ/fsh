import {db} from '../../main.js';

const state = {
    best_seller:[],
    newest:[],

    current_type:'', //產品類別
    type:'', //類別名稱
}
const mutations = {
    //從firebase取暢銷商品、最新商品
    getData(state,payload){
        state[payload.type]=[];
        db.collection(payload.type).doc(payload.id).get().then(
            querySnapshot => {
            const best_seller =  Object.entries(querySnapshot.data()).map(a=>{
                    return a[1];
                })
                best_seller.forEach(b=>{
                    db.collection('product').doc(b).get().then(
                        doc => {state[payload.type].push(doc.data());}                        
                    )
                })
        });
    },

     //撈出分類產品
     getProduct(state,payload){
        //從firebase撈出屬於此type的商品
        db.collection('product').get().then(
            querySnapshot => {
               const documents = querySnapshot.docs.map(doc => doc.data())

               state.current_type =  documents.filter(d=>d.product_type == payload.id)
            //    console.log(state.current_type) 
            }
        )

        //從firebase撈type名稱
        db.collection('product_type').get().then(
            querySnapshot => {
                const documents = querySnapshot.docs.map(doc => doc.data())
                let type;
                [type] = documents.filter(d=> 
                    d.id == payload.id     
                )
                state.type = type.type
            }
        )        
    },

    //回到某頁面
    backTo(state,payload){       
        payload.router.push({path:payload.to})
    }
}

const actions = {
    //先找到已選取的類別
    checkActive({commit},payload){
        const typeName=['寢具','客廳家具','衣櫃、鞋櫃','洗曬、衛浴','餐廳家具','廚房家具','餐廚用品','寢具','衣櫃、鞋櫃','客廳家具','廚房家具','書房、辦公家具'];
        const t = [];
        payload.active.forEach((a,key)=>{
            if(a){
                t.push(key)
            }
        })
        t.forEach(tt=>{
            if(tt<6){
                commit('getData', {id:typeName[tt],type:'best_seller'})
            }else{
                commit('getData', {id:typeName[tt],type:'newest'})
            }
        })
    }
}

const getters = {
    isActive(){
        return [true,...Array(5).fill(false),true,...Array(4).fill(false)]
    } 
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};