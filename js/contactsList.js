'use strict';
/*שמות מגישים:
ליאון מברין
יאיל סאלם*/

// Contacts array used across all of the JS files
let contacts =
    [
        {
            name: 'Bertie Yates',
            phoneNum: '0581234567',
            email: 'B.yates@gmail.com',
            address: 'Tel Aviv',
            age: '37',
            image: './images/contact1.jpg'
        },

        {
            name: 'Lindsey Joyner',
            phoneNum: '0586549243',
            email: 'Linn@hotmail.com',
            address: 'Haifa',
            age: '26',
            image: './images/contact2.jpg'
        },

        {
            name: 'Yusef Grant',
            phoneNum: '0485005000',
            email: 'GrYusef@gmail.com',
            address: 'Nazareth',
            age: '42',
            image: './images/contact3.png'
        }
    ];

// Creating and displaying a list element with each person's contact info
const contactList = document.getElementById('contactList');

const buildContactList = (contactsArr) => {

    // Ressetting the contacts list before building the new contact
    contactList.innerHTML = "";

    contactsArr.map((elem, index) => {
        const li = document.createElement('li');

        li.innerHTML =
            `<div class="contact">
        <img src="${elem.image}" class="contactPhoto">
        <div class="contactInfo">
            <h2>${elem.name}</h2>
            <p>Email: ${elem.email}</p>
            <p>Phone Number: ${elem.phoneNum}</p>
        </div>
        <div class="contactButtons">
            <button data-id="${index}" class="infoButton">Info</button>
            <button data-id="${index}" class="editButton">Edit</button>
            <button data-id="${index}" class="removeButton">Delete</button>
        </div>
    </div>`;

        contactList.append(li);
    });
};

buildContactList(contacts);

// Changing background color of contact when hovering over them
contactList.addEventListener('mouseover', e => {

    const currentContact = e.target.closest('li');
    if (currentContact)
        currentContact.classList.add('selected');
});

contactList.addEventListener('mouseout', e => {

    const currentContact = e.target.closest('li');

    if (currentContact)
        currentContact.classList.remove('selected');
});

// Button to delete all contacts
const delteAllBtn = document.getElementById('deleteAll');

delteAllBtn.addEventListener('click', () => {
    const confirmed = confirm("Are you sure you want to delete ALL contacts?");
    if (confirmed) {
        contacts = [];
        buildContactList(contacts);
    }
});


// Opening the modal to add a new contact
const newContactBtn = document.getElementById('addContact');

const newContactModal = document.getElementById('newContact');

newContactBtn.addEventListener('click', () => {
    newContactModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Closing the modal
const closeNewContact = () => {
    newContactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

document.getElementById('cancelBtn').addEventListener('click', () => {
    closeNewContact();
});

// Function that validate phone number
function isValidPhoneNumber(phone) {
    // Remove unnecessary spaces
    phone = phone.trim();

    // Check that the number is not empty
    if (phone.length === 0) return false;

    // Check that the length is between 6 and 15.
    if (phone.length < 6 || phone.length > 15) return false;

    // Check that every character is a digit (0–9)
    for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (char < '0' || char > '9') {
            return false;
        }
    }

    // If all the tests are passed, the number is valid.
    return true;
}

// Function that validate email address
function isValidEmail(email) {

    // Remove unnecessary spaces
    email = email.trim();

    // must contain @
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return false;

    // @ Cannot be at the beginning or the end
    if (atIndex === 0 || atIndex === email.length - 1) return false;

    // Must contain a dot after the @
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1) return false;

    // the point cannot be the last one
    if (dotIndex === email.length - 1) return false;

    // If all tests are passed, the email is valid
    return true;
}



// Saving the new contact and adding them to the array and list displayed to the user
document.getElementById('saveBtn').addEventListener('click', e => {
    e.preventDefault();

    // Getting data from fields
    const name = document.getElementById('contactName');
    const phoneNum = document.getElementById('phoneNum');
    const mail = document.getElementById('mail');
    const address = document.getElementById('address');
    const age = document.getElementById('age');
    const image = document.getElementById('image');

    // Checking if the user has filled out the contact's name and phone number
    if (name.value && phoneNum.value) {

        // Make sure the phone is valid
        if (!isValidPhoneNumber(phoneNum.value)) {
            alert('Phone number must contain only digits, and be 6–15 digits long.');
            return;
        }

        if (mail.value && !isValidEmail(mail.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Setting a default photo for the contact is the user didn't provide one
        if (!image.value) {
            image.value = './images/defaultPhoto.png';
        }

        // Creating the new contact object and adding to the array
        const newContact = {
            name: name.value.trim(),
            phoneNum: phoneNum.value.trim(),
            email: mail.value.trim(),
            address: address.value.trim(),
            age: age.value.trim(),
            image: image.value.trim()
        };

        contacts.push(newContact);
        name.value = '';
        phoneNum.value = '';
        mail.value = '';
        address.value = '';
        age.value = '';
        image.value = '';

        // Closing the popup and rebuilding the contact list
        closeNewContact();

        buildContactList(contacts);
    } else {
        alert('Contact must contain both name and phone number!');
    }

});
