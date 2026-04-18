document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('ph-list');
      icon.classList.add('ph-x');
    } else {
      icon.classList.remove('ph-x');
      icon.classList.add('ph-list');
    }
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('ph-x');
      icon.classList.add('ph-list');
    });
  });

  // Scroll Animation (Intersection Observer)
  const animElements = document.querySelectorAll('.fade-in, .fade-up, .fade-left, .fade-right, .zoom-in');

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, appearOptions);

  animElements.forEach(el => {
    appearOnScroll.observe(el);
  });

  // Multi-Step Booking Modal Logic
  const enrollBtn = document.getElementById('enrollBtn');
  const admissionModal = document.getElementById('admissionModal');
  const closeModal = document.getElementById('closeModal');
  const admissionForm = document.getElementById('admissionForm');
  
  const steps = document.querySelectorAll('.form-step');
  const progressBar = document.getElementById('progressBar');
  const stepLabels = document.querySelectorAll('.step-label');
  const nextBtn = document.querySelector('.next-step');
  const prevBtn = document.querySelector('.prev-step');
  const finishBtn = document.getElementById('finishBooking');

  let currentStep = 0;

  function updateStep() {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });
    
    stepLabels.forEach((label, index) => {
      label.classList.toggle('active', index <= currentStep);
    });

    const progressWidth = (currentStep / (steps.length - 1)) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Update Title based on step
    const titles = ["Book Your Seat", "Payment Secure", "Booking Confirmed"];
    document.getElementById('modalTitle').textContent = titles[currentStep];
  }

  if (enrollBtn && admissionModal && closeModal) {
    enrollBtn.addEventListener('click', () => {
      currentStep = 0;
      updateStep();
      admissionModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
      admissionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Basic Validation for Step 1
      const inputs = steps[0].querySelectorAll('input[required], select[required], textarea[required]');
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value) {
          isValid = false;
          input.style.borderColor = "#ef4444";
        } else {
          input.style.borderColor = "rgba(255,255,255,0.1)";
        }
      });

      if (isValid) {
        currentStep++;
        updateStep();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentStep--;
      updateStep();
    });
  }

  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const confirmBtn = document.getElementById('confirmBooking');
      const originalText = confirmBtn.textContent;
      
      confirmBtn.textContent = "Verifying Payment...";
      confirmBtn.disabled = true;

      setTimeout(() => {
        const formData = new FormData(admissionForm);
        const data = Object.fromEntries(formData.entries());
        
        // Generate Mock Receipt Data
        const receiptId = "VN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        document.getElementById('recName').textContent = data.studentName;
        document.getElementById('recClass').textContent = data.class;
        document.getElementById('recId').textContent = receiptId;

        currentStep++;
        updateStep();
        
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
      }, 2500);
    });
  }

  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      admissionForm.reset();
      admissionModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Faculty Exploration Overlay Logic
  const discoverBtn = document.getElementById('discoverBtn');
  const facultyOverlay = document.getElementById('facultyOverlay');
  const closeFaculty = document.getElementById('closeFaculty');
  
  const detailModal = document.getElementById('detailModal');
  const closeDetail = document.getElementById('closeDetail');
  const facultyCards = document.querySelectorAll('.faculty-card[data-teacher]');

  const teacherData = {
    "1": {
      name: "Mrs. Sarita Devi",
      subject: "Mathematics Expert",
      exp: "12+ Years Experience",
      img: "./assets/teacher1.png",
      about: "Mrs. Sarita is known for her innovative teaching methods and dedication to student success in competitive exams.",
      achievements: [
        "Best Teacher Award 2023 - State Level",
        "Successfully coached 50+ students for IIT-JEE Foundation",
        "Author of 'Vedic Math for Kids' handbook",
        "100% result track record in Board Exams"
      ]
    },
    "2": {
      name: "Mr. Rajesh Khanna",
      subject: "Science Specialist",
      exp: "15+ Years Experience",
      img: "./assets/teacher2.png",
      about: "Mr. Rajesh brings science to life through practical experiments and a passion for environmental studies.",
      achievements: [
        "Published research on 'Interactive Lab Learning'",
        "Organized the Zonal Science Fair 2024",
        "Mentored the National Robotics Competition winners",
        "Certified Environmental Educator"
      ]
    },
    "3": {
      name: "Ms. Anjali Verma",
      subject: "English Literature",
      exp: "10+ Years Experience",
      img: "./assets/teacher3.png",
      about: "Ms. Anjali focuses on communicative excellence and nurturing a love for creative writing.",
      achievements: [
        "Gold Medalist in English Literature from Patna University",
        "Founded the School Literary Club",
        "Expert Trainer for IELTS and Soft Skills",
        "Published poet with works in national dailies"
      ]
    },
    "4": {
      name: "Mr. Amit Singh",
      subject: "Social Studies Expert",
      exp: "8+ Years Experience",
      img: "./assets/teacher4.png",
      about: "Mr. Amit is a master storyteller who makes historical events feel current and relevant.",
      achievements: [
        "Developed 'History through Cinema' curriculum",
        "Lead coordinator for National Integration Camps",
        "Published multiple articles on 'Digital Civics'",
        "Consistently high performance in Humanities subjects"
      ]
    },
    "5": {
      name: "Mrs. Kavita Roy",
      subject: "Computer Science",
      exp: "6+ Years Experience",
      img: "./assets/teacher5.png",
      about: "Mrs. Kavita is passionate about coding and ensuring students are future-ready for the tech industry.",
      achievements: [
        "Google Certified Educator Level 2",
        "Initiated 'Code for Bihar' student project",
        "Winner of Regional EdTech Innovation Award",
        "Expert in AI and Machine Learning basics"
      ]
    },
    "6": {
      name: "Mr. Sanjay Mishra",
      subject: "Hindi Literature",
      exp: "20+ Years Experience",
      img: "./assets/teacher1.png",
      about: "A veteran scholar of Hindi, dedicated to preserving our rich linguistic culture.",
      achievements: [
        "Recipient of the 'Hindi Seva Samman'",
        "Renowned orator and debate coach",
        "Authored 'Modern Hindi Grammar' for high schools",
        "State-level poet and playwright"
      ]
    },
    "7": {
      name: "Ms. Neha Gupta",
      subject: "Biology Specialist",
      exp: "7+ Years Experience",
      img: "./assets/teacher2.png",
      about: "Ms. Neha makes biology interactive with 3D models and practical field studies.",
      achievements: [
        "Established the School Biotech Lab",
        "Winner of Best Innovator Award 2022",
        "Conducted national seminars on biodiversity",
        "AIMS certified Biology trainer"
      ]
    },
    "8": {
      name: "Mr. Rahul Mehta",
      subject: "Physics Guru",
      exp: "11+ Years Experience",
      img: "./assets/teacher3.png",
      about: "Mr. Rahul is known for simplifying complex physics problems with real-world examples.",
      achievements: [
        "Research fellow at Indian Institute of Physics",
        "Keynote speaker at Science Tech Fest",
        "Designed the 'Physics in Everyday Life' course",
        "Certified in Quantum Mechanics basics"
      ]
    },
    "9": {
      name: "Mrs. Pooja Sharma",
      subject: "Chemistry Expert",
      exp: "9+ Years Experience",
      img: "./assets/teacher4.png",
      about: "Mrs. Pooja turns the chemistry lab into a place of wonder and safe experimentation.",
      achievements: [
        "National Level Chemistry Olympiad Coach",
        "Developer of the 'Safe Lab' protocol",
        "Published paper on 'Sustainable Chemistry'",
        "Ex-Senior Faculty at Resonance Academy"
      ]
    },
    "10": {
      name: "Mr. Vikram Rathore",
      subject: "Physical Education",
      exp: "15+ Years Experience",
      img: "./assets/teacher5.png",
      about: "Mr. Vikram builds more than just athletes; he builds character and resilience.",
      achievements: [
        "State Level Badminton Coach",
        "Former National Level Decathlete",
        "Certified Nutrition and Fitness Specialist",
        "Led the school to 5 consecutive sports trophies"
      ]
    },
    "11": {
      name: "Ms. Deepa Das",
      subject: "Art & Design",
      exp: "5+ Years Experience",
      img: "./assets/teacher1.png",
      about: "Ms. Deepa believes every child is an artist and helps them find their unique voice.",
      achievements: [
        "Curated the 'Colors of Bihar' art exhibition",
        "Winner of National Youth Painting Award",
        "Expert in digital and traditional mural art",
        "Fine Arts Gold Medalist"
      ]
    },
    "12": {
      name: "Mrs. Meenakshi Iyer",
      subject: "Music Teacher",
      exp: "14+ Years Experience",
      img: "./assets/teacher2.png",
      about: "Mrs. Meenakshi fills our campus with harmony and nurtures budding musical talent.",
      achievements: [
        "Grade 8 Vocalist (Trinity College London)",
        "Composed the Official School Anthem",
        "Mentored winners of State Singing Competition",
        "Expert in Classical and Modern Fusion"
      ]
    }
  };

  if (discoverBtn) {
    discoverBtn.addEventListener('click', () => {
      facultyOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeFaculty) {
    closeFaculty.addEventListener('click', () => {
      facultyOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  facultyCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-teacher');
      const data = teacherData[id] || teacherData["1"];
      
      document.getElementById('detName').textContent = data.name;
      document.getElementById('detSubject').textContent = data.subject;
      document.getElementById('detExp').textContent = data.exp;
      document.getElementById('detImg').src = data.img;
      document.getElementById('detAbout').textContent = data.about;
      
      const list = document.getElementById('detAchievements');
      list.innerHTML = '';
      data.achievements.forEach(ach => {
        const li = document.createElement('li');
        li.textContent = ach;
        list.appendChild(li);
      });

      detailModal.classList.add('active');
    });
  });

  if (closeDetail) {
    closeDetail.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
  }
});

  // Scroll Progress Logic
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalScroll) * 100;
    scrollProgress.style.width = progress + '%';
  });

  // Mouse Follow Glow
  const bgGlow = document.getElementById('bgGlow');
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    bgGlow.style.transform = 'translate(' + (x - 200) + 'px, ' + (y - 200) + 'px)';
  });

  // Add floating class to some cards for extra animation
  const quoteCards = document.querySelectorAll('.quote-card');
  quoteCards.forEach((card, index) => {
    if (index % 2 === 0) card.classList.add('floating');
  });

  // Nav Discover Button Logic
  const discoverNavBtn = document.getElementById('discoverNavBtn');
  if (discoverNavBtn) {
    discoverNavBtn.addEventListener('click', () => {
      facultyOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
