/* ==========================================================
   Dream Day – Wedding Planner | script.js
   Plain vanilla JavaScript. Data is saved with localStorage.
   ========================================================== */

// ---------- Data ----------
const services = [
  {
    name: 'Wedding Decoration',
    img: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=800&q=80',
    desc: 'Floral arches, table centrepieces and stage backdrops that turn your venue into a fairytale.',
    details: 'Our decoration packages include theme design, fresh floral arrangements, mandap setup, drapes and warm lighting. Share your colour palette and we will suggest a complete plan.'
  },
  {
    name: 'Catering',
    img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    desc: 'Delicious multi-cuisine menus, live counters and desserts that your guests will remember.',
    details: 'Choose from vegetarian, non-vegetarian or mixed menus. Packages include starters, main course, live counters, desserts and beverages, with service staff for the whole event.'
  },
  {
    name: 'Photography',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    desc: 'Candid and cinematic photo coverage that captures every laugh, tear and dance step.',
    details: 'Our photographers offer pre-wedding shoots, candid coverage of the main events, a cinematic highlight film and a beautifully designed album delivered after the wedding.'
  },
  {
    name: 'Makeup Artist',
    img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80',
    desc: 'Professional bridal makeup and hairstyling for a radiant look on your big day.',
    details: 'Includes a skin consultation, bridal makeup and hairstyling, a trial session before the wedding, and touch-up support during the event for the bride and bridal party.'
  },
  {
    name: 'Bridal Wear',
    img: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
    desc: 'Bridal lehengas, sarees and gowns with tailoring and fittings made just for you.',
    details: 'Browse bridal outfits and groom wear from our partner boutiques. We offer personal styling sessions, custom alterations and multiple fitting appointments.'
  },
  {
    name: 'Music and Entertainment',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    desc: 'Live bands, DJs, dhol performers and entertainment that keeps the dance floor full.',
    details: 'Select from live bands, DJs, dhol troupes, emcees and sangeet choreography. We will help you build a playlist and timeline for each celebration.'
  },
  {
    name: 'Wedding Invitations',
    img: 'https://images.unsplash.com/photo-1607190074256-dd5f1ccbb2a7?auto=format&fit=crop&w=800&q=80',
    desc: 'Elegant printed and digital invitation cards designed to match your wedding theme.',
    details: 'Choose from classic, floral or modern designs. We offer printed cards with envelopes, digital e-invites, and save-the-date cards, with RSVP tracking options.'
  },
  {
    name: 'Wedding Venues',
    img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    desc: 'Handpicked lawns, ballrooms, beach pavilions and heritage palaces for every style.',
    details: 'We shortlist venues by location, capacity and budget, arrange site visits, and help you negotiate the best package for your guest list and date.'
  }
];

const venues = [
  {
    id: 'rose-garden',
    name: 'Rose Garden Estate',
    location: 'Jaipur, Rajasthan',
    price: 350000,
    capacity: 300,
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lakeview',
    name: 'Lakeview Grand Ballroom',
    location: 'Udaipur, Rajasthan',
    price: 520000,
    capacity: 500,
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'seaside',
    name: 'Seaside Pavilion',
    location: 'North Goa, Goa',
    price: 450000,
    capacity: 250,
    img: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'heritage',
    name: 'Heritage Palace Lawns',
    location: 'Jodhpur, Rajasthan',
    price: 680000,
    capacity: 600,
    img: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=800&q=80'
  }
];

const checklistTasks = [
  'Book wedding venue',
  'Select wedding outfits',
  'Hire photographer',
  'Book catering',
  'Finalize decorations',
  'Send invitations',
  'Arrange makeup artist'
];

const budgetFields = [
  'totalBudget',
  'budDecoration',
  'budFood',
  'budPhotography',
  'budVenue',
  'budMakeup',
  'budOther'
];

const STORAGE_KEYS = {
  venue: 'dreamday_selected_venue',
  budget: 'dreamday_budget',
  checklist: 'dreamday_checklist'
};

// ---------- Helper functions ----------
function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Storage may be unavailable (e.g. private mode). The app still works.
  }
}

function formatINR(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById('err-' + fieldId);
  if (errorEl) errorEl.textContent = message || '';
  if (field) field.classList.toggle('invalid', Boolean(message));
}

function goToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Creates an <img>. If the picture fails to load, a soft gradient is shown instead.
function createImage(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.addEventListener('error', () => {
    const wrapper = img.parentElement;
    if (wrapper) wrapper.classList.add('img-fallback');
    img.remove();
  });
  return img;
}

