// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// To-Do List App
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initialize todo list
renderTodos();

// Product Listing App
const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999.99, rating: 4.5 },
    { id: 2, name: 'Smartphone', category: 'electronics', price: 699.99, rating: 4.2 },
    { id: 3, name: 'Headphones', category: 'electronics', price: 149.99, rating: 4.0 },
    { id: 4, name: 'T-Shirt', category: 'clothing', price: 19.99, rating: 3.8 },
    { id: 5, name: 'Jeans', category: 'clothing', price: 49.99, rating: 4.1 },
    { id: 6, name: 'Sofa', category: 'home', price: 799.99, rating: 4.3 },
    { id: 7, name: 'Coffee Table', category: 'home', price: 149.99, rating: 3.9 },
    { id: 8, name: 'Desk Lamp', category: 'home', price: 29.99, rating: 4.0 }
];

const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const priceSort = document.getElementById('price-sort');

function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="https://via.placeholder.com/150" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p>Rating: ${product.rating}/5</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

function filterAndSortProducts() {
    let filteredProducts = [...products];
    
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Sort by price
    const sortOption = priceSort.value;
    if (sortOption === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    renderProducts(filteredProducts);
}

categoryFilter.addEventListener('change', filterAndSortProducts);
priceSort.addEventListener('change', filterAndSortProducts);

// Initialize product listing
renderProducts(products);

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log({ name, email, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Project Card Interactions
document.getElementById('portfolio-project').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('todo-project').addEventListener('click', () => {
    document.querySelector('#todo-demo').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('product-project').addEventListener('click', () => {
    document.querySelector('#product-demo').scrollIntoView({ behavior: 'smooth' });
});