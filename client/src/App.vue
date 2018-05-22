<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
    body{
      background-color: #fafafa;
    }
    @media (min-width: 1200px){
      .container {
          width: 970px;
      }
    }
    .swal-text{
        text-align: center;
    }
</style>
