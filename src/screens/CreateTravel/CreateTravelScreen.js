import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import InformationForm from '../../components/Trip/InformationForm';
import Layout from '../../components/Trip/Layout';
import {Context as TripContext} from '../../context/TripContext';

const CreateTravelScreen = () => {
  const {
    saveTrip,
    startLoading,
    state: {loadingToPost},
  } = useContext(TripContext);
  const [step, setStep] = useState(0);

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = trip => {
    if (trip == null) {
      setStep(step + 1);
    } else {
      startLoading();
      saveTrip(trip);
    }
  };

  return (
    <Layout back={handleBack} step={step}>
      <InformationForm
        loading={loadingToPost}
        submit={handleNext}
        step={step}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default CreateTravelScreen;
