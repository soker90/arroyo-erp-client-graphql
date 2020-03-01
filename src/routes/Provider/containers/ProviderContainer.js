import {connect} from 'react-redux';
import {getProvider} from '../actions';
import Provider from '../components/Provider';
import {SHOW_EDIT_PROVIDER} from '../modals/types';
import {showModal} from 'reducers/modal';

const mapStateToProps = ({providers: {provider}, products: {products}}) => ({
  provider,
  products,
});

const mapDispatchToProps = {
  getProvider,
  showEditProviderModal: () =>
    showModal({modalType: SHOW_EDIT_PROVIDER}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Provider);
