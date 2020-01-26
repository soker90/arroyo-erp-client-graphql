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
import FooterDataCard from '../FooterDataCard';
import {useStyles} from './OtherContactCard.styles';


const OtherContactCard = memo((
  {
    email, phone, address, city, comments, clientContactInfoId,
    province, zipcode,
    index, className, showModalModifyOtherContactData, ...rest
  }) => {
  const classes = useStyles();

  const _showModalEdit = () => {
    showModalModifyOtherContactData({email, phone, address, city, comments, province, zipcode, clientContactInfoId})
  };

  /**
   * Render number of contact Data
   * @returns {Label}
   * @private
   */
  const _renderTag = () =>
    <Label
      color={colors.blue[500]}
    >
      Contacto {index}
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
              Contacto Asociado
            </Typography>
          }
          subheader={
            _renderTag()
          }
        />
        <CardContent className={classes.content}>
          <List>
            <ItemCard label='Email' value={email}/>
            <ItemCard label='Teléfono' value={phone}/>
            <ItemCard label='Dirección' value={address}/>
            <ItemCard label='Ciudad' value={city}/>
            <ItemCard label='Provincia' value={province}/>
            <ItemCard label='Código Postal' value={zipcode}/>
            <ItemCard label='Comentarios' value={comments} divider={false}/>
          </List>
          <Divider/>
          <FooterDataCard
            permissionEdit={USER_PERMISSIONS.OTHER_CONTACT_DATA_EDIT}
            showModalEdit={_showModalEdit}
          />
        </CardContent>
      </Card>
    </Grid>
  );
});

OtherContactCard.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  comments: PropTypes.string,
  index: PropTypes.number.isRequired,
};

OtherContactCard.displayName = 'OtherContactCard';

export default OtherContactCard;
