import {db} from '../../main.js';

const state = {
    delivery:'',
}

const mutations = {
    //從firebase取所有product資料
    getData(state,payload){
        db.collection(payload.name).get().then(
            querySnapshot => {
                const documents = querySnapshot.docs.map(doc => doc.data())
                state[payload.name] = documents[0][payload.issue]
                // console.log(state[payload.name])
            })
    },
}

export default {
    namespaced: true,
    state,
    mutations
}