import React, {memo} from 'react';
import PropTypes from 'prop-types';
import TemplatesTab from './TemplatesTab';
import HasPermission from 'components/HasPermission';
import {USER_PERMISSIONS} from 'utils/user-permissions';

const TemplatesView = memo(props => {

  return (
    <HasPermission access={USER_PERMISSIONS.TEMPLATES_READ}>
      <TemplatesTab {...props} />;
    </HasPermission>
  );
});

TemplatesView.propTypes = {
  templateList: PropTypes.array.isRequired,
};

export default TemplatesView;