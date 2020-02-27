import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';

import {ContainerTab, ContentTab, DividerTab, HeaderGeneric, TableMaterial} from 'components';
import AddIcon from '@material-ui/icons/Add';
import {useStyles} from './Providers.styles';
import {navigateTo} from 'utils';

const Providers = ({providers, getProviders}) => {
  const classes = useStyles();
  useEffect(() => {
    getProviders();
  }, [getProviders]);

  const _onRowClick = (event, row) => {
    navigateTo(`proveedor/${row._id}`)
  };

  return <ContainerTab>
    <HeaderGeneric category='Proveedores' title='Listado de proveedores'/>
    <DividerTab/>
    <ContentTab>
      <TableMaterial
        className={classes.table}
        columns={[
          {field: '_id', hidden: true},
          {title: 'Nombre', field: 'name'},
        ]}
        data={providers}
        title={`Proveedores (${providers.length})`}
        onRowClick={_onRowClick}
        actions={[
          {
            icon: AddIcon,
            tooltip: 'Nuevo proveedor',
            isFreeAction: true,
            onClick: () => {
            },
          },
        ]}
      />
    </ContentTab>
  </ContainerTab>;
};

Providers.propTypes = {
  getProviders: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
};

Providers.displayName = 'Providers';

export default memo(Providers);
