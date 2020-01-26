import React, {memo, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';
import {
  Form,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
  Row,
} from 'react-bootstrap';
import {Container} from 'components/Container';
import InfoPanel from 'components/InfoPanel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import fb from 'utils/FormatBy.js';
import {statuses} from '../modules/constants';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import {haveMovements} from '../utils/haveMovements';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const parseStatus = status => statuses[status] || 'Sin estado';


const LotView =
  memo(({
          match: {params: {codLot}},
          lot,
          searchLot,
          setOperationCod, downloadLots,
          getTransfers, transfers,
          downloadLotMovements,
        }) => {
    const [state, setState] = useReducer(
      (state, newState) => ({...state, ...newState}),
      {},
    );

    useEffect(() => {
      if (codLot)
        searchLot(codLot);
    }, [codLot, searchLot]);

    useEffect(() => {
      if (lot.lotId) {
        getTransfers(lot.lotId);
        setState(lot);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lot.lotId, getTransfers]);

    const onRowClick = ({clientId}) => {
      browserHistory.push(`${BASE_PATH}/client/${clientId}`);
    };

    let transfersTableProps = {
      striped: true,
      condensed: true,
      pagination: true,
      trClassName: 'cursor-pointer',
      options: {
        onRowClick,
        defaultSortName: 'transferId',
        defaultSortOrder: 'desc',
      },
    };

    const handleChange = ({target: {name, value}}) => {
      setState({[name]: value});
    };

    const handleSubmit = event => {
      event.preventDefault();
      const {operationCod} = state;

      if (operationCod && lot.lotId) {
        setOperationCod(lot.lotId, operationCod);
      }
    };

    const handleDownload = () => {
      downloadLots(lot.lotId);
    };

    const handleDownloadMovements = () => {
      downloadLotMovements(lot.lotId);
    };

    const {
      numberPaymentsIncluded,
      totalAmount,
      generationDate,
      operationCod,
    } = state;

    const title = `${numberPaymentsIncluded} Transferencia${
      numberPaymentsIncluded === 1 ? '' : 's'
    } - Total ${fb.euro(totalAmount)}`;


    const renderButtonMovements = () =>
      haveMovements(lot) &&
      <FormGroup>
        <label className="control-label">&nbsp;</label>
        <Button bsStyle="primary" onClick={handleDownloadMovements}>
          Descargar Movimientos
        </Button>
      </FormGroup>;

    return (
      <Container className="tab-body">
        <HasPermission access={USER_PERMISSIONS.LOTS_READ}>
          <Row>
            <InfoPanel xs={12} static title={`Detalle del Lote: ${lot.lotId}`}>
              <div className="nera_data">
                <div className="data_row">
                  <span className="data_title">Fecha de generación:</span>
                  <span className="data_content">{generationDate}</span>
                </div>
                <div className="data_row">
                  <span className="data_title">Codigo de lote:</span>
                  <span className="data_content">{codLot}</span>
                </div>
              </div>
            </InfoPanel>
          </Row>
          <HasPermission access={USER_PERMISSIONS.LOTS_EDIT}>
            <Row>
              <InfoPanel xs={12} static title="Operaciones">
                <Form inline onSubmit={handleSubmit}>
                  <FormGroup
                    validationState={!operationCod ? 'error' : 'success'}
                  >
                    <ControlLabel>Código de operación</ControlLabel>
                    <FormControl
                      autoFocus
                      type="text"
                      name="operationCod"
                      value={operationCod || ''}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="control-label">&nbsp;</label>
                    <Button bsStyle="success" type="submit">
                      Asignar
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <label className="control-label">&nbsp;</label>
                    <Button bsStyle="primary" onClick={handleDownload}>
                      Descargar
                    </Button>
                  </FormGroup>
                  {renderButtonMovements()}
                </Form>
              </InfoPanel>
            </Row>
          </HasPermission>
          <Row>
            <InfoPanel xs={12} static title={title}>
              <BootstrapTable
                data={transfers}
                {...transfersTableProps}
              >
                <TableHeaderColumn dataField="transferId" dataSort isKey>
                  ID Transferencia
                </TableHeaderColumn>
                <TableHeaderColumn dataField="codTransfer" dataSort>
                  Código de transferencia
                </TableHeaderColumn>
                <TableHeaderColumn dataField="clientId" dataSort>
                  ID Cliente
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataSort>
                  Nombre
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="transferAmount"
                  dataSort
                  dataAlign="right"
                  dataFormat={fb.euro}
                >
                  Importe
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="transferDate"
                  dataSort
                  dataFormat={fb.dateShort}
                >
                  Fecha de transferencia
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="transferStatusId"
                  dataFormat={parseStatus}
                  dataSort
                >
                  Estado
                </TableHeaderColumn>
              </BootstrapTable>
            </InfoPanel>
          </Row>
        </HasPermission>
      </Container>
    );
  })
;

LotView.propTypes = {
  lot: PropTypes.object.isRequired,
  transfers: PropTypes.array.isRequired,
  setOperationCod: PropTypes.func.isRequired,
  getTransfers: PropTypes.func.isRequired,
  searchLot: PropTypes.func.isRequired,
  downloadLots: PropTypes.func.isRequired,
};

export default LotView;
