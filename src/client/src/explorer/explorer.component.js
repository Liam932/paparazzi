import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_IMAGE = gql`
  query {
      imageOne(filter: {name: "welcome_entertainment"}) {
          name,
          data
      }
  }
`

class ListPage extends Component {
    render () {
    return (
        <Query query={GET_IMAGE}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error :( <pre>{JSON.stringify(error, null, 4)} </pre></div>;

                return ( <img src={`data:image/gif;base64,${data.imageOne.data}`} alt=''/> )
            }}
        </Query>
        )
    }
}

export default ListPage
