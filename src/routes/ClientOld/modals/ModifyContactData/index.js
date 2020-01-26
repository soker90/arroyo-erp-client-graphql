import {actions} from '../../modules/actions';
import {connect} from 'react-redux';
import ModifyContactData from './ModifyContactData';

const mapStateToProps = ({client}) => ({
  client: client.get('client').toJS(),
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyContactData);