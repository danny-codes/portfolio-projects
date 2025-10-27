let currentIndex = 0;
const totalSlides = 4;
const imageContainer = document.getElementById('imageContainer');

function showSlide(index) {
  if(index < 0) currentIndex = totalSlides - 1;
  else if(index >= totalSlides) currentIndex = 0;
  else currentIndex = index;

  imageContainer.style.transform = `translateX(-${currentIndex * 25}%)`;

  // update dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function plusSlides(n) {
  showSlide(currentIndex + n);
}

function currentSlide(n) {
  showSlide(n - 1);
}

// initialize
showSlide(0);

// js validation for form fields
const inputs = document.querySelectorAll('.contact input, .contact textarea');

inputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (!input.checkValidity()) {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });

  input.addEventListener('input', () => {
    if(input.classList.contains('invalid') && input.checkValidity()){
      input.classList.remove('invalid');
    }
  });
});

// button to expand/collapse read more text

document.addEventListener("click", function (e) {
  if (!e.target.matches(".about-toggle")) return;
  const btn = e.target;
  const more = document.querySelector('.about-more');
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  btn.textContent = expanded ? 'Read more' : 'Show less';
  more.style.display = expanded ? 'none' : 'block';
});

// contact form

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('contact-form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent = "Thanks for your submission!";
      formStatus.style.color = 'green';
      form.reset();
    } else {
      const result = await response.json();
      if (result.errors) {
        formStatus.textContent = result.errors.map(error => error.message).join(', ');
      } else {
        formStatus.textContent = "Oops! There was a problem submitting your form.";
      }
      formStatus.style.color = 'red';
    }
  } catch (error) {
    formStatus.textContent = "Oops! There was a problem submitting your form.";
    formStatus.style.color = 'red';
  }
});