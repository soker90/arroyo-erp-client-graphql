import search from 'routes/Search/modules';
import amortizations from 'routes/Amortizations/modules/amortizations';
import importClient from 'routes/ImportClient/modules/import-client';
import paymentApplication from 'routes/PaymentApplication/modules';
import refinance from 'routes/Refinance/modules/refinance';
import calendar from 'routes/Calendar/modules/calendar';
import wallet from 'routes/Wallet/modules/wallet';
import returns from 'routes/Returns/modules/returns';
import mailing from 'routes/Mailing/modules/mailing';
import claims from 'routes/Claims/modules/claims';
import reunifications from 'routes/Reunifications/modules';
import reunification from 'routes/Reunification/modules/reunification';
import receipt from 'routes/Receipt/modules';
import receipts from 'routes/Receipts/modules/receipts';
import erp from 'routes/Erp/modules/erp';
import remittances from 'routes/Remittances/modules/remittances';
import remittance from 'routes/Remittance/modules/remittance';
import tabs from 'components/Tabs/modules/tabs';
import conciliation from 'routes/Conciliation/modules/conciliation';
import client from 'routes/Client/modules';
import lots from 'routes/Lots/modules/lots';
import lot from 'routes/Lot/modules/lot';
import templates from 'routes/Templates/modules';

export default {
  tabs,
  search,
  conciliation,
  paymentApplication,
  lots,
  lot,
  remittances,
  remittance,
  receipts,
  receipt,
  erp,
  amortizations,
  client,
  importClient,
  refinance,
  calendar,
  wallet,
  returns,
  mailing,
  claims,
  reunifications,
  reunification,
  templates,
};
