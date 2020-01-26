import {connect} from 'react-redux';
import DNITitular from './DNITitular';
import {uploadImage} from 'routes/Client/modules/actions';

const mapStateToProps = ({client: {client, dniImages}}) => ({
  client,
  dniImages,
});

const mapDispatchToProps = {
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DNITitular);