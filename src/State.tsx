import React from "react";

interface User {}

export enum Actions {
  SetUser = 'setUser',
  LoggedIn = 'loggedin',
  LoggedOut = 'loggedout',
}

const userItem = window.localStorage.getItem('user');
let user: User | null = null;
if (userItem) {
  user = JSON.parse(userItem);
}


export interface StateType {
  user?: User | null;
}

let initialState: StateType = {
};


let reducer = (state: any, action: any) => {
  switch (action.type) {
    case Actions.SetUser:
      return { ...state, user: action.user }
    case Actions.LoggedIn:
      return { ...state, user: action.user }
    case Actions.LoggedOut:
      return { ...state, user: null }
  }
};

const logger = (reducer: any) => {
  const reducerWithLogger = (state: any, action: any) => {
    console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
    console.log("%cNext State:", "color: #47B04B; font-weight: 700;", reducer(state,action));
    return reducer(state,action);
  };
  return reducerWithLogger;
}

let AppContext = (React as any).createContext();

const loggerReducer = logger(reducer);

function AppContextProvider(props: any) {
  const fullInitialState = {
    ...initialState,
    user
  }

  let [state, dispatch] = React.useReducer(loggerReducer, fullInitialState);
  let value = { state, dispatch };

  if (user !== state.user) {
    // Sync the user back to local storage whenever it changes
    window.localStorage.setItem('user', JSON.stringify(state.user));
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };