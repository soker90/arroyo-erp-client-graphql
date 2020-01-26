import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup,
  ListGroupItem,
  FormControl,
  FormGroup,
  ControlLabel,
  Panel,
} from 'react-bootstrap';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {receiptStatus} from 'utils/constants';
import dataFormat from 'components/util/dataFormat';
import browserHistory from 'redux/history';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const {euro: euroFormatter, dateShort: dateShortFormatter} = dataFormat;

const ItemList = ({text, value}) => (
  <ListGroupItem>
    <span>{text}</span>
    <span>{value}</span>
  </ListGroupItem>
);

function formatDifference(value) {
  if (value < 0) {
    return <span style={{color: 'red'}}>{euroFormatter(value)}</span>;
  }
  return euroFormatter(value);
}

function formatReceiptStatus(statusCod) {
  const status = receiptStatus.find(r => r.value === statusCod);
  return status ? status.text : 'Sin estado';
}

class SemimanualStep extends PureComponent {
  static propTypes = {
    cancelPaymentApplication: PropTypes.func.isRequired,
    applyPayment: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    contract: PropTypes.object.isRequired,
    payReceipt: PropTypes.object.isRequired,
  };

  receiptsTableProps = {
    trClassName: 'cursor-pointer',
    striped: true,
    condensed: true,
    options: {
      onRowClick: row => this.handleRowClick(row),
    },
  };

  state = {
    showAmortizationTable: false,
    condonation: {},
  };

  toggleAmortizationTable = event => {
    this.setState(prevState => ({
      showAmortizationTable: !prevState.showAmortizationTable,
    }));
  };

  handleRowClick = row => {
    browserHistory.push(`${BASE_PATH}/finance/receipt/${row.receiptId}`);
  };

  renderInfoList() {
    const {contract, payReceipt} = this.props;

    return (
      <ListGroup className="list-group-separated-items">
        <ItemList
          text="Importe del préstamo"
          value={euroFormatter(contract.amount)}
        />
        <ItemList text="Recibos totales" value={contract.duration} />
        <ItemList
          text="Número de impagos"
          value={payReceipt.payReceiptDtoOut?.receiptUnPaid}
        />
        <ItemList
          text="Recibos impagados (número recibo)"
          value={payReceipt.payReceiptDtoOut?.unpaidReceiptsNumber}
        />
        <ItemList
          text="Suma de intereses demora"
          value={euroFormatter(
            payReceipt.payReceiptDtoOut?.delayInterestSum
          )}
        />
        <ItemList
          text="Suma de comisiones"
          value={euroFormatter(
            payReceipt.payReceiptDtoOut?.arreasFeesSum
          )}
        />
        <ItemList
          text="Suma de intereses"
          value={payReceipt.payReceiptDtoOut?.interestSum}
        />
        <ItemList
          text="Intereses + comisiones - recibo nuevo"
          value={formatDifference(
            payReceipt.payReceiptDtoOut?.difference
          )}
        />
        <ItemList
          text="Número de recibos pagados"
          value={payReceipt.payReceiptDtoOut?.receiptPaid}
        />
        <ItemList
          text="Cuota"
          value={euroFormatter(contract.installment)}
        />
      </ListGroup>
    );
  }

  renderNewReceiptList() {
    const newReceipt = this.props.payReceipt.payReceiptDtoOut?.newReceipt;

    return (
      <ListGroup className="list-group-separated-items">
        <ItemList
          text="Intereses"
          value={euroFormatter(newReceipt.interestAmount)}
        />
        <ItemList
          text="Intereses demora"
          value={euroFormatter(newReceipt.delayInterest)}
        />
        <ItemList
          text="Gastos"
          value={euroFormatter(newReceipt.expenses)}
        />
        <ItemList
          text="Amortización"
          value={euroFormatter(newReceipt.amortisation)}
        />
        <ItemList
          text="Importe"
          value={euroFormatter(newReceipt.receiptAmount)}
        />
        <ItemList
          text="Fecha de vencimiento"
          value={newReceipt.maturityDate}
        />
      </ListGroup>
    );
  }

