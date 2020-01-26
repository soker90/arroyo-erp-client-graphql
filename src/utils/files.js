import axios from 'axios';

/**
 * Download file from a url
 * @param {String} url
 * @param {String} name
 */
export const downloadFile = (url, name) => {
  axios({
    url,
    method: 'GET',
    responseType: 'blob', // important
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      name,
    );
    document.body.appendChild(link);
    link.click();
  });
};