// ---------- Navigation ----------
function setupNavigation() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after picking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- 2. Services ----------
function renderServices() {
  const grid = document.getElementById('serviceGrid');

  services.forEach(service => {
    const card = document.createElement('article');
    card.className = 'card service-card';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'card-image';
    imageWrap.appendChild(createImage(service.img, service.name));

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.textContent = service.name;

    const description = document.createElement('p');
    description.textContent = service.desc;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline';
    button.textContent = 'View Details';
    button.addEventListener('click', () => openServiceModal(service));

    body.append(title, description, button);
    card.append(imageWrap, body);
    grid.appendChild(card);
  });
}

function openServiceModal(service) {
  const modal = document.getElementById('serviceModal');
  document.getElementById('modalTitle').textContent = service.name;
  document.getElementById('modalDesc').textContent = service.details;

  const enquireButton = document.getElementById('modalEnquire');
  enquireButton.onclick = () => {
    closeServiceModal();
    tickServiceInBooking(service.name);
    goToSection('booking');
  };

  modal.hidden = false;
  document.body.classList.add('modal-open');
  document.getElementById('modalClose').focus();
}

function closeServiceModal() {
  document.getElementById('serviceModal').hidden = true;
  document.body.classList.remove('modal-open');
}

function setupModal() {
  document.getElementById('modalClose').addEventListener('click', closeServiceModal);
  document.getElementById('modalCancel').addEventListener('click', closeServiceModal);

  // Click outside the box to close
  document.getElementById('serviceModal').addEventListener('click', event => {
    if (event.target.id === 'serviceModal') closeServiceModal();
  });

  // Press Escape to close
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeServiceModal();
  });
}

// ---------- 3. Venues ----------
function getSelectedVenueId() {
  return loadJSON(STORAGE_KEYS.venue, null);
}

function selectVenue(venueId) {
  saveJSON(STORAGE_KEYS.venue, venueId);
  updateVenueUI();
}

function renderVenues() {
  const grid = document.getElementById('venueGrid');

  venues.forEach(venue => {
    const card = document.createElement('article');
    card.className = 'card venue-card';
    card.dataset.id = venue.id;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'card-image';
    imageWrap.appendChild(createImage(venue.img, venue.name));

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.textContent = venue.name;

    const meta = document.createElement('div');
    meta.className = 'venue-meta';

    const location = document.createElement('span');
    location.textContent = '📍 ' + venue.location;

    const price = document.createElement('span');
    price.className = 'venue-price';
    price.textContent = 'Estimated: ' + formatINR(venue.price);

    const capacity = document.createElement('span');
    capacity.textContent = 'Up to ' + venue.capacity + ' guests';

    meta.append(location, price, capacity);

    const actions = document.createElement('div');
    actions.className = 'venue-actions';

    const selectButton = document.createElement('button');
    selectButton.type = 'button';
    selectButton.className = 'btn btn-outline select-venue';
    selectButton.addEventListener('click', () => {
      // Clicking again on the selected venue un-selects it
      selectVenue(getSelectedVenueId() === venue.id ? null : venue.id);
    });

    const bookButton = document.createElement('button');
    bookButton.type = 'button';
    bookButton.className = 'btn btn-primary';
    bookButton.textContent = 'Book Now';
    bookButton.addEventListener('click', () => {
      selectVenue(venue.id);
      document.getElementById('bVenue').value = venue.id;
      goToSection('booking');
    });

    actions.append(selectButton, bookButton);
    body.append(title, meta, actions);
    card.append(imageWrap, body);
    grid.appendChild(card);
  });

  updateVenueUI();
}

function updateVenueUI() {
  const selectedId = getSelectedVenueId();
  const selectedVenue = venues.find(v => v.id === selectedId);

  document.querySelectorAll('.venue-card').forEach(card => {
    const isSelected = card.dataset.id === selectedId;
    card.classList.toggle('is-selected', isSelected);

    const selectButton = card.querySelector('.select-venue');
    selectButton.textContent = isSelected ? '✓ Selected' : 'Select Venue';
    selectButton.classList.toggle('selected', isSelected);
  });

  const text = document.getElementById('selectedVenueText');
  text.textContent = selectedVenue
    ? 'Your preferred venue: ' + selectedVenue.name + ' (' + selectedVenue.location + ')'
    : 'No venue selected yet.';

  // Keep the booking form's venue dropdown in sync
  const venueSelect = document.getElementById('bVenue');
  venueSelect.value = selectedId || '';
}

