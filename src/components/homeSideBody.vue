<template>
     <div class="home-maindiv-sidebody">
 
        <h1 v-if="role==='agency'" class="miss-p-heading">Missing Persons</h1>
        <h1 v-else-if="role==='victim'" class="miss-p-heading">Welcome Victim</h1>
        <md-button class="md-raised md-accent AddVictim" @click="changeRAdd">Add</md-button>
        <div class="home-maindiv-sidebody-child-parent">

          

        <div v-bind:class="[{ 'home-maindiv-sidebody-child1':index===0 ||(index+1)%3!==0 ,'home-maindiv-sidebody-child3':index>0 && (index+1)%3===0}]" v-for="(value,index) in Victims" v-bind:key="key=index">
               <md-card>
                <md-card-media-cover md-text-scrim>
                  <md-card-media md-ratio="16:9">
                    <img :src="value.imgTest" alt="Skyscraper">
                  </md-card-media>

                  <md-card-area>
                    <md-card-header>
                      <span class="md-title">{{value.name}}</span>
                      <span class="md-subhead">{{value.age}}</span>
                    </md-card-header>

                    <md-card-actions>
                      <md-button @click="showDialog = true">Details</md-button>
                      <md-button>De-Activate</md-button>
                    </md-card-actions>
                  </md-card-area>
                </md-card-media-cover>
              </md-card>
        </div>


         <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

         <p class="DetailPara">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, culpa.

         </p>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
      
      </div>

 



        <!-- <h1>Welcome Victim</h1> -->
     
      </div>
</template>
<script>
export default {
  name: "HomeSideBody",
  data: function() {
    return {
      showDialog: false
    };
  },
  props: {
    role: {
      type: String
    },
    Victims: {
      type: Array
    },
    changeRAdd: {
      type: Function
    }
  }
};
</script>
<style scope>
.home-maindiv-sidebody {
  width: 80%;
  margin-left: 20%;
  padding: 0 2% 0 2%;
  padding-top: 80px;
  background-color: #f7f7f7;
  min-height: calc(100vh - 48px);
}
.md-card {
  width: 100%;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.home-maindiv-sidebody-child3 {
  width: 32.33%;
}
.home-maindiv-sidebody-child2 {
  width: 32.33%;
  margin-right: 1%;
}
.home-maindiv-sidebody-child1 {
  width: 32.33%;
  margin-right: 1%;
}
.home-maindiv-sidebody-child-parent {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.DetailPara {
  padding: 0px 24px;
}
.AddVictim {
  display: inline-block;
  float: right;
}
.miss-p-heading {
  display: inline-block;
}
</style>
