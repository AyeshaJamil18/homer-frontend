import AnonymizationFactoryService from './AnonymizationFactoryService';

/**
 * Takes many assignments and applies them to the document
 */
class AnonymizationWorkerService {
    finishedJobs = -2;
    totalJobs = -1;
    process(assignments: [AnonymizationAssignment], document): void {
        this.finishedJobs = 0;
        this.totalJobs = assignments.length;
        for (let index = 0; index < assignments.length; ++index) {
            AnonymizationFactoryService.getServiceForName(assignments[index].type)
                .apply(assignments[index], document);
        }

    }
    getCurrentStatus = () => this.finishedJobs / this.totalJobs;
}
export default AnonymizationWorkerService;
