import feedApi from '@/api/feed.js';

export const mutationTypes = {
    getFeedStart: '[feed] getFeedStart',
    getFeedSuccess: '[feed] getFeedSuccess',
    getFeedFailure: '[feed] getFeedFailure',
}

export const actionTypes = {
    getFeed: '[feed] getFeed',
}

export const getterTypes = {
    data: '[feed] data',
    isLoading: '[feed] isLoading',
    error: '[feed] error',
}

export default {
    state: {
        data: null,
        isLoading: false,
        error: null
    },
    getters: {
        [getterTypes.data](state) {
            return state.data;
        },
        [getterTypes.isLoading](state) {
            return state.isLoading;
        },
        [getterTypes.error](state) {
            return state.error;
        },
    },
    mutations: {
        [mutationTypes.getFeedStart](state) {
            state.isLoading = true;
            state.data = null;
        },
        [mutationTypes.getFeedSuccess](state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        [mutationTypes.getFeedFailure](state) {
            state.isLoading = false;
        }
    },
    actions: {
        [actionTypes.getFeed](context, {apiUrl}) {
            return new Promise(resolve => {
                context.commit(mutationTypes.getFeedStart);
                feedApi.getFeed(apiUrl).then(response => {
                    context.commit(mutationTypes.getFeedSuccess, response.data);
                    resolve(response.data);
                }).catch(() => {
                    context.commit(mutationTypes.getFeedFailure);
                });
            })
        }
    },
}