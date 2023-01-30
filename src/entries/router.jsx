import React from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'dva/router';
import HomePage from '../pages/Home'; // 首页

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/home" />)} />
        <Route path="/home" exact component={HomePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
