window.onload = () => {
  const categoriesAjax = $.ajax({
    url: "getCategories.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
  });

  categoriesAjax.done(getCategories);

  function getCategories(result) {
    result.map((cat) => {
      let option = document.createElement("option");
      option.value = cat.category_id;
      option.text = cat.name;
      document.getElementById("category").appendChild(option);
    });

    document
      .getElementById("category")
      .addEventListener("change", onChangeCategories);

    function onChangeCategories() {
      document.getElementById("subcategory").removeAttribute("disabled");
      console.log(subcategory.value);

      const subcategoriesAjax = $.ajax({
        url: "getSubcategories.php",
        method: "POST",
        dataType: "json",
        data: { category: category.value },
        success: function (data) {
          console.log(data);
        },
      });

      subcategoriesAjax.done(getSubcategories);

      function getSubcategories(result) {
        result.map((sub) => {
          let option = document.createElement("option");
          option.value = sub.subcategory_id;
          option.text = sub.name;
          document.getElementById("subcategory").appendChild(option);
        });
      }

      document
        .getElementById("subcategory")
        .addEventListener("change", onChangeSubCategories);

      function onChangeSubCategories() {
        document.getElementById("product").removeAttribute("disabled");
        console.log(product.value);

        const productAjax = $.ajax({
          url: "getProducts.php",
          method: "GET",
          dataType: "json",
          data: { subcategory: subcategory.value },
          success: function (data) {
            console.log(data);
          },
        });

        productAjax.done(getProducts);

        function getProducts(result) {
          result.map((product) => {
            let option = document.createElement("option");
            option.value = product.product_id;
            option.text = product.product_name;
            document.getElementById("product").appendChild(option);
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
