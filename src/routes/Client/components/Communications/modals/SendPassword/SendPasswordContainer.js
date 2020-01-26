import {connect} from 'react-redux';
import SendPassword from './SendPassword';
import {resetPassword} from 'routes/Client/modules/actions';

const mapDispatchToProps = {
  resetPassword,
};

export default connect(
  null,
  mapDispatchToProps,
)(SendPassword);