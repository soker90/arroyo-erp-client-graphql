import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, HeaderGeneric, DividerTab} from 'components';
import {useStyles} from './Provider.styles';

const Provider = () => {
  const classes = useStyles();

  return <ContainerTab>
    <HeaderGeneric category='Proveedores' title='Listado de proveedores'/>
    <DividerTab/>
    <ContentTab>

    </ContentTab>
  </ContainerTab>;
};

Provider.propTypes = {
  lots: PropTypes.array.isRequired,
  searchLots: PropTypes.func.isRequired,
};

Provider.displayName = 'Provider';

export default memo(Provider);
