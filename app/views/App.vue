<template>
    <div id="app">
        <div id="draggable" class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="javascript:void(0)">Irx</a>
                </div>
                <div class="navbar-collapse collapse navbar-responsive-collapse">
                    <ul class="nav navbar-nav">
                        <li>
                            <a>Details</a>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a class="hand" v-on:click="minimizeWindow()">
                                <i class="fa fa-minus icon-size-18"></i>
                            </a>
                        </li>
                        <li>
                            <a class="hand" v-on:click="closeWindow()">
                                <i class="fa fa-times icon-size-18"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>

<style>
body {
    overflow: hidden;
    margin-top: 60px;
}

.hand {
    cursor: pointer;
}

.icon-size-18 {
    font-size: 18px;
}

/* not working when devtootls openned */
#draggable {
    -webkit-user-select: none;
    -webkit-app-region: drag;
}
</style>

<script>
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-material-design'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'bootstrap-material-design/dist/css/ripples.css'
import 'font-awesome/css/font-awesome.css'
import 'roboto-fontface'

const remote = window.require('electron').remote

export default {

    methods: {
        minimizeWindow() {
            remote.getCurrentWindow().minimize()
        },

        closeWindow() {
            remote.getCurrentWindow().close()
        }
    },

    components: {
    }

}
</script>
