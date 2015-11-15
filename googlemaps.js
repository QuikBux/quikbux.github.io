 function initialize() {
     /*var mapOptions = {
         center: new google.maps.LatLng(0, 0),
         zoom: 3
     };

     var map = new google.maps.Map(document.getElementById('map-canvas'),
         mapOptions);*/




     usersRef.once('value', function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
             console.log(childSnapshot.val().city);
             $.ajax({
                 type: "GET",
                 url: "https://maps.googleapis.com/maps/api/geocode/xml?address=" + encodeURIComponent(childSnapshot.val().city) + "&key=AIzaSyCph8xf4Aw1o3-5HkTR_uOKIA_N4Ms5naY",
                 dataType: "xml",
                 success: processXML,
                 error: error
             });
         })
     })

     var mapOptions = {
         center: new google.maps.LatLng(0, 0),
         zoom: 2
     };


     var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

     function error() {
         alert("Error");
     }

     function processXML(xml) {

         var latitude = 0;
         var longitude = 0;


         $(xml).find("geometry").each(function() {
             $(xml).find("location").each(function() {
                 latitude = parseFloat($(this).find("lat").text());
                 longitude = parseFloat($(this).find("lng").text());
             });
         });


         var marker = new google.maps.Marker({
             position: new google.maps.LatLng(latitude, longitude),
             map: map,
             title: "Something"
         });

         google.maps.event.trigger(map, 'resize');
     }

 }
 google.maps.event.addDomListener(window, 'load', initialize);

setTimeout(function () {
    $("#map-canvas").css("visibility", "visible");
}, 1000)


