import React, {memo, createRef} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

const InputFile = memo(({label, inputProps, buttonProps}) => {
  const inputRef = createRef();

  return (
    <div style={{display: 'inline'}}>
      <Button
        {...buttonProps}
        onClick={() => inputRef.current.click()} // +1
      >
        {label || 'Seleccionar archivo'}
      </Button>
      <input
        ref={inputRef}
        name={name}
        type="file"
        style={{display: 'none'}}
        {...inputProps}
      />
    </div>
  );
});

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputProps: PropTypes.object,
  buttonProps: PropTypes.object,
};

InputFile.displayName = 'InputFile';

export default InputFile;
