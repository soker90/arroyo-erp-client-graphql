import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {logout} from 'actions/auth';

const mapStateToProps = ({auth, router}) => ({
  name: auth.user.name,
  router,
});

const mapDispatchToProps = {logout};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
