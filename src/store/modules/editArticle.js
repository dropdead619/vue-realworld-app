import articleApi from '@/api/article.js';

export const mutationTypes = {
    updateArticleStart: '[updateArticle] updateArticleStart',
    updateArticleSuccess: '[updateArticle] updateArticleSuccess',
    updateArticleFailure: '[updateArticle] updateArticleFailure',

    getArticleStart: '[updateArticle] getArticleStart',
    getArticleSuccess: '[updateArticle] getArticleSuccess',
    getArticleFailure: '[updateArticle] getArticleFailure',
}

export const actionTypes = {
    updateArticle: '[updateArticle] updateArticle',
    getArticle: '[updateArticle] getArticle',
}

export const getterTypes = {
    isSubmitting: '[updateArticle] isSubmitting',
    validationErrors: '[updateArticle] validationErrors',
    isLoading: '[updateArticle] isLoading',
    article: '[updateArticle] article',
}

export default {
    state: {
        isSubmitting: false,
        validationErrors: null,
        isLoading: false,
        article: null
    },
    getters: {
        [getterTypes.isSubmitting](state) {
            return state.isSubmitting;
        },
        [getterTypes.validationErrors](state) {
            return state.validationErrors;
        },
        [getterTypes.isLoading](state) {
            return state.isLoading;
        },
        [getterTypes.article](state) {
            return state.article;
        },
    },
    mutations: {
        [mutationTypes.updateArticleStart](state) {
     
            state.isSubmitting = true;
        },
        [mutationTypes.updateArticleSuccess](state) {
            state.isSubmitting = false;
        },
        [mutationTypes.updateArticleFailure](state) {
            state.isSubmitting = false;

        },

        [mutationTypes.getArticleStart](state) {
            state.isLoading = true;
        },
        [mutationTypes.getArticleSuccess](state, payload) {
            state.isLoading = false;
            state.article = payload;
        },
        [mutationTypes.getArticleFailure](state, payload) {
            state.isLoading = false;
            state.validationErrors = payload;
        },
    },
    actions: {
        [actionTypes.updateArticle](context, {
            slug,
            articleInput
        }) {
            return new Promise(resolve => {
                context.commit(mutationTypes.updateArticleStart);
                console.log(slug, articleInput);
                articleApi.updateArticle(slug, articleInput).then((article) => {
                    context.commit(mutationTypes.updateArticleSuccess);
                    resolve(article);
                }).catch(() => {
                    context.commit(mutationTypes.updateArticleFailure);
                });
            })
        },

        [actionTypes.getArticle](context, {
            slug
        }) {
            return new Promise(resolve => {
                context.commit(mutationTypes.getArticleStart);
                articleApi.getArticle(slug).then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article);
                    resolve(article);
                }).catch(() => {
                    context.commit(mutationTypes.getArticleFailure);
                });
            })
        },
    },
}