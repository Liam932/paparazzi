import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link, Route } from 'react-router-dom';
import Screenshot  from './screenshot.component';

const GET_IMAGES = gql`
  query {
      imageMany(limit: 10) {
          _id,
          name,
      }
  }
`

export default class Explorer extends Component {
    render () {
    return (
        <Query query={GET_IMAGES}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error :( <pre>{JSON.stringify(error, null, 4)} </pre></div>;
                return (
                    <div>
                        <ul>
                            {data.imageMany.map(item => <li key={item._id}><Link to={`screenshot/${item._id}`}>{item.name}</Link></li>)}
                        </ul>
                    <Route path="/screenshot/:id" component={Screenshot} />
                </div>
                )
                // return ( <img src={`data:image/gif;base64,${data.imageOne.data}`} alt=''/> )
            }}
        </Query>
        )
    }
}
