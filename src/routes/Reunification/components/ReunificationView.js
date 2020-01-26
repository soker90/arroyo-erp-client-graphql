import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';
import {Button, Row, Col, Panel} from 'react-bootstrap';
import format from 'components/util/dataFormat';
import FA from 'react-fontawesome';
import DataContent from 'components/DataContent';

import ReunificationTable from './ReunificationTable';
import ReunificationValidationButtons from './ReunificationValidationButtons';
import '../styles/reunification.scss';

const {
  // REUNIFICATION_STATUS,
  // REUNIFICATION_STATUS_TEMPLATES,
  STATUS_LIST,
} = require('../modules/constants');

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const ReunificationView = memo(
  ({
     reunificationData, renameTab, match: {params: {reunificationId}}, activeTab, getReunificationLoans,
     createReunificationLoan, addNotification, showModalEditReuLoan, validateStatusChange,
     rejectStatusChange, desistStatusChange, handleReunificationStatus, loansTotalAmount,
   }) => {
    const _getReunificationLoans = reunificationId => {
      getReunificationLoans(Number(reunificationId));
    };

    useEffect(() => {
      const {
        id: tabId, name,
      } = activeTab;

      renameTab(`${name}: ${reunificationId}`, tabId);
      _getReunificationLoans(reunificationId);
      // eslint-disable-next-line
    }, [reunificationId]);

    const _createReunificationLoan = () => {
      const {reunificationLoansDtoList} = reunificationData;
      const validAmount = reunificationLoansDtoList
        .map(item => item.entityName !== 'CLIENTE' && item.amount)
        .some(match => match === 0);

      if (!validAmount) {
        createReunificationLoan(reunificationData.reunificationId);
        return;
      }

      addNotification({
        level: 'warning',
        title: 'Préstamo incompleto',
        message:
          'Ya existe un préstamo con ese mismo importe, debes introducir una cantidad diferente en el préstamo existente antes de crear uno nuevo.',
      });
    };

    /* Open modal to modify an existing loan */
    const _showModalEditReuLoan = (modalProps, reunificationId) => {
      const {statusCod} = reunificationData;

      showModalEditReuLoan(
        modalProps,
        Number(reunificationId),
        statusCod,
      );
    };

    const _validateStatusChange = () => {
      validateStatusChange(reunificationData.reunificationId);
    };

    const _rejectStatusChange = () => {
      rejectStatusChange(reunificationData.reunificationId);
    };

    const _desistStatusChange = () => {
      desistStatusChange(reunificationData.reunificationId, activeTab);
    };

    /* Open new tab to client */
    const _showClientView = () => {
      if (reunificationData.clientId) {
        const path = `${BASE_PATH}/client/${reunificationData.clientId}`;
        browserHistory.push(path);
      }
    };

    /*  Por algun motivo no se usaba, comentado 22/10/19
    const _updateReunificationStatus = status => {
      handleReunificationStatus({
        reunificationId: reunificationData.reunificationId,
        statusCod: REUNIFICATION_STATUS[status],
        templateShortDescription: REUNIFICATION_STATUS_TEMPLATES[status],
      });
    }; */


    let name, lastname;

    const _clientAmount = reunificationData.amount - loansTotalAmount;

    const statusUpdater = status => {
      return STATUS_LIST[status];
    };

    if (reunificationData.clientListItemsDto) {
      name = reunificationData.clientListItemsDto.name;
      lastname = reunificationData.clientListItemsDto.lastname;
    }

    return (
      <div className="tab-body">
        <Panel
          header={`Detalle de Reunificación - ID: ${reunificationData &&
          reunificationData.reunificationId}`}
        >
          <Row>
            <Col xs={6}>
              <DataContent title="Estado">
                <span className={`reu ${reunificationData.statusCod}`}>
                  {statusUpdater(reunificationData.statusCod)}
                </span>
              </DataContent>
              <DataContent title="Fecha de alta">
                {format.dateText(reunificationData.operationDate)}
              </DataContent>
              <DataContent title="Cliente">
                {name || ''} {lastname || ''}
              </DataContent>
            </Col>
            <Col xs={6}>
              <div style={{float: 'right'}}>
                <Button bsStyle="info" onClick={_showClientView}>
                  <FA name="user-o"/> Ver Cliente
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ReunificationTable
                status={reunificationData.statusCod}
                showModalEditReuLoan={_showModalEditReuLoan}
                reunificationData={reunificationData}
              />
              <DataContent title="Importe solicitado">
                {format.euro(reunificationData.amount)}
              </DataContent>
              <DataContent title="Préstamos + comisiones">
                {format.euro(loansTotalAmount)}
              </DataContent>
              <DataContent title="Cliente">
                <span style={{color: _clientAmount >= 0 ? 'green' : 'red'}}>
                  <b>{format.euro(_clientAmount)}</b>
                </span>
              </DataContent>
            </Col>
          </Row>
          <hr/>
          <ReunificationValidationButtons
            status={reunificationData.statusCod}
            validateStatusChange={_validateStatusChange}
            rejectStatusChange={_rejectStatusChange}
            desistStatusChange={_desistStatusChange}
            createReunificationLoan={_createReunificationLoan}
          />
        </Panel>
      </div>
    );
  });

ReunificationView.propTypes = {
  reunificationData: PropTypes.shape({
    reunificationId: PropTypes.number,
    clientId: PropTypes.number,
    operationDate: PropTypes.number,
    amount: PropTypes.number,
    certValidation: PropTypes.bool,
    ccValidation: PropTypes.bool,
    reunificationValidation: PropTypes.bool,
    statusCod: PropTypes.string,
    reunificationLoansDtoList: PropTypes.array,
    clientListItemsDto: PropTypes.object.isRequired,
  }).isRequired,
  showModalEditReuLoan: PropTypes.func.isRequired,
  validateStatusChange: PropTypes.func.isRequired,
  rejectStatusChange: PropTypes.func.isRequired,
  desistStatusChange: PropTypes.func.isRequired,
  getReunificationLoans: PropTypes.func.isRequired,
  loansTotalAmount: PropTypes.number.isRequired,
};

export default ReunificationView;
