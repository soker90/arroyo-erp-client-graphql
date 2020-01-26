import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar, Button, Panel} from 'react-bootstrap';
import format from 'components/util/dataFormat';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

const Communications = memo(
  ({
     getClientCommunications, clientId, showModalCommunication, showModalRegisterCall, showModalRegisterEmail,
     showModalSendEmail, showModalSendPassword, communications,
   }) => {
    const communicationTableProps = {
      trClassName: 'cursor-pointer',
      striped: true,
      condensed: true,
      pagination: true,
      ignoreSinglePage: true,
      options: {
        onRowClick: showModalCommunication,
        defaultSortName: 'dateComunication',
        defaultSortOrder: 'desc',
      },
    };

    useEffect(() => {
      clientId && getClientCommunications(clientId)
    }, [clientId, getClientCommunications]);

    /**
     * Render TableHeaderColumn item
     * @param {string} id
     * @param {string} label
     * @param {Object} others
     * @returns {TableHeaderColumn}
     * @private
     */
    const _renderTableHeaderColumn = (id, label, others = {}) =>
      <TableHeaderColumn dataField={id} {...others} dataSort>
        {label}
      </TableHeaderColumn>;

    /**
     * Render button
     * @param {string} label
     * @param {function} onClick
     * @returns {Button}
     * @private
     */
    const _renderButton = (label, onClick) =>
      <Button bsStyle="primary" onClick={onClick}>
        {label}
      </Button>;

    /**
     * Render footer table
     * @returns {ButtonToolbar}
     * @private
     */
    const _renderFooter = () =>
      <ButtonToolbar>
        <HasPermission access={USER_PERMISSIONS.COMMUNICATIONS_HISTORY_EDIT}>
          {_renderButton('Registro de email', showModalRegisterEmail)}
          {_renderButton('Registro de llamada', showModalRegisterCall)}
          {_renderButton('Enviar email', showModalSendEmail)}
          {_renderButton('Enviar contraseña', showModalSendPassword)}
        </HasPermission>
      </ButtonToolbar>;

    return (
      <Panel header="Historial de comunicaciones" footer={_renderFooter()}>
        <BootstrapTable
          {...communicationTableProps}
          data={communications.toJS()}
        >
          {_renderTableHeaderColumn('clientComunicationId', 'ID', {isKey: true})}
          {_renderTableHeaderColumn('comunicationTypeDescription', 'Tipo')}
          {_renderTableHeaderColumn('summary', 'Asunto')}
          {_renderTableHeaderColumn('directionType', 'Dirección')}
          {_renderTableHeaderColumn('dateComunication', 'Fecha', {dataFormat: format.date})}
        </BootstrapTable>
      </Panel>
    );
  });

Communications.propTypes = {
  communications: PropTypes.object.isRequired,
  clientId: PropTypes.string,
  getClientCommunications: PropTypes.func.isRequired,
  showModalCommunication: PropTypes.func.isRequired,
  showModalRegisterCall: PropTypes.func.isRequired,
  showModalRegisterEmail: PropTypes.func.isRequired,
  showModalSendEmail: PropTypes.func.isRequired,
  showModalSendPassword: PropTypes.func.isRequired,
};

export default Communications;
