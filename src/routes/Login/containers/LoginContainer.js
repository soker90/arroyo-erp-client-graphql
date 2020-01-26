import {connect} from 'react-redux';
import LoginView from '../components';
import {login, logout} from 'actions/auth';
import {checkTokenAlive} from 'actions/auth/checkTokenAlive';

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
