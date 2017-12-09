import { createStore } from 'redux';
import reduceLight from './reducers/main.js';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(reduceLight, {names: ['Yeezus', 'brian', 'luke']}, devToolsEnhancer());
store.subscribe(() => {
  console.log('store change: ', store.getState())
});
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);


export default store;