// ---------- 4. Budget planner ----------
function readBudgetInputs() {
  const data = {};
  budgetFields.forEach(id => {
    data[id] = document.getElementById(id).value;
  });
  return data;
}

function loadBudget() {
  const saved = loadJSON(STORAGE_KEYS.budget, {});
  budgetFields.forEach(id => {
    if (saved[id] !== undefined) {
      document.getElementById(id).value = saved[id];
    }
  });
}

function calculateBudget() {
  const data = readBudgetInputs();
  const total = parseFloat(data.totalBudget) || 0;

  // Add up all expense fields (everything except the total budget)
  let expenses = 0;
  budgetFields.slice(1).forEach(id => {
    expenses += Math.max(0, parseFloat(data[id]) || 0);
  });

  const remaining = total - expenses;

  document.getElementById('totalExpenses').textContent = formatINR(expenses);
  document.getElementById('remainingBudget').textContent = formatINR(remaining);
  document.getElementById('remainingBudget').classList.toggle('negative', remaining < 0);

  const warning = document.getElementById('budgetWarning');
  const bar = document.getElementById('budgetBar');

  if (total > 0 && expenses > total) {
    warning.textContent = '⚠️ Warning: your expenses exceed your budget by ' + formatINR(expenses - total) + '.';
    warning.hidden = false;
    bar.classList.add('over');
    bar.style.width = '100%';
  } else {
    warning.textContent = '';
    warning.hidden = true;
    bar.classList.remove('over');
    bar.style.width = total > 0 ? (expenses / total * 100) + '%' : '0%';
  }

  saveJSON(STORAGE_KEYS.budget, data);
}

function resetBudget() {
  budgetFields.forEach(id => {
    document.getElementById(id).value = '';
  });
  calculateBudget();
}

function setupBudget() {
  loadBudget();
  calculateBudget();

  document.getElementById('budgetForm').addEventListener('input', calculateBudget);
  document.getElementById('resetBudget').addEventListener('click', resetBudget);
}

// ---------- 5. Checklist ----------
let checklistState = [];

function loadChecklist() {
  const saved = loadJSON(STORAGE_KEYS.checklist, null);
  if (Array.isArray(saved) && saved.length === checklistTasks.length) {
    checklistState = saved;
  } else {
    checklistState = checklistTasks.map(() => false);
  }
}

function renderChecklist() {
  const list = document.getElementById('checklistList');
  list.innerHTML = '';

  checklistTasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = 'checklist-item';

    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checklistState[index];

    const text = document.createElement('span');
    text.textContent = task;

    checkbox.addEventListener('change', () => {
      checklistState[index] = checkbox.checked;
      saveJSON(STORAGE_KEYS.checklist, checklistState);
      item.classList.toggle('done', checkbox.checked);
      updateChecklistProgress();
    });

    label.append(checkbox, text);
    item.appendChild(label);
    if (checkbox.checked) item.classList.add('done');
    list.appendChild(item);
  });

  updateChecklistProgress();
}

function updateChecklistProgress() {
  const completed = checklistState.filter(Boolean).length;
  const total = checklistTasks.length;
  const percent = Math.round((completed / total) * 100);

  document.getElementById('progressText').textContent =
    completed + ' of ' + total + ' completed (' + percent + '%)';
  document.getElementById('checklistBar').style.width = percent + '%';
  document.getElementById('progressMessage').textContent =
    percent === 100 ? '🎉 All done! Your wedding preparations are complete.' : '';
}

function setupChecklist() {
  loadChecklist();
  renderChecklist();

  document.getElementById('resetChecklist').addEventListener('click', () => {
    checklistState = checklistTasks.map(() => false);
    saveJSON(STORAGE_KEYS.checklist, checklistState);
    renderChecklist();
  });
}

// ---------- 6. Booking form ----------
function renderBookingOptions() {
  // Venue dropdown
  const venueSelect = document.getElementById('bVenue');
  venueSelect.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Choose a venue';
  venueSelect.appendChild(placeholder);

  venues.forEach(venue => {
    const option = document.createElement('option');
    option.value = venue.id;
    option.textContent = venue.name + ' – ' + venue.location;
    venueSelect.appendChild(option);
  });

  // Service checkboxes
  const container = document.getElementById('serviceCheckboxes');
  container.innerHTML = '';

  services.forEach(service => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'services';
    checkbox.value = service.name;

    label.append(checkbox, document.createTextNode(service.name));
    container.appendChild(label);
  });
}

