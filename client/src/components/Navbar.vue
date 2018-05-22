<template>
    <nav class="navbar navbar-default navbar-fixed-top" style="background-color:white">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand">Todo Fancy</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default glyphicon glyphicon-search"></button>
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <li><img class="img-responsive" :src="pictureuser" width="50" height="50" /></li>
                    <li><a>{{ nameuser }}</a></li>
                    <li><a @click="logoutButton" style="cursor:pointer"><span class="glyphicon glyphicon-log-out"> </span> Log Out</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: ['nameuser','pictureuser'],
    methods: {
        logoutButton: function () {
            this.$emit('logout-button')
        }
    }
}
</script>

<style>

</style>
