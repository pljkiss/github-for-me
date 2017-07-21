$(document).ready(function () {


    //Get geolocation

    var location = {};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported');
    }

    function error() {
        alert('Oops! Couldn\'t find ya!');
    }

    function success(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;


        //neighborhood and city name
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + "&sensor=true", function (data) {
            $('#location').html(data.results[2].formatted_address);
        });

        //Weather info here
        var weather = 'https://api.darksky.net/forecast/e6d3165db672a4c2e6c3a0e595ed76c4/' + lat + ',' + lng + "?callback=?";

        $.getJSON(weather, function (data) {
            var temp = Math.floor(data.currently.temperature);

            //Temp convert


            $('#weather-icon').html(data.currently.icon);
            $('#weather-en').html(data.currently.summary);

            var feh = temp + '&deg' + 'F';
            var cel = Math.floor((5 / 9) * (temp - 32)) + '&deg' + 'C';
            $('.show').html(feh);
            $('.hidden').html(cel);
            $('#tempconv').on("click", function () {
                $('.toggle').toggleClass('show hidden');
            });



            //Skycons
            var iconRequest = data.currently.icon;
            var icons = new Skycons({
                "color": "#FFF"
            });
            var list = [
   "clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night",
   "cloudy", "rain", "sleet", "snow", "wind", "fog"];
            console.log(icons);
            for (i = 0; i < list.length; i++) {
                if (iconRequest == list[i]) {
                    icons.set('weather-icon', list[i]);
                }
            }
            icons.play();

        });

    }

});
