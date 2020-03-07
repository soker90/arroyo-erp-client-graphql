import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import {useStyles} from './Provider.styles';
import ProviderInfo from './ProviderInfo';
import ProviderStats from './ProviderStats';
import ProviderAlbaranTable from './ProviderAlbaranTable';
import ProviderInvoiceTable from './ProviderInvoiceTable';
import ProviderProductTable from './ProviderProductTable';

const Provider = (
  {
    provider, match, getProvider, activeTab: {id: tabId}, showEditProviderModal, products,
    showEditProductModal,
  }) => {
  const classes = useStyles();
  useEffect(() => {
    getProvider(match.params.id, tabId);
  }, [tabId, match.params.id]);

  return <ContainerTab>
    <HeaderGeneric category='Proveedores' title={provider.name}/>
    <DividerTab/>
    <ContentTab>
      <Grid container spacing={3}>
        <ProviderInfo
          showEditProviderModal={showEditProviderModal}
          {...provider}
        />
        <ProviderStats name='8' address='C/Alcantarilal, 3' email='abuela@abuela.es' phone='926926926'/>
      </Grid>
      <ProviderInvoiceTable/>
      <ProviderAlbaranTable/>
      <ProviderProductTable products={products} showEditProductModal={showEditProductModal}/>
    </ContentTab>
  </ContainerTab>;
};

Provider.propTypes = {
  getProvider: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
  showEditProviderModal: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  showEditProductModal: PropTypes.func.isRequired,
};

Provider.displayName = 'Provider';

export default memo(Provider);
