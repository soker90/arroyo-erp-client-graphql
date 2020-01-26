import {connect} from 'react-redux';
import TemplatesView from '../components/TemplatesView';
import {addNotification} from 'reducers/notifications';
import {getTemplates} from '../modules/actions';
import {showModifyClient} from '../modals/actions';

const mapStateToProps = ({templates}) => ({
  ...templates,
});

const mapDispatchToProps = {
  addNotification,
  showModifyClient,
  getTemplates,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemplatesView);
