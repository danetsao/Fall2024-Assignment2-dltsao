function apiSearch() {
  // Fetch the API key from the backend
  $.ajax({
    url: "/api/get-bing-api-key",
    type: "GET",
    success: function (response) {
      if (response.apiKey) {
        var params = {
          q: $("#query").val(),
          count: 50,
          offset: 0,
          mkt: "en-us",
        };

        $.ajax({
          url: "https://api.bing.microsoft.com/v7.0/search?" + $.param(params),
          type: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": response.apiKey,
          },
        })
          .done(function (data) {
            var len = data.webPages.value.length;
            var results = "";
            for (let i = 0; i < len; i++) {
              results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }
            console.log(results);
            $("#searchResults").html(results);
            $("#searchResults").html(results);
            $("#searchResults").css("visibility", "visible");
          })
          .fail(function () {
            alert("Error fetching results. Please try again.");
          });
      } else {
        alert("Error: API key not found.");
      }
    },
    error: function () {
      alert("Error fetching the API key.");
    },
  });
}

function displayTime() {
  let currentTime = new Date();
  let formattedTime =
    currentTime.getHours().toString().padStart(2, "0") +
    ":" +
    currentTime.getMinutes().toString().padStart(2, "0");

  $("#time").html(formattedTime);
  $("#time").dialog({title: "Current Time", width: 400, height: 150});
  $("#time").css("visibility", "visible");
}

let backgroundImages = [
  "https://plus.unsplash.com/premium_photo-1674331229629-3d33a5af0711?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dWF0aCUyMG1vdW50YWlufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1480497490787-505ec076689f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWF0aCUyMG1vdW50YWlufGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1675315343167-0414307c9182?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dWF0aCUyMG1vdW50YWlufGVufDB8fDB8fHww",
];
let curIndex = 0;
function changeBackground() {
  let curLength = backgroundImages.length;
  curIndex = (curIndex + 1) % curLength;
  curImage = backgroundImages[curIndex];
  $("body").css("background-image", "url(" + curImage + ")");
}

function luckyFunction() {
  $.ajax({
    url: "/api/get-bing-api-key",
    type: "GET",
    success: function (response) {
      if (response.apiKey) {
        var params = {
          q: $("#query").val(),
          count: 1,
          offset: 0,
          mkt: "en-us",
        };

        $.ajax({
          url: "https://api.bing.microsoft.com/v7.0/search?" + $.param(params),
          type: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": response.apiKey,
          },
        })
          .done(function (data) {
            if (data.webPages && data.webPages.value.length > 0) {
              window.location.href = data.webPages.value[0].url;
            }
          })
          .fail(function () {
            alert("Error fetching results. Please try again.");
          });
      } else {
        alert("Error: API key not found.");
      }
    },
    error: function () {
      alert("Error fetching the API key.");
    },
  });
}

// Add event listeners
$(document).ready(function () {
  $("#searchButton").on("click", apiSearch);
  $("#timeButton").on("click", displayTime);
  $("#searchEngineName").on("click", changeBackground);
  $("#luckyButton").on("click", luckyFunction);
});
