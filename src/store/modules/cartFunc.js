import {firebaseAuth , db} from '../../main.js';

const state = {
    cart : [],
    quantity:1,
    amount:0,
    product:'',
    outOfStock:[],
    id:'', //結帳商品
    qty:'', //結帳商品數量
    totalprice:'', //結帳金額
    uid:'', //用戶ID
}
const mutations = {
    //頁面重整
    getCart(state){
        if(localStorage.getItem('myCart')){
            state.cart = JSON.parse(localStorage.getItem('myCart'))
        }
        // console.log(JSON.parse(localStorage.getItem('myCart')))
    },

    //加入購物車
    addToCart(state,payload){
       const exist = state.cart.find(c=>c.id==payload.current.id)

        if(exist){
            state.cart.forEach(c=>{
                if(c.id==payload.current.id){
                    //選擇數量超出庫存
                    let add = c.qty
                    add += payload.qty
                    if(payload.current.stock < add){
                        alert('已超出庫存數量')
                    }else{
                        c.qty += payload.qty
                        c.subTotal = c.qty * c.price
                        alert('已加入購物車')
                    }
                }
            })
        }else{
            const obj = new Object
                obj.id = payload.current.id
                obj.qty = payload.qty
                obj.price = payload.current.price
                obj.image = payload.current.image
                obj.name = payload.current.name
                obj.delivery_day = payload.current.delivery_day
                obj.subTotal = obj.qty * obj.price

                state.cart.push(obj)
                alert('已加入購物車')
        }

        localStorage.setItem('myCart',JSON.stringify(state.cart))
    },

    //商品頁面數量增減
    numberBtn(state,payload){
        if(state.quantity>=1 && payload.action !== 'minus'){
            state.quantity+=1
        }else if(state.quantity >1 && payload.action == 'minus'){
            state.quantity-=1
        }
    },

    //撈product庫存量
    getData(state){
        db.collection('product').get().then(
            querySnapshot => {
                state.product = querySnapshot.docs.map(doc => doc.data())

              //庫存量零的商品  
              state.product.forEach(p=>{
                if(p.stock <= 0 ){
                    state.outOfStock.push(p.id)
                }         
            })
        })
    },

    //購物車頁面數量增減
    numberCartBtn(state,payload){
        if(payload.qty>=1 && payload.action !== 'minus'){
            payload.qty+=1
        }else if(payload.qty >1 && payload.action == 'minus'){
            payload.qty-=1
        }

        const stock = state.product.find(p=>p.id == payload.id)
        state.cart.forEach(c=>{
            if(c.id == payload.id){
                if(stock.stock < payload.qty){
                    alert('已超出庫存數量')
                }else{
                    c.qty = payload.qty
                    c.subTotal = c.price * c.qty
                }
            }
        })
        

        localStorage.setItem('myCart',JSON.stringify(state.cart))
        // console.log(state.cart)
    },

    //購物車移除商品
    remove(state,payload){
        state.cart = state.cart.filter(c=>{
            return c.id != payload.id
        })

        localStorage.setItem('myCart',JSON.stringify(state.cart))
    },

    //購物車總金額
    totalPrice(state){
        state.amount=0
        state.cart.forEach((c)=>{
            state.amount += Number(c.subTotal)
        })
    },

    //前往付款頁面
    checkout(state,payload){
        let remove;
        state.cart.forEach(c=>{
            state.outOfStock.includes(c.id) ? remove = true : '';           
        })

        remove ? alert('請先將完售商品從購物車移除！') : payload.router.push({path:'/checkout'});    
    },

    //付款
    pay(state){
        
        state.id = state.qty = '';
        state.cart.forEach((c,key)=>{
            //商品id、qty分類
            if(key==0){
                state.id = state.id + c.id;
                state.qty =state.qty + c.qty;
            }else{
                state.id = state.id + ',' + c.id;
                state.qty =state.qty + ',' + c.qty;
            }

            let Stock;
            db.collection('product')
            .doc(c.id)
            .get()
            .then(snapshot => {
                const documents = snapshot.data()
                const old_stock = documents.stock
             
                Stock = old_stock - c.qty;

                //更新商品庫存量
                db.collection('product')
                .doc(c.id)
                .update({
                    stock: Stock
                })
            })            
        })

        //金額
        state.totalprice = state.amount;

        //userID
        const user = firebaseAuth.currentUser;
        state.uid = user.uid;

        //清空購物車 
        state.cart = [];
        state.amount = 0;
        localStorage.removeItem('myCart')
    }
}

const actions = {
    addCart({commit},payload){
        commit('addToCart',payload)
        commit('totalPrice')
    },
    numberChange({commit},payload){
        commit('numberCartBtn',payload)
        commit('totalPrice')
    },
    removeItem({commit},payload){
        commit('remove',payload)
        commit('totalPrice')
    },
    reloadCart({commit}){
        commit('getCart')
        commit('totalPrice')
        // commit('checkout')
    }
}

const getters = {
    changePrice(state,getters,rootState){
        return (state.quantity * rootState.search.current_product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}