function tickServiceInBooking(serviceName) {
  document.querySelectorAll('input[name="services"]').forEach(box => {
    if (box.value === serviceName) box.checked = true;
  });
}

function validateBooking() {
  const errors = {};

  const name = document.getElementById('bName').value.trim();
  const email = document.getElementById('bEmail').value.trim();
  const phone = document.getElementById('bPhone').value.trim();
  const date = document.getElementById('bDate').value;
  const guestsRaw = document.getElementById('bGuests').value.trim();
  const venueId = document.getElementById('bVenue').value;
  const chosenServices = getChosenServices();

  if (name.length < 2) {
    errors.bName = 'Please enter your name (at least 2 characters).';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.bEmail = 'Please enter a valid email address.';
  }

  const digits = phone.replace(/\D/g, '');
  if (!/^\+?[0-9\s-]+$/.test(phone) || digits.length < 10 || digits.length > 15) {
    errors.bPhone = 'Enter a valid phone number (10 to 15 digits).';
  }

  if (!date) {
    errors.bDate = 'Please choose your wedding date.';
  } else if (date < todayString()) {
    errors.bDate = 'The wedding date cannot be in the past.';
  }

  const guests = Number(guestsRaw);
  if (guestsRaw === '') {
    errors.bGuests = 'Please enter the number of guests.';
  } else if (!Number.isInteger(guests) || guests < 1 || guests > 5000) {
    errors.bGuests = 'Enter a whole number between 1 and 5000.';
  }

  if (!venueId) {
    errors.bVenue = 'Please choose a preferred venue.';
  }

  if (chosenServices.length === 0) {
    errors.bServices = 'Select at least one required service.';
  }

  return { errors, data: { name, email, phone, date, guests, venueId, services: chosenServices } };
}

function getChosenServices() {
  return Array.from(document.querySelectorAll('input[name="services"]:checked')).map(box => box.value);
}

function showBookingSuccess(data) {
  const venue = venues.find(v => v.id === data.venueId);

  const summary = document.getElementById('bookingSummary');
  summary.innerHTML = '';

  const rows = [
    ['Customer name', data.name],
    ['Email address', data.email],
    ['Phone number', data.phone],
    ['Wedding date', formatDate(data.date)],
    ['Number of guests', String(data.guests)],
    ['Preferred venue', venue ? venue.name + ' (' + venue.location + ')' : '-'],
    ['Required services', data.services.join(', ')]
  ];

  rows.forEach(([label, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    summary.append(dt, dd);
  });

  document.getElementById('bookingForm').hidden = true;
  document.getElementById('bookingSuccess').hidden = false;
  document.getElementById('bookingSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function setupBookingForm() {
  const form = document.getElementById('bookingForm');
  const bDate = document.getElementById('bDate');

  // Stop the user from picking a past date in the calendar
  bDate.min = todayString();

  // Clear error text as the user types
  ['bName', 'bEmail', 'bPhone', 'bDate', 'bGuests', 'bVenue'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => setError(id, ''));
    document.getElementById(id).addEventListener('change', () => setError(id, ''));
  });
  document.querySelectorAll('input[name="services"]').forEach(box => {
    box.addEventListener('change', () => setError('bServices', ''));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const { errors, data } = validateBooking();

    // Reset all messages first
    ['bName', 'bEmail', 'bPhone', 'bDate', 'bGuests', 'bVenue', 'bServices'].forEach(id => {
      setError(id, errors[id] || '');
    });

    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const field = document.getElementById(firstError === 'bServices' ? 'serviceCheckboxes' : firstError);
      if (field) field.focus();
      return;
    }

    showBookingSuccess(data);
  });

  document.getElementById('newEnquiry').addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    document.getElementById('bookingSuccess').hidden = true;
    updateVenueUI();
    goToSection('booking');
  });
}

// ---------- 7. Contact form ----------
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');

  ['cName', 'cEmail', 'cMessage'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => setError(id, ''));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    success.hidden = true;

    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    const errors = {};
    if (name.length < 2) errors.cName = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.cEmail = 'Please enter a valid email address.';
    if (message.length < 10) errors.cMessage = 'Message should be at least 10 characters.';

    ['cName', 'cEmail', 'cMessage'].forEach(id => setError(id, errors[id] || ''));

    if (Object.keys(errors).length > 0) return;

    form.reset();
    success.hidden = false;
  });
}

// ---------- Startup ----------
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  setupNavigation();
  setupModal();

  renderServices();
  renderVenues();

  renderBookingOptions();
  setupBookingForm();

  setupBudget();
  setupChecklist();
  setupContactForm();
});
