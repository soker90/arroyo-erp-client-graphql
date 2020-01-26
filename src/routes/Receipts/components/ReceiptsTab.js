import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import browserHistory from 'redux/history';
import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import format from 'components/util/dataFormat';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
} from 'react-bootstrap';

const receiptStatuses = {
  rec_amo: 'Amortizado',
  rec_ini: 'Recibo creado',
  rec_man: 'Gestion manual',
  rec_pay: 'Abonado',
  rec_ref: 'Rechazado',
  rec_unp: 'Impagado',
  rec_ret: 'Devuelto',
  rec_iss: 'Emitido',
  rec_day: 'Al día',
  rec_can: 'Cancelado',
  rec_env: 'Enviado',
  rec_caa: 'Cancelado por morosidad',
};

const receiptsOptions = [
  {value: '', text: 'Todos'},
  ...Object.keys(receiptStatuses).map(key => ({
    value: key,
    text: receiptStatuses[key],
  })),
];

const parseStatus = status => receiptStatuses[status] || 'Sin estado';

class ReceiptsTab extends PureComponent {
  static propTypes = {
    receipts: PropTypes.object.isRequired,
    searchReceipts: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      maturityDateFrom: '',
      maturityDateTo: '',
      codReceipt: '',
      statusCod: '',
    };

    this.receiptsTableProps = {
      striped: true,
      hover: true,
      condensed: true,
      trClassName: 'cursor-pointer',
      options: {
        onRowClick: this.handleReceiptsRowClick,
      },
    };
  }

  handleReceiptsSubmit = event => {
    event.preventDefault();
    const {
      maturityDateFrom,
      maturityDateTo,
      codReceipt,
      statusCod,
    } = this.state;

    if (!maturityDateFrom && !maturityDateTo && !codReceipt) {
      return;
    }

    const model = {
      dateIni: maturityDateFrom
        ? moment(maturityDateFrom).format('YYYY-MM-DD')
        : null,
      dateEnd: maturityDateTo
        ? moment(maturityDateTo).format('YYYY-MM-DD')
        : null,
      codReceipt: codReceipt,
      codStatus: statusCod,
    };
    this.props.searchReceipts(model);
  };

  handleReceiptsRowClick = row => {
    browserHistory.push(
      `${process.env.NERA_ROUTER_BASE_PATH}/finance/receipt/${row.receiptId}`
    );
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  clearReceiptsForm = () => {
    this.setState({
      maturityDateFrom: '',
      maturityDateTo: '',
      codReceipt: '',
      statusCod: '',
    });
  };

  render() {
    const {
      maturityDateFrom,
      maturityDateTo,
      codReceipt,
      statusCod,
    } = this.state;
    const receipts = this.props.receipts.toJS();

    return (
      <Container className="tab-body">
        <Row>
          <InfoPanel xs={12} static title="Recibos">
            <Form
              inline={true}
              className="search-form"
              onSubmit={this.handleReceiptsSubmit}
            >
              <FormGroup>
                <ControlLabel>Fecha vencimiento desde</ControlLabel>
                <FormControl
                  type="date"
                  name="maturityDateFrom"
                  value={maturityDateFrom}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Fecha vencimiento hasta</ControlLabel>
                <FormControl
                  type="date"
                  name="maturityDateTo"
                  value={maturityDateTo}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Código recibo</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  name="codReceipt"
                  value={codReceipt}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Estado del recibo</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="statusCod"
                  value={statusCod}
                  onChange={this.handleChange}
                >
                  {receiptsOptions.map(option => (
                    <option key={option.text} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <label className="control-label">&nbsp;</label>
                    <Button
                      bsStyle="primary"
                      type="submit"
                      disabled={this.state.isReceiptsLoading}
                    >
                      Buscar Recibos
                    </Button>
                    <Button
                      bsStyle="danger"
                      type="reset"
                      onClick={this.clearReceiptsForm}
                      disabled={this.state.isReceiptsLoading}
                    >
                      Limpiar
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </InfoPanel>

          <InfoPanel xs={12} static title={`Recibos (${receipts.length})`}>
            <BootstrapTable
              data={receipts}
              {...this.receiptsTableProps}
              pagination={receipts.length > 10}
            >
              <TableHeaderColumn
                width="160px"
                dataField="codReceipt"
                dataSort
                isKey
              >
                Cod.
              </TableHeaderColumn>
              <TableHeaderColumn dataField="clientDNI" dataSort>
                DNI
              </TableHeaderColumn>
              <TableHeaderColumn dataField="clientFirstName" dataSort>
                Nombre
              </TableHeaderColumn>
              <TableHeaderColumn dataField="clientLastName" dataSort>
                Apellidos
              </TableHeaderColumn>
              <TableHeaderColumn dataField="contractId" dataSort>
                ID Contrato
              </TableHeaderColumn>
              <TableHeaderColumn dataField="receiptId" dataSort>
                ID Recibo
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="paymentNumber"
                dataSort
                dataAlign="right"
              >
                Pago
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="receiptAmount"
                dataSort
                dataFormat={format.euro}
                dataAlign="right"
              >
                Cantidad
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="maturityDate"
                dataSort
                dataFormat={format.dateShort}
              >
                Vencimiento
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="statusCod"
                dataSort
                dataFormat={parseStatus}
              >
                Estado
              </TableHeaderColumn>
              <TableHeaderColumn dataField="remittanceReceiptId" dataSort>
                ID Remesa
              </TableHeaderColumn>
            </BootstrapTable>
          </InfoPanel>
        </Row>
      </Container>
    );
  }
}

export default ReceiptsTab;
