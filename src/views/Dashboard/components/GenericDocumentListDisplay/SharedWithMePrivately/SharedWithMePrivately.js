import React from 'react';
import PropTypes from 'prop-types';
import GenericDocumentListDisplay from '../GenericDocumentListDisplay';
import { DocumentService } from '../../../../../service';

const SharedWithMePrivately = () => {

    return (
        <GenericDocumentListDisplay
            promise={DocumentService.getDocumentsSharedWithMe()
                .then(resp => resp.json())
                .then(json => json['docs'])}
            title='Shared with me privately'
            documentCount={5}
            tableRows={['title', 'username']}
            headerBackgroundColor={'#FFEEAE'}
            buttonLink='/documentsSharedWithMe'
        />
    );
};

SharedWithMePrivately.propTypes = {
    className: PropTypes.string
};

export default SharedWithMePrivately;
