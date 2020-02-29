import {connect} from 'react-redux';
import LoginView from '../components';
import {login, logout, checkTokenAlive} from 'actions/auth';

const mapStateToProps = ({auth, loadingBar}) => ({
  loginError: auth?.loginError,
  isLoading: !!loadingBar.default,
});

const mapDispatchToProps = {
  login,
  logout,
  checkTokenAlive,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
