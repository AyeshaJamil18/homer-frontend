import React from 'react';
import PropTypes from 'prop-types';
import GenericDocumentListDisplay from '../GenericDocumentListDisplay';
import { DocumentService } from '../../../../../service';

const MyUploads = () => {

    return (
        <GenericDocumentListDisplay
            promise={DocumentService.getDocument()
                .then(resp => resp.json())
                .then(json => json['docs'])
                .then(docs => docs.filter(doc => doc.privacy !== 'public'))}
            title='My Uploads'
            documentCount={5}
            tableRows={['title', 'privacy']}
            headerBackgroundColor={'#96CEB3'}
            buttonLink='/myDocuments'
        />
    );
};

MyUploads.propTypes = {
    className: PropTypes.string
};

export default MyUploads;
