import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import LoadingSpinner from 'react-loader-spinner';

const Overlay = ({ active, text, content, styles }) => {
    return (
        <LoadingOverlay
            active={active}
            spinner={<LoadingSpinner type="ThreeDots"/>}
            styles={styles}
            text={text}
        >{content}
        </LoadingOverlay>
    );
};

export default Overlay;
