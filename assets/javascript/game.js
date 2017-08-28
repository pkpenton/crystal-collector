var crystalCounter = 0;
var wins = 0;
var losses = 0;
var staticCrystalValues = [10, 5, 3, 7];

var crystalImages = [
    "assets/images/crystal_01.png",
    "assets/images/crystal_02.png",
    "assets/images/crystal_03.png",
    "assets/images/crystal_04.png",
    "assets/images/crystal_05.png",
    "assets/images/crystal_06.png",
    "assets/images/crystal_07.png",
    "assets/images/crystal_08.png",
];

var targetNumber = Math.floor(Math.random() * (65 - 10) + 10);
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
var randomizedCrystalImages = shuffleArray(crystalImages);

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

        if (crystalCounter === targetNumber) {
            wins ++;
            $("#wins").text(wins);

            $("#you-win").attr("style", "display: block;");
            $("#you-win").text("You win!");

            $("#play-again").attr("style", "display: block;");
        }

        else if (crystalCounter > targetNumber) {
            losses ++;
            $("#losses").text(losses);

            $("#you-lose").attr("style", "display: block;");
            $("#you-lose").text("You Lose!");

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

    targetNumber = Math.floor(Math.random() * (65 - 10) + 10);
    $("#number-to-guess").text(targetNumber);

    $("#you-win").attr("style", "display: none;");
    $("#you-lose").attr("style", "display: none;");
    $("#play-again").attr("style", "display: none;");

    randomizedCrystalValues = shuffleArray(staticCrystalValues);
    randomizedCrystalImages = shuffleArray(crystalImages);

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
