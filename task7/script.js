const userContainer = document.getElementById('user-container');
const fetchBtn = document.getElementById('fetch-btn');

fetchBtn.addEventListener('click', () => {
    userContainer.innerHTML = "<p>Loading...</p>";

    fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(data => {
            userContainer.innerHTML = ''; // Clear loading text

            data.results.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <img src="${user.picture.large}" alt="${user.name.first}">
                    <h2>${user.name.first} ${user.name.last}</h2>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
                `;
                userContainer.appendChild(userCard);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            userContainer.innerHTML = `<p style="color:red;">Failed to load data</p>`;
        });
});
