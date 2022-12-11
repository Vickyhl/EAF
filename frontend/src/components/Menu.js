localStorage.setItem("user", JSON.stringify(res.data.user));
let userData = localStorage.getItem("user");

if (userData.gender == "female") {
  let BMR =
    655 + 9.6 * userData.weight + 1.8 * userData.height - 4.7 * userData.age;
} else {
  let BMR =
    66 + 13.7 * userData.weight + 5 * userData.height - 6.8 * userData.age;
}
if (userData.purpuse == "weightLoss") {
  BMR = BMR - 300;
}
//45% carbs, 35% protein, 20% fat
let carbs = (45 * BMR) / 100;
let protein = (35 * BMR) / 100;
let fat = (20 * BMR) / 100;

const firstMeal = ["", "", ""];
const secondMeal = ["", "", ""];
const thirdMeal = ["", "", ""];
const fourthMeal = ["", "", ""];
const fifthMeal = ["", "", ""];
