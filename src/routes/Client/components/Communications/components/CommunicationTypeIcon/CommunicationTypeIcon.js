import React, {memo} from 'react';
import PropTypes from 'prop-types';
import CallIcon from '@material-ui/icons/Call';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const CommunicationTypeIcon = memo(({comunicationTypeDescription, className}) => {
  /**
   * Devuelve el icono correspondiente
   * @returns {Icon}
   * @private
   */
  const _getIcon = () => {
    const communicationTypes = {
      Llamada: CallIcon,
      'Llamada Acreditia': CallIcon,
      Email: EmailOutlinedIcon,
      'Email Acreditia': EmailOutlinedIcon,
      'SMS Acreditia': PhoneAndroidIcon,
    };

    let Icon = communicationTypes[comunicationTypeDescription];
    if (!Icon) Icon = HelpOutlineIcon;
    return <Icon className={className}/>;
  };

  return _getIcon();
});

CommunicationTypeIcon.propTypes = {
  comunicationTypeDescription: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CommunicationTypeIcon.displayName = 'CommunicationTypeIcon';

export default CommunicationTypeIcon;