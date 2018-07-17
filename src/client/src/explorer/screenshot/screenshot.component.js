import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_SCREENSHOT = gql`
    query getImage($id: MongoID) {
        imageOne(filter: {_id: $id}) {
            data
        }
    }
`;

export default class Screenshot extends Component {
    render() {
        return (
            <Query query={GET_SCREENSHOT} variables={{id: this.props.match.params.id}}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <div>Error :( <pre>{JSON.stringify(error, null, 4)} </pre></div>;
                    return ( <img src={`data:image/gif;base64,${data.imageOne.data}`} alt=''/> )
                }}
            </Query>
        )
    }
}
