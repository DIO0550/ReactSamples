import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import UserFunctionComponent from './PresentationalComponent/Atoms/UserFunctionComponent';
import { store } from './state/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserFunctionComponent />
      </div>
    </Provider>
  );
}

export default App;
