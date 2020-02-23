import {connect} from 'react-redux';
import {getProvider} from '../actions';
import Provider from '../components/Provider';

const mapStateToProps = ({providers: {provider}}) => ({
  provider,
});

const mapDispatchToProps = {
  getProvider,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Provider);
