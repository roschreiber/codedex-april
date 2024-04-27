window.onload = function() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var source = context.createBufferSource();
    var gainNode = context.createGain();

    var request = new XMLHttpRequest();
    request.open('GET', '../sounds/little-slimex27s-adventure-151007.mp3', true);
    request.responseType = 'arraybuffer';

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
        var duration = 2.0; // duration of fade-in in seconds
        var startTime = context.currentTime;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(1, startTime + duration);
    }
}