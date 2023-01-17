<!DOCTYPE html>
<html lang="en">

<head>
  <title>Discounts</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
  <link href="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.css" rel="stylesheet">
  <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>
  <script src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
</head>

<body>
  <!-- Navbar -->
  <?php include "navbar.php"; ?>
  <br /><br /><br />
  <section class="bg-primary text-light p-5 p-lg-3  text-sm-start">
    <h2 class='text-center'>Προσφορές</h2>
  </section>
  <div class="filler">
    <div class="container bg-light pt-5">
      <table id="kwdata" data-search="true" data-unique-id="discount_id" data-sort-name="product" data-sort-order="desc" data-detail-view="true" data-detail-formatter="detailFormatter">
        <thead>
          <tr>
            <th data-field="product" data-sortable="true">Προιόν</th>
            <th data-field="price" data-sortable="true">Price</th>
            <th data-field="date" data-sortable="true">Ημερομηνία Καταχώρησης</th>
            <th data-field="username" data-sortable="true">Χρήστης</th>
            <th data-field="likes" data-sortable="true">Likes</th>
            <th data-field="dislikes" data-sortable="true">Dislikes</th>
            <th data-field="inventory" data-sortable="true">Απόθεμα</th>
            <th data-field="overallScore" data-sortable="true">Σκορ Χρήστη</th>
            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents">Like/Dislike</th>
            <th data-field="invButton" data-formatter="operateFormatter2" data-events="operateEvents2">Σε Απόθεμα</th>
            <th data-field="discount_id" data-sortable="true" data-visible="false"></th>
          </tr>
        </thead>
      </table>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
  <script src="discountsPage.js"></script>
</body>

</html>