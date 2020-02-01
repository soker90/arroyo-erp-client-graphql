import createTabComponent from 'components/Tabs/create-tab-component';
import Provider from './Provider';

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
  'providers': {
    tabName: 'Proveedores',
    component: Provider,
  },
};

export default createRoutes();
