import React, { useReducer } from 'react';
import { MessageContextType, defaultMessageState } from '../types/types';
import { messageReducer } from '../reducer/MessageReducer';


export const MessageContext = React.createContext<MessageContextType>({state: defaultMessageState} as MessageContextType);

export const useMessageContext = () => {
  const messageContext = React.useContext(MessageContext);
  return messageContext;
}

export const MessageContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(messageReducer, defaultMessageState);

  return <MessageContext.Provider value={{ state, dispatch }}>{props.children}</MessageContext.Provider>;
};
 
