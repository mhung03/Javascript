const products = [
  { id: 1, name: 'Áo thun', price: 150000, image: 'https://via.placeholder.com/180x120?text=Aothun' },
  { id: 2, name: 'Quần jeans', price: 300000, image: 'https://via.placeholder.com/180x120?text=Jeans' },
  { id: 3, name: 'Giày thể thao', price: 500000, image: 'https://via.placeholder.com/180x120?text=Shoes' },
  { id: 4, name: 'Mũ lưỡi trai', price: 120000, image: 'https://via.placeholder.com/180x120?text=Hat' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');
const totalDiv = document.getElementById('total');

function formatCurrency(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function renderProducts() {
  productsDiv.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Giá: ${formatCurrency(product.price)}</p>
      <button data-id="${product.id}">Thêm vào giỏ</button>
    `;
    productsDiv.appendChild(div);
  });
}

function renderCart() {
  cartDiv.innerHTML = '';
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p class="empty">Giỏ hàng trống.</p>';
    totalDiv.textContent = 'Tổng tiền: 0₫';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-details">
        <h4>${product.name}</h4>
        <p>Số lượng: ${item.quantity}</p>
        <p>Giá: ${formatCurrency(product.price * item.quantity)}</p>
      </div>
      <button data-id="${item.id}">Xóa</button>
    `;
    cartDiv.appendChild(div);
  });

  total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  totalDiv.textContent = `Tổng tiền: ${formatCurrency(total)}`;
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: id, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

productsDiv.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = parseInt(e.target.getAttribute('data-id'));
    addToCart(id);
  }
});

cartDiv.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = parseInt(e.target.getAttribute('data-id'));
    removeFromCart(id);
  }
});

renderProducts();
renderCart();
