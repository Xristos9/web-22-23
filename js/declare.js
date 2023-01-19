(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      const logged_user = JSON.parse(localStorage.getItem("logged_user"));
      // console.log(logged_user);
      if (logged_user[0].isAdmin === "0") {
        $("#nav-placeholder").load("navbar.html");
      } else {
        $("#nav-placeholder").load("adminNavbar.html");
      }
      $("#footer-placeholder").load("footer.html");

      const currentdate = new Date().toISOString().slice(0, 10);

      const categoryElement = document.getElementById("inputCategory");
      const subcategoryElement = document.getElementById("inputSubcategory");
      const productElement = document.getElementById("inputProduct");
      const priceElement = document.getElementById("inputPrice");
      const submitButtonElement = document.getElementById("submit");
      const forms = document.getElementsByClassName("needs-validation");
      const params = new URLSearchParams(window.location.search),
        store = params.get("store");
      console.log(store);
      $.post("./php/getCategories.php").done(function (data) {
        // console.log(data);
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

          // console.log(categoryElement.value);
          $.post("./php/getSubcategories.php", {
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
            // console.log(subcategoryElement.value);
            $.get("./php/getProducts.php", {
              subcategory: subcategoryElement.value,
            }).done(function (data) {
              // console.log(data);
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
      const validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              checkScore();
              form.classList.add("was-validated");
            }
          },
          false
        );
      });

      function checkScore() {
        let points = 0;
        let weeklyAvaragePrice = 0;
        let dayAvaragePrice = 0;
        let overAllFlag = true;
        $.post("./php/getPrices.php", {
          store: store,
          price: priceElement.value,
          product: productElement.value,
          date: currentdate,
        }).done(function (data) {
          if (data[0].length) {
            data[0].map((data) => {
              weeklyAvaragePrice = weeklyAvaragePrice + parseFloat(data.price);
            });
            weeklyAvaragePrice = weeklyAvaragePrice / data[0].length;
            dayAvaragePrice = data[0][data[0].length - 1].price;

            if (priceElement.value <= dayAvaragePrice - dayAvaragePrice * 0.2) {
              points = 50;
            } else if (
              priceElement.value <
              weeklyAvaragePrice - weeklyAvaragePrice * 0.2
            ) {
              points = 20;
            } else {
              points = 0;
            }
          }
          if (data[1].length) {
            let result = data[1].filter((data) => {
              return data
                ? data.product_id == productElement.value &&
                    data.store_id == store
                : null;
            });
            overAllFlag =
              !result.length &&
              !(priceElement.value < result.price - result.price * 0.2);

            console.log(overAllFlag);
          }

          if (overAllFlag) {
            $.post("./php/uploadOffer.php", {
              store: store,
              price: priceElement.value,
              product: productElement.value,
              points: points,
            }).done(function (data) {
              // console.log(data);
              location.reload(true);
            });
            console.log("success");
          } else {
            Swal.fire({
              icon: "error",
              title: "Δεν μπορείς να υποβάλεις την ίδια προσθορά 2 φορές",
            });
          }
        });
      }
    },
    false
  );
})();

function empty(element) {
  for (let i = 0; i < element.length; i++) {
    if (element.options[i].value !== "") element.remove(i);
  }
  // $(`#${element}`).empty();
}
