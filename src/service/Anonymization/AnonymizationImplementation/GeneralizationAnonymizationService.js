import AbstractAnonymizationService from '../AbstractAnonymizationService';
import AnonymizationAssignment from '../AnonymizationAssignment';

/**
 * Generalizes (e.g. 10 - 20) a given column
 */
class GeneralizationAnonymizationService extends AbstractAnonymizationService {
    static apply = (assignment: AnonymizationAssignment, document): void => {
        const options = assignment.options;
        const stepSize = options['stepSize']; // example: 10 -> 10 - 20
        // get document column id on which we should work on
        const columnId = super.getColumnIdByOrderId(assignment.columnOrderId, document);
        // Apply on data column
        document.data[columnId].data = document.data[columnId].data.map(cell => {
            if (Number.isNaN(parseInt(cell))) {
                return 'NaN';
            }

            const LowLimit = Math.floor(cell / stepSize);
            const bucketStart = LowLimit * stepSize;
            const bucketEnd = (bucketStart) + parseInt(stepSize);
            return bucketStart + ' - ' + bucketEnd;
        });
    };
    static getDescription = (options): String => 'generalized with step size ' + options['stepSize'];

    static getName = (): String => 'generalization';
}

export default GeneralizationAnonymizationService;
