import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import {useStyles} from './Provider.styles';
import ProviderInfo from './ProviderInfo';
import ProviderStats from './ProviderStats';
import ProviderAlbaranTable from './ProviderAlbaranTable';
import ProviderInvoiceTable from './ProviderInvoiceTable';

const Provider = ({provider, match, getProvider, activeTab: {id: tabId}}) => {
  const classes = useStyles();
  useEffect(() => {
    getProvider(match.params.id, tabId);
  }, [tabId, match.params.id]);

  return <ContainerTab>
    <HeaderGeneric category='Proveedores' title={provider.name}/>
    <DividerTab/>
    <ContentTab>
      <Grid container spacing={3}>
        <ProviderInfo name={provider.name} address={provider.address} email={provider.email} phone={provider.phone}/>
        <ProviderStats name='8' address='C/Alcantarilal, 3' email='abuela@abuela.es' phone='926926926'/>
      </Grid>
      <ProviderInvoiceTable/>
      <ProviderAlbaranTable/>
    </ContentTab>
  </ContainerTab>;
};

Provider.propTypes = {
  getProvider: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
};

Provider.displayName = 'Provider';

export default memo(Provider);
