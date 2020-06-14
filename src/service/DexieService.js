import Dexie from 'dexie';

import Util from './Util';

const dedasDb = new Dexie('DeDaSDb');
dedasDb.version(1).stores({ documents: 'dexieId, timestamp' });

const getDocumentDb = () => dedasDb.documents;

const addDocument = (document) =>
    addDocumentWithId(Util.getRandomString(), document);

const addDocumentWithId = (id, document) =>
    getDocumentDb().add({ dexieId: id, timestamp: Date.now(), payload: document });

const getDocumentById = (id) => getDocumentDb().get(id);

const flushDocumentDb = () => getDocumentDb().clear();

export default {
    addDocument,
    addDocumentWithId,
    getDocumentById,
    flushDocumentDb
};
