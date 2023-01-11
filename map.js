window.onload = function () {
  // topiki wra
  let currentdate = new Date();
  let day = currentdate.toLocaleString("en-us", {
    weekday: "long",
  });

  // eisagwgi xarti
  var baseLayer = L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18,
    }
  );
  var map = new L.Map("map", {
    center: new L.LatLng(38.246361, 21.734966),
    zoom: 15,
    layers: [baseLayer],
    zoomControl: false,
  });
  var stores = new L.layerGroup();
  map.addLayer(stores);

  // HTML Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMarker, showError);
  } else {
    Swal.fire({
      icon: "error",
      title: "Geolocation is not supported by this browser!",
    });
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  // arxikopoihsh icons
  const blue = L.icon({
    iconUrl: "icons/blue.png",
    iconSize: [38, 38],
    iconAnchor: [20, 0],
  });
  const orange = L.icon({
    iconUrl: "icons/orange.png",
    iconSize: [38, 38],
    iconAnchor: [20, 0],
  });

  function showMarker(position) {
    // eisagwgi tis topothesias to xristi
    let ClLock = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ]);
    ClLock.bindPopup("You are here");
    stores.addLayer(ClLock);
    map.setView([position.coords.latitude, position.coords.longitude], 13);

    // emfanisi katastimaton me prosfores
    const discountAjax = $.ajax({
      url: "getMapMarkerInfo.php",
      method: "GET",
      dataType: "json",
      success: function (data) {
        // console.log(data);
      },
      error: function (xhr, exception) {
        var msg = "";
        if (xhr.status === 0) {
          msg = "Not connect.\n Verify Network." + xhr.responseText;
        } else if (xhr.status == 404) {
          msg = "Requested page not found. [404]" + xhr.responseText;
        } else if (xhr.status == 500) {
          msg = "Internal Server Error [500]." + xhr.responseText;
        } else if (exception === "parsererror") {
          msg = "Requested JSON parse failed.";
        } else if (exception === "timeout") {
          msg = "Time out error." + xhr.responseText;
        } else if (exception === "abort") {
          msg = "Ajax request aborted.";
        } else {
          msg = "Error:" + xhr.status + " " + xhr.responseText;
        }
        console.log(msg);
      },
    });

    discountAjax.done(markers);

    function markers(res) {
      res.map((store) => {
        marker = L.marker([store.lat, store.lon], {icon: orange});

        var container = $("<div />");
        container.html(`<p for="store_name">Name: ${store.store_name}</p>
        <p for="price">price: ${store.price}€</p>
        <p for="product">product: ${store.product}</p>
        <button class="submit">Αξιολόγηση</button>`);

        container.on("click", ".submit", function () {
          alert('komple bro')
        });

        marker.bindPopup(container[0]);
        stores.addLayer(marker);
      })
    }
  }// telos markers prosforon

  // arxi searchbar
  const storesAjax = $.ajax({
    url: "getStoreNames.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      // console.log(data)
    },
  });

  storesAjax.done(searchResult);

  function searchResult(res) {
    // kouti anazitisis
    storeNames = [];
    
    res.map((store) =>{
      storeNames.push(store.store_name);
    })
    console.log(storeNames);
    let unique = [...new Set(storeNames)];
    let searchbox = L.control
      .searchbox({
        position: "topright",
        expand: "left",
        width: "450px",
        autocompleteFeatures: ["setValueOnClick"],
      })
      .addTo(map);

    let fuse = new Fuse(unique, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
    });
    let option = ''
    searchbox.onInput("keyup", function (e) {
      if (e.keyCode == 13) {
        search();
      } else {
        let value = searchbox.getValue();
        if (value != "") {
          results = fuse.search(value);
          option = results.map((res) => res.refIndex)
          searchbox.setItems(results.map((res) => res.item).slice(0, 5));
          console.log(option);
        } else {
          searchbox.clearItems();
        }
      }
    });

    searchbox.onButton("click", search);

    function search() {
      let value = searchbox.getValue();
      
      console.log(value);

      // pop = round(info[0].populartimes);

      // if (pop >= 0 && pop <= 32) {
      //   let marker = L.marker(L.latLng(info[0].lat, info[0].lng), {
      //     icon: icon1,
      //   }).addTo(map);
      // } else if (pop >= 33 && pop <= 65) {
      //   let marker = L.marker(L.latLng(info[0].lat, info[0].lng), {
      //     icon: icon2,
      //   }).addTo(map);
      // } else if (pop >= 66) {
      //   let marker = L.marker(L.latLng(info[0].lat, info[0].lng), {
      //     icon: icon3,
      //   }).addTo(map);
      // } else {
      //   let marker = L.marker(L.latLng(info[0].lat, info[0].lng)).addTo(map);
      // }

      // marker.bindPopup(
      //   "Name: '" +
      //     info[0].name +
      //     "'<br> Address: " +
      //     info[0].address +
      //     "<br>Traffic: " +
      //     Math.round(round(info[0].populartimes))
      // );
      // map.setView([info[0].lat, info[0].lng], 20);

      // function round(data) {
      //   let estimate = [];
      //   estimate.push(
      //     parseInt(data[currentdate.getHours()]),
      //     parseInt(data[currentdate.getHours() + 1]),
      //     parseInt(data[currentdate.getHours() + 2])
      //   );
      //   return estimate.reduce((a, b) => a + b) / 3;
      // }

      // setTimeout(function () {
      //   searchbox.hide();
      //   searchbox.clear();
      // }, 600);
    }
  }
  //telos searchbar

  // euresi apostasis
  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return parseInt(d * 1000);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
};
