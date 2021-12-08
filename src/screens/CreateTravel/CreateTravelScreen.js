import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import InformationForm from '../../components/CreateTrip/InformationForm';
import Layout from '../../components/CreateTrip/Layout';

const CreateTravelScreen = () => {
  const [step, setStep] = useState(0);
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    setStep(step + 1);
  };
  return (
    <Layout back={handleBack} step={step}>
      <InformationForm submit={handleNext} step={step} />
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default CreateTravelScreen;
