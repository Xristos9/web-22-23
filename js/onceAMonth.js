function dayCheck() {
  const date = new Date();
  const monthDays = getDaysInMonth(date.getMonth() + 1);
  const currentDay = date.getDate();

  if (monthDays === currentDay) {
    updateUsers();
  }
}
function getDaysInMonth(month) {
  return new Date(2023, month, 0).getDate();
}

const updateUsers = () => {
  let generatedTokens = 0;
  let allScore = 0;
  let allUserOverllTokens = [];
  let allUserOverallScore = [];
  let newData = [];
  $.post("./php/getMonthlyUserData.php").done(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      allScore += parseInt(data[i].score);
      generatedTokens += 100;
    }
    generatedTokens = generatedTokens * 0.8;
    allScore = allScore ? allScore : 1;

    data.map((user) => {
      let scorePrecent = (parseInt(user.score) * 100) / allScore;
      let userTokens = Math.round(generatedTokens * (scorePrecent / 100));
      let userOverallTokens = parseInt(user.overallTokens) + userTokens;
      allUserOverllTokens.push(userOverallTokens);
      let userOverallScore = parseInt(user.score) + parseInt(user.overallScore);
      allUserOverallScore.push(userOverallScore);
    });
    console.log(allUserOverllTokens);
    // console.log(allUserOverallScore);
    data.map((user, index) => {
      let inner = {};
      (inner.user_id = user.user_id),
        (inner.score = 0),
        (inner.overallScore = allUserOverallScore[index]),
        (inner.tokens = 0);
      inner.overallTokens = allUserOverllTokens[index];
      newData.push(inner);
    });
    // console.log(newData);
    $.post("./php/updateUserTokens.php", {
      data: JSON.stringify(newData),
    }).done(function (data) {
      console.log(data);
    });
  });
};
// updateUsers();

// setInterval(dayCheck, 86400000);
// setInterval(dayCheck, 30000);
