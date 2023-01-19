$("#footer-placeholder").load("footer.html");
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username == "") {
    alert("Please enter your username!");
  } else if (password == "") {
    alert("Please enter password");
  } else {
    const upload = $.ajax({
      url: "./php/signIn.php",
      method: "POST",
      data: { username: username, password: password },
      success: function (data) {
        console.log(data);
      },
      error: function (xhr, exception) {
        var msg = "";
        if (xhr.status === 0) {
          msg = "Not connect.\n Verify Network." + xhr.responseText;
        } else if (xhr.status == 404) {
          msg = "Requested page not found. [404]" + xhr.responseText;
        } else if (xhr.status == 500) {
          msg = "Internal Server Error [500]." + xhr.responseText;
        } else if (exception === "parsererror") {
          msg = "Requested JSON parse failed.";
        } else if (exception === "timeout") {
          msg = "Time out error." + xhr.responseText;
        } else if (exception === "abort") {
          msg = "Ajax request aborted.";
        } else {
          msg = "Error:" + xhr.status + " " + xhr.responseText;
        }
        console.log(msg);
      },
    });
    upload.done(success);
  }
  function success(result) {
    if (typeof result === "object") {
      localStorage.setItem("logged_user", JSON.stringify(result));
      window.location.assign("map.html");
    } else if (result == "2") {
      Swal.fire({
        icon: "error",
        title: "Incorrect username or password",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "An unexpected error has occurred",
      });
    }
  }
}
