import articleApi from '@/api/article.js';

export const mutationTypes = {
    createArticleStart: '[createArticle] createArticleStart',
    createArticleSuccess: '[createArticle] createArticleSuccess',
    createArticleFailure: '[createArticle] createArticleFailure',
}

export const actionTypes = {
    createArticle: '[createArticle] createArticle',
}

export const getterTypes = {
    isSubmitting: '[createArticle] isSubmitting',
    validationErrors: '[createArticle] validationErrors',
}

export default {
    state: {
        isSubmitting: false,
        validationErrors: null
    },
    getters: {
        [getterTypes.isSubmitting](state) {
            return state.isSubmitting;
        },
        [getterTypes.validationErrors](state) {
            return state.validationErrors;
        },
    },
    mutations: {
        [mutationTypes.createArticleStart](state) {
            state.isSubmitting = true;
        },
        [mutationTypes.createArticleSuccess](state) {
            state.isSubmitting = false;
        },
        [mutationTypes.createArticleFailure](state, payload) {
            state.isSubmitting = false;
            state.validationErrors = payload;
        },
    },
    actions: {
        [actionTypes.createArticle](context, {articleInput}) {
            return new Promise(resolve => {
                context.commit(mutationTypes.createArticleStart);
                console.log(articleInput);
                articleApi.createArticle(articleInput).then(article => {
                    context.commit(mutationTypes.createArticleSuccess, article);
                    resolve(article);
                }).catch((result) => {
                    context.commit(mutationTypes.createArticleFailure, result.response.data.errors);
                });
            })
        },
    },
}