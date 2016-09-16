<template>
    <div class="home">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">

                    <div class="store store-empty" v-if="isPhoneDataAvailable === false">
                        <div class="alert alert-empty" role="alert">
                            The available list is not readable
                        </div>
                    </div>

                    <div class="store" v-for="store in storeList" v-if="isPhoneDataAvailable === true">
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

.store.store-empty .alert {
    height: 566px;
}

.store.store-empty .alert-empty {
    background: #B6E7FF;
    color: #000000;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
</style>

<script>
import path from 'path'

import phoneModel from '../model/phone.json'
import { sound } from '../helper'

const app = window.require('electron').remote.app
const fs = window.require('electron').remote.require('fs')

export default {

    beforeMount() {
        this.fetchStoreList()
        this.fetchPhoneData()

        setInterval(() => {
            this.fetchStoreList()
            this.fetchPhoneData()
            this.checkPlusJetBackIsAvailableBuy()
        }, 8000)
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
        },

        isPhoneDataAvailable() {
            return Object.keys(this.storePhoneData).length !== 0
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
                return this.storePhoneData[store.storeNumber][phone.model] === "ALL" ||
                       this.storePhoneData[store.storeNumber][phone.model] === "UNLOCKED"
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
        },

        checkPlusJetBackIsAvailableBuy() {
            // MN4D2ZP/A: iPhone 7 Plus 128GB 亮黑色
            // MN4L2ZP/A: iPhone 7 Plus 256GB 亮黑色
            let plusJetBackModels  = ['MN4D2ZP/A', 'MN4L2ZP/A']
            let availableBuyStatus = ['all', 'unlocked']
            let playMatchedSound   = false
            let playAvailableSound = false

            for(let store in this.storeList) {
                for(let phone in this.phoneModel) {
                    let theStore = this.storeList[store]
                    let thePhone = this.phoneModel[phone]
                    let status   = this.phoneStatus(theStore, thePhone).toLowerCase()

                    if (availableBuyStatus.indexOf(status) != -1 && plusJetBackModels.indexOf(thePhone.model) != -1) {
                        playMatchedSound = true
                    }

                    if (availableBuyStatus.indexOf(status) != -1) {
                        playAvailableSound = true
                    }
                }
            }

            if (playMatchedSound === true) {
                sound.playMatchedSound()
            }

            if (playAvailableSound === true) {
                sound.playAvailableSound()
            }
        }
    }

}
</script>
