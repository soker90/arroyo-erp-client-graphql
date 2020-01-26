import {connect} from 'react-redux';
import {getContactInfo, getDNIImages, getCoDniImages} from 'routes/Client/modules/actions';
import {showModal} from 'reducers/modal';
import DataAndContacts from '../DataAndContacts';
import {
  MODIFY_CONTACT_DATA,
  MODIFY_OTHER_CONTACT_DATA,
  MODIFY_PERSONAL_DATA,
  PRESCRIBER_DETAILS,
  VIEW_DNI_TITULAR,
} from '../modals/types';

const mapStateToProps = ({client, permissions}) => ({
  client: client.client,
  permissions: permissions.userPermissions,
  clientId: client.clientId,
  contactInfo: client.contactInfo,
  contract: client?.contracts?.[0] || {},
  prescriber: client?.prescriber,
});

const mapDispatchToProps = {
  getContactInfo,
  showModalPersonalData: () => showModal({modalType: MODIFY_PERSONAL_DATA}),
  showModalDNITitular: cotitular => showModal({
    modalType: VIEW_DNI_TITULAR,
    modalProps: {cotitular},
  }),
  showModalModifyContactData: type => showModal({
    modalType: MODIFY_CONTACT_DATA,
    modalProps: {type},
  }),
  showModalModifyOtherContactData: props => showModal({
    modalType: MODIFY_OTHER_CONTACT_DATA,
    modalProps: props,
  }),
  showModalPrescriberDetails: () => showModal({
    modalType: PRESCRIBER_DETAILS,
  }),
  getDNIImages,
  getCoDniImages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataAndContacts);