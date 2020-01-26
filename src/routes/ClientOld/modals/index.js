import ChangeIBAN from './ChangeIBAN';
import ViewDNICotitular from './DNICotitular';
import ViewDNITitular from './DNITitular';
import PrescriberDetails from './PrescriberDetails';
import ModifyContactData from './ModifyContactData';
import ModifyOtherContactData from './ModifyOtherContactData';
import AddContactData from './AddContactData';
import ModifyPersonalData from '../../Client/components/DataAndContacts/modals/ModifyPersonalData';
import ShowCommunication from './ShowCommunication';
import RegisterEmail from './RegisterEmail';
import RegisterCall from './RegisterCall';
import SendEmail from './SendEmail';
import SendPassword from './SendPassword';
import PaymentStatus from './PaymentStatus';

export default {
  CHANGE_IBAN: ChangeIBAN,
  VIEW_DNI_COTITULAR: ViewDNICotitular,
  VIEW_DNI_TITULAR: ViewDNITitular,
  PRESCRIBER_DETAILS: PrescriberDetails,
  MODIFY_CONTACT_DATA: ModifyContactData,
  MODIFY_OTHER_CONTACT_DATA: ModifyOtherContactData,
  ADD_CONTACT_DATA: AddContactData,
  MODIFY_PERSONAL_DATA: ModifyPersonalData,
  SHOW_COMMUNICATION: ShowCommunication,
  REGISTER_EMAIL: RegisterEmail,
  REGISTER_CALL: RegisterCall,
  SEND_EMAIL: SendEmail,
  SEND_PASSWORD: SendPassword,
  PAYMENT_STATUS: PaymentStatus,
};
