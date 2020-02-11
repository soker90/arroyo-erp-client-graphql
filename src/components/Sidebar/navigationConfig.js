import React from 'react';
import {colors} from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import CheckIcon from '@material-ui/icons/Check';
import LinkIcon from '@material-ui/icons/Link';
import CachedIcon from '@material-ui/icons/Cached';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import WrapTextOutlinedIcon from '@material-ui/icons/WrapTextOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import FormatAlignJustifyOutlinedIcon from '@material-ui/icons/FormatAlignJustifyOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import WorkOutlinedIcon from '@material-ui/icons/WorkOutlined';
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import SyncProblemOutlinedIcon from '@material-ui/icons/SyncProblemOutlined';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';

import {Label} from 'components';

const BASE_PATH = process.env.ARROYO_ROUTER_BASE_PATH;

// label: () => <Label color={colors.green[500]}>New</Label>,

const customerCare = {
  title: 'Atención al cliente',
  href: `${BASE_PATH}/customercare/`,
  icon: PhoneOutlinedIcon,

  children: [
    {
      title: 'Buscar clientes',
      icon: SearchIcon,
      href: `${BASE_PATH}/search`,
    },
    {
      title: 'Aplicación de Pagos',
      icon: CheckIcon,
      href: `${BASE_PATH}/customercare/paymentapplication`,
    },
    {
      title: 'Amortizaciones',
      icon: WhatshotIcon,
      href: `${BASE_PATH}/customercare/amortizations`,
    },
    {
      title: 'Reunificaciones',
      icon: LinkIcon,
      href: `${BASE_PATH}/customercare/reunifications`,
    },
    {
      title: 'Recargas',
      icon: CachedIcon,
      href: `${BASE_PATH}/customercare/reloads`,
    },
    {
      title: 'Plantillas',
      icon: ImportContactsOutlinedIcon,
      href: `${BASE_PATH}/customercare/templates`,
      label: () => <Label color={colors.green[500]}>Nuevo</Label>,
    },
  ],
};

const finance = {
  title: 'Finanzas',
  href: `${BASE_PATH}/finance/`,
  icon: PaymentOutlinedIcon,
  children: [
    {
      title: 'Conciliacion',
      icon: WrapTextOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/conciliation`,
    },
    {
      title: 'Lotes',
      icon: LibraryBooksOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/lots`,
    },
    {
      title: 'Remesas',
      icon: FormatAlignJustifyOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/remittances`,
    },
    {
      title: 'Recibos',
      icon: ListAltOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/receipts`,
    },
    {
      title: 'ERP',
      icon: BusinessCenterOutlinedIcon,
      href: `${BASE_PATH}/finance/accounting/erp`,
    },
  ],
};

const collections = {
  title: 'Recobros',
  href: `${BASE_PATH}/collections/`,
  icon: EuroOutlinedIcon,
  children: [
    {
      title: 'Agenda',
      href: `${BASE_PATH}/collections/calendar`,
      icon: DateRangeOutlinedIcon,
    },
    {
      title: 'Cartera',
      href: `${BASE_PATH}/collections/wallet`,
      icon: WorkOutlinedIcon,
    },
    {
      title: 'Refinanciación',
      icon: FlashOnOutlinedIcon,
      href: `${BASE_PATH}/collections/refinance`,
    },
    {
      title: 'Judicial',
      icon: GavelOutlinedIcon,
      href: `${BASE_PATH}/collections/judicial`,
    },
    {
      title: 'Devoluciones',
      icon: SyncProblemOutlinedIcon,
      href: `${BASE_PATH}/collections/returns`,
    },
    {
      title: 'Emails',
      icon: DraftsOutlinedIcon,
      href: `${BASE_PATH}/collections/mailing`,
    },
  ],
};

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
      title: 'Ejemplo',
      icon: ListAltOutlinedIcon,
      href: `${BASE_PATH}/proveedor`,
    },
  ],
};

export default [
  {
    pages: [
      providers,
      invoice,
      //customerCare,
      //finance,
      //collections,
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
