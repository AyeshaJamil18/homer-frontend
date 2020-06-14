/**
 * Represents an assignment of an anonymization on a single column.
 * Example: hash column with orderId 4 with salt
 * type = 'hash', options = {salt: true}, columnOrderId = 4
 */
class AnonymizationAssignment {
    constructor(type, options, columnOrderId) {
        this.type = type;
        this.options = options;
        this.columnOrderId = columnOrderId;
    }
}

export default AnonymizationAssignment;
