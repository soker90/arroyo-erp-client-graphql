import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
  CardHeader, Divider, Grid,
  List,
  Typography,
  Avatar,
} from '@material-ui/core';

import {USER_PERMISSIONS} from 'utils/user-permissions';
import ItemCard from '../ItemCard';
import FooterDataCard from '../FooterDataCard';
import {getImageClient} from 'routes/Client/utils';
import {useStyles} from './PrescriberDataCard.styles';


const PrescriberDataCard = memo(({prescriber, reason, showModalPrescriberDetails, ...rest}) => {
  const classes = useStyles();

  const _showModalPrescriberDetails = () => {
    showModalPrescriberDetails();
  };

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
        className={classes.root}
      >
        <CardHeader
          className={classes.header}
          disableTypography
          title={
            <Typography
              display="block"
              variant="h4"
            >
              Datos Prescriptor
            </Typography>
          }
          avatar={
            <Avatar
              alt="Prescriber"
              src={getImageClient(prescriber)}
            />
          }
        />
        <CardContent className={classes.content}>
          <List>
            <ItemCard label='Prescriptor' value={prescriber?.name}/>
            <ItemCard label='Motivo' value={reason} divider={false}/>
          </List>
          <Divider/>
          <FooterDataCard
            permissionEdit={USER_PERMISSIONS.OTHER_CONTACT_DATA_EDIT}
            showModalView={_showModalPrescriberDetails}
          />
        </CardContent>
      </Card>
    </Grid>
  );
});

PrescriberDataCard.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  comments: PropTypes.string,
  index: PropTypes.number.isRequired,
  showModalPrescriberDetails: PropTypes.func.isRequired,
};

PrescriberDataCard.displayName = 'PrescriberDataCard';

export default PrescriberDataCard;
