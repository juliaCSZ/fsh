import Vue from 'vue';
import Vuex from 'vuex';
import searchFunc from './modules/searchFunc.js'
import deliveryFunc from './modules/deliveryFunc.js'
import cartFunc from './modules/cartFunc.js'
import authFunc from './modules/authFunc.js';
import collectFunc from './modules/collectFunc.js';
import orderListFunc from './modules/orderListFunc.js';
import homrFunc from './modules/homeFunc.js'
import typeFunc from './modules/typeFunc.js';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        search:searchFunc,
        deliveryInfo:deliveryFunc,
        cart:cartFunc,
        auth:authFunc,
        collect:collectFunc,
        order:orderListFunc,
        home:homrFunc,
        tyoe:typeFunc,
    }
})

export default store;