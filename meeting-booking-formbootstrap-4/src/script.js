const categoryElement = document.getElementById("inputCategory");
const subcategoryElement = document.getElementById("inputSubcategory");
const productElement = document.getElementById("inputProduct");
const priceElement = document.getElementById("inputPrice");
const submitButtonElement = document.getElementById("submit");

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
    $.post("getSubcategories.php", { category: categoryElement.value }).done(
      function (data) {
        console.log(data);
        getSubcategories(data);
      }
    );

    function getSubcategories(result) {
      // subcategoryElement.empty();
      // productElement.empty();
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
      $.get("getProducts.php", { subcategory: subcategoryElement.value }).done(
        function (data) {
          console.log(data);
          getProducts(data);
        },
        "json"
      );

      // productElement.empty();

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

function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}
