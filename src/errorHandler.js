export default (err, messages) => {
  switch (err.response.status) {
    case 403:
      throw messages.error403 ? messages.error403 : '';
    case 404:
      throw messages.error404 ? messages.error404 : '';
    case 409:
      throw messages.error409 ? messages.error409 : '';
    case 500:
      throw 'Veuillez réessayer plus tard.';
    case 503:
      throw 'Veuillez réessayer plus tard.';
    default:
      throw 'Une erreur est survenue.';
  }
};
