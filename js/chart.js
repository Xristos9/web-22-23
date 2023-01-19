window.onload = function graph() {
  $("#nav-placeholder-admin").load("adminNavbar.html");
  $("#footer-placeholder").load("footer.html");

  const yearElement = document.getElementById("yearSelect");
  const monthElement = document.getElementById("monthSelect");
  const searchButton = document.getElementById("search");
  let ctx = document.getElementById("numberOfOffers").getContext("2d");
  let myChart = new Chart(ctx);

  searchButton.addEventListener("click", function () {
    if (yearElement.value === "") {
      Swal.fire({
        icon: "error",
        title: "Please select a year",
      });
    } else if (monthElement.value === "") {
      Swal.fire({
        icon: "error",
        title: "Please select a month",
      });
    } else {
      getChartData(yearElement.value, monthElement.value);
    }
  });

  const getChartData = (year, month) => {
    let firstDay = new Date(year, month, 2).toISOString().slice(0, 10);
    let lastDay = new Date(year, month + 1, 1).toISOString().slice(0, 10);
    // console.log(firstDay, lastDay);

    $.post("./php/getNumberOfDiscounts.php", {
      firstDate: firstDay,
      lastDate: lastDay,
    }).done(function (data) {
      console.log(data);
      myChart.destroy();
      makeChart(data, month, year);
    });
  };

  const makeChart = (data, month, year) => {
    let lables = [];
    const numberOfDays = getDaysInMonth(parseInt(month) + 1);
    const dates = getAllDaysInMonth(parseInt(year), parseInt(month) + 1);
    const chartData = [];
    dates.map((d) => {
      let i = 0;
      data.map((m) => {
        if (m.date === d) {
          i++;
        }
      });
      chartData.push(i);
    });
    console.log(chartData);
    for (let i = 1; i <= numberOfDays; i++) {
      lables.push(i);
    }
    console.log(lables);
    ctx = document.getElementById("numberOfOffers").getContext("2d");

    let config = {
      type: "bar",
      data: {
        labels: lables,
        datasets: [
          {
            label: "# of offers",
            data: chartData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
    myChart = new Chart(ctx, config);
  };
};

function getDaysInMonth(month) {
  return new Date(2023, month, 0).getDate();
}

function getAllDaysInMonth(year, month) {
  const date = getDaysInMonth(month);

  const dates = [];

  for (let i = 2; i <= date + 1; i++) {
    dates.push(new Date(year, month - 1, i).toISOString().slice(0, 10));
  }

  return dates;
}
