import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import CarouselSlider from './carousel/CarouselSlider';

const SearchResults = ({
  handleItemExpand,
  activeKey,
  activeId,
  section,
  resultChunks,
}) => (
  <div className="search">
    <div className="search-centered">
      {resultChunks.map((movieChunk, idx) => (
        <CarouselSlider
          key={`results${idx}row`}
          handleItemExpand={handleItemExpand}
          activeId={activeId}
          title={`results${idx}row`}
          movies={movieChunk}
          activeKey={activeKey}
          isResultPage
          section={section}
          isInfinite={false}
          imageRootPath="https://image.tmdb.org/t/p/original"
        />
      ))}
    </div>
  </div>
);

SearchResults.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  activeId: PropTypes.arrayOf(),
  section: PropTypes.string,
  resultChunks: PropTypes.arrayOf().isRequired,
};

SearchResults.defaultProps = {
  activeKey: '',
  activeId: [],
  section: 'upcoming',
};

export default SearchResults;
