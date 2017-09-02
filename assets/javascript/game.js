var crystalCounter = 0;
var wins = 0;
var losses = 0;
var staticCrystalValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var staticCrystalImages = [
    "assets/images/crystal_01.png",
    "assets/images/crystal_02.png",
    "assets/images/crystal_03.png",
    "assets/images/crystal_04.png",
    "assets/images/crystal_05.png",
    "assets/images/crystal_06.png",
    "assets/images/crystal_07.png",
    "assets/images/crystal_08.png",
];

var targetNumber = Math.floor(Math.random() * (120 - 19) + 19);
$("#number-to-guess").text(targetNumber);

$("#wins").text(wins);
$("#losses").text(losses);
$("#current-score").text(crystalCounter);

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

var randomizedCrystalValues = shuffleArray(staticCrystalValues);
var randomizedCrystalImages = shuffleArray(staticCrystalImages);

for (var i = 0; i < 4; i++) {
    var imageCrystal = $("<img>");
    imageCrystal.addClass("crystal-image");
    imageCrystal.attr("src", randomizedCrystalImages[i]);
    imageCrystal.attr("crystal-value", randomizedCrystalValues[i]);
    $("#crystals").append(imageCrystal);
};

function playGame() {
    $(".crystal-image").on("click", function() {
        var crystalValue = ($(this).attr("crystal-value"));
        crystalValue = parseInt(crystalValue);
        crystalCounter += crystalValue;

        $("#current-score").text(crystalCounter);
        $("#current-score").attr("style", "color: aqua;");

        if (crystalCounter === targetNumber) {
            wins ++;
            $("#wins").text(wins);

            $("#number-to-guess").attr("style", "color: aqua;");
            $("#crystals").attr("style", "display: none;");
            $("#you-win").attr("style", "display: block;");
            $("#play-again").attr("style", "display: block;");
        }

        else if (crystalCounter > targetNumber) {
            losses ++;
            $("#losses").text(losses);

            $("#crystals").attr("style", "display: none;");
            $("#you-lose").attr("style", "display: block;");
            $("#play-again").attr("style", "display: block;");
        };
    });
};

$("#play-again").on("click", function() {
    playAgain();
});

function playAgain() {
    crystalCounter = 0;
    $("#current-score").text(crystalCounter);

    targetNumber = Math.floor(Math.random() * (120 - 19) + 19);
    $("#number-to-guess").text(targetNumber);

    $("#number-to-guess").attr("style", "color: black;");
    $("#you-win").attr("style", "display: none;");
    $("#you-lose").attr("style", "display: none;");
    $("#play-again").attr("style", "display: none;");
    $("#crystals").attr("style", "display: block;");
    $("#current-score").attr("style", "color: black;");

    randomizedCrystalValues = shuffleArray(staticCrystalValues);
    randomizedCrystalImages = shuffleArray(staticCrystalImages);

    $(".crystal-image").replaceWith("");
    for (var i = 0; i < 4; i++) {
        var imageCrystal = $("<img>");
        imageCrystal.addClass("crystal-image");
        imageCrystal.attr("src", randomizedCrystalImages[i]);
        imageCrystal.attr("crystal-value", randomizedCrystalValues[i]);
        $("#crystals").append(imageCrystal);
    };

    playGame();
};

playGame();
