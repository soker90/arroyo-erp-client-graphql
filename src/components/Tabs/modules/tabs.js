import Immutable from 'immutable';
import _ from 'lodash';

import createReducer from 'redux/create-reducer';

import {ACTIVATE_TAB, REMOVE_TAB, ORDER_TABS, RENAME_TAB} from 'action-types';

export const activateTab = tab => {
  return {type: ACTIVATE_TAB, tab};
};

export const removeTab = tab => ({type: REMOVE_TAB, tab});

export const orderTabs = ({oldIndex, newIndex}) => ({
  type: ORDER_TABS,
  oldIndex,
  newIndex,
});

export const renameTab = (name, tabId) => ({type: RENAME_TAB, name, tabId});

export const actions = {
  activateTab,
  removeTab,
  orderTabs,
  renameTab,
};

function setActiveTab(tabs, id) {
  return tabs.map(t => ({...t, active: t.id === id}));
}

const INITIAL_STATE = Immutable.fromJS([]);

const ACTION_HANDLERS = {
  [ACTIVATE_TAB]: (state, {tab = {}}) => {
    let tabs = state.toJS();
    if (!tabs.find(t => t.id === tab.id)) {
      tabs.push(tab);
    }
    return Immutable.fromJS(setActiveTab(tabs, tab.id));
  },

  [REMOVE_TAB]: (state, {tab}) => {
    let tabs = state.toJS();
    const tabIndex = tabs.findIndex(t => t.id === tab.id);
    if (tab.active) {
      const nextIndex = tabIndex - 1;
      if (nextIndex !== -1) {
        const nextId = tabs[nextIndex].id;
        tabs = setActiveTab(tabs, nextId);
      }
    }
    tabs = _.reject(tabs, t => t.id === tab.id);
    return Immutable.fromJS(tabs);
  },

  [ORDER_TABS]: (state, {oldIndex, newIndex}) => {
    const tabs = state.toJS();
    if (newIndex >= tabs.length) {
      let k = newIndex - tabs.length;
      while (k-- + 1) {
        tabs.push(undefined);
      }
    }
    tabs.splice(newIndex, 0, tabs.splice(oldIndex, 1)[0]);
    return Immutable.fromJS(tabs);
  },

  [RENAME_TAB]: (state, {name, tabId}) => {
    if (tabId) {
      const tabs = state.toJS();
      const tab = tabs.find(t => t.id === tabId);
      tab.title = name;
      return Immutable.fromJS(tabs);
    }
    return state;
  },
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
