document.addEventListener('keydown', function(event) {
    var container = document.querySelector('#container');
    container.classList.add('rise');

    if (event.key === '1') {
        setTimeout(function() {
            window.location.href = './pages/quiz.html';
        }, 1475);
    } else if (event.key === '2') {
        setTimeout(function() {
            window.location.href = './pages/credits.html';
        }, 1475);
    }
});