$("#nav-placeholder-admin").load("adminNavbar.html");
$("#footer-placeholder").load("footer.html");

const $table = $("#kwdata");
let exportData = [];

$.post("./php/getMonthlyUserData.php").done(function (data) {
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
  // $table.bootstrapTable("togglePagination");
}
