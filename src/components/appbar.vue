<template>
   <md-toolbar class="md-accent AppBarZindex" md-elevation="1" style="position:fixed">
      <h3 class="md-title md-fixed" style="flex: 1">{{`${username?`Welcome ${username}`:''}`}}</h3>
        <div class="md-toolbar-section-end">
                 <md-menu md-direction="bottom-end">
           <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
        </md-button>

      <md-menu-content>
        <md-menu-item class="hoverDropDI">Account Settings</md-menu-item>
        <md-menu-item class="hoverDropDI" v-on:click="LogoutFunc">Log out</md-menu-item>
      </md-menu-content>
    </md-menu>
        </div>
    </md-toolbar> 

 
    
     
</template>
<style scope>
.hoverDropDI:hover {
  cursor: pointer;
}
.AppBarZindex {
  z-index: 8 !important;
}
</style>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppBar",
  props: {
    username: {
      type: String
    }
  },
  methods: {
    LogoutFunc: function() {
      this.$store.dispatch("LOGOUT");
      localStorage.removeItem("user");
      this.$router.replace("/");
    },
    ...mapActions(["LOGOUT"])
  }
};
</script>
