import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {Card, CardContent, CardHeader, Grid, Divider} from '@material-ui/core';
import {DatePickerForm, SelectForm} from 'components/Forms';

const NewAlbaranProductSelect = () => {

  return <Card>
    <CardHeader title='Datos del albarán'/>
    <Divider/>
    <CardContent>
      <Grid spacing={3} container>
        <DatePickerForm label='Fecha' value={date} onChange={_handleChangeDate}/>
        <SelectForm
          label='Selecciona un proveedor'
          value={provider}
          name='provider'
          onChange={_handleChange}
        >
          <option value="manual">--------</option>
          {providers?.map(item => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </SelectForm>
      </Grid>
    </CardContent>
  </Card>
};

NewAlbaranProductSelect.propTypes = {
  date: PropTypes.instanceOf(Date),
  setData: PropTypes.func.isRequired,
};

NewAlbaranProductSelect.defaultProps = {
  date: new Date(),
};

NewAlbaranProductSelect.displayName = 'NewAlbaranData';

export default memo(NewAlbaranProductSelect);
