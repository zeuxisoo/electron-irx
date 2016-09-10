<template>
    <div class="home">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">

                    <div class="store" v-for="store in storeList">
                        <div class="info">
                            <div class="row">
                                <div class="col-sm-6 name">{{ store.storeName }}</div>
                                <div class="col-sm-6 detail text-right">
                                    <span>{{ store.storeNumber }}</span> -
                                    <span>{{ storeIsEnable(store.storeEnabled) }}</span> -
                                    <span>{{ storeSellEdition(store.sellEdition) }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="phone">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Model</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="phone in phoneModel" v-bind:class="{ 'success': isAvailableBuy(store, phone) }">
                                                <td>{{ phone.model }}</td>
                                                <td>{{ phone.label }}</td>
                                                <td v-bind:class="{ 'available': isAvailableBuy(store, phone) }">
                                                    {{ phoneStatus(store, phone) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.store .info {
    border-bottom: 1px solid #CCCCCC;
    padding-bottom: 10px;
    margin: 0px 0px 20px 0px;
}

.store .info .name {
    font-size: 18px;
    font-weight: bold;
    color: #0088FF;
}

.store .info .detail {
    font-size: 18px;
    color: #CCCCCC;
}

.store .phone .available {
    color: #006600;
    font-weight: bold;
}
</style>

<script>
import phoneModel from '../model/phone.json'

export default {

    beforeMount() {
        this.fetchStoreList()
        this.fetchPhoneData()
    },

    data() {
        return {
            phoneModel: phoneModel
        }
    },

    computed: {
        storeList() {
            return this.$store.getters.storeList
        },

        storePhoneData() {
            return this.$store.getters.phoneData
        }
    },

    methods: {
        fetchStoreList() {
            return this.$store.dispatch('FETCH_STORE_LIST')
        },

        fetchPhoneData() {
            return this.$store.dispatch('FETCH_PHONE_DATA')
        },

        storeIsEnable(status) {
            return status ? "Enable" : "Disable"
        },

        storeSellEdition(status) {
            return status ? "SellEdition" : "NotSellEdition"
        },

        isAvailableBuy(store, phone) {
            if (store.storeNumber in this.storePhoneData) {
                return this.storePhoneData[store.storeNumber][phone.model] === "ALL"
            }else{
                return false
            }
        },

        phoneStatus(store, phone) {
            if (store.storeNumber in this.storePhoneData) {
                return this.storePhoneData[store.storeNumber][phone.model]
            }else{
                return "Unknown"
            }
        }
    }

}
</script>
