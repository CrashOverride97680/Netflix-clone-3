import React from 'react';
import './SearchResults.css';
import Item from './carousel/Item';

class SearchResults extends React.Component {
  render() {
    const { result } = this.props;
    return (
      <div className="results_container">
        {
          result.map((movie) => (
            <div className="item-result">
              <Item movie={movie} />
            </div>
          ))
        }
      </div>
    );
  }
}

export default SearchResults;