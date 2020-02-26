import {connect} from 'react-redux';
import TabsComponent from '../components/TabsComponent';
import {actions} from '../modules/tabs';

const mapStateToProps = ({tabs}) => ({
  tabs,
});

const mapDispatchToProps = {...actions};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsComponent);
