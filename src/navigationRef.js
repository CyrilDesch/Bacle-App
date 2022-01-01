// RootNavigation.js

import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, route) {
  if (navigationRef.isReady()) {
    if (route) {
      navigationRef.navigate(route, {
        screen: name,
      });
    } else {
      navigationRef.navigate(name);
    }
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function isFocused() {
  if (navigationRef.isReady()) {
    return navigationRef.isFocused;
  }
}

// add other navigation functions that you need and export them
