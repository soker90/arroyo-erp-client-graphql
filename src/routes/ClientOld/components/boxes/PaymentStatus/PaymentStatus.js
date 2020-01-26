import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import {Col, Row, ButtonToolbar, Button, Panel} from 'react-bootstrap';

import moment from 'moment';
import {RECOVERY_STATUS} from 'utils/constants';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import DataContent from 'components/DataContent';
import {getLastCommunication, getDebtDaysLiteral} from 'routes/ClientOld/utils';

const PaymentStatus = memo(
  ({
     showModalPaymentStatus,
     recovery,
     communications,
     clientId,
     getRecoveryByClient,
     sendToJudicial,
     contracts,
     updateRecoveries,
     className,
     isRefinanced,
     fetchRefinanceContractByClientId,
   }) => {
    useEffect(() => {
      if (clientId) {
        getRecoveryByClient(clientId);
        fetchRefinanceContractByClientId(clientId);
      }
      // eslint-disable-next-line
    }, [clientId]);

    const _showModalPaymentStatus = () => {
      showModalPaymentStatus(recovery);
    };

    const updateData = () => {
      updateRecoveries();
      getRecoveryByClient(clientId);
    };

    const _sendToJudicial = () => {
      sendToJudicial(clientId);
    };

    const _renderFooter = () => {
      return (
        <ButtonToolbar>
          <HasPermission access={USER_PERMISSIONS.PAYMENT_SITUATION_EDIT}>
            <Button bsStyle="primary" onClick={_showModalPaymentStatus}>
              Modificar
            </Button>
          </HasPermission>
          <Button bsStyle="info" onClick={updateData}>
            <FA name="refresh"/> Actualizar
          </Button>
          <HasPermission access={USER_PERMISSIONS.PAYMENT_SITUATION_EDIT}>
            <Button bsStyle="warning" onClick={_sendToJudicial}>
              <FA name="send"/> Enviar a Abogado
            </Button>
          </HasPermission>
        </ButtonToolbar>
      );
    };

    const hasInsurance = contracts.filter(t => t.hasInsurance);
    const messagesNumber = localStorage.getItem('messagesNumber');
    const isHaveDataRecovery = recovery => recovery.hasOwnProperty('aliveDebt');

    if (!isHaveDataRecovery(recovery)) return null;

    return (
      <Panel
        header="Situación de impago"
        footer={_renderFooter()}
        className={className}
      >
        <Row>
          <Col xs={4}>
            <div className="nera_data">
              <DataContent title="Refinanciado">
                {isRefinanced.length ? 'Sí' : 'No'}
              </DataContent>

              <DataContent title="Enviado a Judicial">
                {recovery.judicial ? 'Si' : 'No'}
              </DataContent>

              <DataContent title="Tiene seguro">
                {hasInsurance.length ? 'Si' : 'No'}
              </DataContent>
            </div>
          </Col>
          <Col xs={4}>
            <div className="nera_data">
              <DataContent title="Status de impagado">
                {RECOVERY_STATUS[recovery.unpaidStatus]}
              </DataContent>

              <DataContent title="Fecha de promesa">
                {moment(recovery.promiseDate).format('DD-MM-YYYY')}
              </DataContent>

              <DataContent title="Vencido hace">
                {getDebtDaysLiteral(recovery)}
              </DataContent>
            </div>
          </Col>
          <Col xs={4}>
            <div className="nera_data">
              <DataContent title="Próxima gestión">
                {moment(recovery.nextProcess).format(
                  'DD-MM-YYYY HH:mm',
                )}
              </DataContent>

              <DataContent title="Última gestión">
                {getLastCommunication(communications)}
              </DataContent>

              <DataContent title="Recado">{messagesNumber || 0}</DataContent>
            </div>
          </Col>
        </Row>
      </Panel>
    );
  });

PaymentStatus.propTypes = {
  showModalPaymentStatus: PropTypes.func.isRequired,
  recovery: PropTypes.object.isRequired,
  communications: PropTypes.array.isRequired,
  clientId: PropTypes.string,
  getRecoveryByClient: PropTypes.func.isRequired,
  sendToJudicial: PropTypes.func.isRequired,
  contracts: PropTypes.array,
};

export default PaymentStatus;
