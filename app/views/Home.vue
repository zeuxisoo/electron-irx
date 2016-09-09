<template>
    <div class="home">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">

                    <div class="store" v-for="store in storeList">
                        <div class="row">
                            <div class="col-sm-6 name">{{ store.storeName }}</div>
                            <div class="col-sm-6 info text-right">
                                <span>{{ store.storeNumber }}</span> -
                                <span>{{ storeIsEnable(store.storeEnabled) }}</span> -
                                <span>{{ storeSellEdition(store.sellEdition) }}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.store {
    border-bottom: 1px solid #CCCCCC;
    padding-bottom: 10px;
    margin: 0px 0px 20px 0px;
}

.store .name {
    font-size: 18px;
}

.store .info {
    font-size: 18px;
    color: #CCCCCC;
}
</style>

<script>
// https://reserve.cdn-apple.com/HK/zh_HK/reserve/iPhone/availability.json
// https://reserve.cdn-apple.com/HK/zh_HK/reserve/iPhone/stores.json

export default {

    beforeMount() {
        this.fetchStoreList()
    },

    computed: {
        storeList() {
            return this.$store.getters.storeList
        }
    },

    methods: {
        fetchStoreList() {
            return this.$store.dispatch('FETCH_STORE_LIST')
        },

        storeIsEnable(status) {
            return status ? "Enable" : "Disable"
        },

        storeSellEdition(status) {
            return status ? "InStock" : "OutOfStock"
        }
    }

}
</script>
