import createDataContext from '../context/createDataContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'saveUser':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const saveUser = dispatch => user => {
  dispatch({type: 'saveUser', payload: user});
};

const updateUser = dispatch => async user => {};

export const {Provider, Context} = createDataContext(
  userReducer,
  {saveUser, updateUser},
  {pseudo: '', name: '', dateOfBirth: null, idProfilImage: '', email: ''},
);
