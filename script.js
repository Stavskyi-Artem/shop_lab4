document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');

    fetch('products.json')
        .then(res => res.json())
        .then(data => {
            renderProducts(data);

            categoryFilter.addEventListener('change', () => filterAndRender(data));
            priceFilter.addEventListener('input', () => {
                priceValue.textContent = priceFilter.value;
                filterAndRender(data);
            });
        });

    function renderProducts(products) {
        container.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price-cart">
          <span class="price">${product.price} грн</span>
          <button class="add-to-cart">Купити</button>
        </div>
      `;
            card.querySelector('.add-to-cart').addEventListener('click', () => {
                alert(`${product.name} додано до кошика!`);
            });
            container.appendChild(card);
        });
    }

    function filterAndRender(data) {
        const category = categoryFilter.value;
        const maxPrice = parseInt(priceFilter.value, 10);

        const filtered = data.filter(p =>
            (category === 'all' || p.category === category) &&
            p.price <= maxPrice
        );

        renderProducts(filtered);
    }
});
