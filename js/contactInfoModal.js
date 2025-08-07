'use strict';
/*שמות מגישים:
ליאון מברין
יאיל סאלם*/

/* Code for displaying the info of contact's modal (when clicking on the info button on each contact) as well as deleting and editing certain contacts,
 Uses the same array from the contactsList.js file */

const modalContent = document.querySelector('.modal-content');

// Span to contain relevant contact's information
const contactModaInfo = document.createElement('span');

// Edit contact info modal
const editContactModal = document.getElementById('editContact');

// Fields from the edit contact modal
const editName = document.getElementById('editName');
const editPhoneNum = document.getElementById('editPhoneNum');
const editMail = document.getElementById('editMail');
const editAddress = document.getElementById('editAddress');
const editAge = document.getElementById('editAge');
const editImage = document.getElementById('editImage');

// Function to fill the modal with the relevant contact info
function fillPopup(index) {

    // Resetting the info displayed in order to display one contact's info at a time
    contactModaInfo.innerHTML = '';


    contactModaInfo.innerHTML =
        `<h2 class="contactName">${contacts[index].name}</h2>
         <p class="contactDetails age">Age: ${contacts[index].age}</p>
         <p class="contactDetails phoneNumber">Phone Number: ${contacts[index].phoneNum}</p>
         <p class="contactDetails contactAddress">Address: ${contacts[index].address}</p>`;

    modalContent.append(contactModaInfo);

}

// Closing the edit modal
const closeEditModal = () => {
    editContactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

const contactModal = document.querySelector('.modal');

const contactInfoList = document.getElementById('contactList');


contactInfoList.addEventListener('click', e => {
    e.preventDefault();

    // Opening the modal and displaying the revelant contact's info
    const infoBtn = e.target.closest('.infoButton');

    if (infoBtn) {

        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        fillPopup(Number(infoBtn.getAttribute('data-id')));
    }

    // Removing a specific from the list and array
    const removeBtn = e.target.closest('.removeButton');

    if (removeBtn) {
        const index = Number(removeBtn.getAttribute('data-id'));
        const contactName = contacts[index].name;

        const confirmed = confirm(`Are you sure you want to delete "${contactName}"?`);
        if (confirmed) {
            contacts.splice(index, 1);
            buildContactList(contacts);
        }
    }


    // Editing a contact's information
    const editBtn = e.target.closest('.editButton');

    if (editBtn) {
        editContactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Setting relavent data for fields
        const index = Number(editBtn.getAttribute('data-id'));

        editName.value = contacts[index].name;
        editPhoneNum.value = contacts[index].phoneNum;
        editMail.value = contacts[index].email;
        editAddress.value = contacts[index].address;
        editAge.value = contacts[index].age;
        editImage.value = contacts[index].image;


        document.getElementById('backBtn').addEventListener('click', () => {
            closeEditModal();
        });

        document.getElementById('saveChangesBtn').addEventListener('click', e => {
            e.preventDefault();

            // Updating the contact's info in the array to the new info provided by the user
            let updatedContacts = contacts.map((elem, arrInd) => {
                if (arrInd === index) {
                    elem.name = editName.value.trim();
                    elem.phoneNum = editPhoneNum.value.trim();
                    elem.email = editMail.value.trim();
                    elem.address = editAddress.value.trim();
                    elem.age = editAge.value.trim();
                    elem.image = editImage.value.trim();
                }

                return elem;

            });

            closeEditModal();

            buildContactList(updatedContacts);

        });
    }

});

const close = document.querySelector('.close');

const modal = document.querySelector('.modal');

// Closing the modal
modal.addEventListener('click', e => {

    // If the user clicks either outside the main body of the modal (i.e where the contact info is displayed) or on the close button
    if (e.target === modal || e.target === close) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});