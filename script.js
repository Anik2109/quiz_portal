const startButton = document.querySelector('.start-btn');

startButton.addEventListener('mouseenter', () => {
    startButton.style.transform = 'scale(1.1)';
    startButton.style.transition = 'transform 0.3s ease';
});

startButton.addEventListener('mouseleave', () => {
    startButton.style.transform = 'scale(1)';
});

window.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    setTimeout(() => {
        heroText.classList.add('fade-in');
    }, 400); 
});

startButton.addEventListener('click', () => {
    window.location.href = 'quiz.html';
});

