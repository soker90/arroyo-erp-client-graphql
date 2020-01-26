import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';
import UploadImageDNI from 'routes/ClientOld/components/UploadImageDNI';
import {UPLOAD_FILE_TYPES} from 'constants/files';

const DNICotitularView = memo(({coDniImages, uploadImage, close, show}) =>
  <Modal show={show} onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>DNI Co-Titular</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <UploadImageDNI
        type={UPLOAD_FILE_TYPES.DNI_FRONT_COT}
        labelInput='SELECCIONA CARA FRONTAL'
        image={coDniImages.cofront}
        labelButton='Subir frontal'
        uploadImage={uploadImage}/>

      <UploadImageDNI
        type={UPLOAD_FILE_TYPES.DNI_BACK_COT}
        labelInput='SELECCIONA CARA TRASERA'
        image={coDniImages.coback}
        labelButton='Subir trasera'
        uploadImage={uploadImage}/>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="danger" onClick={close}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

DNICotitularView.propTypes = {
  close: PropTypes.func.isRequired,
  coDniImages: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default DNICotitularView;
