import tagsApi from '@/api/tags.js';

export const mutationTypes = {
    getTagsStart: '[tags] getTagsStart',
    getTagsSuccess: '[tags] getTagsSuccess',
    getTagsFailure: '[tags] getTagsFailure',
}

export const actionTypes = {
    getTags: '[tags] getTags',
}

export const getterTypes = {
    data: '[tags] data',
    isLoading: '[tags] isLoading',
    error: '[tags] error',
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
        [mutationTypes.getTagsStart](state) {
            state.isLoading = true;
            state.data = null;
        },
        [mutationTypes.getTagsSuccess](state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        [mutationTypes.getTagsFailure](state) {
            state.isLoading = false;
        }
    },
    actions: {
        [actionTypes.getTags](context) {
            return new Promise(resolve => {
                context.commit(mutationTypes.getTagsStart);
                tagsApi.getTags().then(response => {
                    context.commit(mutationTypes.getTagsSuccess, response.data);
                    resolve(response.data);
                }).catch(() => {
                    context.commit(mutationTypes.getTagsFailure);
                });
            })
        }
    },
}