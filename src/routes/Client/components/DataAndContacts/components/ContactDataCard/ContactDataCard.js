import React, {memo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Card,
  CardContent,
  CardHeader, colors, Divider, Grid,
  List,
  Typography,
} from '@material-ui/core';

import {USER_PERMISSIONS} from 'utils/user-permissions';
import ItemCard from '../ItemCard';
import {Label} from 'components';
import {TYPE} from './constants';
import FooterDataCard from '../FooterDataCard';
import {useStyles} from './ContactDataCard.styles';


const ContactDataCard = memo(({email, mobile, address, zipCode, province, city, countryResidence, countryBirth, className, type, showModalModifyContactData, ...rest}) => {
  const classes = useStyles();

  const _showModalEdit = () => {
    showModalModifyContactData(type);
  };

  /**
   * Render type of contact Data { Primary | Secondary}
   * @param {string} label
   * @param {string} color
   * @returns {Label}
   * @private
   */
  const _renderTag = (label, color) =>
    <Label
      color={color}
    >
      {label}
    </Label>;

  return (
    <Grid
      item
      lg={4}
      lx={4}
      md={6}
      xs={12}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          className={classes.header}
          disableTypography
          title={
            <Typography
              display="block"
              variant="h4"
            >
              Datos de Contacto
            </Typography>
          }
          subheader={
            type === TYPE.PRIMARY ?
              _renderTag('Primaria', colors.green[600]) :
              _renderTag('Secundaria', colors.red[900])
          }
        />
        <CardContent className={classes.content}>
          <List>
            <ItemCard label='Email' value={email}/>
            <ItemCard label='Móvil' value={mobile}/>
            <ItemCard label='Dirección' value={address}/>
            <ItemCard label='Código Postal' value={zipCode}/>
            <ItemCard label='Provincia' value={province}/>
            <ItemCard label='Ciudad' value={city} divider={!!(countryBirth || countryResidence)}/>
            {countryResidence &&
            <ItemCard label='País de residencia' value={countryResidence} divider={!!countryBirth}/>}
            {countryBirth && <ItemCard label='País de nacimiento' value={countryBirth} divider={false}/>}
          </List>
          <Divider/>
          <FooterDataCard
            permissionEdit={USER_PERMISSIONS.CONTACT_DATA_EDIT}
            showModalEdit={_showModalEdit}
          />
        </CardContent>
      </Card>
    </Grid>
  );
});

ContactDataCard.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string,
  address: PropTypes.string,
  zipCode: PropTypes.string,
  province: PropTypes.string,
  city: PropTypes.string,
  countryResidence: PropTypes.string,
  countryBirth: PropTypes.string,
  type: PropTypes.number.isRequired,
  showModalModifyContactData: PropTypes.func.isRequired,
};

ContactDataCard.displayName = 'ContactDataCard';

export default ContactDataCard;
