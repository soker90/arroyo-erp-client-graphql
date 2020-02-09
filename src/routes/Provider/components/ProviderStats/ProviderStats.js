import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardHeader, Divider, Grid, IconButton, List, Tooltip} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {ItemCard} from 'components';
import {useStyles} from './ProviderStats.styles';

const ProviderStats = (
  {
    name, address, phone, email,
  }) => {
  const classes = useStyles();

  const _renderEditButton = () =>
    <Tooltip title='Editar infomación'>
      <IconButton size="small" className={classes.button} onClick={() => {
        console.log('click')
      }}>
        <EditIcon/>
      </IconButton>
    </Tooltip>;
  return (
    <Grid
      item
      md={6}
      xs={12}
    >
      <Card
        className={classes.root}
      >
        <CardHeader
          action={_renderEditButton()}
          title='Datos de interés'
        />
        <Divider className={classes.divider}/>
        <CardContent className={classes.content}>
          <List>
            <ItemCard label='Número de pedidos' value={name}/>
            <ItemCard label='Dirección' value={address}/>
            <ItemCard label='Teléfono' value={phone}/>
            <ItemCard label='Correo electrónico' value={email} divider={false}/>
          </List>
          <Divider/>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProviderStats.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};

ProviderStats.displayName = 'ProviderStats';

export default memo(ProviderStats);
