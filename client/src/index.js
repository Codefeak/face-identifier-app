import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from "./serviceWorker";

import client from "./apollo";

// FOR CREATING GLOBAL STATE STORE
// function createStore(reducer, actions, initialState) {
//   const context = createContext(initialState);

//   const Provider = ({ children }) => {
//     const reducerFn = (state, { type, payload }) =>
//       reducer[type](state, payload);
//     const [data, dispatch] = useReducer(reducerFn, initialState);
//     const actionCreators = bindActionCreators(actions, dispatch, data);
//     return (
//       <context.Provider value={[data, actionCreators]}>
//         {children}
//       </context.Provider>
//     );
//   };

//   return [context, Provider];
// }

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) module.hot.accept();
