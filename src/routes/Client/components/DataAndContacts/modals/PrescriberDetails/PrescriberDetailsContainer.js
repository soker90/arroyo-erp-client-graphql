import {connect} from 'react-redux';
import PrescriberDetails from './PrescriberDetails';

const mapStateToProps = ({client: {prescriber}}) => ({
  prescriber,
});


export default connect(
  mapStateToProps,
)(PrescriberDetails);