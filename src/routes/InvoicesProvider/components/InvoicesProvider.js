import React, {memo} from 'react';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import {useStyles} from './InvoicesProvider.styles';
import ProviderInvoiceTable from './ProviderInvoiceTable';

const InvoicesProvider = () => {
  const classes = useStyles();

  return <ContainerTab>
    <HeaderGeneric category='Facturas' title='Listado de facturas'/>
    <DividerTab/>
    <ContentTab>
      <ProviderInvoiceTable/>
    </ContentTab>
  </ContainerTab>;
};

InvoicesProvider.propTypes = {};

InvoicesProvider.displayName = 'Invoice';

export default memo(InvoicesProvider);