  handleChangeCondonation = e => {
    const {name, value} = e.target;

    this.setState({condonation: {...this.state.condonation, [name]: value}});
  };

  handleChangeCondonationCheckbox = e => {
    const {name, checked} = e.target;

    this.setState({condonation: {...this.state.condonation, [name]: checked}});
  };

  renderAmortizationTable() {
    const receipts = this.props.payReceipt.receiptList;

    return (
      <BootstrapTable {...this.receiptsTableProps} data={receipts}>
        <TableHeaderColumn dataField="paymentNumber" dataSort dataAlign="right">
          Nº
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="codReceipt"
          isKey
          dataSort
          dataAlign="right"
        >
          Código
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="receiptAmount"
          dataSort
          dataAlign="right"
          dataFormat={euroFormatter}
        >
          Importe
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="amortisation"
          dataSort
          dataFormat={euroFormatter}
        >
          Capital
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="interestAmount"
          dataSort
          dataAlign="right"
          dataFormat={euroFormatter}
        >
          Interés
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="pendingCapital"
          dataSort
          dataAlign="right"
          dataFormat={euroFormatter}
        >
          Capital pendiente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="maturityDate"
          dataSort
          dataAlign="center"
          dataFormat={dateShortFormatter}
        >
          Vencimiento
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="statusCod"
          dataSort
          dataAlign="center"
          dataFormat={formatReceiptStatus}
        >
          Estado
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }

  applyPayment = () => {
    this.props.applyPayment(true, this.state.condonation);
  };

  render() {
    const disabled = this.props.isLoading;
    const toggleAmortizationTableLabel = `${
      this.state.showAmortizationTable ? 'Ocultar' : 'Ver'
    } cuadro de amortización`;
    return (
      <div>
        <Panel header="Consolidación">
          <div className="flex-set spaced-items-container">
            <div className="flexed-item">
              Información
              {this.renderInfoList()}
            </div>
            <div className="flexed-item">
              Recibo nuevo
              {this.renderNewReceiptList()}
            </div>
          </div>
          <div className="flex-set">
            <FormGroup>
              <ControlLabel>Condonar todo el interés de demora</ControlLabel>
              <FormControl
                type="checkbox"
                className="text-right flexed-item"
                name="delayInteresTotalCondonation"
                onChange={this.handleChangeCondonationCheckbox}
                value={this.state.delayInteresTotalCondonation}
              />
              <ControlLabel>
                Condonar todas las comisiones de impago
              </ControlLabel>
              <FormControl
                type="checkbox"
                className="text-right flexed-item"
                name="arreasFeesTotalCondonation"
                onChange={this.handleChangeCondonationCheckbox}
                value={this.state.arreasFeesTotalCondonation}
              />
              <ControlLabel>
                Cantidad de interés de demora a condonar
              </ControlLabel>
              <FormControl
                type="number"
                placeholder="100"
                className="text-right flexed-item"
                name="delayInteresCondonation"
                onChange={this.handleChangeCondonation}
                value={this.state.delayInteresCondonation}
              />
              <ControlLabel>
                Cantidad de comisiones impago a condonar
              </ControlLabel>
              <FormControl
                type="number"
                placeholder="100"
                className="text-right flexed-item"
                name="arreasFeesCondonation"
                onChange={this.handleChangeCondonation}
                value={this.state.arreasFeesCondonation}
              />
            </FormGroup>
          </div>
          <div className="flex-set">
            <Button
              bsStyle="primary"
              disabled={disabled}
              onClick={this.toggleAmortizationTable}
            >
              {toggleAmortizationTableLabel}
            </Button>
            <Button
              bsStyle="success"
              disabled={disabled}
              onClick={this.applyPayment}
            >
              Aplicar
            </Button>
          </div>
        </Panel>
        {this.state.showAmortizationTable && (
          <div className="flex-set">
            <Panel className="flexed-item" header="Cuadro de amortización">
              {this.renderAmortizationTable()}
            </Panel>
            >
          </div>
        )}
        <div className="flex-set">
          <Button
            onClick={this.props.cancelPaymentApplication}
            bsStyle="danger"
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }
}

export default SemimanualStep;
