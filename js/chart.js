window.onload = function graph() {
  $("#nav-placeholder").load("navbar.html");
  $("#nav-placeholder-admin").load("adminNavbar.html");
  $("#footer-placeholder").load("footer.html");
  // $.ajax({
  //   url: "select(a,b,c).php",
  //   method: "GET",
  //   dataType: "json",
  //   success: function (data) {
  //     // console.log(data)

  //     const ctx = document.getElementById("myChart").getContext("2d");
  //     const myChart = new Chart(ctx, {
  //       type: "bar",
  //       data: {
  //         labels: [
  //           "# of Visits",
  //           "# of Covid Cases",
  //           "# of infectious visits",
  //         ],
  //         datasets: [
  //           {
  //             label: "a,b,c",
  //             data: data,
  //             backgroundColor: [
  //               "rgba(255, 99, 132, 0.2)",
  //               "rgba(54, 162, 235, 0.2)",
  //               "rgba(255, 206, 86, 0.2)",
  //             ],
  //             borderColor: [
  //               "rgba(255, 99, 132, 1)",
  //               "rgba(54, 162, 235, 1)",
  //               "rgba(255, 206, 86, 1)",
  //             ],
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //       options: {
  //         scales: {
  //           y: {
  //             beginAtZero: true,
  //           },
  //         },
  //       },
  //     });
  //   },
  // });

  // const ajax = $.ajax({
  //   url: "select(d).php",
  //   method: "GET",
  //   dataType: "json",
  //   success: function (data) {
  //     // console.log(data)
  //   },
  // });

  // ajax.done(findDates);

  // function findDates(result) {
  //   // console.log(result)
  //   let array = [];
  //   let array2 = [];

  //   for (let i in result) {
  //     array.push(result[i].split(","));
  //   }

  //   for (let i in array) {
  //     for (let j in array[i]) {
  //       array2.push(array[i][j]);
  //     }
  //   }

  //   // console.log(array2)

  //   let duplicates = array2.reduce(function (acc, el, i, arr) {
  //     if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
  //     return acc;
  //   }, []);

  //   // console.log(duplicates);

  //   let counts = {};
  //   array2.forEach((x) => {
  //     counts[x] = (counts[x] || 0) + 1;
  //   });

  //   // console.log(counts)

  //   const ctx2 = document.getElementById("myChart2").getContext("2d");
  //   const myChart2 = new Chart(ctx2, {
  //     type: "bar",
  //     data: {
  //       labels: duplicates,
  //       datasets: [
  //         {
  //           label: "d",
  //           data: counts,
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",
  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // const ajax2 = $.ajax({
  //   url: "select(e).php",
  //   method: "GET",
  //   dataType: "json",
  //   success: function (data) {
  //     // console.log(data)
  //   },
  // });

  // ajax2.done(ere);

  // function ere(result) {
  //   // console.log(result)
  //   let array = [];
  //   let array2 = [];
  //   for (let i in result) {
  //     array.push(result[i].split(","));
  //   }

  //   for (let i in array) {
  //     for (let j in array[i]) {
  //       array2.push(array[i][j]);
  //     }
  //   }

  //   // console.log(array2)

  //   let duplicates = array2.reduce(function (acc, el, i, arr) {
  //     if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
  //     return acc;
  //   }, []);

  //   // console.log(duplicates);

  //   let counts = {};
  //   array2.forEach((x) => {
  //     counts[x] = (counts[x] || 0) + 1;
  //   });

  //   // console.log(counts)
  //   const ctx3 = document.getElementById("myChart3").getContext("2d");
  //   const myChart3 = new Chart(ctx3, {
  //     type: "bar",
  //     data: {
  //       labels: duplicates,
  //       datasets: [
  //         {
  //           label: "e",
  //           data: counts,
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",
  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
};