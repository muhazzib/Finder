<template>
<div>
    <div class="home-maindiv">
      <AppBar :username="username"/>
      <Sidebar />
      <!-- <HomeSideBody :role="role" :Victims="JSONData" :changeRAdd="changeRAdd"/> -->



      <div class='addMainBody'>
        
        <form novalidate class="md-layout add-form" @submit.prevent="validateUser">
          <md-card class="md-layout-item md-size-95 md-small-size-100">
            <md-card-header>
              <div class="md-title">Users</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-33.33 md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="first-name">First Name</label>
                    <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                    <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-33.33 md-small-size-100">
                  <md-field :class="getValidationClass('lastName')">
                    <label for="last-name">Last Name</label>
                    <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                    <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
                  </md-field>
                </div>
                 <div class="md-layout-item md-size-33.33 md-small-size-100">
                  <md-field :class="getValidationClass('gender')">
                    <label for="gender">Gender</label>
                    <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                      <md-option></md-option>
                      <md-option value="M">M</md-option>
                      <md-option value="F">F</md-option>
                    </md-select>
                    <span class="md-error">The gender is required</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
               

                <div class="md-layout-item md-size-33.33 md-small-size-100">
                  <md-field :class="getValidationClass('age')">
                    <label for="age">Age</label>
                    <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.age.required">The age is required</span>
                    <span class="md-error" v-else-if="!$v.form.age.maxlength">Invalid age</span>
                  </md-field>
                </div>


                 <div class="md-layout-item md-size-33.33 md-small-size-100">
                    <md-field :class="getValidationClass('email')">
                      <label for="email">Email</label>
                      <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                      <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                      <span class="md-error" v-else-if="!$v.form.email.minlength">Invalid email</span>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-33.33 md-small-size-100">
                    <md-field :class="getValidationClass('ngo')">
                    <label for="ngo">NGO Name</label>
                    <md-input name="last-name" id="ngo" autocomplete="family-name" v-model="form.ngo" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.ngo.required">NGO name is required</span>
                  </md-field>
                  </div>
              </div>

              <div class="md-layout md-gutter">
               

                <div class="md-layout-item md-size-33.33 md-small-size-100">
                  <md-field :class="getValidationClass('country')">
                    <label for="country">Country</label>
                    <md-input name="last-name" id="country" autocomplete="family-name" v-model="form.country" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.country.required">Country name is required</span>
                    <span class="md-error" v-else-if="!$v.form.country.minlength">Invalid Country name</span>
                  </md-field>
                </div>


                 <div class="md-layout-item md-size-33.33 md-small-size-100">
                    <md-field :class="getValidationClass('city')">
                    <label for="city">City</label>
                    <md-input name="city" id="last-name" autocomplete="family-name" v-model="form.city" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.city.required">City name is required</span>
                    <span class="md-error" v-else-if="!$v.form.city.minlength">Invalid City name</span>
                  </md-field>
                  </div>

                   <div class="md-layout-item md-size-33.33 md-small-size-100">
                    <md-field :class="getValidationClass('address')">
                    <label for="address">Address</label>
                    <md-input name="last-name" id="address" autocomplete="family-name" v-model="form.address" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.address.required">The Address is required</span>
                    <span class="md-error" v-else-if="!$v.form.address.minlength">Invalid Address</span>
                  </md-field>
                  </div>
              </div>
            </md-card-content>



            

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
            </md-card-actions>
          </md-card>

          <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
      </div>
    </div>
</div>
</template>
<style>
.home-maindiv {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.addMainBody {
  width: 80%;
  margin-left: 20%;
}
.add-form {
  justify-content: center;
  margin-top: 80px;
}
</style>

<script>
import AppBar from "../../components/appbar";
import Sidebar from "../../components/sidebar";
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
// import HomeSideBody from "../../components/homeSideBody";

import { instance } from "../../routeconfig.js";
instance.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem("user"));
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default {
  name: "AddContainer",
  created() {
    console.log(this.name, "=====>");
    if (!this.username) {
      this.$store.dispatch("ME_API");
    }
  },
  components: {
    AppBar,
    Sidebar
    // HomeSideBody
  },
  methods: {
    ...mapActions(["ME_API", "LOGOUT"]),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.address = null;
      this.form.country = null;
      this.form.city = null;
    },
    saveUser() {
      this.sending = true;
      const addData = {
        firstname: this.form.firstName,
        lastname: this.form.lastname,
        gender: this.form.gender,
        age: this.form.age,
        ngo: this.form.ngo,
        address: this.form.address,
        email: this.form.email,
        country: this.form.country,
        city: this.form.city
      };
      // Instead of this timeout, here you can call your API
      instance
        .post("/MissingPersonss/add", addData)
        .then(success => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 401) {
              this.$store.dispatch("LOGOUT");
              localStorage.removeItem("user");
              this.$router.replace("/");
            }
          }
        });
    },
    validateUser() {
      console.log(this.email);
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  },
  computed: mapState(["name"]),
  data: function() {
    return {
      username: this.$store.state.name,
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: this.$store.state.email,
        ngo: this.$store.state.name,
        country: null,
        city: null,
        address: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    };
  },
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required
      },
      age: {
        required
      },
      gender: {
        required
      },
      country: {
        required
      },
      city: {
        required
      },
      ngo: {
        required
      },
      address: {
        required,
      },
      email: {
        required,
        email
      }
    }
  },
  watch: {
    name: function() {
      this.username = this.$store.state.name;
      this.form.email = this.$store.state.email;
      this.form.ngo = this.$store.state.name;
    }
  }
};
</script>

