<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <title>Declaration</title>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  </head>
  <body>
    <!-- Navbar -->
    <?php include "navbar.php"; ?>
    <br /><br />

    <div class="filler">
      <!-- Showcase -->
      <section
        class="bg-primary text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
      >
        <div class="container">
          <div class="d-sm-flex align-items-center justify-content-between">
            <div>
              <label class="form-label"
                >Select Category</label
              >
              <select
                id="category"
                class="form-select"
                data-live-search="true"
                data-container="body"
              >
                <option>Select Category</option>
              </select>
              <br />
            </div>
            <div>
              <label class="form-label"
                >Select Subcategory</label
              >
              <select
                id="subcategory"
                class="form-select"
                data-live-search="true"
                data-container="body"
                disabled
              >
                <option>Select Subcategory</option>
              </select>
              <br />
            </div>
            <div>
              <label class="form-label"
                >Select Product</label
              >
              <select
                id="product"
                class="form-select"
                data-live-search="true"
                data-container="body"
                disabled
              >
                <option>Select Product</option>
              </select>
              <br />
            </div>
            <div>
              <label class="form-label"
                >Enter Price</label
              >
              <input class="form-control" type="text" id="price" required />
              <br />
            </div>

            <button
              type="button"
              id="submit"
              class="btn btn-dark"
            >
              Submit
            </button>
          </div>
          <br />
        </div>
      </section>
    </div>

    <!-- Footer -->
    <?php include "footer.php";?> 
    <script src="declare.js"></script>
  </body>
</html>
