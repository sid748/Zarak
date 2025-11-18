

// navbar scroll effect
// === Blur effect on scroll ===
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// === Mobile menu toggle for overlay (used in pages like About us, properties, etc.) ===
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu-fullscreen");
const overlay = document.querySelector(".mobile-menu-overlay");

if (hamburger && mobileMenu && overlay) {
  // MENU OPEN/CLOSE
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // Change icon (bars ↔ close)
    hamburger.innerHTML = mobileMenu.classList.contains("active")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close when overlay clicked
  overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
}

// === Fullscreen mobile menu toggle (used in index.html) ===
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileFullscreen = document.querySelector('.mobile-menu-fullscreen');

if (mobileToggle && mobileFullscreen) {
  mobileToggle.addEventListener('click', () => {
    mobileFullscreen.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    // Change icon to cross when menu is open
    if (mobileFullscreen.classList.contains('active')) {
      mobileToggle.innerHTML = '<i class="fa-solid fa-xmark" style="color: white;"></i>';
    } else {
      mobileToggle.innerHTML = '<span></span><span></span>';
    }
  });

  // Close menu when clicking a mobile menu link
  document.querySelectorAll('.mobile-menu-items a').forEach(link => {
    link.addEventListener('click', () => {
      mobileFullscreen.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.innerHTML = '<span></span><span></span>';
    });
  });

  // Mobile dropdown toggle (inside fullscreen menu)
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      submenu.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  });
}

// Dropdown for overlay menu (other pages)
if (!mobileToggle) {
  document.querySelectorAll(".mobile-dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      toggle.nextElementSibling.classList.toggle("active");
    });
  });
}

// Desktop dropdown toggle (click-based)
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  const menu = toggle.nextElementSibling;
  toggle.addEventListener('click', (e) => {
    e.preventDefault();

    // Close other open menus
    document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
      if (openMenu !== menu) openMenu.classList.remove('show');
    });

    menu.classList.toggle('show');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => menu.classList.remove('show'));
  }
});


// why choose us section animation
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".customer-approach");
  const lineWrapper = section.querySelector(".vertical-line-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lineWrapper.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
});

