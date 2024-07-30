// Sets the text to regular style.
function setTextRegular() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: normal; font-weight: normal");
}

// Sets the text to italic style.
function setTextItalic() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: italic; font-weight: normal");
}

// Sets the text to bold style.
function setTextBold() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: normal; font-weight: bold");
}

// Sets the background colour.
function setBackgroundColour(colour) {
    document.body.setAttribute("style", `background-color:${colour}`);
}

window.onload = function() {
    document.getElementById("regularButton").addEventListener("click", setTextRegular);
    document.getElementById("italicButton").addEventListener("click", setTextItalic);
    document.getElementById("boldButton").addEventListener("click", setTextBold);

    document.getElementById("colourSelect").addEventListener("change", (e) => {
        setBackgroundColour(e.target.value);
    });
};

function disableButton() {
    document.getElementById("disableButton").disabled = true;
    document.getElementById("enableButton").disabled = false;
    document.getElementById("colourSelect").disabled = true;
};

function enableButton() {
    document.getElementById("disableButton").disabled = false;
    document.getElementById("enableButton").disabled = true;
    document.getElementById("colourSelect").disabled = false; 
};

window.onload = function() {
    document.getElementById("disableButton").addEventListener("click", disableButton);
    document.getElementById("enableButton").addEventListener("click", enableButton);
}

function getActivityIdea() {
    fetch("https://www.boredapi.com/api/activity").then(function (response) {
      return response.json();
    }).then(function (data) {
      document.getElementById("ideaDiv").textContent = data.activity;
    });
  }
  
  window.onload = function() {
    document.getElementById("ideaButton").addEventListener("click", getActivityIdea);
  }


function getQuote() {
    fetch("https://zenquotes.io/api/random").then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("ideaDiv").textContent = data[0].quote;
    }).catch(function (error) {
        console.error("Error: ", error);
    });
}

window.onload = function() {
    document.getElementById("quoteButton").addEventListener("click", getQuote);
}