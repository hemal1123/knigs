(function() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const copyIpBtn = document.getElementById('copyIpBtn');
  const ipAddress = document.getElementById('ipAddress');
  const buyBtns = document.querySelectorAll('.buy-btn');
  const modal = document.getElementById('purchaseModal');
  const modalRankTitle = document.getElementById('modalRankTitle');
  const modalRankName = document.getElementById('modalRankName');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const typingText = document.getElementById('typingText');
  const cursorGlow = document.getElementById('cursorGlow');

  let particlesCreated = false;

  const typingMessages = [
    'The Ultimate Lifesteal Experience ✨',
    'Custom Economy • Intense PvP ⚔️',
    'Weekly Events & Rewards 🎁'
  ];
  let messageIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;
    const currentMsg = typingMessages[messageIndex];
    
    if (isDeleting) {
      typingText.textContent = currentMsg.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentMsg.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentMsg.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % typingMessages.length;
      setTimeout(typeEffect, 500);
      return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  if (typingText) {
    typingText.style.width = 'auto';
    typingText.style.whiteSpace = 'normal';
    setTimeout(typeEffect, 500);
  }

  function createParticles() {
    if (particlesCreated) return;
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, 255, ${Math.random() * 0.6 + 0.2})`;
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.pointerEvents = 'none';
      particle.style.animation = `float ${Math.random() * 12 + 6}s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 6 + 's';
      container.appendChild(particle);
    }
    particlesCreated = true;
  }

  window.addEventListener('load', createParticles);

  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .buy-btn, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          navLinks.classList.remove('active');
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  if (copyIpBtn) {
    copyIpBtn.addEventListener('click', function() {
      const ip = ipAddress ? ipAddress.textContent : 'theking.mcsh.io';
      navigator.clipboard.writeText(ip).then(() => {
        const originalText = copyIpBtn.innerHTML;
        copyIpBtn.innerHTML = '<span>✓ Copied!</span>';
        setTimeout(() => {
          copyIpBtn.innerHTML = originalText;
        }, 2000);
      }).catch(() => {
        alert('Failed to copy IP');
      });
    });
  }

  function openModal(rankName) {
    if (modalRankTitle) modalRankTitle.textContent = rankName + ' Package';
    if (modalRankName) modalRankName.textContent = rankName + ' Rank';
    if (modal) modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (buyBtns) {
    buyBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const rank = this.getAttribute('data-rank');
        if (rank) openModal(rank);
      });
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeModal();
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .rank-card, .shop-product, .staff-card, .rule-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });
})();