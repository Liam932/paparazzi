import React from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import ExplorerItem from './item.component';
import './explorer.css';

const GET_IMAGES = gql`
  query {
      imageMany(limit: 10) {
          _id,
          name,
          data
      }
  }
`

const Explorer = props => {
        const { loading, error, data } = props;
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        return (
            <div>
                <ul className="pap-explorer">{data.imageMany.map(item => <ExplorerItem key={item._id} {...item} />)}</ul>
            </div>
        )
}

export default props => <Query query={GET_IMAGES} children={Explorer} />
