import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import browserHistory from 'redux/history';

import InfoPanel from 'components/InfoPanel';
import format from 'components/util/dataFormat';
import {Container} from 'components/Container';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const statuses = {
  rem_env: 'Enviada',
  rem_gen: 'Generada',
  rem_pay: 'Pagada',
};

const remittanceOptions = [
  {value: '', text: 'Todos'},
  ...Object.keys(statuses).map(key => ({text: statuses[key], value: key})),
];

const parseStatus = status => statuses[status.statusCod] || 'Sin estado';

class RemittancesTab extends PureComponent {
  static propTypes = {
    remittances: PropTypes.object.isRequired,
    searchRemittances: PropTypes.func.isRequired,
    showRemittancesModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      remittances: [],
      generationDate: '',
      codRemitance: '',
      cod: '',
    };

    this.remittancesTableProps = {
      striped: true,
      hover: true,
      condensed: true,
      trClassName: 'cursor-pointer',
      options: {
        onRowClick: row => this.handleRemittancesRowClick(row),
      },
    };
  }

  handleRemittancesRowClick = row => {
    this.openModalReceipts(row);
  };

  handleSubmit = event => {
    event.preventDefault();

    if (
      !this.state.cod &&
      !this.state.codRemitance &&
      !this.state.generationDate
    ) {
      return;
    }
    const model = {
      generationDate: this.state.generationDate || null,
      codRemitance: this.state.codRemitance,
      cod: this.state.cod,
    };
    this.props.searchRemittances(model);
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  openModalReceipts = row => {
    browserHistory.push(
      `${BASE_PATH}/finance/operations/remittance/${row.codRemitance}`
    );
  };

  clearRemittancesForm = () => {
    this.setState({generationDate: '', codRemitance: ''});
  };

  render() {
    const {generationDate, codRemitance, cod} = this.state;
    const remittances = this.props.remittances.toJS();

    return (
      <Container className="tab-body">
        <Row>
          <InfoPanel xs={12} static title="Remesas">
            <Form inline className="search-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Fecha de generación</ControlLabel>
                <FormControl
                  type="date"
                  name="generationDate"
                  value={generationDate}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Código remesa</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  name="codRemitance"
                  value={codRemitance}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Estado remesa</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="cod"
                  value={cod}
                  onChange={this.handleChange}
                >
                  {remittanceOptions.map(({text, value}) => (
                    <option key={text} value={value}>
                      {text}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <label className="control-label">&nbsp;</label>
                    <Button bsStyle="primary" type="submit">
                      Buscar Remesas
                    </Button>
                    <Button
                      bsStyle="danger"
                      type="reset"
                      onClick={this.clearRemittancesForm}
                    >
                      Limpiar
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </InfoPanel>

          <InfoPanel xs={12} static title={`Remesas (${remittances.length})`}>
            <BootstrapTable
              data={remittances}
              {...this.remittancesTableProps}
              pagination={remittances.length > 10}
            >
              <TableHeaderColumn
                dataField="remittanceReceiptsId"
                dataSort
                width="70px"
                isKey
              >
                ID
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="generationDate"
                dataSort
                dataFormat={format.dateShort}
              >
                Fecha generacion
              </TableHeaderColumn>
              <TableHeaderColumn width="160px" dataField="filename" dataSort>
                Fichero
              </TableHeaderColumn>
              <TableHeaderColumn dataField="numberReceiptIncluded" dataSort>
                Recibos
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="totalAmount"
                dataSort
                dataFormat={format.euro}
                dataAlign="right"
              >
                Total
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="maturityDateReceipt"
                dataFormat={format.dateShort}
                dataSort
              >
                Vencimiento
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="statusRemittance"
                dataSort
                dataFormat={parseStatus}
              >
                Estado
              </TableHeaderColumn>
              <TableHeaderColumn dataField="operationCod" dataSort>
                Cod. Operación
              </TableHeaderColumn>
            </BootstrapTable>
          </InfoPanel>
        </Row>
        {/* {modalReceipts} */}
      </Container>
    );
  }
}

export default RemittancesTab;
