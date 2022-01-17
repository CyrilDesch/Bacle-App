import createDataContext from '../context/createDataContext';
import trackerApi from '../api/tracker';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'saveUser':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const saveUser = dispatch => async () => {
  try {
    const resp = await trackerApi.get('/user/me', {
      headers: {'content-type': 'application/x-www-form-urlencoded'},
    });

    dispatch({type: 'saveUser', payload: resp.data});
  } catch (err) {
    console.log(err);
  }
};

export const {Provider, Context} = createDataContext(
  userReducer,
  {saveUser},
  {},
);
