import { routerRedux } from 'dva/router';
import { pathToRegexp } from 'path-to-regexp';

const { push } = routerRedux;

const routers = [
  {
    name: 'index',
    test: '/home',
  }, 
];

export default {
  namespace: 'utils',
  state: {
    pathname: '',
    history: null,
    routers,
    activeRoute: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        dispatch({ type: 'updateCurrentPathName', pathname, history });
        dispatch({
          type: 'updateState',
          payload: {
            activeRoute: pathname,
          },
        });
        let changeRoute = false;
        for (let i = 0; i < routers.length; i += 1) {
          const router = routers[i];
          const test = pathToRegexp(router.test).exec(pathname);
          if (test) {
            dispatch({
              type: 'updateState',
              payload: {
                activeRoute: router,
              },
            });
            changeRoute = true;
            break;
          }
        }
        if (!changeRoute) {
          dispatch({
            type: 'updateState',
            payload: {
              activeRoute: null,
            },
          });
        }
      });
    },
  },
  effects: {
    * goBack(_, { select }) {
      const history = yield select(({ utils }) => utils.history);
      history.goBack();
    },
    * goto({ goto }, { put }) {
      yield put(push(goto));
    },
  },
  reducers: {
    updateCurrentPathName(state, { pathname, history }) {
      return { ...state, pathname, history };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
