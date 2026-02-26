// 3D Card Tilt Effect
// Makes cards tilt based on mouse position for an interactive 3D effect

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // Store original transform
    card.dataset.originalTransform = card.style.transform || '';
    
    card.addEventListener('mouseenter', function(e) {
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.4s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (max ±15 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      // Apply 3D transform
      card.style.transform = `
        translateY(-12px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.02)
      `;
      
      // Add shine effect based on mouse position
      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.left = `${x}px`;
        shine.style.top = `${y}px`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
      card.style.transform = card.dataset.originalTransform;
    });
  });
  
  // Add perspective to container
  const cardLists = document.querySelectorAll('.horizontal-list');
  cardLists.forEach(list => {
    list.style.perspective = '1000px';
  });
});
