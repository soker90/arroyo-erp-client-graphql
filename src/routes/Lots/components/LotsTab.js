import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
} from 'react-bootstrap';
import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import format from 'components/util/dataFormat';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

class LotsTab extends PureComponent {
  static propTypes = {
    searchLots: PropTypes.func.isRequired,
    lots: PropTypes.object.isRequired,
  };

  state = {
    generationDate: '',
    codLot: '',
  };

  lotTableProps = {
    striped: true,
    hover: true,
    pagination: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    options: {
      onRowClick: row => this.handleRowClick(row),
    },
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.codLot && !this.state.generationDate) {
      return;
    }

    const body = {
      generationDate: this.state.generationDate || null,
      codLot: this.state.codLot,
    };
    this.props.searchLots(body);
  };

  handleRowClick = row => {
    browserHistory.push(`${BASE_PATH}/finance/operations/lot/${row.codLot}`);
  };

  clearForm() {
    this.setState({generationDate: '', codLot: ''});
  }

  render() {
    const lots = this.props.lots.toJS();
    const {generationDate, codLot} = this.state;

    return (
      <Container className="tab-body">
        <Row>
          <InfoPanel xs={12} static title="Consultar lotes">
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
                <ControlLabel>Código Lote</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  name="codLot"
                  value={codLot}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <label className="control-label">&nbsp;</label>
                    <Button bsStyle="primary" type="submit">
                      Buscar lotes
                    </Button>
                    <Button
                      bsStyle="danger"
                      type="reset"
                      onClick={() => this.clearForm()}
                    >
                      Limpiar
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </InfoPanel>

          <InfoPanel xs={12} static title={`Lotes (${lots.length})`}>
            <BootstrapTable
              data={lots}
              {...this.lotTableProps}
              pagination={lots.length > 10}
            >
              <TableHeaderColumn dataField="lotId" dataSort isKey hidden>
                Código Lote
              </TableHeaderColumn>
              <TableHeaderColumn dataField="codLot" dataSort>
                Código Lote
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="generationDate"
                dataSort
                dataFormat={format.dateShort}
              >
                Fecha de generación
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="loanPaymentDate"
                dataSort
                dataFormat={format.dateShort}
              >
                Fecha abono
              </TableHeaderColumn>
              <TableHeaderColumn dataField="numberPaymentsIncluded" dataSort>
                Número de transferencias
              </TableHeaderColumn>
              <TableHeaderColumn dataField="operationCod" dataSort>
                Código de operación
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="totalAmount"
                dataFormat={format.euro}
                dataAlign="right"
                dataSort
              >
                Importe
              </TableHeaderColumn>
            </BootstrapTable>
          </InfoPanel>
        </Row>
      </Container>
    );
  }
}

export default LotsTab;
