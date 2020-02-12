import React, {memo} from 'react';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import {useStyles} from './AlbaranesProvider.styles';
import AlbaranesProviderTable from './AlbaranesProviderTable';

const AlbaranesProvider = () => {
  const classes = useStyles();

  return <ContainerTab>
    <HeaderGeneric category='Albaranes' title='Listado de albaranes'/>
    <DividerTab/>
    <ContentTab>
      <AlbaranesProviderTable/>
    </ContentTab>
  </ContainerTab>;
};

AlbaranesProvider.propTypes = {};

AlbaranesProvider.displayName = 'AlbaranesProvider';

export default memo(AlbaranesProvider);
