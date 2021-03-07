import React from 'react';
import PropTypes from 'prop-types';

const Marker = ({ text, onClick }) => (
    <div
        alt={text}
        onClick={onClick}
        style={{
            position: "absolute",
            width: "7vw",
            height: "7vh",
            backgroundImage: "url(https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: "translate(-50%,-50%)",
            cursor: "grab"
        }}
    > </div>
);

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

export default Marker;