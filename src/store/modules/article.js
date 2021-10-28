import articleApi from '@/api/article.js';

export const mutationTypes = {
    getArticleStart: '[article] getArticleStart',
    getArticleSuccess: '[article] getArticleSuccess',
    getArticleFailure: '[article] getArticleFailure',

    deleteArticleStart: '[article] deleteArticleStart',
    deleteArticleSuccess: '[article] deleteArticleSuccess',
    deleteArticleFailure: '[article] deleteArticleFailure',
}

export const actionTypes = {
    getArticle: '[article] getArticle',
    deleteArticle: '[article] deleteArticle',
}

export const getterTypes = {
    data: '[article] data',
    isLoading: '[article] isLoading',
    error: '[article] error',
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
        [mutationTypes.getArticleStart](state) {
            state.isLoading = true;
            state.data = null;
        },
        [mutationTypes.getArticleSuccess](state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        [mutationTypes.getArticleFailure](state) {
            state.isLoading = false;
        },

        [mutationTypes.deleteArticleStart](state) {
            state.isLoading = true;
            state.data = null;
        },
        [mutationTypes.deleteArticleSuccess](state) {
            state.isLoading = false;
            state.data = null;
        },
        [mutationTypes.deleteArticleFailure](state) {
            state.isLoading = false;
        }
    },
    actions: {
        [actionTypes.getArticle](context, {
            slug
        }) {
            return new Promise(resolve => {
                context.commit(mutationTypes.getArticleStart);
                articleApi.getArticle(slug).then(article => {
                    console.log('Article', article);
                    context.commit(mutationTypes.getArticleSuccess, article);
                    resolve(article);
                }).catch(() => {
                    context.commit(mutationTypes.getArticleFailure);
                });
            })
        },
        [actionTypes.deleteArticle](context, {
            slug
        }) {
            return new Promise(resolve => {
                context.commit(mutationTypes.deleteArticleStart);
                articleApi.deleteArticle(slug).then(response => {
                    console.log('deletion success')
                    context.commit(mutationTypes.deleteArticleSuccess);
                    resolve(response);
                }).catch(() => {
                    context.commit(mutationTypes.deleteArticleFailure);
                });
            })
        }
    },
}