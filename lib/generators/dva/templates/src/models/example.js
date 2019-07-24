
export default {

    namespace: 'example',

    state: {
        tip: true
    },

    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *fetch({ payload }, { call, put, select }) {
            yield put({ type: 'save' });
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
