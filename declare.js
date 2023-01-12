window.onload = () => {
  const categoryElement = document.getElementById("category");
  const subcategoryElement = document.getElementById("subcategory");
  const productElement = document.getElementById("product");
  const priceElement = document.getElementById("price");
  const submitButtonElement = document.getElementById("submit");
  // (A) GET THE PARAMETERS
  var params = new URLSearchParams(window.location.search),
      first = params.get("first"),
      second = JSON.parse(params.get("second"));

  // (B) IT WORKS!
  console.log(first);  // Foo Bar
  console.log(second); // ["Hello", "World"]
  const categoriesAjax = $.ajax({
    url: "getCategories.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      // console.log(data);
    },
  });

  categoriesAjax.done(getCategories);

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
      // console.log(subcategory.value);

      const subcategoriesAjax = $.ajax({
        url: "getSubcategories.php",
        method: "POST",
        dataType: "json",
        data: { category: category.value },
        success: function (data) {
          // console.log(data);
        },
      });

      empty(subcategoryElement);
      empty(productElement);

      subcategoriesAjax.done(getSubcategories);

      function getSubcategories(result) {
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
        // console.log(product.value);

        const productAjax = $.ajax({
          url: "getProducts.php",
          method: "GET",
          dataType: "json",
          data: { subcategory: subcategory.value },
          success: function (data) {
            // console.log(data);
          },
        });

        empty(productElement);

        productAjax.done(getProducts);

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

    // document.getElementById('makeAdminSubmit').onclick = function(){
    //   if(select.value === "Choose User"){
    //     alert('Error, Please select a User!')
    //   }else{
    //     const updateUser = $.ajax({
    //       url: 'userUpdate.php',
    //       method: 'POST',
    //       dataType: 'json',
    //       data:{userId: select.value},
    //       success: function(data){
    //         console.log(data)
    //         if(data === 0){
    //           alert('Success')
    //           select.value='Choose User'
    //         }
    //       }
    //     })
    //   }
    //   console.log(select.value)
    // }
  }
};

function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}
