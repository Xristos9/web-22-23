const logged_user = JSON.parse(localStorage.getItem("logged_user"));
// console.log(logged_user);
if (logged_user[0].isAdmin === "0") {
  $("#nav-placeholder").load("navbar.html");
} else {
  $("#nav-placeholder").load("adminNavbar.html");
}
$("#footer-placeholder").load("footer.html");

let bool = logged_user[0].isAdmin === "0" ? false : true;

const $table = $("#kwdata");
let exportData = [];
let variable = false;

let params = new URLSearchParams(window.location.search),
  discount_id = params.get("discount_id");
document.getElementById("deleteBtn").setAttribute("data-visible", bool);

let newArray = discount_id.split(",");
// console.log(newArray);

$.post("./php/getStoreOffer.php", {
  input: newArray,
}).done(function (data) {
  // console.log(data);
  getOffers(data);
});

function getOffers(result) {
  result.map((offer) => {
    let stuff = {};
    (stuff.product = offer.product_name),
      (stuff.product_id = offer.product_id),
      (stuff.price = offer.price),
      (stuff.date = offer.date),
      (stuff.discount_id = offer.discount_id),
      (stuff.likes = offer.likes),
      (stuff.dislikes = offer.dislikes),
      (stuff.inventory = offer.inventory),
      (stuff.username = offer.username),
      (stuff.overallScore = offer.overallScore),
      exportData.push(stuff);
  });

  initTable();
}

//Initialise Bootstrap Table
function initTable() {
  $table.bootstrapTable({
    data: exportData,
  });
  $table.bootstrapTable("togglePagination");
}

function operateFormatter(value, row, index) {
  return [
    `<button id="like" class="btn btn-primary btn-sm like${index}" title="Like">`,
    '<i class="bi bi-hand-thumbs-up-fill"></i>',
    "</button>  ",
    `<button id="dislike" class="btn btn-danger btn-sm dislike${index}" title="Dislike">`,
    '<i class="bi bi-hand-thumbs-down-fill"></i>',
    "</button>",
  ].join("");
}

function operateFormatter2(value, row, index) {
  return [
    `<button id="inv" class="btn btn-warning btn-sm inv${index}">Σε απόθεμα</button>`,
  ].join("");
}

function operateFormatter3(value, row, index) {
  return [
    `<button id="broco" class="btn btn-danger btn-sm"><i class="bi bi-trash-fill"></i></button>`,
  ].join("");
}

window.operateEvents = {
  "click #inv": function (e, value, row, index) {
    console.log(row);
    $.post("./php/updateInventory.php", {
      id: row.product_id,
    }).done(function (data) {
      // console.log(data);
    });
  },
  "click #broco": function (e, value, row, index) {
    console.log(row);
    $table.bootstrapTable("remove", {
      field: "discount_id",
      values: row.discount_id,
    });
    // $.post("./php/updateInventory.php", {
    //   id: row.product_id,
    // }).done(function (data) {
    //   console.log(data);
    // });
  },
  "click #like": function (e, value, row, index) {
    $(`.like${index}`).prop("disabled", true);
    $(`.dislike${index} `).prop("disabled", false);

    console.log(row);
    $.post("./php/getOfferValuation.php", {
      id: row.discount_id,
      username: row.username,
      count: parseInt(row.likes) + 1,
      control: "1",
    }).done(function (data) {
      console.log(data);
    });
  },
  "click #dislike": function (e, value, row, index) {
    $(`.dislike${index} `).prop("disabled", true);
    $(`.like${index} `).prop("disabled", false);

    console.log(row);
    $.post("./php/getOfferValuation.php", {
      id: row.discount_id,
      username: row.username,
      count: parseInt(row.dislikes) + 1,
      control: "2",
    }).done(function (data) {
      console.log(data);
    });
  },
};
