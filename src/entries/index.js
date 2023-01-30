import dva from 'dva';
import Clipboard from 'clipboard';
// import createHistory from 'history/createBrowserHistory';
import router from './router';
import models from '../models';
import './style.scss';

window.clipboard = new Clipboard('.clipboard-target');
window.clipboard.on('success', (e) => {
  e.clearSelection();
});

const app = dva();

Object.keys(models).forEach((key) => {
  app.model(models[key]);
});
app.router(router);
app.start('#root');
