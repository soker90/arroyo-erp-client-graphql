import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ButtonToolbar, Button, Panel} from 'react-bootstrap';

import {showModal} from 'reducers/modal';
import format from 'components/util/dataFormat';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import {getDNIImages, getClientData} from '../../../modules/actions';

const PersonalData = memo(
  ({
     clientId, tabId, getClientData, showModalPersonalData, getDNIImages, showModalDNITitular, client, className,
   }) => {
    useEffect(() => {
      _getData(clientId, tabId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId, tabId]);

    const _getData = (clientId, tabId) => {
      if (clientId && tabId) {
        getClientData(clientId, tabId);
      }
    };

    const _showModalPersonalData = () => {
      showModalPersonalData();
    };

    const _showModalDNITitular = () => {
      getDNIImages();
      showModalDNITitular();
    };

    const _renderFooter = () =>
      <ButtonToolbar>
        <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_EDIT}>
          <Button bsStyle="primary" onClick={_showModalPersonalData}>
            Modificar
          </Button>
        </HasPermission>
        <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_DNI_READ}>
          <Button bsStyle="success" onClick={_showModalDNITitular}>
            Ver DNI
          </Button>
        </HasPermission>
      </ButtonToolbar>;

    return (
      <Panel
        header="Datos personales"
        footer={_renderFooter()}
        className={className}
      >
        <div className="nera_data">
          <div className="data_row">
            <span className="data_title">Nombre:</span>
            <span className="data_content">{`${client.get(
              'name',
              '',
            )} ${client.get('lastname', '')}`}</span>
          </div>

          <div className="data_row">
            <span className="data_title">Client ID:</span>
            <span className="data_content">{client.get('clientId', '')}</span>
          </div>

          <div className="data_row">
            <span className="data_title">DNI:</span>
            <span className="data_content">{client.get('dni', '')}</span>
          </div>

          <div className="data_row">
            <span className="data_title">Edad:</span>
            <span className="data_content">
              {format.age(client.get('birthday', ''))}
            </span>
          </div>

          <div className="data_row">
            <span className="data_title">Sexo:</span>
            <span className="data_content">{client.get('sex', '')}</span>
          </div>
        </div>
      </Panel>
    );
  });

PersonalData.propTypes = {
  client: PropTypes.object.isRequired,
  className: PropTypes.string,
  getDNIImages: PropTypes.func.isRequired,
  showModalPersonalData: PropTypes.func.isRequired,
  showModalDNITitular: PropTypes.func.isRequired,
};

const mapStateToProps = ({client, permissions}) => ({
  client: client.get('client'),
  permissions: permissions.userPermissions,
});

const mapDispatchToProps = {
  getClientData,
  showModalPersonalData: () => showModal({modalType: 'MODIFY_PERSONAL_DATA'}),
  showModalDNITitular: () => showModal({modalType: 'VIEW_DNI_TITULAR'}),
  getDNIImages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalData);
