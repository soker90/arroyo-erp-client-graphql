import {connect} from 'react-redux';
import ModifyOtherContactData from './ModifyOtherContactData';
import {setClientContactInfo} from 'routes/Client/modules/actions';

const mapStateToProps = ({client: {client: {clientId}}}) => ({
  clientId,
});

const mapDispatchToProps = {
  setClientContactInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyOtherContactData);