import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import ExplorerRouter from './explorer/explorer.router';
import './index.css';
import 'tachyons';

const apolloClient = new ApolloClient({ uri: 'http://localhost:5000/graphql'});

ReactDOM.render((
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Route path='/' component={ExplorerRouter}>
      </Route>
    </BrowserRouter>
  </ApolloProvider>
  ),
  document.getElementById('root')
)

registerServiceWorker();
