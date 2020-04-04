import {connect} from 'react-redux';
import {logout} from 'actions/auth';
import TopBar from '../components';

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
  null,
)(TopBar);
