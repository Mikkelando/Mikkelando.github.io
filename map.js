var logo = document.querySelector('.intro_img');
    var rotationAngle = 0;
    setInterval(function() {
        rotationAngle -= .1;
        logo.style.transform = 'rotate(' + rotationAngle + 'deg)';
    }, 10);

var map = L.map('map').setView([55.803474, 37.409846], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var marker = L.marker([55.803474, 37.409846]).addTo(map);
marker.bindPopup("<b>МИЭМ</b><br>Мы учимся туть").openPopup();