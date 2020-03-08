import {connect} from 'react-redux';
import EditProvider from './EditProduct';
import {createProduct, editProduct} from '../../actions';

const mapStateToProps = ({providers: {provider}}) => ({
  provider: provider._id,
});

const mapDispatchToProps = {
  createProduct,
  editProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProvider);
