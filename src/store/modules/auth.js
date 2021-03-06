import authApi from '@/api/auth.js';
import {
    setItem
} from '@/helpers/persistanceStorage.js';

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous',
    validationErrors: '[auth] validationErrors',
    isSubmitting: '[auth] isSubmitting',
    isLoading: '[auth] isLoading',
};

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateUserSettingsStart: '[auth] updateUserSettingsStart',
    updateUserSettingsSuccess: '[auth] updateUserSettingsSuccess',
    updateUserSettingsFailure: '[auth] updateUserSettingsFailure',
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateUserSettings: '[auth] updateUserSettings',
}

export default {
    state: {
        isLoading: false,
        isSubmitting: false,
        currentUser: null,
        validationErrors: null,
        isLoggedIn: null
    },
    getters: {
        [getterTypes.currentUser](state) {
            return state.currentUser;
        },
        [getterTypes.isLoggedIn](state) {
            return Boolean(state.isLoggedIn);
        },
        [getterTypes.isAnonymous](state) {
            return state.isLoggedIn === false;
        },
        [getterTypes.isSubmitting](state) {
            return state.isSubmitting;
        },
        [getterTypes.validationErrors](state) {
            return state.validationErrors;
        },
        [getterTypes.isLoading](state) {
            return state.isLoading;
        },
    },
    mutations: {
        [mutationTypes.registerStart](state) {
            state.isSubmitting = true;
            state.validationErrors = null;
        },
        [mutationTypes.registerSuccess](state, payload) {
            state.isSubmitting = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        [mutationTypes.registerFailure](state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
            state.isLoggedIn = false;
        },
        [mutationTypes.loginStart](state) {
            state.isSubmitting = true;
            state.validationErrors = null;
        },
        [mutationTypes.loginSuccess](state, payload) {
            state.isSubmitting = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        [mutationTypes.loginFailure](state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
            state.isLoggedIn = false;
        },
        [mutationTypes.getCurrentUserStart](state) {
            state.isLoading = true;
        },
        [mutationTypes.getCurrentUserSuccess](state, payload) {
            state.isLoading = false;
            state.currentUser = payload;
            state.isLoggedIn = true;
        },
        [mutationTypes.getCurrentUserFailure](state) {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        [mutationTypes.updateUserSettingsStart](state) {
            state.isSubmitting = true;
        },
        [mutationTypes.updateUserSettingsSuccess](state) {
            state.isSubmitting = false;
        },
        [mutationTypes.updateUserSettingsFailure](state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
        },

    },
    actions: {
        [actionTypes.register](context, credentials) {
            return new Promise((resolve) => {
                context.commit(mutationTypes.registerStart);
                authApi.register(credentials).then((response) => {
                    context.commit(mutationTypes.registerSuccess, response.data.user);
                    console.log(credentials);
                    setItem('token', response.data.user.token)
                    resolve(response.data.user);
                }).catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors);
                });
            });
        },
        [actionTypes.login](context, credentials) {
            return new Promise((resolve) => {
                context.commit(mutationTypes.loginStart);
                authApi.login(credentials).then((response) => {
                    context.commit(mutationTypes.loginSuccess, response.data.user);
                    console.log(response);
                    setItem('token', response.data.user.token)
                    resolve(response.data.user);
                }).catch(result => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors);
                });
            });
        },
        [actionTypes.getCurrentUser](context) {
            return new Promise((resolve) => {
                context.commit(mutationTypes.getCurrentUserStart);
                authApi.getCurrentUser().then((response) => {
                    context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                    resolve(response.data.user);
                }).catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure);
                });
            });
        },
        [actionTypes.updateUserSettings](context,
            userSettings
        ) {
            return new Promise(resolve => {
                context.commit(mutationTypes.updateUserSettingsStart);
                authApi.updateCurrentUser(userSettings).then(response => {
                    context.commit(mutationTypes.updateUserSettingsSuccess, response.data);
                    resolve(response.data);
                }).catch((errors) => {
                    console.log(errors);
                    context.commit(mutationTypes.updateUserSettingsFailure, errors);
                });
            })
        },
    }
}