(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      const categoryElement = document.getElementById("inputCategory");
      const subcategoryElement = document.getElementById("inputSubcategory");
      const productElement = document.getElementById("inputProduct");
      const priceElement = document.getElementById("inputPrice");
      const submitButtonElement = document.getElementById("submit");
      const forms = document.getElementsByClassName("needs-validation");
      const params = new URLSearchParams(window.location.search),
        store = params.get("store");
      console.log(store);
      $.post("getCategories.php").done(function (data) {
        console.log(data);
        getCategories(data);
      }, "json");

      function getCategories(result) {
        result.map((cat) => {
          let option = document.createElement("option");
          option.value = cat.category_id;
          option.text = cat.name;
          categoryElement.appendChild(option);
        });

        categoryElement.addEventListener("change", onChangeCategories);

        function onChangeCategories() {
          subcategoryElement.removeAttribute("disabled");

          console.log(categoryElement.value);
          $.post("getSubcategories.php", {
            category: categoryElement.value,
          }).done(function (data) {
            console.log(data);
            getSubcategories(data);
          });

          function getSubcategories(result) {
            empty(subcategoryElement);
            empty(productElement);

            result.map((sub) => {
              let option = document.createElement("option");
              option.value = sub.subcategory_id;
              option.text = sub.name;
              subcategoryElement.appendChild(option);
            });
          }
          subcategoryElement.addEventListener("change", onChangeSubCategories);

          function onChangeSubCategories() {
            productElement.removeAttribute("disabled");
            console.log(subcategoryElement.value);
            $.get("getProducts.php", {
              subcategory: subcategoryElement.value,
            }).done(function (data) {
              console.log(data);
              getProducts(data);
            }, "json");

            empty(productElement);

            function getProducts(result) {
              result.map((product) => {
                let option = document.createElement("option");
                option.value = product.product_id;
                option.text = product.product_name;
                productElement.appendChild(option);
              });
            }
          }
        }
      }
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              // console.log(1);
              form.classList.add("was-validated");
              $.post("postOffer.php", {
                store: store,
                price: priceElement.value,
                product: productElement.value,
              }).done(function (data) {
                console.log(data);
                location.reload(true);
              });
            }
          },
          false
        );
      });
    },
    false
  );
})();

function empty(element) {
  for (let i = 0; i < element.length; i++) {
    if (element.options[i].value !== "") element.remove(i);
  }
}
