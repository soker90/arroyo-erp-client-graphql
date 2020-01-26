import {REGISTER_COMMUNICATION, SEND_EMAIL, SEND_PASSWORD} from './types';
import SendPassword from './SendPassword';
import RegisterCommunication from './RegisterCommunication';
import SendEmail from './SendEmail';

export default {
  [SEND_PASSWORD]: SendPassword,
  [REGISTER_COMMUNICATION]: RegisterCommunication,
  [SEND_EMAIL]: SendEmail,
};