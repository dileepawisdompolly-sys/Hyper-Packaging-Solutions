/**
 * Hyper Packaging Solutions - Main JavaScript
 * Plain Vanilla JS (No frameworks or dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyNavbar();
  initActiveNavLink();
  initBackToTop();
  initScrollReveal();
  initProductFiltering();
  initUrlParamHandler();
  initContactFormValidation();
  initAnimatedCounters();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = hamburger.classList.toggle('open');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking any nav link
  document.querySelectorAll('.nav-menu .nav-link, .nav-menu .btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Sticky Navbar on Scroll
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --------------------------------------------------------------------------
   3. Highlight Active Page Navigation Link
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Direct match or home page root match
    if (href === page || (page === '' && href === 'index.html') || (page === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Back-to-Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   6. Product Filter (Products Page)
   -------------------------------------------------------------------------- */
function initProductFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      productCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');

        if (filterValue === 'all' || categories.includes(filterValue.toLowerCase())) {
          card.classList.remove('hidden');
          // Add re-animation effect
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. URL Parameter Handler (Prefills Quote Form from Product/Material Clicks)
   -------------------------------------------------------------------------- */
function initUrlParamHandler() {
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get('product');
  const materialParam = params.get('material');
  const printParam = params.get('print');
  const filterParam = params.get('filter');

  // Activate filter on products.html if ?filter=... is provided
  if (filterParam) {
    const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterParam.toLowerCase()}"]`);
    if (filterBtn) {
      filterBtn.click();
    }
  }

  const productSelect = document.getElementById('productType');
  const materialSelect = document.getElementById('materialType');
  const printingSelect = document.getElementById('printingType');

  if (productParam && productSelect) {
    for (let i = 0; i < productSelect.options.length; i++) {
      if (productSelect.options[i].value.toLowerCase().includes(productParam.toLowerCase()) ||
          productSelect.options[i].text.toLowerCase().includes(productParam.toLowerCase())) {
        productSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (materialParam && materialSelect) {
    for (let i = 0; i < materialSelect.options.length; i++) {
      if (materialSelect.options[i].value.toLowerCase().includes(materialParam.toLowerCase()) ||
          materialSelect.options[i].text.toLowerCase().includes(materialParam.toLowerCase())) {
        materialSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (printParam && printingSelect) {
    for (let i = 0; i < printingSelect.options.length; i++) {
      if (printingSelect.options[i].value.toLowerCase().includes(printParam.toLowerCase()) ||
          printingSelect.options[i].text.toLowerCase().includes(printParam.toLowerCase())) {
        printingSelect.selectedIndex = i;
        break;
      }
    }
  }
}

/* --------------------------------------------------------------------------
   8. Contact & Quote Request Form Validation
   -------------------------------------------------------------------------- */
function initContactFormValidation() {
  const quoteForm = document.getElementById('quoteForm');
  if (!quoteForm) return;

  const successAlert = document.getElementById('formSuccessAlert');

  // Input elements
  const fullName = document.getElementById('fullName');
  const companyName = document.getElementById('companyName');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const productType = document.getElementById('productType');
  const materialType = document.getElementById('materialType');
  const quantity = document.getElementById('quantity');

  const setError = (input, message) => {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    formGroup.classList.add('has-error');
    input.classList.add('is-invalid');
    const errorEl = formGroup.querySelector('.error-message');
    if (errorEl) errorEl.textContent = message;
  };

  const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;
    formGroup.classList.remove('has-error');
    input.classList.remove('is-invalid');
  };

  // Real-time error clearing on input
  [fullName, companyName, phone, email, productType, materialType, quantity].forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  const isValidEmail = (emailStr) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(emailStr).toLowerCase());
  };

  const isValidPhone = (phoneStr) => {
    // Flexible phone check permitting numbers, +, -, (), spaces
    const cleanPhone = phoneStr.replace(/[\s\-\(\)\+]/g, '');
    return cleanPhone.length >= 7 && /^\d+$/.test(cleanPhone);
  };

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Full Name
    if (!fullName.value.trim()) {
      setError(fullName, 'Please enter your contact name');
      isValid = false;
    } else {
      clearError(fullName);
    }

    // Validate Company Name
    if (!companyName.value.trim()) {
      setError(companyName, 'Please enter your business or company name');
      isValid = false;
    } else {
      clearError(companyName);
    }

    // Validate Phone
    if (!phone.value.trim()) {
      setError(phone, 'Please enter your phone number');
      isValid = false;
    } else if (!isValidPhone(phone.value.trim())) {
      setError(phone, 'Please enter a valid phone number (at least 7 digits)');
      isValid = false;
    } else {
      clearError(phone);
    }

    // Validate Email
    if (!email.value.trim()) {
      setError(email, 'Please enter your email address');
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      setError(email, 'Please provide a valid email address (e.g., name@company.com)');
      isValid = false;
    } else {
      clearError(email);
    }

    // Validate Product Type
    if (!productType.value) {
      setError(productType, 'Please select a packaging product category');
      isValid = false;
    } else {
      clearError(productType);
    }

    // Validate Material
    if (!materialType.value) {
      setError(materialType, 'Please select a material type');
      isValid = false;
    } else {
      clearError(materialType);
    }

    // Validate Quantity
    if (!quantity.value.trim()) {
      setError(quantity, 'Please specify an estimated quantity (e.g. 500 kg or 25,000 pcs)');
      isValid = false;
    } else {
      clearError(quantity);
    }

    if (isValid) {
      // Capture details for WhatsApp quote message before resetting
      const printingType = document.getElementById('printingType');
      const dimensions = document.getElementById('dimensions');
      const message = document.getElementById('message');

      const nameVal = fullName.value.trim();
      const compVal = companyName.value.trim();
      const phoneVal = phone.value.trim();
      const emailVal = email.value.trim();
      const prodVal = productType.options[productType.selectedIndex] ? productType.options[productType.selectedIndex].text : productType.value;
      const matVal = materialType.options[materialType.selectedIndex] ? materialType.options[materialType.selectedIndex].text : materialType.value;
      const printVal = printingType && printingType.options[printingType.selectedIndex] ? printingType.options[printingType.selectedIndex].text : (printingType ? printingType.value : 'Not specified');
      const sizeVal = dimensions && dimensions.value.trim() ? dimensions.value.trim() : 'Not specified';
      const qtyVal = quantity.value.trim();
      const msgVal = message && message.value.trim() ? message.value.trim() : 'None';

      const waSummary = 
`Hello Hyper Packaging Solutions,
I would like to get a quote with the following details:

- Name: ${nameVal}
- Company: ${compVal}
- Phone: ${phoneVal}
- Email: ${emailVal}
- Product: ${prodVal}
- Material: ${matVal}
- Printing: ${printVal}
- Size/Gauge: ${sizeVal}
- Quantity: ${qtyVal}
- Requirements/Notes: ${msgVal}`;

      const waQuoteLink = `https://wa.me/94763540931?text=${encodeURIComponent(waSummary)}`;

      // Update WhatsApp Quote Button in success alert
      const waQuoteBtn = document.getElementById('whatsappQuoteBtn');
      const waQuoteContainer = document.getElementById('whatsappQuoteContainer');
      if (waQuoteBtn) {
        waQuoteBtn.setAttribute('href', waQuoteLink);
      }
      if (waQuoteContainer) {
        waQuoteContainer.style.display = 'block';
      }

      // Show success alert
      if (successAlert) {
        successAlert.classList.add('show');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✓ Request Submitted';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 5000);
      }

      quoteForm.reset();
    } else {
      // Scroll to the first error
      const firstError = quoteForm.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/* --------------------------------------------------------------------------
   9. Animated Number Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic function
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOut * target);

      el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(counter => observer.observe(counter));
  } else {
    counters.forEach(counter => animateCounter(counter));
  }
}
