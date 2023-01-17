window.onload = function () {
  const storeElement = $("#storeSelect");
  const categoryElement = $("#categorySelect");
  const storeButton = $("#searchStore");
  const categoryButton = $("#searchCategory");

  function resetMarkers(label) {
    map.removeLayer(label);
    lable = new L.layerGroup();
    map.addLayer(label);
  }

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
    // iconAnchor: [20, 0],
  });
  const orange = L.icon({
    iconUrl: "icons/orange.png",
    iconSize: [38, 38],
    // iconAnchor: [20, 0],
  });

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
      url: "getMapMarkerInfo.php",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
    });

    discountAjax.done(markers);

    function markers(res) {
      res.map((store) => {
        const container = $("<div />");
        marker = L.marker([store.lat, store.lon], { icon: orange });
        stores.addLayer(marker);
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
          let url = "discountsPage.php?" + params.toString();
          location.href = url;
          window.open(url);
        });
        container.on("click", ".submitOffer", function () {
          // URL PARAMETERS
          let params = new URLSearchParams();
          params.append("store", store.id);

          let url = "declare.php?" + params.toString();
          location.href = url;
          window.open(url);
        });
        marker.bindPopup(container[0]);
        stores.addLayer(marker);
      });
    }
  } // telos markers prosforon

  // arxi store dropdown
  const storesAjax = $.ajax({
    url: "getStoreNames.php",
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
        alert("Please select");
      } else {
        let selectedStore = result.find(
          (store) => store.store_id === storeElement.val()
        );
        let container = $("<div />");
        marker = L.marker([selectedStore.lat, selectedStore.lon], {
          icon: blue,
        });
        stores.addLayer(marker);
        container.html(
          `<lable class="form-label">Name: ${selectedStore.store_name}</lable><br><br><button class="btn btn-primary btn-sm submitOffer">Προσθήκη προσφοράς</button>`
        );
        marker.bindPopup(container[0]);
        stores.addLayer(marker);
        map.setView([selectedStore.lat, selectedStore.lon], 18);
      }
    });
  } // telos store dropdown

  // arxi offer dropdown
  const categoryAjax = $.ajax({
    url: "getCategories.php",
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
      // console.log(categoryElement.val());
      if (categoryElement.val() === "") {
        alert("Please select");
      }
      const storeOfferAjax = $.ajax({
        url: "getStoreOffer.php",
        method: "POST",
        dataType: "json",
        data: { input: categoryElement.val() },
        success: function (data) {
          // console.log(data);
        },
      });

      storeOfferAjax.done(categoryOffers);

      function categoryOffers(result) {
        resetMarkers(stores);

        result.map((offer) => {
          // console.log(offer);
          let container = $("<div />");
          marker = L.marker([offer.lat, offer.lon], { icon: orange });
          stores.addLayer(marker);
          container.html(
            `<lable class="form-label">Name: ${offer.store_name}</lable><br><br><button class="btn btn-primary btn-sm showOffer">Προβολή προσφορών</button><br><br><button class="btn btn-primary btn-sm submitOffer">Προσθήκη προσφοράς</button>`
          );
          container.on("click", ".showOffer", function () {
            let params = new URLSearchParams();
            params.append("discount_id", offer.discount_id);
            let url = "discountsPage.php?" + params.toString();
            location.href = url;
            window.open(url);
          });
          container.on("click", ".submitOffer", function () {
            // URL PARAMETERS
            let params = new URLSearchParams();
            params.append("store", offer.store_id);

            let url = "declare.php?" + params.toString();
            location.href = url;
            window.open(url);
          });
          marker.bindPopup(container[0]);
          stores.addLayer(marker);
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
