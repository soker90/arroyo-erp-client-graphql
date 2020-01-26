import React, {memo} from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';

const TextEditor = memo(
  ({onChange, value}) =>
    <CKEditor
      config={{language: 'es', width: 500, height:500}}
      editor={ClassicEditor}
      data={value}
      onChange={onChange}
      style={{height: '50em'}}
    />,
);

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default TextEditor;

/// slate-react