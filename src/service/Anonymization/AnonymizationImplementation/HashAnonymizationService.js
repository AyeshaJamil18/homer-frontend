import AbstractAnonymizationService from '../AbstractAnonymizationService';
import AnonymizationAssignment from '../AnonymizationAssignment';

import Hashes from 'jshashes';
import bcrypt from 'bcryptjs';

const standardCipher = Hashes.SHA256.name;

/**
 * Hashes a given column with optional salting
 */
class HashAnonymizationService extends AbstractAnonymizationService {
    static apply = (assignment: AnonymizationAssignment, document): void => {
        const options = assignment.options;

        // Extract options from optionsMap
        let cipher = options['cipher'] !== undefined ?
            options['cipher'] : standardCipher;

        // get Cipher implementation for name
        cipher = HashAnonymizationService.getCipherByName(cipher);

        // Get salt string if there is one
        let withSalt;
        if (options['salt'] !== undefined) {
            if (options['salt']) {
                withSalt = options['withSalt'] !== undefined ?
                    options['withSalt'] : bcrypt.genSaltSync(32);
            } else {
                withSalt = '';
            }
        } else {
            withSalt = '';
        }

        // get document column id on which we should work on
        const columnId = super.getColumnIdByOrderId(assignment.columnOrderId, document);

        // Apply to document
        document.data[columnId].data = document.data[columnId].data.map(cell => cipher.b64(cell + withSalt));
    };

    static getCipherByName = (name: String) => {
        if (name === Hashes.SHA1.name) {
            return new Hashes.SHA1();
        }

        if (name === Hashes.SHA256.name) {
            return new Hashes.SHA256();
        }

        throw 'Cipher ' + name + ' has not been defined';
    };

    static getDescription = (options): String => {
        let cipher = options['cipher'] !== undefined ?
            options['cipher'] : standardCipher;

        const text = 'hashed with cipher ' + cipher;

        if (options['salt'] !== undefined &&
            options['salt'] !== '' &&
            options['salt']) {
            return text + ' and salt';
        } else {
            return text;
        }
    };

    static getName = (): String => 'hash';
}

export default HashAnonymizationService;
