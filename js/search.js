'use strict';
/*שמות מגישים:
ליאון מברין
יאיל סאלם*/

// Searching contacts by name
document.getElementById('searchButton').addEventListener('click', e => {

    const searchTarget = document.getElementById('search');

    e.preventDefault();

    if (searchTarget) {


        let result = contacts.filter(elem => {
            if (elem.name.toLowerCase() === searchTarget.value.trim().toLowerCase()) {
                return true;
            }

            return false;

        });

        buildContactList(result);
    }

});