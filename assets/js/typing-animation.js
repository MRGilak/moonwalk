// Typing Animation Effect - Infinite Loop Version
// Types out the text, deletes it, and repeats forever

document.addEventListener('DOMContentLoaded', function() {
  const headerTitle = document.querySelector('header h1');
  const headerDesc = document.querySelector('header p');
  
  if (!headerTitle) return;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Skip animation for accessibility
    return;
  }
  
  // Store the original texts
  const originalTitle = headerTitle.textContent;
  const originalDesc = headerDesc ? headerDesc.textContent : '';
  const phrases = [originalTitle, 'Robotics Control Engineer'].filter(Boolean);
  
  // Clear the title text and add typing cursor
  headerTitle.textContent = '';
  headerTitle.innerHTML = '<span class="typing-text"></span><span class="typing-cursor">|</span>';
  
  const typingText = headerTitle.querySelector('.typing-text');
  const cursor = headerTitle.querySelector('.typing-cursor');
  
  let charIndex = 0;
  let phraseIndex = 0;
  let isDeleting = false;
  let isFirstCycle = true; // Track first cycle for description fade-in
  
  const typingSpeed = 80; // ms per character when typing
  const deletingSpeed = 40; // ms per character when deleting (faster)
  const pauseAfterTyping = 3000; // pause when fully typed (3 seconds)
  const pauseAfterDeleting = 1000; // pause when fully deleted (1 second)
  const pauseBeforeStart = 300; // initial delay
  
  // Hide description initially if it exists
  if (headerDesc) {
    headerDesc.style.opacity = '0';
  }
  
  // Start the loop
  setTimeout(() => {
    animateText();
  }, pauseBeforeStart);
  
  function animateText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
      // TYPING MODE
      if (charIndex < currentPhrase.length) {
        typingText.textContent += currentPhrase.charAt(charIndex);
        charIndex++;
        
        // Randomize speed for natural feel
        const variance = Math.random() * 40 - 20;
        setTimeout(animateText, typingSpeed + variance);
      } else {
        // Finished typing - show description on first cycle only
        if (isFirstCycle && headerDesc && originalDesc) {
          headerDesc.style.transition = 'opacity 0.8s ease-in';
          headerDesc.style.opacity = '1';
          isFirstCycle = false;
        }
        
        // Pause, then start deleting
        setTimeout(() => {
          isDeleting = true;
          animateText();
        }, pauseAfterTyping);
      }
    } else {
      // DELETING MODE
      if (charIndex > 0) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(animateText, deletingSpeed);
      } else {
        // Finished deleting - move to next phrase, then start typing again
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isDeleting = false;
        setTimeout(animateText, pauseAfterDeleting);
      }
    }
  }
});
