const API_URL = 'https://jsonplaceholder.typicode.com/users';

const handleFilterChange = () => {
    const filterType = document.getElementById('filterType').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    filterUsers(filterType, searchText);
};

const filterUsers = async (filterType, searchText) => {
    try {
        const users = await fetchUsers();
        const filteredUsers = users.filter(user => 
            user[filterType].toLowerCase().includes(searchText)
        );
        renderUsers(filteredUsers);
    } catch (error) {
        console.error('Errore durante il filtro degli utenti:', error);
    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Errore nel recupero degli utenti');
        return await response.json();
    } catch (error) {
        console.error('Errore durante il fetch degli utenti:', error);
        return [];
    }
};

const renderUsers = (users) => {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
        </tr>
    `).join('');
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const filterType = document.getElementById('filterType');
    const searchInput = document.getElementById('searchInput');

    filterType.addEventListener('change', handleFilterChange);
    searchInput.addEventListener('input', handleFilterChange);
    
    // Carica gli utenti iniziali
    handleFilterChange();
});
