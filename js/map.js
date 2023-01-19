window.onload = function () {
  const logged_user = JSON.parse(localStorage.getItem("logged_user"));
  // console.log(logged_user);
  if (logged_user[0].isAdmin === "0") {
    $("#nav-placeholder").load("navbar.html");
  } else {
    $("#nav-placeholder").load("adminNavbar.html");
  }
  $("#footer-placeholder").load("footer.html");

  const storeElement = $("#storeSelect");
  const categoryElement = $("#categorySelect");
  const storeButton = $("#searchStore");
  const categoryButton = $("#searchCategory");

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
  let stores = new L.layerGroup();
  map.addLayer(stores);
  const userMarker = new L.layerGroup();
  map.addLayer(userMarker);

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
        Swal.fire({
          icon: "error",
          title: "Geolocation is not supported by this browser!",
        });
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
    // iconAnchor: [20, 0],
  });
  const orange = L.icon({
    iconUrl: "icons/orange.png",
    iconSize: [38, 38],
    // iconAnchor: [20, 0],
  });
  let markerdata = [];
  let markers = {};
  function showMarker(position) {
    // eisagwgi tis topothesias to xristi
    let ClLock = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ]);
    ClLock.bindPopup("You are here");
    userMarker.addLayer(ClLock);
    map.setView([position.coords.latitude, position.coords.longitude], 13);

    // emfanisi katastimaton me prosfores
    const discountAjax = $.ajax({
      url: "./php/getMapMarkerInfo.php",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
    });

    discountAjax.done(markersff);

    function markersff(res) {
      res.map((store, index) => {
        markerdata.push(index);
        const container = $("<div />");
        markers[index] = L.marker([store.lat, store.lon], { icon: orange });
        // stores.addLayer(marker);
        if (
          getDistance(
            position.coords.latitude,
            position.coords.longitude,
            store.lat,
            store.lon
          ) <= 5000000
        ) {
          container.html(
            `<lable class="form-label">Name: ${store.store_name}</lable><br><br><button class="btn btn-primary btn-sm showOffer">Προβολή προσφορών</button><br><br><button class="btn btn-primary btn-sm submitOffer">Προσθήκη προσφοράς</button>`
          );
        } else {
          container.html(
            `<lable class="form-label">Name: ${store.store_name}</lable><br><br><button class="btn btn-primary btn-sm submit">Προβολή προσφοράς</button>`
          );
        }
        container.on("click", ".showOffer", function () {
          let params = new URLSearchParams();
          params.append("discount_id", store.discount_id);
          let url = "./discountsPage.html?" + params.toString();
          location.href = url;
          window.open(url);
        });
        container.on("click", ".submitOffer", function () {
          // URL PARAMETERS
          let params = new URLSearchParams();
          params.append("store", store.id);

          let url = "./declare.html?" + params.toString();
          location.href = url;
          window.open(url);
        });
        markers[index].bindPopup(container[0]);
        markers[index].addTo(map);
        // stores.addLayer(marker);
      });
      console.log(markers);
    }
  } // telos markers prosforon

  // arxi store dropdown
  const storesAjax = $.ajax({
    url: "./php/getStoreNames.php",
    method: "POST",
    dataType: "json",
    success: function (data) {
      // console.log(data);
      // createOptions()
    },
  });

  storesAjax.done(storeResults);

  function storeResults(result) {
    storeElement.append(new Option("Select Store", ""));
    result.map((store) => {
      storeElement.append(new Option(store.store_name, store.store_id));
    });
    storeElement.selectpicker("refresh");

    storeButton.click(function () {
      if (storeElement.val() === "") {
        Swal.fire({
          icon: "error",
          title: "Please select a store",
        });
      } else {
        let selectedStore = result.find(
          (store) => store.store_id === storeElement.val()
        );
        let container = $("<div />");
        markers[markerdata.length] = L.marker(
          [selectedStore.lat, selectedStore.lon],
          {
            icon: blue,
          }
        );
        container.html(
          `<lable class="form-label">Name: ${selectedStore.store_name}</lable><br><br><button class="btn btn-primary btn-sm submitOffer">Προσθήκη προσφοράς</button>`
        );
        container.on("click", ".submitOffer", function () {
          // URL PARAMETERS
          // console.log(selectedStore);
          let params = new URLSearchParams();
          params.append("store", selectedStore.store_id);

          let url = "./declare.html?" + params.toString();
          location.href = url;
          window.open(url);
        });
        markers[markerdata.length].bindPopup(container[0]);
        markers[markerdata.length].addTo(map);
        map.setView([selectedStore.lat, selectedStore.lon], 18);
        markerdata[markerdata.length] = markerdata.length;
      }
    });
  } // telos store dropdown

  // arxi offer dropdown
  const categoryAjax = $.ajax({
    url: "./php/getCategories.php",
    method: "POST",
    dataType: "json",
    success: function (data) {
      // console.log(data);
    },
  });

  categoryAjax.done(categoryResults);

  function categoryResults(result) {
    categoryElement.append(new Option("Select Category", ""));
    result.map((category) => {
      categoryElement.append(new Option(category.name, category.category_id));
    });
    categoryElement.selectpicker("refresh");
    categoryButton.click(function () {
      if (categoryElement.val() === "") {
        Swal.fire({
          icon: "error",
          title: "Please select a Category",
        });
      } else {
        for (let i = 0; i < markerdata.length; i++) {
          let id = markerdata[i],
            marker = markers[id];
          latLng = marker.getLatLng();
          map.removeLayer(marker);
        }
        console.log(markerdata);
        markerdata = [];
      }
      const storeOfferAjax = $.ajax({
        url: "./php/getStoreOffer.php",
        method: "POST",
        dataType: "json",
        data: { input: categoryElement.val() },
        success: function (data) {
          console.log(data);
        },
      });

      storeOfferAjax.done(categoryOffers);

      function categoryOffers(result) {
        result.map((offer, index) => {
          // console.log(offer);
          markerdata.push(index);
          let container = $("<div />");
          markers[index] = L.marker([offer.lat, offer.lon], { icon: orange });
          container.html(
            `<lable class="form-label">Name: ${offer.store_name}</lable><br><br><button class="btn btn-primary btn-sm showOffer">Προβολή προσφορών</button><br><br><button class="btn btn-primary btn-sm submitOffer">Προσθήκη προσφοράς</button>`
          );
          container.on("click", ".showOffer", function () {
            let params = new URLSearchParams();
            params.append("discount_id", offer.discount_id);
            let url = "./discountsPage.html?" + params.toString();
            location.href = url;
            window.open(url);
          });
          container.on("click", ".submitOffer", function () {
            // URL PARAMETERS
            let params = new URLSearchParams();
            params.append("store", offer.store_id);

            let url = "./declare.html?" + params.toString();
            location.href = url;
            window.open(url);
          });
          markers[index].bindPopup(container[0]);
          markers[index].addTo(map);
        });
      }
    });
  } // telos offer dropdown
};

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
