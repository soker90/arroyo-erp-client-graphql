import format from 'components/util/dataFormat';
import {getReceiptStatus} from './';

const generateColumn1 = receipt =>
  [
    ['Pago', receipt.paymentNumber],
    ['Estado', getReceiptStatus(receipt.statusCod)],
    ['Fecha de abono', receipt.paymentDate],
    ['Último cambio', format.dateShort(receipt.lastChangeDate)],
    ['Fecha de vencimiento', format.dateShort(receipt.maturityDate)],
  ];

const generateColumn2 = receipt =>
  [
    ['Importe total', format.euro(receipt.receiptAmount)],
    ['Interés', format.euro(receipt.interestAmount)],
    ['Intereses de demora', format.euro(receipt.delayInterest)],
    ['TIN', format.percent(receipt.tin)],
    ['TAE', format.percent(receipt.tae)],
  ];

const generateColumn3 = receipt =>
  [
    ['Recibo', receipt.codReceipt],
    ['Capital pendiente', format.euro(receipt.pendingCapital)],
    ['Amortización', format.euro(receipt.amortisation)],
    ['Comisión de demora', format.euro(receipt.arrearsFee)],
    ['Comisiónes', format.euro(receipt.fees)],
  ];

export const generateColumns = receipt => [
  generateColumn1(receipt),
  generateColumn2(receipt),
  generateColumn3(receipt),
];
