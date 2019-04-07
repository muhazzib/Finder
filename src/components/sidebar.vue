<template>
     <div class="home-maindiv-sidebar">
        <ul class="list-main-parent">
            <li class="list-child1" @click="ChRHome">Home</li>
            <li class="list-child2">Settings</li>
            <li class="list-child3">Profile</li>
        </ul>
      </div>
</template>
<script>
export default {
  name: "Sidebar",
  methods: {
    ChRHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style scope>
.list-main-parent > li:hover {
  cursor: pointer;
}
.list-main-parent > li {
  color: white;
  border-bottom: 1px solid #23282e;
  padding: 10px 0px 10px 15px;
}
.list-main-parent {
  list-style: none;
  padding-left: 0px;
}
.home-maindiv-sidebar {
  width: 20%;
  background-color: #2e353d;
  min-height: 100vh;
  position: fixed;
  padding-top: 65px;
  box-shadow: 4px 0px 5px 1px #e4e4e4;
}
</style>
