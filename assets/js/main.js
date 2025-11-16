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

// Track CV downloads (FIXED: selector now matches Download CV button)
const cvBtn = document.querySelector('.download-card .btn');
if (cvBtn) {
    cvBtn.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent immediate download (optional)

        const confirmDownload = confirm("Download Charles Wakanyi's CV?");

        if (confirmDownload) {
            const pdfUrl = this.getAttribute('href');
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Charles_Wakanyi_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("CV downloaded");
        }
    });
}

/* ============================
   CONTACT FORM + WEB3FORMS
   ============================ */

const contactForm = document.querySelector('.contact-form form');
const notification = document.querySelector('.notification-popup');

if (contactForm && notification) {
    const notificationIcon = notification.querySelector('.notification-content .icon');
    const notificationText = notification.querySelector('.notification-content span');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    function showToast(message, type = 'success') {
        // Clear previous state
        notification.classList.remove('error', 'success');

        if (type === 'error') {
            notification.classList.add('error');
            if (notificationIcon) {
                notificationIcon.className = 'fas fa-circle-exclamation icon';
            }
        } else {
            notification.classList.add('success');
            if (notificationIcon) {
                notificationIcon.className = 'fas fa-check-circle icon';
            }
        }

        if (notificationText) {
            notificationText.textContent = message;
        }

        // Restart animation
        notification.classList.remove('show');
        void notification.offsetWidth; // force reflow
        notification.classList.add('show');

        // Auto-hide
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3500);
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const subject = document.getElementById('subject')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';

        // Front-end validation
        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        // Build payload for Web3Forms (JS only)
        const formData = new FormData();
        formData.append('access_key', 'cbd50027-d670-496e-8a34-b38a58f13bd1'); // your key
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject || 'New Form Submission from your Website');
        formData.append('message', message);

        const originalText = submitBtn ? submitBtn.textContent : '';

        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showToast('Message sent, thank you!', 'success');
                contactForm.reset();
            } else {
                showToast(
                    'Failed to send message. Please try again.',
                    'error'
                );
            }
        } catch (error) {
            console.error(error);
            showToast('Network error. Please try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}