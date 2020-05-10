import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { createStore } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "localforage";
import { PersistGate } from 'redux-persist/integration/react'

const initialState =
        (typeof window !== "undefined" && window.__REDUX_STATE__) ||
        {};
const composeEnhancers =
        (typeof window !== "undefined" &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
const persistedReducer = persistReducer({key: 'root', storage}, reducer)
let store = createStore(persistedReducer, initialState, composeEnhancers())
let persistor = persistStore(store)


class Main extends React.Component{
    render(){
        return(
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>    
            <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/dashboard">
                    <App />
                </Route>
            </Switch>
            </Router>
            </PersistGate>
            </Provider>
        )
    }
}

ReactDOM.render( <Main/>, document.getElementById('root') );