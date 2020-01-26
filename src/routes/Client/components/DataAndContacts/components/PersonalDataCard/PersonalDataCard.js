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

import {useStyles} from './PersonalDataCard.styles';
import {USER_PERMISSIONS} from 'utils/user-permissions';
import ItemCard from '../ItemCard/ItemCard';
import format from 'components/util/dataFormat';
import FooterDataCard from '../FooterDataCard';
import {Label} from 'components';


const PersonalDataCard = memo((
  {
    name, lastname, dni, clientId, clientIdOrigin, birthday, sex, className,
    cotitular, showModalPersonalData, showModalDNI, getDNIImages, ...rest
  }) => {
  const classes = useStyles();

  const _showModalEdit = () => {
    showModalPersonalData();
  };

  const _showModalDni = () => {
    getDNIImages(clientIdOrigin || clientId);
    showModalDNI(cotitular);
  };

  /**
   * Render if is Cotitular
   * @returns {Label}
   * @private
   */
  const _renderTagCotitular = () =>
    <Label
      color={colors.red[900]}
    >
      Cotitular
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
              Datos Personales
            </Typography>
          }
          subheader={
            cotitular && _renderTagCotitular()
          }
        />
        <CardContent className={classes.content}>
          <List>
            <ItemCard label='Nombre' value={`${name} ${lastname}`}/>
            <ItemCard label='Client ID' value={clientId}/>
            <ItemCard label='DNI' value={dni}/>
            <ItemCard label='Edad' value={format.age(birthday)} divider={!!sex}/>
            {sex && <ItemCard label='Sexo' value={sex} divider={false}/>}
          </List>
          <Divider/>
          <FooterDataCard
            permissionEdit={USER_PERMISSIONS.PERSONAL_DATA_EDIT}
            showModalEdit={!cotitular && _showModalEdit}
            showModalDni={_showModalDni}
          />
        </CardContent>
      </Card>
    </Grid>
  );
});

PersonalDataCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  lastname: PropTypes.string,
  dni: PropTypes.string,
  clientId: PropTypes.string,
  birthday: PropTypes.string,
  sex: PropTypes.string,
  cotitular: PropTypes.bool,
  showModalPersonalData: PropTypes.func.isRequired,
  getDNIImages: PropTypes.func.isRequired,
};

export default PersonalDataCard;
