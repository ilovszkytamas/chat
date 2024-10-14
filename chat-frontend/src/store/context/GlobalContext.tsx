import React, { useReducer } from 'react';
import { GlobalContextType, GlobalState, defaultState } from '../types/types';
import { globalReducer } from '../reducer/GlobalReducer';


export const GlobalContext = React.createContext<GlobalContextType>({state: defaultState} as GlobalContextType);

export const useGlobalContext = () => {
  const globalContext = React.useContext(GlobalContext);
  return globalContext;
}

export const GlobalContextProvider = (props: any) => {
  //const { children } = props;

  const [state, dispatch] = useReducer(globalReducer, defaultState);

  return <GlobalContext.Provider value={{state, dispatch}}>{props.children}</GlobalContext.Provider>
}
 
