const changeUname = document.getElementById("changeUname");
const changePass = document.getElementById("changePass");

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

      const display_user = document.getElementById("display_user");
      let emptyServerBtn = document.getElementById("emptyServerBtn");
      display_user.innerHTML = logged_user[0].username;
      if (logged_user[0].isAdmin === "0") {
        emptyServerBtn.setAttribute("hidden", "hidden");
      }

      const $table = $("#kwdata");
      let exportData = [];
      const $table2 = $("#kwdata2");
      let exportData2 = [];

      $.post("./php/getUser.php").done(function (data) {
        console.log(data);
        getData(data);
      });

      function getData(result) {
        result.map((data) => {
          let stuff = {};
          (stuff.username = data.username),
            (stuff.user_id = data.user_id),
            (stuff.score = data.score),
            (stuff.tokens = data.tokens),
            (stuff.overallScore = data.overallScore),
            (stuff.overallTokens = data.overallTokens),
            exportData.push(stuff);
        });

        initTable();
      }

      //Initialise Bootstrap Table
      function initTable() {
        $table.bootstrapTable({
          data: exportData,
        });
      }

      $.post("./php/getUserOffers.php").done(function (data) {
        console.log(data);
        getData2(data);
      });

      function getData2(result) {
        result.map((data) => {
          let stuff = {};
          (stuff.product_name = data.product_name),
            (stuff.name = data.name),
            (stuff.price = data.price),
            (stuff.date = data.date),
            (stuff.likes = data.likes),
            (stuff.dislikes = data.dislikes),
            (stuff.inventory = data.inventory),
            exportData2.push(stuff);
        });

        initTable2();
      }

      //Initialise Bootstrap Table
      function initTable2() {
        $table2.bootstrapTable({
          data: exportData2,
        });

        $table2.bootstrapTable("togglePagination");
      }
    },
    false
  );
})();

function empty() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "./php/delete.php",
        type: "POST",
        data: { boolval: 1 },
        success: function (data) {
          // console.log(data)
          if (data == 1) {
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Your server has been nuked!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        },
      });
    }
  });
}

function alert1(message, type) {
  let wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible"role="alert">' +
    message +
    '<button type="button" class="btn-close"data-bs-dismiss="alert" aria-label="Close"></button></div>';

  changeUname.append(wrapper);
}

function alert2(message, type) {
  let wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible"role="alert">' +
    message +
    '<button type="button" class="btn-close"data-bs-dismiss="alert" aria-label="Close"></button></div>';

  changePass.append(wrapper);
}

function cName() {
  const newn = document.getElementById("nu").value;

  if (newn == "") {
    alert1("Please enter the new Username", "danger");
    newn.focus();
  } else {
    let upload = $.ajax({
      url: "./php/changeUsername.php",
      method: "POST",
      data: { newUsername: newn },
      success: function (data) {
        console.log(data);
      },
    });
    upload.done(success);
  }

  function success(result) {
    if (result == 0) {
      alert1("Your Username has been updated successfully", "success");
      $("#uname").on("hidden.bs.modal", function () {
        window.location.reload();
      });
    } else {
      alert1("An unexpected error has been occurred", "danger");
    }
  }
}

function cPass() {
  let old = document.getElementById("op").value;
  let newp = document.getElementById("np").value;
  let cnewp = document.getElementById("cnp").value;

  let strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  if (old == "") {
    alert2("Please enter your Old Password", "danger");
  } else if (newp == "") {
    alert2("Please enter the new Password", "danger");
  } else if (cnewp == "") {
    alert2("Please Confirm Password", "danger");
  } else if (!strongRegex.test(newp)) {
    alert2(
      "Upper case, Lower case, Special character and Numeric letter are required in Password",
      "danger"
    );
  } else if (newp != cnewp) {
    alert2("Passwords do not Matched", "danger");
  } else {
    let upload = $.ajax({
      url: "./php/changePass.php",
      method: "POST",
      data: { oldPassword: old, newPassword: newp },
      success: function (data) {
        console.log(data);
      },
    });
    upload.done(success);
  }

  function success(res) {
    if (res == 0) {
      alert2("Your password has been updated successfully", "success");
    } else if (res == 1) {
      alert2("Incorrect password", "danger");
    } else {
      alert2("An unexpected error has been occurred", "danger");
    }
  }
}

function detailFormatter(index, row) {
  var html = [];
  $.each(row, function (key, value) {
    html.push("<p><b>" + key + ":</b> " + value + "</p>");
  });
  return html.join("");
}
