<template>
    <div class="container" style="margin-top:50px">
      <div v-if="login == true">
        <div class="col-md-3"></div>
        <div class="col-md-6" style="margin:auto 0; background-color:white; padding: 60px; border: 1px solid #e6e6e6;">
          <h3 class="text-center" style="margin-top:0">Todo Fancy</h3>
            <div class="form-group" style="text-align:center">
              <button class="btn btn-primary" scope="email" @click="loginFacebook">Login With Facebook</button>
            </div>
            <div class="form-group">
                <div class="col-md-5" style="padding:0">
                    <hr>
                </div>
                <div class="col-md-2 text-center">
                    <b style="font-size:14px">OR</b>
                </div>
                <div class="col-md-5" style="padding:0">
                    <hr>
                </div>
            </div>
            <div class="form-group">
              <input v-model="name" type="text" class="form-control" placeholder="Your Name">
            </div>
            <div class="form-group">
              <input v-model="email" type="text" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <button @click="register" type="submit" class="btn btn-default" style="width:100%;background-color:#3897f0;color:white;"><b>Register</b></button>
            </div>
          <p class="text-center" style="color:#999;font-weight:700;font-size:14px;line-height:18px;">
              By signing up, you agree to our <br> <b style="color:#000">Terms</b> & <b style="color:#000">Privacy Policy</b>.
          </p>
          <br>
          <p class="text-center">
              Have an account? <a @click="changeLogin" style="cursor: pointer;">Log in</a>
          </p>
        </div>
        <div class="col-md-3"></div>
      </div>
      <div v-else>
        <div class="col-md-3"></div>
        <div class="col-md-6" style="background-color: white; padding: 60px; border: 1px solid #e6e6e6;">
          <h3 class="text-center" style="margin-top:0">Todo Fancy</h3>
            <div class="form-group">
              <input v-model="email" type="text" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <button @click="loginManual" type="submit" class="btn btn-default" style="width:100%;background-color:#3897f0;color:white;"><b>Log In</b></button>
            </div>
          <p class="text-center" style="color:#999;font-weight:700;font-size:14px;line-height:18px;">
              By signing up, you agree to our <br> <b style="color:#000">Terms</b> & <b style="color:#000">Privacy Policy</b>.
          </p>
          <br>
          <p class="text-center">
              Have an login? <a @click="changeLoginToRegister" style="cursor: pointer;">Register</a>
          </p>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'home',
  data: function () {
    return {
      login: true,
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    changeLogin: function(){
      this.login = false
    },
    changeLoginToRegister: function(){
      this.login = true
    },
    register: function(){
      axios.post('https://apitodofancy.thismylife.net/users', {
        fullname: this.name,
        email: this.email,
        password: this.password
      })
      .then(response => {
          swal("Welcome", response.data.message, "success")
          .then(() => {
              this.login = false
          })
      })
      .catch(err => {
          swal("Your error", err.response.data.message, "error")
      })
    },
    loginManual: function(){
      let self = this
      axios.post('https://apitodofancy.thismylife.net/users/login/manual', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        swal("Welcome", response.data.message, "success")
          .then(() => {
            localStorage.setItem('id', response.data.id)
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('picture', 'https://www.ankarsrum.com/wp-content/uploads/2018/01/no-image-icon-.png')
            localStorage.setItem('name', response.data.fullname)
            localStorage.setItem('api', response.data.token)
            self.$router.push({ name: 'todos' })
          })
      })
      .catch(err => {
        swal("Your error", err.response.data.message, "error")
      })
    },
    loginFacebook: function () {
      let self = this
      FB.login(function(response) {
        if (response.status === 'connected') {
          axios.post('https://apitodofancy.thismylife.net/users/login/',{},{
            headers: {
              token: response.authResponse.accessToken
            }
          })
          .then(response => {
            swal("Welcome", "Welcome to my apps", "success")
              .then(() => {
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('picture', response.data.picture.data.url)
                localStorage.setItem('name', response.data.fullname)
                localStorage.setItem('api', response.data.token)
                self.$router.push({ name: 'todos' })
              })
          })
          .catch(error => {
            swal("Your error", error.response.data.message, "error")
          })
        }
      })
    }
  },
  created: function(){
      if(localStorage.getItem('token')){
        this.$router.push({ name: 'todos' })
      }   
    window.fbAsyncInit = function() {
        FB.init({
        appId      : '369485293546325',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
        });
            
        FB.AppEvents.logPageView();   
            
      };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
</script>
