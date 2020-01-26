import ModifyPersonalData from './ModifyPersonalData';
import DNITitular from './DNITitular';
import {
  MODIFY_CONTACT_DATA,
  MODIFY_OTHER_CONTACT_DATA,
  MODIFY_PERSONAL_DATA,
  PRESCRIBER_DETAILS,
  VIEW_DNI_TITULAR,
} from './types';
import ModifyContactData from './ModifyContactData';
import ModifyOtherContactData from './ModifyOtherContactData';
import PrescriberDetails from './PrescriberDetails';

export default {
  [MODIFY_PERSONAL_DATA]: ModifyPersonalData,
  [VIEW_DNI_TITULAR]: DNITitular,
  [MODIFY_CONTACT_DATA]: ModifyContactData,
  [MODIFY_OTHER_CONTACT_DATA]: ModifyOtherContactData,
  [PRESCRIBER_DETAILS]: PrescriberDetails,
};