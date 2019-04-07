import { instance } from "../routeconfig.js";
// import Vue from 'vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue.js';

Vue.use(Vuex)
const getDefaultState = () => {
    return {
        name: undefined,
        role: undefined,
        email: undefined
    };
}

// initial state
const state = getDefaultState()


//  reducer
const mutations = {
    ME_API(state, obj) {
        state.name = obj.name
        state.role = obj.role,
            state.email = obj.email
    },
    LOGOUT(state) {
        // state=state
        Object.assign(state, getDefaultState())

    }
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
    ME_API: ({ commit }, router) => {
        instance.interceptors.request.use(config => {
            const token = JSON.parse(localStorage.getItem("user"));
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        instance.get("/users/me").then(success => {
            commit('ME_API', { name: success.data.name, role: success.data.role, email: success.data.email })
        })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        localStorage.removeItem("user");
                        router.push('/');
                    }
                }
            });
    },
    MISSING_PERSONS: ({ commit }, router) => {
        instance.interceptors.request.use(config => {
            const token = JSON.parse(localStorage.getItem("user"));
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        instance.get("/MissingPersonss/missingPersonsByCompany").then(success => {
            console.log(success, 'mmmmmmmm')
        })
            .catch(err => {
                console.log(err.response,'m err')
                if (err.response) {
                    if (err.response.status === 401) {
                        localStorage.removeItem("user");
                        router.push('/');
                    }
                }
            });
    },
    LOGOUT: ({ commit }) => {
        commit('LOGOUT')
        // localStorage.removeItem("user");
        // this.$router.replace("/");
    }

};

const getters = {
    role: state => state.role
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
