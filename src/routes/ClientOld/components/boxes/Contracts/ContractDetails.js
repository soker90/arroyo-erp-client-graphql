import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import FA from 'react-fontawesome';

import {showModal} from 'reducers/modal';
import {Button, Row, Col} from 'react-bootstrap';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import format from 'components/util/dataFormat';
import InputFile from 'components/InputFile';

import ReceiptsTable from './ReceiptsTable';
import {actions} from '../../../modules/actions';

class ContractDetails extends PureComponent {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    uploadContract: PropTypes.func.isRequired,
    downloadContract: PropTypes.func.isRequired,
    showModalChangeIban: PropTypes.func.isRequired,
    sendAmortizationTable: PropTypes.func.isRequired,
  };

  onChangeInput(event) {
    const file = event.target.files[0];
    const {uploadContract} = this.props;
    uploadContract(file);
  }

  downloadContract() {
    const {contract} = this.props;
    axios({
      url: `/contract/docs/${contract.get('contractId')}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `contrato_${contract.get('contractId')}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    });
  }

  downloadContractTable = () => {
    const {contract} = this.props;
    axios({
      url: `/receipt/listReceiptPdf/${contract.get('contractId')}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `cuadro_amortización_${contract.get('contractId')}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    });
  };

  showModalChangeIban = () => {
    this.props.showModalChangeIban();
  };

  sendAmortizationTable = () => {
    this.props.sendAmortizationTable(this.props.contract.get('contractId'));
  };

  render() {
    const contract = this.props.contract.toJS();
    return !_.isEmpty(contract) ? (
      <div>
        <Row>
          <Col xs={12}>
            <h3>
              {`Contrato ${contract.contractId}`}{' '}
              {contract.opsType && `[${contract.opsType}]`}
            </h3>
            <div style={{margin: '-1em 0 2em'}}>
              PD:{' '}
              <span className="text-bold">
                {contract.scoreValue} ({contract.score})
              </span>
            </div>
          </Col>
          <Col xs={12}>
            <HasPermission access={USER_PERMISSIONS.CONTRACTS_ACCOUNT_EDIT}>
              <Button bsStyle="danger" onClick={this.showModalChangeIban}>
                Modificar cuenta
              </Button>
            </HasPermission>
            <HasPermission access={USER_PERMISSIONS.CONTRACTS_CONTRACT_READ}>
              <Button bsStyle="success" onClick={() => this.downloadContract()}>
                Descargar contrato
              </Button>
            </HasPermission>
            <HasPermission access={USER_PERMISSIONS.CONTRACTS_CONTRACT_EDIT}>
              <InputFile
                name="contract"
                label="Subir contrato"
                onChange={event => this.onChangeInput(event)}
                accept=".pdf"
              />
            </HasPermission>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">TIN</td>
                      <td className="text-right">
                        {format.percent(contract.tin)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">TAE Lender</td>
                      <td className="text-right">
                        {format.percent(contract.tae)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">TAE Cliente</td>
                      <td className="text-right">
                        {format.percent(contract.taeClient)}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">Plazo</td>
                      <td className="text-right">{`${
                        contract.duration
                      } meses`}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">Recibos al día</td>
                      <td className="text-right">{contract.receiptDay}</td>
                    </tr>
                    <tr>
                      <td className="text-bold">Recibos abonados</td>
                      <td className="text-right">{contract.receiptPay}</td>
                    </tr>
                    <tr>
                      <td className="text-bold">Recibos devueltos</td>
                      <td className="text-right">{contract.receiptRet}</td>
                    </tr>
                    <tr>
                      <td className="text-bold">Recibos pendientes</td>
                      <td className="text-right">{contract.receiptPen}</td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">Comisión apertura</td>
                      <td className="text-right">
                        {contract.openFee}% -{' '}
                        {(contract.openFee * contract.amount) / 100}€
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">Comisión estudio:</td>
                      <td className="text-right">
                        {contract.studyFee || 0}% -{' '}
                        {(contract.studyFee * contract.amount) / 100}€
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">Comisión prestatario</td>
                      <td className="text-right">
                        {contract.arrearsFee || 0}% -{' '}
                        {(contract.arrearsFee * contract.amount) / 100}€
                      </td>
                    </tr>
                    <tr>
                      <td className="text-bold">Comisión afiliado</td>
                      <td className="text-right">
                        {contract.prescriberOpenFee || 0}% -{' '}
                        {(contract.prescriberOpenFee * contract.amount) / 100}€
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">Total a pagar</td>
                      <td className="text-right text-bold">
                        {format.euro(contract.amountTotal)}
                      </td>
                    </tr>
                    <tr>
                      <td>Principal préstamo</td>
                      <td className="text-right">
                        {format.euro(contract.amount)}
                      </td>
                    </tr>
                    <tr>
                      <td>Intereses préstamo</td>
                      <td className="text-right">
                        {format.euro(contract.interest)}
                      </td>
                    </tr>
                    <tr>
                      <td>Principal seguro</td>
                      <td className="text-right">
                        {format.euro(contract.insuranceAmount)}
                      </td>
                    </tr>
                    <tr>
                      <td>Intereses seguro</td>
                      <td className="text-right">
                        {format.euro(contract.insuranceInterest)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">Total pagado</td>
                      <td className="text-right text-bold">
                        {format.euro(
                          contract.amountTotal - contract.amountTotalPending
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Principal préstamo</td>
                      <td className="text-right">
                        {format.euro(contract.amount - contract.amountPending)}
                      </td>
                    </tr>
                    <tr>
                      <td>Intereses préstamo</td>
                      <td className="text-right">
                        {format.euro(
                          contract.interest - contract.interestPending
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Principal seguro</td>
                      <td className="text-right">
                        {format.euro(
                          contract.insuranceAmount -
                            contract.insuranceAmountPending
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Intereses seguro</td>
                      <td className="text-right">
                        {format.euro(
                          contract.insuranceInterest -
                            contract.insuranceInterestPending
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">Total pendiente</td>
                      <td className="text-right text-bold">
                        {format.euro(contract.amountTotalPending)}
                      </td>
                    </tr>
                    <tr>
                      <td>Principal préstamo</td>
                      <td className="text-right">
                        {format.euro(contract.amountPending)}
                      </td>
                    </tr>
                    <tr>
                      <td>Intereses préstamo</td>
                      <td className="text-right">
                        {format.euro(contract.interestPending)}
                      </td>
                    </tr>
                    <tr>
                      <td>Principal seguro</td>
                      <td className="text-right">
                        {format.euro(contract.insuranceAmountPending)}
                      </td>
                    </tr>
                    <tr>
                      <td>Intereses seguro</td>
                      <td className="text-right">
                        {format.euro(contract.insuranceInterestPending)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4}>
                <table className="nera_contract_info">
                  <tbody>
                    <tr>
                      <td className="text-bold">QUITA</td>
                      <td className="text-right text-bold">
                        {format.euro(contract.amortisationCondonation)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <hr />
          </Col>
          <Col xs={12}>
            <HasPermission access={USER_PERMISSIONS.CONTRACTS_TABLE_READ}>
              <Button bsStyle="success" onClick={this.downloadContractTable}>
                <FA name="download" /> Descargar Tabla
              </Button>
            </HasPermission>
            <HasPermission access={USER_PERMISSIONS.CONTRACTS_TABLE_EDIT}>
              <Button bsStyle="info" onClick={this.sendAmortizationTable}>
                <FA name="send" /> Enviar Cuadro
              </Button>
            </HasPermission>
          </Col>
          <Col xs={12}>
            <ReceiptsTable />
          </Col>
        </Row>
      </div>
    ) : null;
  }
}

const mapStateToProps = ({client}) => ({
  contract: client.get('contract'),
});

const mapDispatchToProps = {
  ...actions,
  showModalChangeIban: () => showModal({modalType: 'CHANGE_IBAN'}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetails);
