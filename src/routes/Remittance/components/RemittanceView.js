import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import browserHistory from 'redux/history';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Row} from 'react-bootstrap';
import InfoPanel from 'components/InfoPanel';
import {Container} from 'components/Container';
import format from 'utils/FormatBy.js';
import {
  Form,
  FormGroup,
  Button,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

import {statuses} from '../modules/constants';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

const parseStatus = status => statuses[status] || 'Sin estado';

const RemittanceView = memo(
  ({
     match: {params: {codRemitance}}, searchRemittance, searchReceipts, setOperationCod, downloadRemittances, receipts,
     remittance: {
       remittanceReceiptsId,
       generationDate,
       codBankOperation,
       statusRemittance,
       numberReceiptIncluded,
       operationCod,
       totalAmount,
     },
   }) => {
    const [operationCodState, setOperationCodState] = useState(operationCod);

    const _handleRowClick = row => {
      browserHistory.push(`${BASE_PATH}/finance/receipt/${row.receiptId}`);
    };

    const _receiptsTableProps = {
      striped: true,
      condensed: true,
      pagination: true,
      csvFileName: 'remittance-receipts' + Date.now() + '.csv',
      trClassName: 'cursor-pointer',
      options: {
        onRowClick: _handleRowClick,
      },
    };

    useEffect(() => {
      codRemitance && searchRemittance({
        codRemitance,
      });
      //eslint-disable-next-line
    }, [codRemitance]);

    useEffect(() => {
      remittanceReceiptsId && searchReceipts({remittance: remittanceReceiptsId})
      //eslint-disable-next-line
    }, [remittanceReceiptsId]);

    const _handleChange = ({target: {value}}) => {
      setOperationCodState(value)
    };

    const _handleSubmit = event => {
      event.preventDefault();
      setOperationCod(remittanceReceiptsId, operationCodState);
    };

    const _handleDownload = () => {
      downloadRemittances(remittanceReceiptsId);
    };


    return (
      <Container className="tab-body">
        <HasPermission access={USER_PERMISSIONS.REMITTANCES_READ}>
          <Row>
            <InfoPanel xs={12} static title={`Remesa: ${remittanceReceiptsId}`}>
              <div className="nera_data">
                <div className="data_row">
                  <span className="data_title">Fecha de generación:</span>
                  <span className="data_content">{generationDate}</span>
                </div>
                <div className="data_row">
                  <span className="data_title">
                    Codigo de operación de banco:
                  </span>
                  <span className="data_content">{codBankOperation}</span>
                </div>
                <div className="data_row">
                  <span className="data_title">Codigo de remesa:</span>
                  <span className="data_content">{codRemitance}</span>
                </div>
                <div className="data_row">
                  <span className="data_title">Estado:</span>
                  <span className="data_content">
                    {statusRemittance?.description}
                  </span>
                </div>
              </div>
            </InfoPanel>
          </Row>
          <HasPermission access={USER_PERMISSIONS.REMITTANCES_EDIT}>
            <Row>
              <InfoPanel static xs={12} title="Operaciones">
                <Form inline onSubmit={_handleSubmit}>
                  <FormGroup
                    className="form-group"
                    validationState={operationCod ? 'success' : 'error'}
                  >
                    <ControlLabel>Código de operación</ControlLabel>
                    <FormControl
                      type="text"
                      name="operationCod"
                      defaultValue={operationCod}
                      onChange={_handleChange}
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
                    <Button bsStyle="primary" onClick={_handleDownload}>
                      Descargar
                    </Button>
                  </FormGroup>
                </Form>
              </InfoPanel>
            </Row>
          </HasPermission>

          <Row>
            <InfoPanel
              xs={12}
              static
              title={`${numberReceiptIncluded} Recibos - Total ${format.euro(
                totalAmount,
              )}`}
            >
              <BootstrapTable
                data={receipts}
                {..._receiptsTableProps}
                pagination={receipts.length > 10}
                exportCSV
              >
                <TableHeaderColumn
                  width="160px"
                  dataField="codReceipt"
                  dataSort
                  isKey
                >
                  Cod.
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
        </HasPermission>
      </Container>
    );
  });

RemittanceView.propTypes = {
  searchReceipts: PropTypes.func.isRequired,
  receipts: PropTypes.array.isRequired,
  remittance: PropTypes.object.isRequired,
  setOperationCod: PropTypes.func.isRequired,
  downloadRemittances: PropTypes.func.isRequired,
};

export default RemittanceView;
