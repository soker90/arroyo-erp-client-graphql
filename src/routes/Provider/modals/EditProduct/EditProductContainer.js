import {connect} from 'react-redux';
import EditProvider from './EditProduct';
// import {saveClientData} from 'routes/Client/modules/actions';

const mapStateToProps = ({providers: {provider}}) => ({
  provider,
});

const mapDispatchToProps = {
  //saveClientData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProvider);