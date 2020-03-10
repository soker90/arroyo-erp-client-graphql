import {connect} from 'react-redux';
import {getProviders, getProducts} from '../actions';
import NewAlbaran from '../components/NewAlbaran';

const mapStateToProps = ({providers: {providers, provider}, products: {products}}) => ({
  provider,
  providers,
  products,
});

const mapDispatchToProps = {
  getProviders,
  getProducts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAlbaran);
