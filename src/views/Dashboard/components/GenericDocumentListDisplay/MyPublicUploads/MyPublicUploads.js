import React from 'react';
import PropTypes from 'prop-types';
import GenericDocumentListDisplay from '../GenericDocumentListDisplay';
import { DocumentService } from '../../../../../service';

const MyPublicUploads = () => {

    return (
        <GenericDocumentListDisplay
            promise={DocumentService.getDocument()
                .then(resp => resp.json())
                .then(json => json['docs'])
                .then(docs => docs.filter(doc => doc.privacy === 'public'))}
            title='My publicly shared Uploads'
            documentCount={5}
            tableRows={['title', 'privacy']}
            headerBackgroundColor='#FEAFAB'
            buttonLink='/myDocuments'
        />
    );
};

MyPublicUploads.propTypes = {
    className: PropTypes.string
};

export default MyPublicUploads;
