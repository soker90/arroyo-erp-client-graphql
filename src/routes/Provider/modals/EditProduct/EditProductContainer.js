import {connect} from 'react-redux';
import EditProvider from './EditProduct';
import {createProduct} from '../../actions';

const mapStateToProps = ({providers: {provider}}) => ({
  provider: provider._id,
});

const mapDispatchToProps = {
  createProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProvider);
