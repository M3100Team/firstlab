import React from 'react';

const GlobalContext = React.createContext({
  userData: {
    login: null,
    group: null,
  },
  setUserData: () => {},
});

export default GlobalContext;
