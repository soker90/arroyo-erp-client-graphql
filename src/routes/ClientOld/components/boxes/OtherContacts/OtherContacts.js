import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ButtonToolbar, Button, Tabs, Tab, Panel} from 'react-bootstrap';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';

import {showModal} from 'reducers/modal';
import {getContactInfo} from 'routes/ClientOld/modules/actions';

const OtherContacts = memo(({clientId, getContactInfo, contactInfo, showModalModifyOtherData, showModalAddContactData, className}) => {
  const [selectedContact, setSelectedContact] = useState(contactInfo);
  useEffect(() => {
    clientId && getContactInfo(clientId);
  }, [clientId, getContactInfo]);

  useEffect(() => {
    setSelectedContact(contactInfo?.toJS()?.[0]);
  }, [contactInfo]);

  const _showModalModifyOtherData = () => {

    showModalModifyOtherData(selectedContact);
  };

  const _showModalAddContactData = () => {
    showModalAddContactData();
  };

  const _handleSelectContract = selectedIndex => {
    const [selectedContact] = contactInfo.toJS()
      .filter(({clientContactInfoId}) => clientContactInfoId === selectedIndex);

    if (selectedContact) {
      setSelectedContact(selectedContact);
    }
  };

  const _renderFooter = () =>
    <HasPermission access={USER_PERMISSIONS.OTHER_CONTACT_DATA_EDIT}>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={_showModalModifyOtherData}>
          Modificar
        </Button>
        <Button
          className="pull-right"
          bsStyle="danger"
          onClick={_showModalAddContactData}
        >
          Añadir
        </Button>
      </ButtonToolbar>
    </HasPermission>;

  return (
    <Panel
      header="Otros contactos"
      footer={_renderFooter()}
      className={className}
    >
      <Tabs
        className="tabs-other-contacts"
        bsStyle="tabs"
        onSelect={_handleSelectContract}
        id="tabs-other-contacts"
      >
        {contactInfo.toJS().map((contact, index) => (
          <Tab
            key={contact.clientContactInfoId}
            eventKey={contact.clientContactInfoId}
            title={index + 1}
          >
            <div className="nera_data" style={{marginTop: '1rem'}}>
              <div className="data_row">
                <span className="data_title">Email: </span>
                <span className="data_content">{contact.email}</span>
              </div>
              <div className="data_row">
                <span className="data_title">Teléfono: </span>
                <span className="data_content">{contact.phone}</span>
              </div>
              <div className="data_row">
                <span className="data_title">Dirección: </span>
                <span className="data_content">{contact.address}</span>
              </div>
              <div className="data_row">
                <span className="data_title">Ciudad: </span>
                <span className="data_content">{contact.city}</span>
              </div>
              <div className="data_row">
                <span className="data_title">Comentarios: </span>
                <span className="data_content">{contact.comments}</span>
              </div>
            </div>
          </Tab>
        ))}
      </Tabs>
    </Panel>
  );
});

OtherContacts.propTypes = {
  contactInfo: PropTypes.object.isRequired,
  className: PropTypes.string,
  showModalModifyOtherData: PropTypes.func.isRequired,
};

const mapStateToProps = ({client, permissions}) => ({
  client: client.get('client'),
  contactInfo: client.get('contactInfo'),
  permissions: permissions.userPermissions,
});

const mapDispatchToProps = {
  getContactInfo,
  showModalModifyOtherData: contactInfo =>
    showModal({
      modalType: 'MODIFY_OTHER_CONTACT_DATA',
      modalProps: {...contactInfo},
    }),
  showModalAddContactData: () =>
    showModal({
      modalType: 'ADD_CONTACT_DATA',
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtherContacts);
