import {connect} from 'react-redux';
import EditProvider from './EditProduct';
// import {saveClientData} from 'routes/Client/modules/actions';

const mapDispatchToProps = {
  //saveClientData,
};

export default connect(
  null,
  mapDispatchToProps,
)(EditProvider);
