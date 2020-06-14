import AbstractAnonymizationService from '../AbstractAnonymizationService';
import AnonymizationAssignment from '../AnonymizationAssignment';

/**
 * Deletes a given column
 */
class DeleteAnonymizationService extends AbstractAnonymizationService {
    static apply = (assignment: AnonymizationAssignment, document) => {
        const index = super.getColumnIdByOrderId(assignment.columnOrderId, document);
        document.data.splice(index, 1);
    };

    static getDescription = (options): String => 'deleted';

    static getName = (): String => 'delete';
}

export default DeleteAnonymizationService;
