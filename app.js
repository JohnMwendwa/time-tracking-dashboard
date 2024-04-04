const activityBtns = document.querySelectorAll(".activity__period li");
const currentTime = document.querySelectorAll(".card__hour");
const previousTime = document.querySelectorAll(".card__duration");

// Fetch data from JSON file
const fetchData = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

// Update the UI with the fetched data
const updateUI = async (idx) => {
  const data = await fetchData();
  if (!data) return;

  // Get the selected period
  let period;
  let timeOfPeriod;
  switch (idx) {
    case 0:
      period = "daily";
      timeOfPeriod = "Day";
      break;
    case 1:
      period = "weekly";
      timeOfPeriod = "Week";
      break;
    case 2:
      period = "monthly";
      timeOfPeriod = "Month";
      break;
    default:
      period = "weekly";
      timeOfPeriod = "Week";
  }

  //   Add active class to the selected period
  activityBtns[idx].classList.add("active");

  // Update the current time
  for (let i = 0; i < data.length; i++) {
    let currHrs = data[i].timeframes[period].current === 1 ? "hr" : "hrs";
    let prevHrs = data[i].timeframes[period].previous === 1 ? "hr" : "hrs";

    currentTime[
      i
    ].textContent = `${data[i].timeframes[period].current}${currHrs}`;

    previousTime[
      i
    ].textContent = `Last ${timeOfPeriod} - ${data[i].timeframes[period].previous}${prevHrs}`;
  }
};

// Event listener for activity buttons
activityBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    activityBtns.forEach((btn) => btn.classList.remove("active"));
    updateUI(idx);
  });
});

// Initial call to update the UI
updateUI(1);
