// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load data
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    loadRecentOrders();
});

function loadBooks() {
    // Load books data
    const booksContainer = document.getElementById('books-container');
    db.collection('books').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.innerHTML = `<img src="${book.image}" alt="${book.title}"><h4>${book.title}</h4>`;
            booksContainer.appendChild(bookElement);
        });
    });
}

function loadRecentOrders() {
    // Load recent orders data
    const ordersContainer = document.getElementById('recent-orders');
    db.collection('orders').orderBy('date', 'desc').limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const order = doc.data();
            const orderElement = document.createElement('tr');
            orderElement.innerHTML = `
                <td>${order.invoiceNo}</td>
                <td>${order.productName}</td>
                <td>${order.date}</td>
                <td>${order.price}</td>
                <td>${order.status}</td>
                <td><button>Detail</button></td>
            `;
            ordersContainer.appendChild(orderElement);
        });
    });
}

function uploadBook() {
    // Upload new book functionality
    alert('Upload new book functionality coming soon!');
}
