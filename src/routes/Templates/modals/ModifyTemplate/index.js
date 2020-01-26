import ModifyTemplate from './ModifyTemplate';
import {connect} from 'react-redux';
import {getTemplateById, updateTemplate, createTemplate, removeTemplate} from 'routes/Templates/modules/actions';

const mapStateToProps = ({templates}) => ({
  template: templates.template,
  loading: templates.loading,
});

const mapDispatchToProps =  {
  getTemplateById,
  updateTemplate,
  createTemplate,
  removeTemplate,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModifyTemplate);