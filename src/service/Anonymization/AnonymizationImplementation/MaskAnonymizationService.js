import AbstractAnonymizationService from '../AbstractAnonymizationService';
import AnonymizationAssignment from '../AnonymizationAssignment';

/**
 * Masks a given column with a recurring char patterns from left or right with a given size
 * Example:
 * Options: (pattern: 'ab',start: 'l', range: 3)
 * Input: 3252353
 * Output: aba2353
 * */
class MaskAnonymizationService extends AbstractAnonymizationService {
    static apply = (assignment: AnonymizationAssignment, document): void => {
        const options = assignment.options;
        const start = options['start']; // example: l or r
        const pattern = options['pattern']; // example: abc
        const range = options['range']; // example: 4 -> abca

        // Check if parameter are usable. Start is from right as default
        // This would else crash the service
        if (!pattern || pattern === '' || !range || range === '') {
            return;
        }

        const columnId = super.getColumnIdByOrderId(assignment.columnOrderId, document);

        // Calculate pattern lengths
        const lengthPattern = pattern.length;
        const repeat = Math.floor(range / lengthPattern);
        const LeftRepeat = (range % lengthPattern);

        // Calculate static pattern
        const maskedSentence = pattern.repeat(repeat) + pattern.substring(0, LeftRepeat);

        // apply pattern
        for (let i = 0; i < document.data[columnId].data.length; i++) {
            if (start === 'Left') {
                const stringToKeep = document.data[columnId].data[i].substring(range);
                document.data[columnId].data[i] = maskedSentence + stringToKeep;
            } else {
                const stringToKeep = document.data[columnId].data[i]
                    .substr(0, document.data[columnId].data[i].length - range);
                document.data[columnId].data[i] = stringToKeep + maskedSentence;
            }
        }
    };

    static getDescription = (options): String => 'masked from ' + options['start'] +
        ' with pattern ' + options['pattern'] + ' and range ' + options['range'];

    static getName = (): String => 'mask';
}

export default MaskAnonymizationService;
