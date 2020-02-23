import React, {memo} from 'react';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric} from 'components';
import Typography from '@material-ui/core/Typography';

const Dashboard = props => {

  return <ContainerTab>
    <HeaderGeneric title='Panel de inicio'/>
    <DividerTab/>
    <ContentTab>
      <Typography component='h5'>
        Inicio
      </Typography>
    </ContentTab>
  </ContainerTab>;
};

Dashboard.propTypes = {};

Dashboard.displayName = 'Dashboard';

export default memo(Dashboard);
