import { items } from './data.js';

const projects = items;

// 1. DOM Elements
const container = document.getElementById('cards-container');
const searchInput = document.getElementById('search');
const tagFiltersContainer = document.getElementById('tag-filters');

// 2. Dynamically Populate Tag Checkboxes from data.js
function populateTagFilters() {
  if (!tagFiltersContainer) return;

  // Extract all unique tags across all items
  const allTags = [...new Set(projects.flatMap(project => project.tags || []))];

  // Render the legend and checkboxes
  tagFiltersContainer.innerHTML = `
    <legend>Filter by Tags</legend>
    ${allTags.map(tag => `
      <label>
        <input type="checkbox" name="tag" value="${tag}">
        ${tag.charAt(0).toUpperCase() + tag.slice(1)}
      </label>
    `).join('')}
  `;
}

// 3. Render Function (Image, Title, and Tag Pills only)
function renderCards(data) {
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<p>No matching projects found.</p>';
    return;
  }

  container.innerHTML = data.map(card => `
    <a href="details.html?id=${card.id}" class="card-link">
      <article class="hover-card">
        <img src="${card.image}" alt="${card.title}" class="card-image">
        
        <div class="card-overlay">
          <h3 style="margin-bottom: 0;">${card.title}</h3>
          
          <div class="tags-container">
            ${(card.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    </a>
  `).join('');
}

// 4. Filter Logic
function handleFilters() {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  
  // Select active checkboxes dynamically
  const activeCheckboxes = document.querySelectorAll('input[name="tag"]:checked');
  const activeTags = Array.from(activeCheckboxes).map(box => box.value);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm);
    
    // An item matches if no tags are selected, or if it has ALL selected tags
    const matchesTags = activeTags.length === 0 || 
                        activeTags.every(tag => (project.tags || []).includes(tag));

    return matchesSearch && matchesTags;
  });

  renderCards(filteredProjects);
}

// 5. Initialize Page
populateTagFilters();
renderCards(projects);

// 6. Event Listeners
if (searchInput) {
  searchInput.addEventListener('input', handleFilters);
}

if (tagFiltersContainer) {
  tagFiltersContainer.addEventListener('change', handleFilters);
}