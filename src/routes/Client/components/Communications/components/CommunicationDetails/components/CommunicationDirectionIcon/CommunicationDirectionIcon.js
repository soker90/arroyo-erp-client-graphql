import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
} from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import {useStyles} from './CommunicationDirectionIcon.styles';

const CommunicationDirectionIcon = memo(({directionType}) => {

  const classes = useStyles();

  /**
   * Return icon received or made
   * @returns {Tooltip}
   * @private
   */
  const _renderDirection = () => directionType === 'O' ? _renderCommunicationOut() : _renderCommunicationIn();

  /**
   * Render icon out communication
   * @returns {Tooltip}
   * @private
   */
  const _renderCommunicationOut = () =>
    <Tooltip
      title="Enviada"
      className={classes.communicationMade}
    >
      <CallMadeIcon/>
    </Tooltip>;

  /**
   * Render icon in communication
   * @returns {Tooltip}
   * @private
   */
  const _renderCommunicationIn = () =>
    <Tooltip
      title="Recibida"
      className={classes.communicationReceived}
    >
      <CallReceivedIcon/>
    </Tooltip>;

  return _renderDirection();
});

CommunicationDirectionIcon.propTypes = {
  directionType: PropTypes.string.isRequired,
};

CommunicationDirectionIcon.displayName = 'CommunicationDirectionIcon';

export default CommunicationDirectionIcon;