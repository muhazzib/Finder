

<template>
 <div class="BackDiv">
    <!-- <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Title</h3>
    </md-toolbar> -->

    <div class="LoginMainDiv" :class="{'DivPositon' : !registerflag,'LoginDivPosition':registerflag }">

     <md-card>
          <div class="LoginCardDiv"  v-if="!registerflag" >
            <h1>FINDER</h1>
            <md-field>
                  <label>Username</label>
                  <md-input v-model="username"></md-input>
            </md-field>
             <md-field>
                  <label>Email</label>
                  <md-input v-model="email"></md-input>
            </md-field>

              <md-field>
                  <label>Password</label>
                  <md-input v-model="password"></md-input>
              </md-field>

              <md-field>
                  <label>Confirm Password</label>
                  <md-input v-model="againpassword"></md-input>
              </md-field>
            <md-radio  v-model="role"  v-on:change="victimchange" value="victim">Victim</md-radio>
            <md-radio v-model="role"   v-on:change="agencychange"   value="agency">Agency</md-radio>
            <div class="RegisterBtnDiv">
                    <md-button class="md-raised md-accent" v-on:click="RegisterFun">Register</md-button>
                    <span class="switcher" v-on:click="SwitcherFunc">Already a registered user ?</span>
            </div>
          </div>


           <div class="LoginCardDiv" v-else>
              <h1>FINDER</h1>
             <md-field>
                  <label>Email</label>
                  <md-input v-model="email"></md-input>
            </md-field>

              <md-field>
                  <label>Password</label>
                  <md-input v-model="password"></md-input>
              </md-field>
            <div class="RegisterBtnDiv">
                    <md-button class="md-raised md-accent" v-on:click="LoginFun">Login</md-button>
                    <span class="switcher" v-on:click="SwitcherFunc">Not a registered user yet ?</span>
            </div>
          </div>
      </md-card>
</div>

  </div>
</template>

<style scope>
.LoginMainDiv {
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  width: 415px;
}
.DivPositon {
  top: 15%;
}
.LoginDivPosition {
  top: 28%;
}
.RegisterBtnDiv > button {
  margin: 6px 0px !important;
}
.RegisterBtnDiv {
  margin: 0 !important;
}
.LoginCardDiv {
  padding: 5px 20px;
}
.LoginCardDiv > h1 {
  text-align: center;
}
.switcher {
  float: right;
  position: relative;
  top: 13px;
  text-decoration: underline;
}
.switcher:hover {
  cursor: pointer;
}
.BackDiv {
  background-image: url("../../images/back2.png");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>

<script>
import { instance } from "../../routeconfig.js";
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  beforeCreate() {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      this.$router.replace("/home");
    }
  },
  data: () => ({
    username: undefined,
    email: undefined,
    type: null,
    withLabel: null,
    inline: null,
    number: null,
    textarea: null,
    autogrow: null,
    disabled: null,
    password: null,
    againpassword: null,
    role: null,
    registerflag: false
  }),
  methods: {
    ...mapActions(["ME_API"]),
    RegisterFun: function() {
      const credentials = {
        name: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      };
      if (
        this.username &&
        this.email &&
        this.password &&
        this.againpassword &&
        this.role
      ) {
        if (this.password === this.againpassword) {
          instance.post("/users/", credentials).then(success => {
            alert("success");
          });
        }
      }
    },
    victimchange: function() {
      this.role = "victim";
    },
    agencychange: function() {
      this.role = "agency";
    },
    SwitcherFunc: function() {
      this.registerflag = !this.registerflag;
      this.email = undefined;
      this.password = undefined;
      this.againpassword = undefined;
      this.username = undefined;
    },
    LoginFun: function() {
      const credentials = {
        email: this.email,
        password: this.password
      };
      console.log(credentials, "login");
      instance
        .post("/auth/local/", credentials)
        .then(success => {
          console.log(success, "muhazzib");

          localStorage.setItem("user", JSON.stringify(success.data.token));
        })
        .then(success3 => {
          this.$router.push({ name: "home" });
        })

        .catch(err => {
          console.log(err.response, "login erro");
        });
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

