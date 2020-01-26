import React from 'react';
import {connect} from 'react-redux';
import {StyledRefinanced} from '../../../styles/client';

const Refinanced = ({refinanced}) => {
  if (refinanced) {
    return <StyledRefinanced>{refinanced.toUpperCase()}</StyledRefinanced>;
  }
  return null;
};

const mapStateToProps = ({client}) => ({
  refinanced: client?.getIn(['contract', 'opsType']),
});

export default connect(mapStateToProps)(Refinanced);
