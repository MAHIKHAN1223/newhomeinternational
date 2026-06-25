/* ============================================================
   NEW HOME INTERNATIONAL — ANIMATIONS.JS
   Handles: scroll reveal, staggered grids, gallery filter,
            contact form submit
   ============================================================ */

// --- Intersection Observer for .reveal elements ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Observe all standalone .reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// --- Staggered reveal for grid containers (.reveal-stagger) ---
// JS adds .reveal to each child with incremental transition-delay
document.querySelectorAll('.reveal-stagger').forEach((container) => {
  const children = Array.from(container.children);
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
    child.classList.add('reveal');
    revealObserver.observe(child);
  });
});

// --- Gallery filter (gallery.html) ---
const filterBtns   = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      galleryItems.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? 'block' : 'none';
      });
    });
  });
}

// --- Contact form submit handler ---
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const successMsg = document.getElementById('form-success');
    if (successMsg) {
      successMsg.style.display = 'block';
      // Scroll the message into view
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    form.reset();
  });
}
