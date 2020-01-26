// import slImmutable from 'seamless-immutable';
// import {merge} from '../lib/siu';
// import _ from 'lodash';
//
// import createReducer from 'redux/create-reducer';
// import {
//   NEW_SERVER_NOTIFICATION,
//   DELETE_SERVER_NOTIFICATIONS,
// } from 'actions/server-notification';
//
// const reducerSchema = slImmutable([]);
//
// const SERVER_NOTIFICATIONS_QUEUE_LENGTH = 100;
//
// export default createReducer(reducerSchema, {
//   [NEW_SERVER_NOTIFICATION]: (state, action) => {
//     if (state.length === SERVER_NOTIFICATIONS_QUEUE_LENGTH) {
//       let _state = state.asMutable();
//       _state.shift();
//       _state = _state.concat(action.notification);
//       return slImmutable(_state);
//     }
//     return state.concat(action.notification);
//   },
//   [DELETE_SERVER_NOTIFICATIONS]: (state, action) => {
//     if (action.boxId === 'trash') {
//       return slImmutable(
//         _.reject(state, (notification) =>
//           _.find(action.notifications, (msg) => msg.id === notification.id),
//         ),
//       );
//     }
//
//     const obj = merge(
//       state,
//       slImmutable(action.notifications.map((msg) => ({...msg, deleted: true}))),
//       'id',
//     );
//
//     console.log(obj);
//
//     return obj;
//   },
// });
