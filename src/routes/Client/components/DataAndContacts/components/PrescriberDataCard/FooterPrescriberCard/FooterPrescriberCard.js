import React, {memo} from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';

import {
  Button,
  Grid, IconButton,
  Tooltip,
} from '@material-ui/core';

import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import {useStyles} from './FooterDataCard.styles';


const FooterPrescriberCard = memo(({permissionEdit, showModalEdit, showModalDni}) => {
  const classes = useStyles();

  /**
   * Render the dni button
   * @returns {HasPermission || false}
   * @private
   */
  const _renderButtonDni = () =>
    showModalDni &&
    <HasPermission access={USER_PERMISSIONS.PERSONAL_DATA_DNI_READ}>
      <Button
        className={classes.dniButton}
        onClick={showModalDni}
      >
        Ver DNI
      </Button>
    </HasPermission>;

  return (
    <div className={classes.root}>
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <HasPermission access={permissionEdit}>
            <Tooltip title="Editar">
              <IconButton
                className={classes.editButton}
                size="small"
                onClick={showModalEdit}
              >
                <EditIcon/>
              </IconButton>
            </Tooltip>
          </HasPermission>
          {_renderButtonDni()}
        </Grid>
      </Grid>
    </div>
  );
});

FooterPrescriberCard.propTypes = {
  permissionEdit: PropTypes.string.isRequired,
  showModalEdit: PropTypes.func.isRequired,
  showModalDni: PropTypes.func,
};

FooterPrescriberCard.displayName = 'FooterPrescriberCard';


export default FooterPrescriberCard;