// homepage our project carousel script
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelectorAll('.card-slide'));
  const leftBtn = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');
  const tabs = Array.from(document.querySelectorAll('.tab-btn'));

  // Step 1: Clone first and last slides for smooth loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  track.insertBefore(lastClone, slides[0]);
  track.appendChild(firstClone);

  const allSlides = Array.from(document.querySelectorAll('.card-slide'));
  let index = 1; // start at the first "real" slide
  let isTransitioning = false;

  function getSlideData() {
    const gap = parseInt(getComputedStyle(track).gap) || 28;
    const slideWidth = allSlides[0].getBoundingClientRect().width;
    return { slideWidth, gap };
  }

  function goTo(i, transition = true) {
    if (i < 0 || i >= allSlides.length) return;
    const { slideWidth, gap } = getSlideData();
    const moveX = -(i * (slideWidth + gap));
    track.style.transition = transition ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translateX(${moveX}px)`;
    if (transition) {
      isTransitioning = true;
      leftBtn.disabled = true;
      rightBtn.disabled = true;
    }
  }

  // Step 2: Transition fix for looping illusion
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    leftBtn.disabled = false;
    rightBtn.disabled = false;
    if (allSlides[index] && allSlides[index].classList.contains('clone')) {
      if (index === allSlides.length - 1) {
        index = 1; // loop back to real first
      } else if (index === 0) {
        index = allSlides.length - 2; // loop to real last
      }
      goTo(index, false);
    }
  });

  // Step 3: Arrow buttons
  rightBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    index++;
    if (index >= allSlides.length) index = 0;
    goTo(index);
  });

  leftBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    index--;
    if (index < 0) index = allSlides.length - 1;
    goTo(index);
  });

  // Step 4: On load — jump to real first slide
  window.addEventListener('load', () => {
    goTo(index, false);
  });

  // Step 5: Tabs (optional filtering)
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      allSlides.forEach(s => {
        if (cat === 'all') s.style.display = 'block';
        else s.style.display = s.dataset.cat === cat ? 'block' : 'none';
      });
      index = 1;
      setTimeout(() => { goTo(index, false); }, 60);
    });
  });

  // Step 6: Responsive recalculation
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { goTo(index, false); }, 120);
  });
});


// Homepage "Who We Are" section counter animation
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // lower = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const update = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(update, 20);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };

  // Trigger only when the section enters viewport (even a little)
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect(); // stop after first run
        }
      });
    },
    {
      root: null,          // viewport
      threshold: 0.1,      // run when 10% of section is visible
      rootMargin: "0px 0px -50px 0px" // triggers slightly earlier
    }
  );

  const section = document.querySelector(".who-we-are");
  if (section) observer.observe(section);
});

// filter script
document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.getElementById("filter-btn");
  const typeSelect = document.getElementById("filter-type");
  const locationSelect = document.getElementById("filter-location");
  const styleSelect = document.getElementById("filter-style");
  const categorySelect = document.getElementById("filter-category");
  const cards = document.querySelectorAll(".property-card");

  // --- FILTER FUNCTIONALITY ---
  filterBtn.addEventListener("click", () => {
    const type = typeSelect.value.trim();
    const location = locationSelect.value.trim();
    const style = styleSelect.value.trim();
    const category = categorySelect.value.trim();

    cards.forEach(card => {
      const matchType = !type || card.dataset.type === type;
      const matchLocation = !location || card.dataset.location === location;
      const matchStyle = !style || card.dataset.style === style;
      const matchCategory = !category || card.dataset.category === category;

      if (matchType && matchLocation && matchStyle && matchCategory) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });

  // --- CAROUSEL FUNCTIONALITY of filter section ---
  document.querySelectorAll(".property-card .carousel").forEach(carousel => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".carousel-control-prev");
    const nextBtn = carousel.querySelector(".carousel-control-next");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");
    indicatorsContainer.classList.remove("carousel-indicators");
    indicatorsContainer.classList.add("carousel-indicators");
    indicatorsContainer.innerHTML = ""; // Clear existing indicators

    // Create navigation dots dynamically
    items.forEach((_, index) => {
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.classList.add("indicator-dot");
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => {
        carousel.querySelector(".carousel-item.active").classList.remove("active");
        carousel.querySelector(".indicator-dot.active").classList.remove("active");
        items[index].classList.add("active");
        indicator.classList.add("active");
      });
      indicatorsContainer.appendChild(indicator);
    });

    // Handle next / prev buttons
    let currentIndex = 0;
    nextBtn.addEventListener("click", () => {
      items[currentIndex].classList.remove("active");
      indicatorsContainer.children[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].classList.add("active");
      indicatorsContainer.children[currentIndex].classList.add("active");
    });

    prevBtn.addEventListener("click", () => {
      items[currentIndex].classList.remove("active");
      indicatorsContainer.children[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      items[currentIndex].classList.add("active");
      indicatorsContainer.children[currentIndex].classList.add("active");
    });
  });
});


// Odometer counter script
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".odometer");

  counters.forEach((counter, i) => {
    const target = +counter.getAttribute("data-target");
    const box = counter.closest(".counter-box");

    gsap.fromTo(
      box,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: box,
          start: "top 90%",
        },
        onStart: () => {
          const odometer = new Odometer({
            el: counter,
            value: 0,
            format: '',
            duration: 2000,
          });
          odometer.update(target);
        },
      }
    );
  });
});

// testimonial carousel script
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".testimonial-item");
  const buttons = document.querySelectorAll(".testimonial-indicators button");
  let current = 0;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
      buttons[i].classList.toggle("active", i === index);
    });
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      current = index;
      showSlide(current);
    });
  });

  // Disable auto-slide (manual only)
});


