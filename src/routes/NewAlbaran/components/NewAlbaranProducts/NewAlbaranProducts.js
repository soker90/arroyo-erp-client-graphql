import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {Card, CardContent, CardHeader, Grid, Divider} from '@material-ui/core';
import {DatePickerForm, SelectForm} from 'components/Forms';

const NewAlbaranData = ({products}) => {
  /**
   * Handle change input
   * @param {String} name
   * @param {String} value
   * @private
   */
  const _handleChange = ({target: {name, value}}) => {
    setData({[name]: value});
  };

  /**
   * Handle change date
   * @param {Date} value
   * @private
   */
  const _handleChangeDate = value => {
    setData({date: value});
  };

  const _renderRow = () => <>

  </>;

  return <Card>
    <CardHeader title='Datos del albarán'/>
    <Divider/>
    <CardContent>
      <Grid spacing={3} container>
        {products.map(_renderRow)}
      </Grid>
    </CardContent>
  </Card>
};

NewAlbaranData.propTypes = {
  date: PropTypes.instanceOf(Date),
  setData: PropTypes.func.isRequired,
};

NewAlbaranData.defaultProps = {
  date: new Date(),
};

NewAlbaranData.displayName = 'NewAlbaranData';

export default memo(NewAlbaranData);
