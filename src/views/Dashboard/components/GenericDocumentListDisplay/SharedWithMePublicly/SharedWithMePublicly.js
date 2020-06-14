import React from 'react';
import PropTypes from 'prop-types';
import GenericDocumentListDisplay from '../GenericDocumentListDisplay';
import { DocumentService } from '../../../../../service';

const SharedWithMePublicly = () => {

    return (
        <GenericDocumentListDisplay
            promise={DocumentService.getPublicDocuments()
                .then(resp => resp.json())
                .then(json => json['docs'])}
            title='Publicly shared Uploads'
            documentCount={5}
            tableRows={['title', 'owner']}
            headerBackgroundColor={'#95D5DF'}
            buttonLink='/sharedPublic'
        />
    );
};

SharedWithMePublicly.propTypes = {
    className: PropTypes.string
};

export default SharedWithMePublicly;
