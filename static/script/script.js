// Clicking the input
$("input")
.on("focus", () => {
  clearFace();
  $(".input-prompt").val(""); })
.on("keydown", function () {
    typing()
  })
.on("blur", function () {
  clearFace();
});

// clicking send prompt button
$(".send-prompt").click(function () {
  clearFace();
  $(".pupil").css({
    transform: "scale(0.9)",
    top: "0px",
  });
  $(".left-eyebrow").css({
    transform: "rotate(5deg)",
  });
  $(".mouth").css({
    height: "2px",
    transform: "rotate(-3deg)",
  });
  $("#output").html(`<p>Hi i am a Grumpy old man <br> 
            <span><i>(Thinking)</i></span>
        </p>`);
  const prompt = $(".input-prompt").val();
  if (prompt == "") {
    $("#output").html(`<p>Hi i am a Grumpy old man <br> 
            <span><i>(Please type something)</i></span>
        </p>`);
  } else {
    $(".send-prompt").prop("disabled", true);
    $(".send-prompt").css("pointer-events", "none");
    $("input").prop("disabled", true);

    api(prompt);
    //console.log("Fetching Data..");
  }
});


function typing(){
      $(".pupil").css({
      transform: "scale(0.9)",
      top: "13px",
    });
    $(".left-eyebrow").css({
      transform: "rotate(5deg)",
    });
    $(".mouth").css({
      height: "2px",
      transform: "rotate(-3deg)",
    });
}

// emotions
function happyFace(text) {
  $(".left-eyebrow").css("transform", "rotate(-7deg)");
  $(".right-eyebrow").css("transform", "rotate(3deg)");
  $(".mouth").css({
    height: "20px",
    "border-bottom-left-radius": "100px",
    "border-bottom-right-radius": "100px",
  });

  const happy = document.createElement("audio");
  happy.setAttribute("src", "/static/happy.mp3");
  happy.play();
  happy.addEventListener("ended", function () {
    speak(text);
    clearFace();
  });
  
}

function cryingFace(text) {
  $(".eyes").css({
    "border-radius": "0",
    "border-bottom-left-radius": "100px",
    "border-bottom-right-radius": "100px",
    background: "pink",
    height: "20px",
  });
  $(".pupil").css("display", "none");
  $(".left-eyebrow").css("transform", "rotate(-10deg)");
  $(".right-eyebrow").css("transform", "rotate(10deg)");
  $(".mouth").css({
    height: "15px",
    "border-top-left-radius": "100px",
    "border-top-right-radius": "100px",
  });
  $(".tear").css("transform", "scaleY(1)");
  const cry = document.createElement("audio");
  cry.setAttribute("src", "/static/sad.mp3");
  cry.play();
  cry.addEventListener("ended", function () {
    speak(text);
    clearFace();
  });
}

function confusedFace(text) {
  $(".pupil").css("transform", "scale(0.7)");
  $(".left-eyebrow").css("transform", "rotate( 3deg)");
  $(".right-eyebrow").css("transform", "rotate(15deg)");
  $(".mouth").css({
    width: "20px",
    height: "20px",
    "border-radius": "50%",
  });

  const confused = document.createElement("audio");
  confused.setAttribute("src", "/static/confused.mp3");
  confused.play();
  confused.addEventListener("ended", function () {
    speak(text);
    clearFace();
  });
}

function clearFace() {
  const eyes = $(".eyes");
  const tear = $(".tear");
  const pupil = $(".pupil");
  const eyebrows = $(".eyebrows");
  const mouth = $(".mouth");
  pupil.css({
    transform: "none",
    top: "5px",
    display: "block",
  });
  eyebrows.css({
    transform: "none",
  });
  mouth.css({
    height: "1px",
    "border-radius": "0",
    transform: "none",
    width: "30px",
  });
  eyes.css({
    "border-bottom-left-radius": "0px",
    "border-bottom-right-radius": "0px",
    "border-radius": "100%",
    background: "white",
    height: "30px",
  });
  tear.css("transform", "scaleY(0)");
}
// API
async function api(prompt) {
  $.ajax({
    url: "/chat",
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify({ prompt: prompt }),
    success: function (response) {
      if (response["content"] && response["emotion"]) {
        //console.log(response);
        clearFace()
        chat(response["content"], response["emotion"]);
      } else {
        console.log("error");
      }
    },
    error: function (error) {
      //console.log(error);
    },
  });
}

// Output genration
function chat(text, emotion) {
  //console.log(emotion);
  switch (emotion) {
    case "sad":
      cryingFace(text);
      break;
    case "happy":
      happyFace(text);
      break;
    case "confused":
      confusedFace(text);
      break;
    default:
      confusedFace(text);
      break;
  }
  $("#output").html(`<p>${text}</p>`);
}

function speak(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 0.3;
  utterance.rate = 0.8;
  utterance.onstart = () => {
    $(".mouth").css("height", "10px");
  };
  utterance.onend = () => {
    clearFace();
    $(".send-prompt").prop("disabled", false);
    $(".send-prompt").css("pointer-events", "all");
    $("input").prop("disabled", false);
  };
  speechSynthesis.speak(utterance);
}
