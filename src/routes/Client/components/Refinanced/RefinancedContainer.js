import {connect} from 'react-redux';
import Refinanced from './Refinanced';

const mapStateToProps = ({client}) => ({
  refinanced: client?.contract?.opsType,
});

export default connect(mapStateToProps)(Refinanced);


// ver en contratos o en general?