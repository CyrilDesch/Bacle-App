export default (err, messages) => {
  switch (err.response.status) {
    case 403:
      return messages.error403 ? messages.error403 : 'Une erreur est survenue.';
    case 404:
      return messages.error404 ? messages.error404 : 'Une erreur est survenue.';
    case 409:
      return messages.error409 ? messages.error409 : 'Une erreur est survenue.';
    case 500:
      return 'Veuillez réessayer plus tard.';
    case 503:
      return 'Veuillez réessayer plus tard.';
    default:
      return 'Une erreur est survenue.';
  }
};
