import createTabComponent from 'components/Tabs/create-tab-component';
import ROUTE_ROLES from 'utils/route-roles';

import Search from './Search';
import Amortizations from './Amortizations';
import PaymentApplication from './PaymentApplication';
import ImportClient from './ImportClient';
import Client from './Client';
import Conciliation from './Conciliation';
import Lots from './Lots';
import Lot from './Lot';
import Remittances from './Remittances';
import Remittance from './Remittance';
import Receipts from './Receipts';
import Calendar from './Calendar';
import Wallet from './Wallet';
import Refinance from './Refinance';
import Receipt from './Receipt';
import Erp from './Erp';
import Returns from './Returns';
import Mailing from './Mailing';
import Claims from './Claims';
import Reunifications from './Reunifications';
import Reunification from './Reunification';
import Reloads from './Reloads';
import Permissions from './Permissions';
import UserManagement from './UserManagement';
import GlobalPermissions from './GlobalPermissions';
import Templates from './Templates';

import AuthorizeRoute from '../components/AuthorizeRoute';
import NotAllowed from '../components/NotAllowed';

function createRoute({path, tabName, component, permissions}) {
  const tab = {
    name: tabName,
    link: path,
    id: path,
    title: tabName,
    permissions,
  };
  const WrappedComponent = createTabComponent(tab, component);

  return {
    path,
    component: WrappedComponent,
  };
}

function createRoutes() {
  return Object.keys(routes).map(path =>
    createRoute({path, ...routes[path]})
  );
}

const routes = {
  'customercare/amortizations': {
    tabName: 'Amortizaciones',
    component: AuthorizeRoute(
      Amortizations,
      ROUTE_ROLES['customercare/amortizations']
    ),
  },
  search: {
    tabName: 'Buscar clientes',
    component: AuthorizeRoute(Search, ROUTE_ROLES.search, NotAllowed),
  },
  'p3/import': {
    tabName: 'Importar CSV',
    component: AuthorizeRoute(ImportClient, ROUTE_ROLES['p3/import']),
  },
  'client/:clientId': {
    tabName: 'Cliente',
    component: AuthorizeRoute(Client, ROUTE_ROLES['client/:clientId']),
  },
  'customercare/paymentapplication': {
    tabName: 'Aplicación de Pagos',
    component: AuthorizeRoute(
      PaymentApplication,
      ROUTE_ROLES['customercare/paymentapplication']
    ),
  },
  'finance/operations/conciliation': {
    tabName: 'Conciliar',
    component: AuthorizeRoute(
      Conciliation,
      ROUTE_ROLES['finance/operations/conciliation']
    ),
  },
  'finance/operations/lots': {
    tabName: 'Lotes',
    component: AuthorizeRoute(Lots, ROUTE_ROLES['finance/operations/lots']),
  },
  'finance/operations/lot/:codLot': {
    tabName: 'Lote',
    component: AuthorizeRoute(Lot, ROUTE_ROLES['finance/operations/lots']),
  },
  'finance/operations/remittances': {
    tabName: 'Remesas',
    component: AuthorizeRoute(
      Remittances,
      ROUTE_ROLES['finance/operations/remittances']
    ),
  },
  'finance/operations/remittance/:codRemitance': {
    tabName: 'Remesa',
    component: AuthorizeRoute(
      Remittance,
      ROUTE_ROLES['finance/operations/remittances']
    ),
  },
  'finance/operations/receipts': {
    tabName: 'Recibos',
    component: AuthorizeRoute(
      Receipts,
      ROUTE_ROLES['finance/operations/receipts']
    ),
  },
  'finance/accounting/erp': {
    tabName: 'ERP',
    component: AuthorizeRoute(Erp, ROUTE_ROLES['finance/accounting/erp']),
  },
  'finance/receipt/:receiptId': {
    tabName: 'Recibo',
    component: AuthorizeRoute(
      Receipt,
      ROUTE_ROLES['finance/receipt/:receiptId']
    ),
  },
  'collections/calendar': {
    tabName: 'Agenda',
    component: AuthorizeRoute(Calendar, ROUTE_ROLES['collections/calendar']),
  },
  'collections/wallet': {
    tabName: 'Cartera',
    component: AuthorizeRoute(Wallet, ROUTE_ROLES['collections/wallet']),
  },
  'collections/refinance': {
    tabName: 'Refinanciación',
    component: AuthorizeRoute(Refinance, ROUTE_ROLES['collections/refinance']),
  },
  'collections/returns': {
    tabName: 'Devoluciones',
    component: AuthorizeRoute(Returns, ROUTE_ROLES['collections/returns']),
  },
  'collections/mailing': {
    tabName: 'Emails',
    component: AuthorizeRoute(Mailing, ROUTE_ROLES['collections/mailing']),
  },
  'collections/judicial': {
    tabName: 'Judicial',
    component: AuthorizeRoute(Claims, ROUTE_ROLES['collections/judicial']),
  },
  'customercare/reunifications': {
    tabName: 'Reunificaciones',
    component: AuthorizeRoute(
      Reunifications,
      ROUTE_ROLES['customercare/reunifications']
    ),
  },
  'customercare/reunification/:reunificationId': {
    tabName: 'Reunificacion',
    component: AuthorizeRoute(
      Reunification,
      ROUTE_ROLES['customercare/reunification/:reunificationId']
    ),
  },
  'customercare/reloads': {
    tabName: 'Recargas',
    component: AuthorizeRoute(Reloads, ROUTE_ROLES['customercare/reloads']),
  },
  'settings/permissions': {
    tabName: 'Permisos',
    component: AuthorizeRoute(Permissions, ROUTE_ROLES['settings/permissions']),
  },
  'settings/user/management': {
    tabName: 'Usuarios',
    component: AuthorizeRoute(
      UserManagement,
      ROUTE_ROLES['settings/user/management']
    ),
  },
  'permissions/management': {
    tabName: 'Permisos Globales',
    component: AuthorizeRoute(
      GlobalPermissions,
      ROUTE_ROLES['permissions/management']
    ),
  },
  'customercare/templates': {
    tabName: 'Plantillas',
    component: AuthorizeRoute(
      Templates,
      ROUTE_ROLES['customercare/templates']
    ),
  },
};

export default createRoutes();
