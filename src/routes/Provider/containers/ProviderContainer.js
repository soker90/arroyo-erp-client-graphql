import {connect} from 'react-redux';
import {getProvider} from '../actions';
import Provider from '../components/Provider';
import {SHOW_EDIT_PRODUCT, SHOW_EDIT_PROVIDER} from '../modals/types';
import {showModal} from 'reducers/modal';

const mapStateToProps = ({providers: {provider}, products: {products}, deliveryOrders: {deliveryOrders}}) => ({
  provider,
  products,
  deliveryOrders,
});

const mapDispatchToProps = {
  getProvider,
  showEditProviderModal: () =>
    showModal({modalType: SHOW_EDIT_PROVIDER}),
  showEditProductModal: product =>
    showModal({
      modalType: SHOW_EDIT_PRODUCT,
      modalProps: {product},
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Provider);
