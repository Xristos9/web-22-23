$("#nav-placeholder-admin").load("adminNavbar.html");
$("#footer-placeholder").load("footer.html");

function storesUpload(input) {
  const file = new FileReader();
  file.readAsText(input.files[0]);

  file.onload = function (e) {
    const data = JSON.parse(e.currentTarget.result);
    console.log(data.elements);

    let upload = [];
    data.elements.map((store) => {
      stuff = {};
      if (store.tags.name !== undefined) {
        stuff.id = store.id;
        stuff.name = store.tags.name;
        stuff.lat = store.lat;
        stuff.lon = store.lon;
        upload.push(stuff);
      }
    });
    console.log(upload);

    document
      .getElementById("storesUploadButton")
      .addEventListener("click", function () {
        Swal.fire({
          title: "File uploading...",
          showConfirmButton: false,
        });
        $.ajax({
          url: "./php/uploadStores.php",
          type: "POST",
          // dataType: 'json',
          data: { data: JSON.stringify(upload) },
          success: function (data) {
            console.log(data);
            if (data == 1) {
              Swal.close();
              Swal.fire({
                icon: "success",
                title: "File uploaded",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          },
        });
      });
  };

  file.onerror = function () {
    console.log(reader.error);
  };
}

function categoriesProductsUpload(input) {
  const file = new FileReader();
  file.readAsText(input.files[0]);

  file.onload = function (e) {
    const data = JSON.parse(e.currentTarget.result);
    // console.log(data.categories);

    let categories = [];
    let subcategories = [];

    data.categories.map((category) => {
      cat = {};
      cat.id = category.id;
      cat.name = category.name;
      categories.push(cat);
      category.subcategories.map((subcategory) => {
        sub = {};
        sub.id = subcategory.uuid;
        sub.name = subcategory.name;
        sub.categoryId = category.id;
        subcategories.push(sub);
      });
    });

    console.log(categories);
    console.log(subcategories);
    console.log(data.products);

    document
      .getElementById("categoriesProductsUploadButton")
      .addEventListener("click", function () {
        Swal.fire({
          title: "File uploading...",
          showConfirmButton: false,
        });
        $.ajax({
          url: "./php/uploadCategoriesProducts.php",
          type: "POST",
          // dataType: 'json',
          data: {
            categories: JSON.stringify(categories),
            subcategories: JSON.stringify(subcategories),
            products: JSON.stringify(data.products),
          },
          success: function (data) {
            console.log(data);
            if (data == 1) {
              Swal.close();
              Swal.fire({
                icon: "success",
                title: "File uploaded",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          },
        });
      });
  };

  file.onerror = function () {
    console.log(reader.error);
  };
}

function pricesUpload(input) {
  const file = new FileReader();
  file.readAsText(input.files[0]);

  file.onload = function (e) {
    const data = JSON.parse(e.currentTarget.result).data;
    console.log(data);

    const ajax = $.ajax({
      url: "./php/getProducts.php",
      method: "GET",
      dataType: "json",
      data: { subcategory: 1 },
      success: function (data) {
        // console.log(data);
      },
    });

    ajax.done(productMatch);

    function productMatch(result) {
      console.log(result);
      let upload = [];
      data.map((dato) => {
        result.map((product) => {
          if (product.product_name === dato.name) {
            dato.prices.map((price) => {
              stuff = {};
              stuff.id = product.product_id;
              stuff.date = price.date;
              stuff.price = price.price;
              upload.push(stuff);
            });
          }
        });
      });
      console.log(upload);

      document
        .getElementById("pricesUploadButton")
        .addEventListener("click", function () {
          Swal.fire({
            title: "File uploading...",
            showConfirmButton: false,
          });
          $.ajax({
            url: "./php/uploadPrices.php",
            type: "POST",
            // dataType: 'json',
            data: { data: JSON.stringify(upload) },
            success: function (data) {
              console.log(data);
              if (data == 1) {
                Swal.close();
                Swal.fire({
                  icon: "success",
                  title: "File uploaded",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            },
          });
        });
    }
  };

  file.onerror = function () {
    console.log(reader.error);
  };
}
