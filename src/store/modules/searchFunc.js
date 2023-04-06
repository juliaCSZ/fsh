import {db} from '../../main.js';
import axios from 'axios';

const state = {
    product:'',
    text:'',
    result:'',
    product_type:'', //主類別
    type:[],  //子類別
    detail:'', //第二子類別
    menu_type:[], //菜單子類別 
    product_detail_url:'',  //全部第二子類別和對應ID
    phone_product:[],   //手機板第二子類別商品詳細內容

    category_product:'',    //Category目前子類別ID對應產品
    categoryName:'',    //第二子類別名稱
    productType:'',     //主類別名稱
    productTypeId:'',     //主類別ID
    productDeepType:'',     //次類別名稱

    current_product:'', //點選的產品

    sales:'',   //優惠專區
};

const mutations = {
    //從firebase取所有product資料
    getData(state,name){
        db.collection(name).get().then(
            querySnapshot => {
                const documents = querySnapshot.docs.map(doc => doc.data())
                state[name] = documents

        })
    },
     
     //搜尋產品
     searchResult(state,value){
         state.text = value;
         const re = state.product.filter((c)=>{
              if(value){
                  return c.name.includes(value)
              }
         });
  
         if(re){
             state.result = JSON.parse(JSON.stringify(re));
         }
      },

      //取出子類別
      deepType(state){
        if(state.product_type && state.type.length == 0){
            // state.type = new Map()
            state.product_type.forEach((p)=>{       
                const test = Object.entries(JSON.parse(JSON.stringify(p)))
                let arr = [];
                test.forEach((t)=>{
                    if(t[0].includes('deep_type')){
                        arr.push(t[1])
                    }
                })
                state.type.push(arr)
            })          
        }
      },

      //取出第二子類別、ID
      detailType(state,type){
        let detail
        state.detail = []
        state.product_type.forEach((p)=>{
            const test = Object.entries(JSON.parse(JSON.stringify(p)))
            test.forEach((t)=>{
               if(t[0].includes(type)){
                detail = t[1]
               }
            })
        })
        detail = detail.split(',')

        let url = JSON.parse(JSON.stringify(state.product_detail_url))[0]

        detail.forEach((name)=>{
            let link = url[name]
            const object = {link , name};
            state.detail.push(object)
        })

        
        //手機板 deepType首要商品詳細
        state.phone_product = [];
        state.detail.forEach(d =>{
            db.collection('product').doc(`${d.link}_1`)
            .get().then((doc)=>{
                state.phone_product.push(doc.data())
            })
        })
      },

      detailClear(state){
        state.detail = ''
        state.phone_product = []
      },

      //Menu取出子類別
      menuType(state,payload){
        state.menu_type = [];
        const collection = payload.collection
        // console.log(payload.collection)
        const ch = state[collection].forEach(p=>{
            if(p.type == payload.type_name){
                //deep_type
                const test = Object.entries(JSON.parse(JSON.stringify(p)))
                test.forEach((t)=>{
                    if(t[0].includes('deep_type')){
                        state.menu_type.push(t[1])
                    }
                })
            }
        })
      },

      //ID所屬類別
      getID(state,payload){
        if(state.product){
           
            const cate = state.product.filter(p=>{
                return p[payload.match] == payload.id
            })
            state[payload.name] = JSON.parse(JSON.stringify(cate))

            if(payload.bool){
                //Category名
                state.categoryName = cate[0].category

                //撈產品deepType名
                state.productTypeId = cate[0].product_type;
                state.productDeepType = cate[0].deep_type;
                
            }else{
                //Product對應產品
                let p;
                [p] = state[payload.name]
                state[payload.name] = p

                //撈產品deepType、category名
                state.productTypeId = p.product_type;
                state.productDeepType = p.deep_type;
                state.categoryName = p.category;

            }

            //主類別名
            db.collection('product_type').get().then(
                querySnapshot => {
                   const documents = querySnapshot.docs.map(doc => doc.data())
                   state.productType = documents.find(d=> d.id == state.productTypeId).type;     
            })
        }
      },

      //優惠專區連結
      getUrl(state,payload){
        state.product_detail_url.filter(u=>{
            payload.router.push({path:`/category/${u[payload.type]}`})
        })
      }
};

const actions = {
    callStart({commit},payload){
       commit('getData',payload.name)
    },
    callType({commit}){
        commit('deepType')        
    },

}

const getters = {
    // categoryProduct(state,getters,rootState){
    //     return state.product
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };