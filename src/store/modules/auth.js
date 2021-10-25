import authApi from '@/api/auth.js';

export default {
    state: {
        isSubmitting: false,
        currentUser: null,
        validationErrors: null,
        isLoggedIn: null
    },
    mutations: {
        registerStart(state) {
            state.isSubmitting = true;
            state.validationErrors = null;
        },
        registerSuccess(state, payload) {
            state.isSubmitting = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        registerFailure(state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
            state.isLoggedIn = false;
        },
    },
    actions: {
        register(context, credentials) {
            return new Promise((resolve) => {
                context.commit('registerStart');
                authApi.register(credentials).then((response) => {
                    context.commit('registerSuccess', response.data.user);
                    resolve(response.data.user);
                }).catch(result => {
                    console.log(result.response.data.errors);
                    context.commit('registerFailure', result.response.data.errors);
                });
            });
        }
    }
}