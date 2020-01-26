import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Card} from '@material-ui/core';
import clsx from 'clsx';
import {useStyles} from './PaymentCardWrapper.styles';

const PaymentCardWrapper = ({className, children, ...rest}) => {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        {children}
      </Grid>
    </Card>
  );
};

PaymentCardWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default PaymentCardWrapper;
