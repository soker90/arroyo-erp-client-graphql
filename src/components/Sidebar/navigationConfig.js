import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import AddIcon from '@material-ui/icons/Add';


const BASE_PATH = process.env.REACT_APP_ROUTER_BASE_PATH;

// label: () => <Label color={colors.green[500]}>New</Label>,


const p3 = {
  title: 'P3',
  icon: CloudUploadOutlinedIcon,
  href: `${BASE_PATH}/p3/`,
  children: [
    {
      title: 'Importar CSV',
      icon: PublishOutlinedIcon,
      href: `${BASE_PATH}/p3/import`,
    },
  ],
};

const settings = {
  title: 'Configuración',
  icon: SettingsOutlinedIcon,
  href: `${BASE_PATH}/settings/`,
  children: [
    {
      title: 'Permisos',
      icon: TuneOutlinedIcon,
      href: `${BASE_PATH}/settings/permissions`,
    },
    {
      title: 'Permisos Globales',
      icon: SupervisorAccountOutlinedIcon,
      href: `${BASE_PATH}/permissions/management`,
    },
    {
      title: 'Usuarios',
      icon: FaceOutlinedIcon,
      href: `${BASE_PATH}/settings/user/management`,
    },
  ],
};

const invoice = {
  title: 'Facturas',
  href: `${BASE_PATH}/factura/`,
  icon: PaymentOutlinedIcon,
  children: [
    {
      title: 'Proveedores',
      icon: ListAltOutlinedIcon,
      href: `${BASE_PATH}/factura/proveedores/`,
    },
  ],
};


const providers = {
  title: 'Proveedores',
  href: `${BASE_PATH}/proveedor/`,
  icon: PaymentOutlinedIcon,
  children: [
    {
      title: 'Listado de provedores',
      icon: ListAltOutlinedIcon,
      href: `${BASE_PATH}/proveedor/listado/`,
    },
  ],
};


const deliveryOrder = {
  title: 'Albaranes',
  href: `${BASE_PATH}/albaranes/`,
  icon: PaymentOutlinedIcon,
  children: [
    {
      title: 'Albaranes',
      icon: ListAltOutlinedIcon,
      href: `${BASE_PATH}/albaranes/proveedores`,
    },
    {
      title: 'Nuevo',
      icon: AddIcon,
      href: `${BASE_PATH}/albaranes/nuevo`,
    },
  ],
};

export const getConfigSidebar = [
  {
    pages: [
      providers,
      invoice,
      deliveryOrder,
    ],
  },
  {
    title: 'Soporte',
    pages: [
      p3,
      settings,
    ],
  },
];
