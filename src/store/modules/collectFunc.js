import {firebaseAuth,db} from '../../main.js';

const state = {
    collections : [],
    collect_id : [],
    login : false,
}
const mutations = {
    //重整頁面、登入時，匯入收藏資料
    reload(state){
        const user = firebaseAuth.currentUser;
        if(user){
            db.collection('collect')
            .doc(user.uid)
            .get()
            .then(snapshot => {
                const documents = snapshot.data()
                const doc = JSON.parse(documents.info)
                state.collections = doc.map(d=> d)
                state.collect_id = doc.map(d=> d.id)

                // console.log(state.collect_id)
            })
        }
    },
    //收藏商品
    addCollect(state,payload){
        if(state.login){
            const obj = new Object
            obj.id = payload.item.id
            obj.price = payload.item.price
            obj.image = payload.item.image
            obj.name = payload.item.name
            
            state.collections.push(obj)
            state.collect_id.push(payload.item.id)
        }else{
            alert('請先登入！')
            payload.router.push({path:'/login'})
        }
    },
    //移除收藏
    removeCollect(state,payload){
        if(state.login){
            state.collections = state.collections.filter(c=> c.id != payload.item.id)
            state.collect_id = state.collect_id.filter(c => c != payload.item.id )
        }else{
            alert('請先登入！')
            payload.router.push({path:'/login'})
        }
    },
    //檢查有無使用者
    checkLogin(state){
        firebaseAuth.onAuthStateChanged(function(user){
            if(user){
                state.login = true
            }
        })
    },
    //使用者登出
    logout(state){
        state.login = false
        state.collections = state.collect_id = []
    },
    //收藏商品存入firebase中
    storeCollect(state){
        const user = firebaseAuth.currentUser;
        // document ID 為使用者ID
        db.collection('collect')
        .doc(user.uid)
        .set({
            info: JSON.stringify(state.collections)
        })

    }
}

const actions = {
    add({commit},payload){
        commit('addCollect',payload)
        commit('storeCollect')
    },
    remove({commit},payload){
        commit('removeCollect',payload)
        commit('storeCollect') 
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
}