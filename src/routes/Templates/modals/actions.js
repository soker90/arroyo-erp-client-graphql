import {showModal} from 'reducers/modal';
import {MODIFY_TEMPLATE_EMAIL} from './types';

export const showModifyClient = id => showModal({
  modalType: [MODIFY_TEMPLATE_EMAIL],
  modalProps: {id},
});