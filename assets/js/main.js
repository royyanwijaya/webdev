document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Hover Reveal Effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length === 0) return;

    // Create the reveal container
    const revealContainer = document.createElement('div');
    revealContainer.className = 'hover-reveal';
    document.body.appendChild(revealContainer);

    let currentImages = [];
    let imageElements = [];
    let isHovering = false;
    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Smooth following function
    const updatePosition = () => {
        if (!isHovering) return;
        
        // easing function for smooth cursor following
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        
        revealContainer.style.left = `${currentX}px`;
        revealContainer.style.top = `${currentY}px`;
        
        rafId = requestAnimationFrame(updatePosition);
    };

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            isHovering = true;
            revealContainer.classList.add('active');
            
            // Set initial position without easing to avoid flying in from corner
            targetX = e.clientX;
            targetY = e.clientY;
            if (currentX === 0 && currentY === 0) {
                currentX = targetX;
                currentY = targetY;
                revealContainer.style.left = `${currentX}px`;
                revealContainer.style.top = `${currentY}px`;
            }

            // Get images array from data attribute
            try {
                const imagesData = item.getAttribute('data-images');
                if (imagesData) {
                    currentImages = JSON.parse(imagesData);
                } else {
                    currentImages = [];
                }
            } catch (err) {
                console.error("Failed to parse data-images", err);
                currentImages = [];
            }

            // Populate images
            revealContainer.innerHTML = '';
            imageElements = [];
            currentImages.forEach((src, idx) => {
                const img = document.createElement('img');
                img.src = src;
                if (idx === 0) img.classList.add('active'); // show first by default
                revealContainer.appendChild(img);
                imageElements.push(img);
            });

            // Start animation loop
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updatePosition);
        });

        item.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;

            // Determine which image to show based on horizontal position
            if (currentImages.length > 0) {
                const rect = item.getBoundingClientRect();
                // Get mouse X relative to the item
                const relativeX = e.clientX - rect.left;
                const width = rect.width;
                
                // Calculate index based on how many segments
                const segmentWidth = width / currentImages.length;
                let index = Math.floor(relativeX / segmentWidth);
                
                // Clamp index just in case
                index = Math.max(0, Math.min(index, currentImages.length - 1));

                // Update active image
                imageElements.forEach((img, i) => {
                    if (i === index) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
        });

        item.addEventListener('mouseleave', () => {
            isHovering = false;
            revealContainer.classList.remove('active');
        });
    });
});
