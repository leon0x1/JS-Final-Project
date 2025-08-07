'use strict';
/*שמות מגישים:
ליאון מברין
יאיל סאלם*/

// Search contacts by name (partial, case-insensitive, shows all if empty)
document.getElementById('searchButton').addEventListener('click', e => {
    e.preventDefault();

    const searchInput = document.getElementById('search');
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        // If there is no input – show all users
        buildContactList(contacts);
        return;
    }

    const result = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query)
    );

    buildContactList(result);
});
