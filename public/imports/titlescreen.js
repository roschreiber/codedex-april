window.onload = function() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var source = context.createBufferSource();
    var gainNode = context.createGain();

    var request = new XMLHttpRequest();
    request.open('GET', './sounds/deoxys-beats-simply-me.mp3', true);
    request.responseType = 'arraybuffer';
    
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        @keyframes blink {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0;
              }
        }
        .blink {
            animation: blink 0.5s infinite;
        }
    `;

    document.getElementsByTagName('head')[0].appendChild(style);

    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(context.destination);
            source.loop = true;
            source.start(0);
            fadeIn(gainNode);
        });
    }
    request.send();

    function fadeIn(gainNode) {
        var duration = 2.0;
        var startTime = context.currentTime;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.67, startTime + duration);
    }

    function fadeOut(gainNode) {
        var duration = 2.0;
        var startTime = context.currentTime;
        gainNode.gain.setValueAtTime(1, startTime);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    }

    var buttonSound = new Audio('./sounds/button-124476.mp3');

    document.addEventListener('keydown', function(event) {
        var container = document.querySelector('#container');
        container.classList.add('rise');
    
        if (event.key === '1' || event.key === '2') {
            var selectedElement = document.querySelector(event.key === '1' ? '.selectone' : '.selecttwo');
    
            selectedElement.classList.add('blink');
    
            buttonSound.play();
            fadeOut(gainNode);
            setTimeout(function() {
                source.stop();
                window.location.href = event.key === '1' ? './pages/quiz.html' : './pages/credits.html';
            }, buttonSound.duration * 1000);
        }
    });
}