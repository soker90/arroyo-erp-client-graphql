import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import {useStyles} from './Provider.styles';
import {Grid} from '@material-ui/core';
import ProviderInfo from './ProviderInfo';
import ProviderStats from './ProviderStats';
import ProviderAlbaranTable from './ProviderAlbaranTable';
import ProviderInvoiceTable from './ProviderInvoiceTable';

const Provider = props => {
  const classes = useStyles();
  console.log(props);
  useEffect(() => {
    props.getProvider(props.match.params.id);
  }, [props.getProvider]);

  return <ContainerTab>
    <HeaderGeneric category='Proveedores' title='La abuela'/>
    <DividerTab/>
    <ContentTab>
      <Grid container spacing={3}>
        <ProviderInfo name='La abuela' address='C/Alcantarilal, 3' email='abuela@abuela.es' phone='926926926'/>
        <ProviderStats name='8' address='C/Alcantarilal, 3' email='abuela@abuela.es' phone='926926926'/>
      </Grid>
      <ProviderInvoiceTable/>
      <ProviderAlbaranTable/>
    </ContentTab>
  </ContainerTab>;
};

Provider.propTypes = {
  getProvider: PropTypes.func.isRequired,
};

Provider.displayName = 'Provider';

export default memo(Provider);
