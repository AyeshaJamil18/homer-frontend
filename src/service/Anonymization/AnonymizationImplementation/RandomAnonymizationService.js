import AbstractAnonymizationService from '../AbstractAnonymizationService';
import AnonymizationAssignment from '../AnonymizationAssignment';

/**
 * Randomizes the sorting of the cells of a given column
 */
class RandomAnonymizationService extends AbstractAnonymizationService {
    static apply = (assignment: AnonymizationAssignment, document): void => {
        const columnId = super.getColumnIdByOrderId(assignment.columnOrderId, document);
        RandomAnonymizationService.shuffleArray(document.data[columnId].data);
    };

    static getDescription = (options): String => 'randomized';

    static getName = (): String => 'random';

    static shuffleArray = (array): void => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
}

export default RandomAnonymizationService;
