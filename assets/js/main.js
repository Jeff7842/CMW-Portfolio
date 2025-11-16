 // Mobile menu toggle
 const mobileMenuButton = document.querySelector('.mobile-menu-button');
 const mobileMenu = document.querySelector('.mobile-menu');
 
 mobileMenuButton.addEventListener('click', () => {
     mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
 });
 
 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         const targetElement = document.querySelector(targetId);
         
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
             
             // Close mobile menu if open
             mobileMenu.style.display = 'none';
         }
     });
 });

 
 
 // Active nav link on scroll
 const sections = document.querySelectorAll('section');
 const navLinks = document.querySelectorAll('.nav-link');
 
 window.addEventListener('scroll', () => {
     let current = '';
     
     sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;
         
         if (pageYOffset >= sectionTop - 100) {
             current = section.getAttribute('id');
         }
     });
     
     navLinks.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${current}`) {
             link.classList.add('active');
         }
     });
     
     // Also update mobile menu links
     const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
     mobileNavLinks.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href') === `#${current}`) {
             link.classList.add('active');
         }
     });
 });
 
 // Initialize first nav link as active
 document.querySelector('.nav-link').classList.add('active');

 // Track CV downloads
document.querySelector('.sidebar-card .btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent immediate download (optional)
    
    // Optional: Add a confirmation dialog
    const confirmDownload = confirm("Download Charles Wakanyi's CV?");
    
    if (confirmDownload) {
        // Proceed with download
        const pdfUrl = this.getAttribute('href');
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Charles_Wakanyi_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Optional: Log download event (for analytics)
        console.log("CV downloaded");
    }
});


// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Validate form
  if (!name || !email || !subject || !message) {
    alert('Please fill all fields');
    return;
  }
  
  // Show notification
  const notification = document.querySelector('.notification-popup');
  notification.classList.add('show');
  
  // Hide after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
  
  // Here you would normally send the form data to your server
  // For now, we'll just log it and show the popup
  console.log('Form submitted:', { name, email, subject, message });
  
  // Optional: Reset form
  // this.reset();
    form.reset();
  
  // Optional: Focus on first field after reset
  form.querySelector('input').focus()
});

function sendMessage(event) {
  event.preventDefault(); // Prevent form submission (for demo)
  
  // Show notification
  const notification = document.querySelector('.notification-popup');
  notification.classList.remove('hidden');
  notification.classList.add('show');
  
  // Hide after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.classList.add('hidden'), 500);
  }, 3000);
  
  // Optional: Uncomment to actually submit the form
  // event.target.closest('form').submit();
    form.reset();
  
  // Optional: Focus on first field after reset
  form.querySelector('input').focus()
}

function submitForm(event) {
  event.preventDefault();
  
  const notification = document.querySelector('.notification-popup');
  
  // Reset animation
  notification.classList.remove('show');
  void notification.offsetWidth; // Trigger reflow
  
  // Show notification
  notification.classList.add('show');
  
  // Hide after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
  
  // Here you would add your form submission logic
  console.log('Form would be submitted here');

    form.reset();
  
  // Optional: Focus on first field after reset
  form.querySelector('input').focus()
}