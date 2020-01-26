import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import {TableMaterial} from 'components';
import {useStyles} from './ReceiptsTable.styles';
import format from 'components/util/dataFormat';
import {receiptStatus} from 'constants/receipt';
import {navigateTo, yesOrNo, downloadFile, USER_PERMISSIONS} from 'utils';
import GetAppIcon from '@material-ui/icons/GetApp';
import EmailIcon from '@material-ui/icons/Email';
import {CardHeader, IconButton, Tooltip, Divider} from '@material-ui/core';
import HasPermission from 'components/HasPermission';

const ReceiptsTable = memo(({receipts, contractId, sendAmortizationTable}) => {
  const classes = useStyles();
  /**
   * Handle for clink on row's table
   * @param {Object} event
   * @param {Object} receipt
   * @private
   */
  const _handleRowClick = (event, receipt) => {
    navigateTo(`finance/receipt/${receipt.receiptId}`);
  };

  /**
   * Return literal for the status
   * @param {String} statusCod
   * @returns {string}
   * @private
   */
  const _formatReceiptStatus = statusCod => {
    const status = receiptStatus[statusCod];
    return status || 'Sin estado';
  };

  /**
   * Envia la tabla por email al cliente
   * @private
   */
  const _sendAmortizationTable = () => {
    sendAmortizationTable(contractId);
  };

  /**
   * Descarga el cuadro de amortizaciones
   * @private
   */
  const _downloadTable = () =>
    downloadFile(`/receipt/listReceiptPdf/${contractId}`, `cuadro_amortización_${contractId}.pdf`);

  /**
   * Render all buttons
   * @returns {Fragment}
   * @private
   */
  const _renderButtons = () =>
    <Fragment>
      <HasPermission access={USER_PERMISSIONS.CONTRACTS_TABLE_READ}>
        <Tooltip title="Descargar Tabla">
          <IconButton size="small" className={classes.button} onClick={_downloadTable}>
            <GetAppIcon/>
          </IconButton>
        </Tooltip>
      </HasPermission>
      <HasPermission access={USER_PERMISSIONS.CONTRACTS_TABLE_EDIT}>
        <Tooltip title="Enviar cuadro">
          <IconButton size="small" className={classes.button} onClick={_sendAmortizationTable}>
            <EmailIcon/>
          </IconButton>
        </Tooltip>
      </HasPermission>
    </Fragment>;

  /**
   * Render header card
   * @returns {Fragment}
   * @private
   */
  const _renderHeader = () =>
    <Fragment>
      <CardHeader
        action={_renderButtons()}
        title={<span>Recibos del contrato</span>}
      />
      < Divider/>
    </Fragment>;

  return (
    <TableMaterial
      className={classes.root}
      columns={[
        {title: 'Nº', field: 'paymentNumber', type: 'numeric', defaultSort: 'desc'},
        {title: 'Código', field: 'codReceipt'},
        {title: 'Importe', render: ({receiptAmount}) => format.euro(receiptAmount)},
        {title: 'Capital', render: ({amortisation}) => format.euro(amortisation)},
        {title: 'Interés', render: ({interestAmount}) => format.euro(interestAmount)},
        {title: 'Capital pendiente', render: ({pendingCapital}) => format.euro(pendingCapital)},
        {title: 'Vencimiento', render: ({maturityDate}) => format.dateShort(maturityDate)},
        {title: 'Estado', render: ({statusCod}) => _formatReceiptStatus(statusCod)},
        {title: 'Fecha abono', render: ({paymentDate}) => format.dateShort(paymentDate)},
        {title: 'Titularizado', render: ({titulizated}) => yesOrNo(titulizated)},
        {title: 'receiptId', field: 'receiptId', hidden: true},
      ]}
      data={receipts}
      title={'Recibos del contrato'}
      onRowClick={_handleRowClick}
      options={{
        search: false,
        toolbar: true,
        sorting: true,
      }}
      components={{
        Toolbar: _renderHeader,
      }}
    />
  )
    ;
});

ReceiptsTable.propTypes = {
  receipts: PropTypes.array.isRequired,
  sendAmortizationTable: PropTypes.func.isRequired,
  contractId: PropTypes.number.isRequired,
};

ReceiptsTable.displayName = 'ReceiptsTable';

export default ReceiptsTable;


