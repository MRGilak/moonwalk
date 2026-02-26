// Reading Progress Bar
// Shows a progress indicator at the top of the page as you scroll

document.addEventListener('DOMContentLoaded', function() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  document.body.appendChild(progressBar);
  
  // Create progress fill element
  const progressFill = document.createElement('div');
  progressFill.className = 'reading-progress-fill';
  progressBar.appendChild(progressFill);
  
  // Update progress on scroll
  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate percentage scrolled
    const progress = (scrollTop / documentHeight) * 100;
    
    // Update progress bar width
    progressFill.style.width = Math.min(progress, 100) + '%';
    
    // Add 'started' class when user has scrolled a bit
    if (scrollTop > 50) {
      progressBar.classList.add('started');
    } else {
      progressBar.classList.remove('started');
    }
    
    // Add 'completed' class when reaching bottom
    if (progress >= 99) {
      progressBar.classList.add('completed');
    } else {
      progressBar.classList.remove('completed');
    }
  }
  
  // Listen to scroll events with throttling for performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Initial update
  updateProgress();
  
  // Update on resize
  window.addEventListener('resize', updateProgress);
});
