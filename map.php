<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@5.0.10-beta/dist/fuse.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/css/bootstrap-select.min.css">
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js"></script>
</head>

<body>
  <!-- Navbar -->
  <?php include "navbar.php"; ?>
  <br /><br />
  <!-- Showcase -->
  <section class="bg-primary text-light p-lg-0 pt-lg-5 text-center text-sm-start">
    <div class="container">
      <div class="d-sm-inline align-items-center justify-content-between">
        <form class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Store</label>
            <select id="storeSelect" class="selectpicker form-control" aria-label="Default select example" data-live-search="true">
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Category</label>
            <select id="categorySelect" class="selectpicker form-control" aria-label="Default select example" data-live-search="true">
            </select>
          </div>

          <div class="col-6">
            <button id="searchStore" type="button" class="btn btn-dark">Search</button>
          </div>
          <div class="col-6">
            <button id="searchCategory" type="button" class="btn btn-dark">Search</button>
          </div>
      </div>
      <br />
    </div>
  </section>
  <div id="map"></div>

  <!-- Footer -->
  <?php include "footer.php"; ?>
  <script src="map.js"></script>
</body>

</html>