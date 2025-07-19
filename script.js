function verifyStudent() {
  const idInput = document.getElementById('identifier');
  const id = idInput.value.trim();
  const resultBox = document.getElementById('result');

  if (!id) return alert('Please enter a valid Email or ID');

  showSpinner(true);

  // Simulate network delay and dummy data
  setTimeout(() => {
    const student = {
      name: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
      domain: "Web Development",
      college: "Dummy University",
      start: "01 June 2024",
      duration: "1 Month",
      photo: "https://via.placeholder.com/130",
      assignments: [true, false, true, true],
      certificate: "certificate.jpg"
    };

    const html = `
      <div class="card fade-in">
        <img src="${student.photo}" alt="Photo" />
        <h3>${student.name}</h3>
        <p>Email: ${student.email}</p>
        <p>Mobile: ${student.mobile}</p>
        <p>Domain: ${student.domain}</p>
        <p>College: ${student.college}</p>
        <p>Start Date: ${student.start}</p>
        <p>Duration: ${student.duration}</p>
        <h4>Assignment Status</h4>
        <div class="assignment-status">
          ${student.assignments.map((done, i) => `<span>A${i + 1}: ${done ? '\u2705' : '\u274c'}</span>`).join('')}
        </div>
        <p>Status: Completed</p>
        <a href="${student.certificate}" target="_blank">View Certificate</a>
      </div>
    `;

    resultBox.innerHTML = html;
    showSpinner(false);
    showToast('\u2705 Dummy student data loaded.');
    // Add fade-in effect
    setTimeout(() => {
      const card = document.querySelector('.card');
      if (card) card.classList.add('fade-in-active');
    }, 10);
    // Show animated checkmark and confetti
    showSuccessAnimation();
  }, 2500);
}

function showSuccessAnimation() {
  const checkmark = document.getElementById('success-checkmark');
  const confetti = document.getElementById('confetti-container');
  checkmark.classList.remove('hidden');
  confetti.classList.remove('hidden');
  launchConfetti();
  setTimeout(() => {
    checkmark.classList.add('hidden');
    confetti.classList.add('hidden');
    confetti.innerHTML = '';
  }, 2000);
}

function launchConfetti() {
  const confetti = document.getElementById('confetti-container');
  confetti.innerHTML = '';
  const colors = ['#2ecc71', '#007bff', '#f1c40f', '#e67e22', '#e74c3c', '#9b59b6'];
  for (let i = 0; i < 40; i++) {
    const div = document.createElement('div');
    const size = Math.random() * 10 + 8;
    div.style.position = 'absolute';
    div.style.left = Math.random() * 100 + 'vw';
    div.style.top = '-20px';
    div.style.width = size + 'px';
    div.style.height = size * 0.4 + 'px';
    div.style.background = colors[Math.floor(Math.random() * colors.length)];
    div.style.opacity = 0.8;
    div.style.borderRadius = '2px';
    div.style.transform = `rotate(${Math.random() * 360}deg)`;
    div.style.transition = 'top 1.5s cubic-bezier(.39,.575,.565,1), opacity 1.5s';
    confetti.appendChild(div);
    setTimeout(() => {
      div.style.top = (Math.random() * 80 + 10) + 'vh';
      div.style.opacity = 0;
    }, 50);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.className = 'show';
  setTimeout(() => toast.className = '', 3000);
}

function showSpinner(show) {
  const spinner = document.querySelector('.spinner');
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}

// Fade-in animation for result card
const style = document.createElement('style');
style.innerHTML = `
  .fade-in { opacity: 0; transition: opacity 0.7s cubic-bezier(.39,.575,.565,1); }
  .fade-in.fade-in-active { opacity: 1; }
`;
document.head.appendChild(style);

// Animated background particles/stars
(function animateBackground() {
  const canvas = document.getElementById('bg-anim');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  let particles = [];
  const count = Math.floor(Math.max(40, w * h / 12000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 1.2,
      dx: (Math.random() - 0.5) * 0.12,
      dy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });
})();

// Back to Top button logic
(function backToTopInit() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    btn.blur();
  });
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      btn.blur();
    }
  });
})();

// Button ripple effect
function addButtonRipple() {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
window.addEventListener('DOMContentLoaded', addButtonRipple);
