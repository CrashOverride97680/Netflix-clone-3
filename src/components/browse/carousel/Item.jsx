import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

import ItemItemsCard from './ItemItemsCard';

class Item extends React.Component {
    state = { mute: false }

    handleClick = () => {
      this.setState((state) => ({ mute: !state.mute }));
    }

    render() {
      const { mute } = this.state;
      const {
        movie, handleExpand, activeId, title, sectionName, image,
      } = this.props;

      const itemStyle = {
        position: 'relative',
        zIndex: '0',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${
          image
        })`,
        outline: `${activeId && title === sectionName ? 'none' : ''}`,
        opacity: `${activeId && title === sectionName && activeId.id !== movie.id ? '85%' : '100%'}`,
        border: `${activeId && activeId.id === movie.id ? '.3vw solid white' : ''}`,
      };

      return (
        <div
          key={movie.id}
          className="carousel-img"
          style={itemStyle}
        >
          { activeId && title === sectionName
            ? null
            : (
              <div className="item-informations">
                <div className="item-card-interaction">
                  <div className="item-play">
                    <svg id="play-with-ring" viewBox="0 0 28 28">
                      <g fill="none" fillRule="evenodd">
                        <circle stroke="#FFF" className="ring" fill="#000" fillOpacity="0.5" strokeWidth="1" cx="14" cy="14" r="13" />
                        <polygon fill="#fff" className="arrow" points="10 20 10 8 20 14" />
                      </g>
                    </svg>
                    <span className="item-title">{movie.title || movie.name}</span>
                  </div>
                  <div className="item-actions">
                    <ItemItemsCard
                      onClick={this.handleClick}
                      icon={
                  mute
                    ? 'fas fa-volume-mute'
                    : 'fas fa-volume-up'
                }
                      size="small"
                    />
                    <ItemItemsCard icon="far fa-thumbs-up" size="small" />
                    <ItemItemsCard icon="far fa-thumbs-down" size="small" />
                    {/* <ItemItemsCard icon="fas fa-check" size="small" /> */}
                  </div>
                </div>

                <div className="item-more-infos-icon" onClick={() => handleExpand(movie, title)}>
                  <svg id="chevron-down" viewBox="0 0 60 19">
                    <path fill="currentColor" d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873" />
                  </svg>
                </div>
              </div>
            )}
          {
              activeId && title === sectionName && activeId.id !== movie.id && (
              <div className="chevron-down-active" onClick={() => handleExpand(movie, title)}>
                <svg id="chevron-down" viewBox="0 0 60 19">
                  <path fill="currentColor" d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873" />
                </svg>
              </div>
              )
            }
          { activeId && activeId.id === movie.id
            ? (
              <div className="caret-item-open">
                <i className="fas fa-caret-down" />
              </div>
            )
            : null}
        </div>
      );
    }
}

Item.propTypes = {
  handleExpand: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  sectionName: PropTypes.string,
  image: PropTypes.string.isRequired,
};

Item.defaultProps = {
  sectionName: '',
};

export default Item;
