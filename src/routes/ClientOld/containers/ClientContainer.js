import {connect} from 'react-redux';
import {actions} from '../modules/actions';
import {actions as commonActions} from 'reducers/common';

import ClientView from '../components/ClientView';

const mapDispatchToProps = {...actions, ...commonActions};

export default connect(
  null,
  mapDispatchToProps
)(ClientView);
