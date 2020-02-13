import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {logout} from 'actions/auth';

const mapStateToProps = ({auth, router, providers}) => ({
  name: auth.user.name,
  router,
  providers: providers.all,
});

const mapDispatchToProps = {logout};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
