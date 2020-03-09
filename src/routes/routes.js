import createTabComponent from 'components/Tabs/create-tab-component';
import Provider from './Provider';
import Providers from './Providers';
import ProviderInvoices from './InvoicesProvider';
import AlbaranesProvider from './AlbaranesProvider';
import Dashboard from './Dashboard';
import NewAlbaran from './NewAlbaran';

function createRoute({path, tabName, component}) {
  const tab = {
    name: tabName,
    link: path,
    id: path,
    title: tabName,
  };
  const WrappedComponent = createTabComponent(tab, component);

  return {
    path,
    component: WrappedComponent,
  };
}

const createRoutes = () =>
  Object.keys(routes).map(path =>
    createRoute({path, ...routes[path]}),
  );

const routes = {
  'proveedor/listado': {
    tabName: 'Proveedores',
    component: Providers,
  },
  'proveedor/:id': {
    tabName: 'Proveedor',
    component: Provider,
  },
  'factura/proveedores': {
    tabName: 'Facturas',
    component: ProviderInvoices,
  },
  'albaranes/proveedores': {
    tabName: 'Albaranes',
    component: AlbaranesProvider,
  },
  'albaranes/nuevo': {
    tabName: 'Nuevo Albarán',
    component: NewAlbaran,
  },
  'inicio': {
    tabName: 'Inicio',
    component: Dashboard,
  },
};

export default createRoutes();
