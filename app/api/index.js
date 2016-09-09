import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

export function fetchStoreList() {
    return Vue.http
        .get("https://reserve.cdn-apple.com/HK/zh_HK/reserve/iPhone/stores.json")
        .then(response => response.json())
        .then(data => data.stores)
}
