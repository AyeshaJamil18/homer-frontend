import { readString } from 'react-papaparse';
import KloudlessService from '../KloudlessService';

const FILE_SIZE_LIMIT = process.env.REACT_APP_FILE_SIZE_LIMIT || 10000000;
const COLUMN_COUNT_LIMIT = process.env.REACT_APP_FILE_COLUMN_COUNT_LIMIT || 50;


const readFromKloudlessToCsv = (name) => {
    const content = KloudlessService.getContent(name);
    console.log('Parsing input');
    return readString(content, { header: true });
};

const convertToDocumentObj = (data) => {
    const columnHeaders = data.meta.fields;
    const columnHeadersObject = columnHeaders.map((column, index) => {
        return { title: column, orderPosition: index, data: [] };
    }).reduce((obj, item) => {
        obj[item.title] = item;
        return obj;
    }, {});

    // Clean up trailing invalid entries with only one empty entry (are generated by trailing new lines)
    let index = data.data.length - 1;
    while (index > 0 && Object.keys(data.data[index]).length === 1 &&
    data.data[index][Object.keys(data.data[index])[0]] === '') {
        index--;
        data.data.pop();
    }

    data.data.forEach(row => {
        Object.keys(columnHeadersObject)
            .forEach(column => columnHeadersObject[column].data.push(row[column]));
    });

    return { headers: columnHeaders, data: columnHeadersObject };
};


export default {
    readFromKloudlessToCsv,
    convertToDocumentObj
};
