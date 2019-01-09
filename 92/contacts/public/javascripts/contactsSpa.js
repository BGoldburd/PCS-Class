/*global $*/
(function () {
    'use strict';

    let contacts = [];
    let addContactForm = $('#addContactForm');
    let updateContactForm = $('#updateContactForm');
    let loadSingleForm = $('#loadSingleForm');
    let singleContactContainer = $('#singleContactContainer');
    let singleContact = $('#singleContact');
    let errorContainer = $('#errorContainer');
    let errorBox = $('#errorBox');
    let theTableBody = $('#contactsTable tbody');
    let idToUpdate;

    $('#addContact').click(function () {
        addContactForm.slideDown('fast');
    });

    $('#loadSingle').click(function () {
        loadSingleForm.slideDown('fast');
    });

    theTableBody.on('click', 'button.delete', event => {
        const rowToDelete = $(event.target).closest('tr');
        $.ajax({
            method: 'DELETE',
            url: `/api/contacts/${rowToDelete.data('contactId')}`,
            success: () => {
                rowToDelete.remove();
            }
        }).fail(xhr => {
            errorContainer.show();
            errorBox.text(xhr.responseText);
        });
    });

    function addContact(newContact) {
        if (!contacts.length) {
            theTableBody.empty();
        }

        contacts.push(newContact);

        $(`<tr>
            <td>${newContact.firstname}</td>
            <td>${newContact.lastname}</td>
            <td>${newContact.email}</td>
            <td>${newContact.phone}</td>
            <td><button class="delete">delete</button></td>
            <td><button class="update">update</button></td>
        </tr>`)
        .appendTo(theTableBody)
        .data('contactId', newContact.id);
    }

    let firstNameElem = $('#first');
    let lastNameElem = $('#last');
    let emailElem = $('#email');
    let phoneElem = $('#phone');

    addContactForm.submit(function (event) {
        let newContact = {
            firstname: firstNameElem.val(),
            lastname: lastNameElem.val(),
            email: emailElem.val(),
            phone: phoneElem.val()
        };

        $.post('/api/contacts', newContact, res => {
            addContact(res);
        }, 'json').fail(xhr => {
            errorContainer.show();
            errorBox.text(xhr.responseText);
        });


        hideAddContactForm();

        event.preventDefault();
    });

    let firstNameUpdater = $('#updateFirst');
    let lastNameUpdater = $('#updateLast');
    let emailUpdater = $('#updateEmail');
    let phoneUpdater = $('#updatePhone');

    theTableBody.on('click', 'button.update', event => {
        updateContactForm.slideDown('fast');
        let rowToUpdate = $(event.target).closest('tr');
        firstNameUpdater.val(rowToUpdate[0].children[0].innerHTML);
        lastNameUpdater.val(rowToUpdate[0].children[1].innerHTML);
        emailUpdater.val(rowToUpdate[0].children[2].innerHTML);
        phoneUpdater.val(rowToUpdate[0].children[3].innerHTML);
        idToUpdate = rowToUpdate.data('contactId');
    });

    updateContactForm.submit(() => {
        let updatedContact = {
            id: idToUpdate,
            firstname: firstNameUpdater.val(),
            lastname: lastNameUpdater.val(),
            email: emailUpdater.val(),
            phone: phoneUpdater.val()
        };

        $.ajax({
            method: 'PUT',
            url: '/api/contacts',
            data: updatedContact,
            success: () => {
                theTableBody.empty();
                $.get('/api/contacts', loadedContacts => {
                    loadedContacts.forEach(contact => addContact(contact));
                });
            }
        }).fail(xhr => {
            errorContainer.show();
            errorBox.text(xhr.responseText);
        });

        hideupdateContactForm();
        event.preventDefault();
    });

    loadSingleForm.submit(event => {
        $.get(`api/contacts/${$('#contactId').val()}`, loadedContact => {
            loadedContact.forEach(c => {
                singleContact.append(`<span><b>First Name: </b>${c.firstname}</span><br>
                                        <span><b>Last Name: </b>${c.lastname}</span><br>
                                        <span><b>Phone: </b>${c.phone}</span><br>
                                        <span><b>Email: </b>${c.email}</span>
                                        `);
            });
            singleContactContainer.slideDown('fast');
        }).fail(xhr => {
            errorContainer.show();
            errorBox.text(xhr.responseText);
        });
        
        hideLoadSingleForm();
        event.preventDefault();
    });

    $('#addCancel').click(function () {
        hideAddContactForm();
    });

    function hideAddContactForm() {
        addContactForm.slideUp('fast');
        addContactForm[0].reset();
    }

    $('#loadSingleCancel').click(function () {
        hideLoadSingleForm();
    });

    function hideLoadSingleForm() {
        loadSingleForm.slideUp('fast');
        loadSingleForm[0].reset();
    }

    $('#updateCancel').click(() => {
        hideupdateContactForm();
    });

    function hideupdateContactForm() {
        updateContactForm.slideUp('fast');
        updateContactForm[0].reset();
    }

    $('#doneSingle').click( () => {
        singleContactContainer.slideUp('fast');
        setTimeout(() => {
            singleContact.empty();
        }, 500);
    });

    $('#errorOk').click(() => {
        errorContainer.hide();
        errorBox.empty();
    });

    $.get('/api/contacts', loadedContacts => {
        loadedContacts.forEach(contact => addContact(contact));
    });
}());


