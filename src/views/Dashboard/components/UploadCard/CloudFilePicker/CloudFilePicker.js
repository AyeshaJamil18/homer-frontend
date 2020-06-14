import filePicker from '@kloudless/file-picker';

const CloudFilePicker = filePicker.picker({
    app_id: 'g5oYEe0seQZUPOrI3Ob9GVpLwZ8rtbLI3TqBOIYKfgk16zd_',
    services: ['dropbox', 'box', 'gdrive', 'skydrive'],
    multiselect: false
});

export default CloudFilePicker;
