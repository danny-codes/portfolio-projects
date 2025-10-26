// let slideIndex = 1;
// let slideTimer;

// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
//     resetTimer();
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
//     resetTimer();
// }

// function showSlides(n) {
//     let slides = document.querySelectorAll('.slide');
//     let dots = document.querySelectorAll('.dot');

//     if (n > slides.length) {
//         slideIndex = 1;
//     }
//     if (n < 1) {
//         slideIndex = slides.length;
//     }

//     slides.forEach(slide => slide.style.display = 'none');
//     dots.forEach(dot => dot.className = dot.className.replace(' active', ''));

//     slides[slideIndex-1].style.display = 'block';
//     dots[slideIndex-1].className += " active";
    
//     slideTimer = setTimeout(() => {
//         showSlides(slideIndex += 1);
//     }, 5000);
// }

// function resetTimer() {
//     clearTimeout(slideTimer);
// }

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

  // Remove red border once user starts typing
  input.addEventListener('input', () => {
    if(input.classList.contains('invalid') && input.checkValidity()){
      input.classList.remove('invalid');
    }
  });
});

// form submit message

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent! (demo)');
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