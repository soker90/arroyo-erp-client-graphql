import {TABS} from '../constants';

const isHaveDataRecovery = recovery => !!recovery?.aliveDebt;

export const getTabList = recovery => {
  let tabs = [{value: TABS.PERSONAL_DATA, label: 'Datos personales'}];
  isHaveDataRecovery(recovery) && tabs.push({value: TABS.PAYMENTS, label: 'Impagos'});
  tabs.push(
    {value: TABS.COMMUNICATIONS, label: 'Comunicaciones'},
    {value: TABS.CONTRACTS, label: 'Contratos'},
  );

  return tabs;

};