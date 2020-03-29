import {connect} from 'react-redux';
import {getProviders, getProducts} from '../actions';
import NewAlbaran from '../components/NewDeliveryOrder';
import {showModal} from 'reducers/modal';
import {DELETE_PRODUCT_DELIVERY_ORDER} from 'routes/NewDeliveryOrder/modals/types';

const mapStateToProps = ({providers: {providers, provider}, products: {products}}) => ({
  provider,
  providers,
  products,
});

const mapDispatchToProps = {
  getProviders,
  getProducts,
  showDeleteProductModal: (product, onClickDelete) =>
    showModal({
      modalType: DELETE_PRODUCT_DELIVERY_ORDER,
      modalProps: {product, onClickDelete},
    }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAlbaran);
