import React, {memo} from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoneIcon from '@material-ui/icons/Done';
import {Grid} from '@material-ui/core';
import {Typography} from '@material-ui/core';

import {useStyles} from './PaymentBox.styles';
import palette from 'theme/palette';

const PaymentBox = memo(({label, value, ok}) => {
  const classes = useStyles();

  /**
   * Render the error icon
   * @returns {false || HighlightOffIcon}
   * @private
   */
  const _renderIconError = () => (ok === null || ok === false) && <HighlightOffIcon color='error'/>;

  /**
   * Render the success icon
   * @returns {false}
   * @private
   */
  const _renderIconSuccess = () => ok && <DoneIcon color={palette.button.success.root}/>;

  /**
   * Render the value text
   * @returns {false || Typography}
   * @private
   */
  const _renderValue = () => value && <Typography variant="h6">{value}</Typography>;

  return (
    <Grid
      className={classes.item}
      item
      md={4}
      sm={6}
      xs={12}
    >
      <Typography
        component="h2"
        gutterBottom
        variant="button"
      >
        {label}
      </Typography>
      <div className={classes.valueContainer}>
        {_renderIconError()}
        {_renderIconSuccess()}
        {_renderValue()}
      </div>
    </Grid>
  );
});

PaymentBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  ok: PropTypes.bool,
};

export default PaymentBox;
