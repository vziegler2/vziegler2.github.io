document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown');
    const showCheckboxesButton = document.getElementById('showCheckboxes');
    const checkboxContainer = document.getElementById('checkboxContainer');
    const fileUpload = document.getElementById('fileUpload');
    const uploadButton = document.getElementById('uploadButton');
    const emailContainer = document.getElementById('emailContainer');
    const emailInput = document.getElementById('emailInput');
    const sendButton = document.getElementById('sendButton');

    let checkboxes = {
        'A': ['Checkbox 1', 'Checkbox 2'],
        'B': ['Checkbox 3', 'Checkbox 4']
    };

    let selectedFiles = {};

    showCheckboxesButton.addEventListener('click', () => {
        const selectedOption = dropdown.value;
        if (selectedOption) {
            displayCheckboxes(selectedOption);
        } else {
            alert('Bitte wählen Sie zuerst eine Option aus dem Dropdown-Menü.');
        }
    });

    function displayCheckboxes(option) {
        checkboxContainer.innerHTML = '';
        checkboxes[option].forEach((label) => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="${label}" name="${label}" ${selectedFiles[label] ? 'style="display:none;"' : ''}>
                <label for="${label}">${label}</label>
                ${selectedFiles[label] ? `<span class="file-name">${selectedFiles[label]}</span>` : ''}
            `;
            checkboxContainer.appendChild(checkboxItem);
        });
    }

    uploadButton.addEventListener('click', () => {
        const checkedBoxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
        if (checkedBoxes.length > 0) {
            fileUpload.click();
        } else {
            alert('Bitte wählen Sie mindestens eine Checkbox aus, bevor Sie eine Datei hochladen.');
        }
    });

    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const checkedBoxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
        
        checkedBoxes.forEach(checkbox => {
            selectedFiles[checkbox.id] = file.name;
            checkbox.style.display = 'none';
            const fileNameSpan = document.createElement('span');
            fileNameSpan.className = 'file-name';
            fileNameSpan.textContent = file.name;
            checkbox.parentElement.appendChild(fileNameSpan);
        });

        if (Object.keys(selectedFiles).length > 0) {
            emailContainer.style.display = 'block';
        }

        // Refresh the checkbox display
        displayCheckboxes(dropdown.value);
    });

    sendButton.addEventListener('click', () => {
        const email = emailInput.value;
        if (email && Object.keys(selectedFiles).length > 0) {
            // Hier würde normalerweise der E-Mail-Versand implementiert werden
            console.log('Sende E-Mail an:', email);
            console.log('Mit den Daten:', JSON.stringify(selectedFiles));
            alert('E-Mail wurde gesendet (Simulation)');
        } else {
            alert('Bitte geben Sie eine E-Mail-Adresse ein und laden Sie mindestens eine Datei hoch.');
        }
    });
});