import DeleteAnonymizationService from './AnonymizationImplementation/DeleteAnonymizationService';
import GeneralizationAnonymizationService from './AnonymizationImplementation/GeneralizationAnonymizationService';
import HashAnonymizationService from './AnonymizationImplementation/HashAnonymizationService';
import MaskAnonymizationService from './AnonymizationImplementation/MaskAnonymizationService';
import RandomAnonymizationService from './AnonymizationImplementation/RandomAnonymizationService';
import AbstractAnonymizationService from './AbstractAnonymizationService';

/**
 * Returns a implementation for a String.
 * Example: "hash" -> HashAnonymizationService
 */
class AnonymizationFactoryService {
    static getServiceForName(name: String): AbstractAnonymizationService {
        if (name === DeleteAnonymizationService.getName()) {
            return DeleteAnonymizationService;
        }

        if (name === GeneralizationAnonymizationService.getName()) {
            return GeneralizationAnonymizationService;
        }

        if (name === HashAnonymizationService.getName()) {
            return HashAnonymizationService;
        }

        if (name === MaskAnonymizationService.getName()) {
            return MaskAnonymizationService;
        }

        if (name === RandomAnonymizationService.getName()) {
            return RandomAnonymizationService;
        }

        // Default case
        throw Error('Anonymization service ' + name + ' does not exist');
    }
}

export default AnonymizationFactoryService;
