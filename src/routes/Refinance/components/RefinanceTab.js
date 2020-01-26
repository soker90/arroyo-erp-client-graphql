// eslint-disable-next-line
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row, Col, Panel} from 'react-bootstrap';
import RefRow from './Row';

class RefinanceTab extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    refinanceds: PropTypes.array.isRequired,
    recoverFilter: PropTypes.array.isRequired,
  };

  state = {
    filter: 'all',
    rowData: null,
  };

  refinanceClientTableProps = {
    striped: true,
    hover: true,
    condensed: true,
    trClassName: 'cursor-pointer',
    height: 'auto',
    pagination: true,
    selectRow: {
      mode: 'radio',
      clickToSelect: true,
      className: 'row-selected',
      onSelect: row => this.selectClient(row),
    },
  };

  selectClient(rowData) {
    this.setState({rowData});
  }

  handleTableFilters = filter => {
    this.setState({filter});
  };

  renderBlock = (title, content) => {
    return <RefRow title={title} content={content || '--'} />;
  };

  filterData = data =>
    data.filter(owner =>
      this.state.filter === 'all'
        ? owner
        : !owner.type.indexOf(this.state.filter)
    );
  dni = (cell, row) => row.clientDto.dni;
  tipoContrato = (cell, row) => row.clientDto.tipoContrato;
  name = (cell, row) => row.clientDto.name;
  lastname = (cell, row) => row.clientDto.lastname;
  totalUnpaidBalance = (cell, row) => row.clientDto.totalUnpaidBalance;

  render() {
    const {rowData} = this.state;
    const {className, refinanceds} = this.props;

    return (
      <div>
        <Row style={{margin: '0 .1em'}}>
          <Panel
            header={`Clientes refinanciados (${refinanceds.length})`}
            className={className}
          >
            <BootstrapTable
              {...this.refinanceClientTableProps}
              data={this.filterData(refinanceds)}
            >
              <TableHeaderColumn hidden isKey dataField="clientId" />
              <TableHeaderColumn dataField="dni" dataFormat={this.dni} dataSort>
                DNI
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="tipoContrato"
                dataFormat={this.tipoContrato}
                dataSort
              >
                Tipo Contrato
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="name"
                dataFormat={this.name}
                dataSort
              >
                Nombre
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="lastname"
                dataFormat={this.lastname}
                dataSort
              >
                Apellidos
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="totalUnpaidBalance"
                dataFormat={this.totalUnpaidBalance}
                dataSort
              >
                Balance Deuda
              </TableHeaderColumn>
            </BootstrapTable>
          </Panel>
        </Row>
        {rowData && (
          <Row style={{margin: '0 .1em'}}>
            <Panel header={`Cliente ${rowData.clientDto.clientId}`}>
              <Col xs={6}>
                <div className="nera_data">
                  {this.renderBlock('Dias de deuda', rowData.debtDays)}
                  {this.renderBlock(
                    'Deuda Amortizada',
                    rowData.amortisationDebt
                  )}
                  {this.renderBlock('Interés deuda', rowData.interestDebt)}
                  {this.renderBlock(
                    'Interés demora',
                    rowData.delayInterestDebt
                  )}
                  {this.renderBlock('Deuda viva', rowData.aliveDebt)}
                  {this.renderBlock('Deuda atrasada', rowData.arreasFeeDebt)}
                  {this.renderBlock('Status Impagado', rowData.unpaidStatus)}
                  {this.renderBlock('Fecha Promesa', rowData.promiseDate)}
                  {this.renderBlock('Siguiente Contacto', rowData.nextProcess)}
                  {this.renderBlock('Deuda reclamada', rowData.demandDebt)}
                </div>
              </Col>
              <Col xs={6}>
                <div className="nera_data">
                  {this.renderBlock('Nombre', rowData.clientDto.name)}
                  {this.renderBlock('Apellidos', rowData.clientDto.lastname)}
                  {this.renderBlock('Email', rowData.clientDto.email)}
                  {this.renderBlock('Teléfono', rowData.clientDto.mobile)}
                  {this.renderBlock('Empleo', rowData.clientDto.empleo)}
                  {this.renderBlock('Regalo', rowData.clientDto.present)}
                  {this.renderBlock(
                    'Tipo Contrato',
                    rowData.clientDto.tipoContrato
                  )}
                </div>
              </Col>
            </Panel>
          </Row>
        )}
      </div>
    );
  }
}

export default RefinanceTab;
