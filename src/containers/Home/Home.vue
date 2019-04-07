<template>
<div>
    <div class="home-maindiv">
      <AppBar :username="username"/>
      <Sidebar />
      <HomeSideBody :role="role" :Victims="JSONData" :changeRAdd="changeRAdd" />
    </div>
</div>
</template>
<style>
.home-maindiv {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>

<script>
import AppBar from "../../components/appbar";
import Sidebar from "../../components/sidebar";
import HomeSideBody from "../../components/homeSideBody";

import { mapState, mapActions } from "vuex";

// import { store } from "../../store/store.js";

export default {
  name: "HomeContainer",

  components: {
    AppBar,
    Sidebar,
    HomeSideBody
  },
  data: function() {
    return {
      username: this.$store.state.name,
      role: this.$store.state.role,
      JSONData: [
        {
          name: "Ali Mukhtar",
          city: "Karachi",
          center: "Sohrab Goth",
          age: "21 years old",
          imgTest: require("../../images/5.jpg")
        },
        {
          name: "Bilal Akbarh",
          city: "Islamabad",
          center: "I-10",
          imgTest: require("../../images/2.jpg"),
          age: "21 years old"
        },
        {
          name: "Ahsan Bilawal",
          city: "Lahore",
          center: "Johar Town",
          imgTest: require("../../images/3.jpg"),
          age: "21 years old"
        },
        {
          name: "Ahmed Jilani",
          city: "Karachi",
          center: "Purani Sabzi Mandi",
          imgTest: require("../../images/4.jpg"),
          age: "21 years old"
        },
        {
          name: "Saeed Haider",
          city: "Peshawar",
          center: "Saddar",
          imgTest: require("../../images/5.jpg"),
          age: "21 years old"
        },
        {
          name: "Jamal Siddique",
          city: "Rawalpindi",
          center: "Railway Colony",
          imgTest: require("../../images/2.jpg"),
          age: "21 years old"
        },
        {
          name: "Bilal Akbarh",
          city: "Islamabad",
          center: "I-10",
          imgTest: require("../../images/2.jpg"),
          age: "21 years old"
        },
        {
          name: "Ahsan Bilawal",
          city: "Lahore",
          center: "Johar Town",
          imgTest: require("../../images/3.jpg"),
          age: "21 years old"
        },
        {
          name: "Ahmed Jilani",
          city: "Karachi",
          center: "Purani Sabzi Mandi",
          imgTest: require("../../images/4.jpg"),
          age: "21 years old"
        },
        {
          name: "Saeed Haider",
          city: "Peshawar",
          center: "Saddar",
          imgTest: require("../../images/5.jpg"),
          age: "21 years old"
        },
        {
          name: "Jamal Siddique",
          city: "Rawalpindi",
          center: "Railway Colony",
          imgTest: require("../../images/2.jpg"),
          age: "21 years old"
        },
        {
          name: "Ahsan Bilawal",
          city: "Lahore",
          center: "Johar Town",
          imgTest: require("../../images/3.jpg"),
          age: "21 years old"
        },
        {
          name: "Ahmed Jilani",
          city: "Karachi",
          center: "Purani Sabzi Mandi",
          imgTest: require("../../images/4.jpg"),
          age: "21 years old"
        },
        {
          name: "Saeed Haider",
          city: "Peshawar",
          center: "Saddar",
          imgTest: require("../../images/5.jpg"),
          age: "21 years old"
        }
      ]
    };
  },
  computed: mapState(["name"], ["role"]),
  methods: {
    ...mapActions(["ME_API","MISSING_PERSONS"]),
    changeRAdd: function() {
      this.$router.push("/add");
    }
  },
  created() {
    if (!this.username) {
      this.$store.dispatch("ME_API", this.$router);
      this.$store.dispatch("MISSING_PERSONS", this.$router);
    }
  },
  watch: {
    name: function() {
      this.username = this.$store.state.name;
      this.role = this.$store.state.role;
    }
  }
};
</script>

