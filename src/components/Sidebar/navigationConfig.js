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
import {USER_PERMISSIONS} from '../../utils/user-permissions';

const BASE_PATH = process.env.NERA_ROUTER_BASE_PATH;

// label: () => <Label color={colors.green[500]}>New</Label>,

const customerCare = {
  title: 'Atención al cliente',
  href: `${BASE_PATH}/customercare/`,
  icon: PhoneOutlinedIcon,
  permissions: [
    USER_PERMISSIONS.SEARCH_CLIENTS_READ,
    USER_PERMISSIONS.AMORTIZATIONS_READ,
    USER_PERMISSIONS.REUNIFICATIONS_READ,
    USER_PERMISSIONS.PAYMENT_APPLICATION_READ,
    USER_PERMISSIONS.TEMPLATES_READ,
  ],
  children: [
    {
      title: 'Buscar clientes',
      icon: SearchIcon,
      href: `${BASE_PATH}/search`,
      permission: USER_PERMISSIONS.SEARCH_CLIENTS_READ,
    },
    {
      title: 'Aplicación de Pagos',
      icon: CheckIcon,
      href: `${BASE_PATH}/customercare/paymentapplication`,
      permission: USER_PERMISSIONS.PAYMENT_APPLICATION_READ,
    },
    {
      title: 'Amortizaciones',
      icon: WhatshotIcon,
      href: `${BASE_PATH}/customercare/amortizations`,
      permission: USER_PERMISSIONS.AMORTIZATIONS_READ,
    },
    {
      title: 'Reunificaciones',
      icon: LinkIcon,
      href: `${BASE_PATH}/customercare/reunifications`,
      permission: USER_PERMISSIONS.REUNIFICATIONS_READ,
    },
    {
      title: 'Recargas',
      icon: CachedIcon,
      href: `${BASE_PATH}/customercare/reloads`,
      permission: USER_PERMISSIONS.RELOADS_READ,
    },
    {
      title: 'Plantillas',
      icon: ImportContactsOutlinedIcon,
      href: `${BASE_PATH}/customercare/templates`,
      permission: USER_PERMISSIONS.TEMPLATES_READ,
      label: () => <Label color={colors.green[500]}>Nuevo</Label>,
    },
  ],
};

const finance = {
  title: 'Finanzas',
  href: `${BASE_PATH}/finance/`,
  icon: PaymentOutlinedIcon,
  permissions: [
    USER_PERMISSIONS.CONCILIATION_READ,
    USER_PERMISSIONS.REMITTANCES_READ,
    USER_PERMISSIONS.LOTS_READ,
    USER_PERMISSIONS.ERP_EXECUTE_EDIT,
    USER_PERMISSIONS.RECEIPTS_READ,
  ],
  children: [
    {
      title: 'Conciliacion',
      icon: WrapTextOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/conciliation`,
      permission: USER_PERMISSIONS.CONCILIATION_READ,
    },
    {
      title: 'Lotes',
      icon: LibraryBooksOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/lots`,
      permission: USER_PERMISSIONS.LOTS_READ,
    },
    {
      title: 'Remesas',
      icon: FormatAlignJustifyOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/remittances`,
      permission: USER_PERMISSIONS.REMITTANCES_READ,
    },
    {
      title: 'Recibos',
      icon: ListAltOutlinedIcon,
      href: `${BASE_PATH}/finance/operations/receipts`,
      permission: USER_PERMISSIONS.RECEIPTS_READ,
    },
    {
      title: 'ERP',
      icon: BusinessCenterOutlinedIcon,
      href: `${BASE_PATH}/finance/accounting/erp`,
      permission: USER_PERMISSIONS.ERP_EXECUTE_EDIT,
    },
  ],
};


const collections = {
  title: 'Recobros',
  href: `${BASE_PATH}/collections/`,
  icon: EuroOutlinedIcon,
  permissions: [
    USER_PERMISSIONS.CALENDAR_READ,
    USER_PERMISSIONS.WALLET_READ,
    USER_PERMISSIONS.REFINANCE_READ,
    USER_PERMISSIONS.JUDICIAL_READ,
    USER_PERMISSIONS.RETURNS_READ,
    USER_PERMISSIONS.EMAIL_READ,
  ],
  children: [
    {
      title: 'Agenda',
      href: `${BASE_PATH}/collections/calendar`,
      icon: DateRangeOutlinedIcon,
      permission: USER_PERMISSIONS.CALENDAR_READ,
    },
    {
      title: 'Cartera',
      href: `${BASE_PATH}/collections/wallet`,
      icon: WorkOutlinedIcon,
      permission: USER_PERMISSIONS.WALLET_READ,
    },
    {
      title: 'Refinanciación',
      icon: FlashOnOutlinedIcon,
      href: `${BASE_PATH}/collections/refinance`,
      permission: USER_PERMISSIONS.REFINANCE_READ,
    },
    {
      title: 'Judicial',
      icon: GavelOutlinedIcon,
      href: `${BASE_PATH}/collections/judicial`,
      permission: USER_PERMISSIONS.JUDICIAL_READ,
    },
    {
      title: 'Devoluciones',
      icon: SyncProblemOutlinedIcon,
      href: `${BASE_PATH}/collections/returns`,
      permission: USER_PERMISSIONS.RETURNS_READ,
    },
    {
      title: 'Emails',
      icon: DraftsOutlinedIcon,
      href: `${BASE_PATH}/collections/mailing`,
      permission: USER_PERMISSIONS.EMAIL_READ,
    },
  ],
};

const p3 = {
  title: 'P3',
  icon: CloudUploadOutlinedIcon,
  href: `${BASE_PATH}/p3/`,
  permissions: [USER_PERMISSIONS.IMPORT_CSV_EDIT],
  children: [
    {
      title: 'Importar CSV',
      icon: PublishOutlinedIcon,
      href: `${BASE_PATH}/p3/import`,
      permission: USER_PERMISSIONS.IMPORT_CSV_EDIT,
    },
  ],
};

const settings = {
  title: 'Configuración',
  icon: SettingsOutlinedIcon,
  href: `${BASE_PATH}/settings/`,
  permissions: [USER_PERMISSIONS.SEARCH_CLIENTS_READ],
  children: [
    {
      title: 'Permisos',
      icon: TuneOutlinedIcon,
      href: `${BASE_PATH}/settings/permissions`,
      permission: USER_PERMISSIONS.SEARCH_CLIENTS_READ,
    },
    {
      title: 'Permisos Globales',
      icon: SupervisorAccountOutlinedIcon,
      href: `${BASE_PATH}/permissions/management`,
      permission: USER_PERMISSIONS.USERS_READ,
    },
    {
      title: 'Usuarios',
      icon: FaceOutlinedIcon,
      href: `${BASE_PATH}/settings/user/management`,
      permission: USER_PERMISSIONS.USERS_READ,
    },
  ],
};

export default [
  {
    pages: [
      customerCare,
      finance,
      collections,
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
