import {connect} from 'react-redux';
import {getProviders} from '../actions';
import NewAlbaran from '../components/NewAlbaran';

const mapStateToProps = ({providers: {providers, provider}}) => ({
  provider,
  providers,
});

const mapDispatchToProps = {
  getProviders,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAlbaran);
