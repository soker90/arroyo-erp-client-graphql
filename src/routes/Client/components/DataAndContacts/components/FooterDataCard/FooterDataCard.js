import React, {memo} from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {
  Button,
  Grid, IconButton,
  Tooltip,
} from '@material-ui/core';

import {USER_PERMISSIONS} from 'utils/user-permissions';
import HasPermission from 'components/HasPermission';
import {useStyles} from './FooterDataCard.styles';


const FooterDataCard = memo(({permissionEdit, showModalEdit, showModalDni, showModalView}) => {
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

  /**
   * Render the edit button
   * @returns {HasPermission || false}
   * @private
   */
  const _renderButtonEdit = () =>
    showModalEdit &&
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
    </HasPermission>;

  /**
   * Render the view button
   * @returns {HasPermission || false}
   * @private
   */
  const _renderButtonView = () =>
    showModalView &&
    <HasPermission access={permissionEdit}>
      <Tooltip title="Ver">
        <IconButton
          className={classes.editButton}
          size="small"
          onClick={showModalView}
        >
          <VisibilityIcon/>
        </IconButton>
      </Tooltip>
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
          {_renderButtonEdit()}
          {_renderButtonDni()}
          {_renderButtonView()}
        </Grid>
      </Grid>
    </div>
  );
});

FooterDataCard.propTypes = {
  permissionEdit: PropTypes.string.isRequired,
  showModalEdit: PropTypes.func,
  showModalDni: PropTypes.func,
};

FooterDataCard.displayName = 'FooterDataCard';


export default FooterDataCard;
