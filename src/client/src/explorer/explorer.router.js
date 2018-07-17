import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Screenshot  from './screenshot.component';
import Explorer from './explorer.component';

export default class ExplorerRouter extends Component {
    render () {
        return (
            <Switch>
                <Route path='/screenshot/:id' component={Screenshot} />
                <Route path='' component={Explorer} />
            </Switch>
)
    }
}
