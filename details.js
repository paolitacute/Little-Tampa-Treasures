import { items } from './data.js';

const urlParams = new URLSearchParams(window.location.search);
const selectedId = urlParams.get('id');

const container = document.getElementById('detail-container');
const item = items.find(entry => String(entry.id) === String(selectedId));

// Redirect to 404 page if ID is missing or invalid
if (!item) {
  window.location.replace('404.html');
} else {
  // Generate 3-tiered dollar signs
  const maxPrice = 3;
  const priceHtml = Array.from({ length: maxPrice }, (_, index) => {
    const isActive = index < (item.price || 0);
    return `<span class="price-dollar ${isActive ? 'active' : 'inactive'}">$</span>`;
  }).join('');

  // Render details view
  container.innerHTML = `
    <article class="detail-card">
      <img src="${item.image}" alt="${item.title}" class="detail-image">

      <div class="detail-body">
        <div class="tags-container">
          ${(item.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>

        <h1 style="margin-bottom: 0.5rem;">${item.title}</h1>
        ${item.description ? `<p>${item.description}</p>` : ''}

        <div class="meta-info">
          <div class="meta-row">
            <span class="meta-label">PRICE RANGE</span>
            <div class="price-container">
              ${priceHtml}
            </div>
          </div>

          ${item.address ? `
            <div class="meta-row">
              <span class="meta-label">ADDRESS</span>
              <address style="margin: 0; font-style: normal;">
                ${item.address}
              </address>
            </div>
          ` : ''}
        </div>
      </div>
    </article>
  `;
}