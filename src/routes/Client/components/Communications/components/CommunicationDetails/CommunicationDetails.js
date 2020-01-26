import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Divider,
  // IconButton,
  // Tooltip,
  Typography,
} from '@material-ui/core';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';

import dataFormat from 'components/util/dataFormat';
import CommunicationDirectionIcon from './components/CommunicationDirectionIcon';
import CommunicationTypeIcon from '../CommunicationTypeIcon/CommunicationTypeIcon';
import {useStyles} from './CommunicationDetails.styles';

const CommunicationDetails = props => {
  const {communication, className, ...rest} = props;

  const classes = useStyles();

  const _renderButtons = () =>
    <div className={classes.actions}>
      {/*<Tooltip title="Eliminar">
        <IconButton
          className={classes.moreButton}
          size="small"
        >
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton
          className={classes.moreButton}
          size="small"
        >
          <EditIcon/>
        </IconButton>
      </Tooltip>*/}
      <CommunicationDirectionIcon directionType={communication.directionType}/>
    </div>;

  /**
   * Render text
   * @param {String} message
   * @param {Object} options
   * @returns {Typography}
   * @private
   */
  const _renderText = (message, options) =>
    <Typography
      {...options}
    >
      {message}
    </Typography>;

  const _labels = [
    [communication.summary, {display: 'inline', variant: 'h5'}],
    [`ID: ${communication.clientComunicationId}`, {variant: 'subtitle2'}],
    [dataFormat.date(communication.dateComunication), {variant: 'body2'}],
  ];
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <div className={classes.receiver}>
          <CommunicationTypeIcon
            className={classes.icon}
            comunicationTypeDescription={communication.comunicationTypeDescription}
          />
          <div>
            {_labels.map(item => _renderText(...item))}
          </div>
        </div>
        {_renderButtons()}
      </div>
      <Divider/>
      <div className={classes.content}
           dangerouslySetInnerHTML={dataFormat.createMarkup(communication.text)}
      />
    </div>
  );
};

CommunicationDetails.propTypes = {
  className: PropTypes.string,
  communication: PropTypes.object.isRequired,
  onEmailClose: PropTypes.func,
};

export default CommunicationDetails;