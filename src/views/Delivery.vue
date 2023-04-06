<template>
        <div v-html="delivery"></div>
</template>

<script>
import {mapState , mapGetters} from 'vuex';

export default {
    name:"delivery",
    created(){
        this.$store.commit('deliveryInfo/getData',{name:'delivery', issue:this.$router.currentRoute.params.issue})
    },
    computed:{
        ...mapState({
            delivery : state=>state.deliveryInfo.delivery,
        })
    }
}
</script>

<style scoped>
</style>