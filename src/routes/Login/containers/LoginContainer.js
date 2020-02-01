import {connect} from 'react-redux';
import LoginView from '../components';
import {login, logout} from 'actions/auth';

const mapStateToProps = ({auth, loadingBar}) => ({
  loginError: auth?.loginError,
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {
  login,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
