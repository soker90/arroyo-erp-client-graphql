import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from '@material-ui/core';
import {ModalBase} from '../index';

const ConfirmModal = memo(props => {
  return <ModalBase {...props}>
    <Grid
      item
      md={12}
      xs={12}
    >
      <Typography variant="body1">
        {props.description}
      </Typography>
    </Grid>
  </ModalBase>;
});

ConfirmModal.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;
