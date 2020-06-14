import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { DocumentListTable, DocumentListToolbar } from './components';
import { DocumentService, AccessGroupService } from 'service';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const MyDocumentList = () => {
    const classes = useStyles();
    const privacyOptions = { PUBLIC: 'public', PRIVATE: 'private', SHARED: 'shared' };

    const [activeChip, setActiveChip] = useState(privacyOptions.PRIVATE);
    const [privateDocumentList] = React.useState([]);
    const [publicDocumentList] = React.useState([]);
    const [sharedDocumentList] = React.useState([]);
    const [activeDocumentList, setActiveDocumentList] = React.useState([]);
    const [documentListMap] = React.useState({'public': publicDocumentList, 'private': privateDocumentList, 'shared': sharedDocumentList});
    const [value,setValue] = React.useState('');
    const changeActiveChip = (myActiveChip) => {
        setActiveChip(myActiveChip);
        let activeList;
        if (myActiveChip == privacyOptions.PRIVATE) {
            activeList = privateDocumentList;
        } else if (myActiveChip == privacyOptions.SHARED) {
            activeList = sharedDocumentList;
        } else if (myActiveChip == privacyOptions.PUBLIC) {
            activeList = publicDocumentList;
        }
        activeList.sort((doc1, doc2) => {
            const doc1UpdateTime = new Date(doc1.createdAt).getTime();
            const doc2UpdateTime = new Date(doc2.createdAt).getTime();
            return doc1UpdateTime > doc2UpdateTime ? -1 : 1;
        })
        setActiveDocumentList(activeList);
    };

    const putDocumentToAnotherList = (oldPrivacy, newPrivacy, document) => {
        let oldList = documentListMap[oldPrivacy];
        let newList = documentListMap[newPrivacy];
        let oldIndex = oldList.findIndex(doc => doc.id === document.id);
        oldList.splice(oldIndex, 1);
        newList.push(document);
    }

    const deleteAccessModifierOfDocument = (documentId, modifier) => {
        return AccessGroupService.deleteDocumentAccessGroupModifier(documentId, modifier);
    }

    const shareDocumentToNew = (oldPrivacy, newPrivacy, document, accessGroupObject) => {
        if(newPrivacy === privacyOptions.PUBLIC ) {
            if(oldPrivacy === privacyOptions.PRIVATE) { // private -> public
                const body = {private: false};
                return DocumentService.updateDocumentPrivacy(document.id, body)
                    .then(resp => resp.json())
                    .then(data => {
                        putDocumentToAnotherList(oldPrivacy, newPrivacy, data.doc)
                        changeActiveChip(oldPrivacy);
                        return Promise.resolve(data.doc);
                    })
                    .catch((e) => {
                        console.log(e);
                        return Promise.reject(null);
                    });
            } else { // shared -> public
                let p1 = DocumentService.updateDocumentPrivacy(document.id, {private:false}).then(r1 => r1.json()).catch(e => Promise.reject(e));
                let p2 = deleteAccessModifierOfDocument(document.id, 'r').then(resp => resp.status === 200 ? Promise.resolve(true) : Promise.reject(resp.status));
                return Promise.all([p1,p2])
                .then(([updatedDocument, accessGroup]) => {
                    putDocumentToAnotherList(oldPrivacy, newPrivacy, updatedDocument.doc)
                    changeActiveChip(oldPrivacy)
                    return Promise.resolve(updatedDocument.doc);
                })
                .catch((e) => {
                    console.log(e);
                    return Promise.reject(null);
                });
            }
        } else if(newPrivacy === privacyOptions.SHARED) {
            if(oldPrivacy !== privacyOptions.SHARED) { // public/private -> shared
                // create accessGroup
                let p1 = DocumentService.updateDocumentPrivacy(document.id, {private:true}).then(r1 => r1.json()).catch(e => Promise.reject(e));
                let p2 = AccessGroupService.createAccessGroup(accessGroupObject.accessGroup).then(r2 => r2.json()).catch(e => Promise.reject(e));
                return Promise.all([p1,p2])
                .then(([updatedDocument, accessGroup]) => {
                    putDocumentToAnotherList(oldPrivacy, newPrivacy, updatedDocument.doc)
                    changeActiveChip(oldPrivacy)
                    return Promise.resolve(updatedDocument.doc);
                })
                .catch((e) => {
                    console.log(e);
                    return Promise.reject(null);
                });
            } else { // shared -> shared (user addition or deletion)
                let p1,p2;
                if(accessGroupObject.addedUsers.userIds.length > 0) {
                    // add users to exist access group
                    p1 = AccessGroupService.addUsersToAccessGroup(document.id, accessGroupObject.accessGroup.modifier, accessGroupObject.addedUsers)
                            .then(resp => resp.text())
                            .catch((e) => Promise.reject(e));
                }
                if(accessGroupObject.deletedUsers.userIds.length > 0) {
                    // delete user api
                }
                return Promise.all([p1, p2])
                .then(([addedUserResult, deletedUserResult]) => {
                    return Promise.resolve(true);
                })
                .catch((e) => {
                    console.log(e);
                    return Promise.reject(null);
                });
            }
        } else if(newPrivacy === privacyOptions.PRIVATE) {
            if(oldPrivacy === privacyOptions.SHARED) { // shared -> private
                return deleteAccessModifierOfDocument(document.id, 'r') //then(resp => resp.status === 200 ? Promise.resolve(true) : Promise.reject(resp.status));
                    .then(resp => {
                        if(resp.status === 200) {
                            putDocumentToAnotherList(oldPrivacy, newPrivacy, document)
                            changeActiveChip(oldPrivacy);
                            return Promise.resolve(true)
                        } else {
                            Promise.reject(resp.status)
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        return Promise.reject(null);
                    });
            } else { // public -> private
                return DocumentService.updateDocumentPrivacy(document.id, {private:true})
                    .then(resp => resp.json())
                    .then(data => {
                        putDocumentToAnotherList(oldPrivacy, newPrivacy, data.doc)
                        changeActiveChip(oldPrivacy);
                        return Promise.resolve(data.doc);
                    })
                    .catch((e) => {
                        console.log(e);
                        return Promise.reject(null);
                    });
            }
        } else {
            return Promise.reject(null);
        }
    }

    useEffect(() => {
        DocumentService.getDocument()
            .then(resp => resp.json())
            .then(data => {
                data.docs.forEach(doc => {
                        if (doc.privacy === privacyOptions.PRIVATE) {
                            privateDocumentList.push(doc);
                        } else if (doc.privacy === privacyOptions.SHARED) {
                            sharedDocumentList.push(doc);
                        } else if (doc.privacy === privacyOptions.PUBLIC) {
                            publicDocumentList.push(doc);
                        }
                    }
                );
                // setActiveDocumentList(privateDocumentList);
                changeActiveChip(activeChip)
            }).catch((e) => {
            console.log(e);
        });
    }, []);

    // const searchDocument = (event) => {
    //     const tempKeyword = event.target.value;
    //     setActiveDocumentList(documentListMap[activeChip].filter(doc => doc.title.includes(tempKeyword)));
    //     setValue(tempKeyword);
    // }

    return (
        <div className={classes.root}>
            <DocumentListToolbar selectActiveChip={changeActiveChip} privacyOptions={privacyOptions}/>
            <div className={classes.content}>
                <DocumentListTable activeDocumentList={activeDocumentList} activePrivacy={activeChip} privacyOptions={privacyOptions} shareFunction={shareDocumentToNew}/>
            </div>
        </div>
    );
};

export default MyDocumentList;
