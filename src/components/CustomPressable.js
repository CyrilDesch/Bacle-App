import React, { useState } from 'react';
import {
  Pressable,
} from 'react-native';


const CustomPressable = ({children, style = null, onPress = null, onPressIn = null, onPressOut = null}) => {
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const onPressEvent = () => {
    if (onPress)
      onPress();
  }

  const onPressInEvent = () => {
    setBackgroundColor('#ddd');
    if (onPressIn)
      onPressIn();
  };

  const onPressOutEvent = () => {
    setBackgroundColor('#fff');
    if (onPressOut)
      pressOut();
  };

  return (
    <Pressable
      style={{...style, backgroundColor: backgroundColor}}
      onPress={onPressEvent}
      onPressIn={onPressInEvent}
      onPressOut={onPressOutEvent}>
      {children}
    </Pressable>
  );
};


export default CustomPressable;
