import instance from './tracker';


// Pour la méthode Trip.addPlace(placeProps)
export const createEmptyPlaceProps = () => {
  return {
    name: "",
    notes: "",
    lat: 0,
    lon: 0,
    displayAddress: ""
  };
}

// Retour : trip[] où trip = { id, name, defaultStartLoc, startDate, participants, places, days }
export const getTripList = async () => {
  try {
    const req = await instance.get('/user/trips');
    return req;
  }
  catch (error) {
    console.log("Erreur get liste des voyages (GET: /user/trips) : " + error);
  }
};

// Retour : { id, name, defaultStartLoc, startDate, participants, places, days }
export const getTrip = async (tripID) => {
  try {
    const req = await instance.get('/user/' + tripID);
    return req;
  }
  catch (error) {
    console.log("Erreur get voyage (GET: /user/:tripID) : " + error);
  }
};

export const addPlaceToTrip = async (tripID, placeProps) => {
  try {
    const req = await instance.post('/user/' + tripID, {params: placeProps});
    return req;
  } 
  catch (error) {
    console.log("Erreur ajout de lieu au voyage (POST: /user/:tripID) : " + error);
  }
}
