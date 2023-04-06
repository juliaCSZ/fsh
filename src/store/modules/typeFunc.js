import {db} from '../../main.js';

const state = {}

const mutations = {
     //撈出分類產品
     getProduct(id,router){
        //從firebase撈出屬於此type的商品
        db.collection('product').get().then(
            querySnapshot => {
               const documents = querySnapshot.docs.map(doc => doc.data())

               console.log(documents) 
            }
        )
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    // actions,
    // getters
};