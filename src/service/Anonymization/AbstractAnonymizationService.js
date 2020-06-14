import AnonymizationAssignment from './AnonymizationAssignment';

/**
 * This represents a abstract implementation of a AnonymizationService.
 * This class is extended by all implementations
 */
class AbstractAnonymizationService {
    // Abstract methods. Should be overwritten
    static apply = (assignment: AnonymizationAssignment, document): void => {
        throw 'THIS SHOULD NOT BE INVOKED';
    };

    static getDescription = (options): String => {
        throw 'THIS SHOULD NOT BE INVOKED';
    };

    static getName = (): String => {
        throw 'THIS SHOULD NOT BE INVOKED';
    };

    // Custom functions
    static getColumnIdByOrderId = (id, document) =>
        document.data.findIndex(column => column.orderPosition === id);
}

export default AbstractAnonymizationService;
