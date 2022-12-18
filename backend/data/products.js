const products = [
  {
    name: "Milk 3% carton",
    ingredients: "Pasteurized milk, vitamin A, vitamin D",
    Nutrients:
      "Energy - 42 calories, Fats - 1 gram, Total carbohydrates - 5 grams, Proteins - 3.4 grams",
    Category: "protein",
  },
  {
    name: "Yogurt 1.5%",
    ingredients:
      "Milk, milk components, sugar, milk powder, dietary fiber (inulin), nutritional supplement: (calcium - tricalcium citrate), stabilizer (pectin), plus Bifidus bacteria",
    Nutrients:
      "Energy - 71 calories, Fats - 1.5 grams, Sodium - 52 mg, Total carbohydrates - 9 grams, Sugars from carbohydrates - 9 grams, Dietary fiber - 0.5 gram, Proteins - 5.1 grams, Calcium - 173 mg",
    Category: "protein",
  },
  {
    name: "Whole wheat bread",
    ingredients:
      "Whole wheat flour (contains gluten) (100% of the flour, 62.2% of the bread), water, cereals 3% (oats (gluten), barley malt (gluten)), yeast, flax seeds, wheat gluten, table salt, oils and vegetable fats, sunflower seeds, emulsifier (E481), preservatives (calcium propionate, potassium sorbate), soy flour, dietary fiber, acidity regulator (citric acid), vitamins (B1, B2, B3, B6, B12), vitamin C, enzymes, folic acid",
    Nutrients:
      "energy - 249 calories, fats - 2.6 grams, Saturated fatty acids - 1 gram, trans fatty acids - 0.5 grams, cholesterol - 0 mg, sodium – 358 mg, Total carbs - 42 grams, sugars from carbohydrates - 1.9 grams, dietary fiber - 7.1 grams, proteins - 10.8 grams",
    Category: "carbs",
  },
  {
    name: "Eggs",
    ingredients: "",
    Nutrients:
      "Energy - 143calories, Proteins - 12.56 gram, Carbohydrates - 0.72 gram, Of sugar content - 0.37 gram, Teaspoons of sugar - 0.09 gram, Fats - 9.51 gram, Of which saturated fat - 3.126 gram, Of which trans fat - 0.038 gram, Cholesterol - 372 mg, Sodium – 142 mg, Dietary fiber – 0 gram, Water - 76.15 gram",
    Category: "protein",
  },
  {
    name: "Quaker",
    ingredients: "Oats (100%)",
    Nutrients:
      "Energy - 408 calories, Fats - 7.2 grams, Saturated fatty acids - 1.3 grams, Trans fatty acids - 0.5 grams, Cholesterol - 0 mg, Sodium - 0 mg, Total carbohydrates - 68 grams, Sugars from carbohydrates - 1 gram, Dietary fiber - 9.3 grams, Proteins - 13.3 grams, Folic acid - 49mcg, Phosphorus - 460 mg, Magnesium - 136 mg, Iron - 3.8 mg, Zinc - 3.1 mg, Potassium - 384 mg",
    Category: "carbs",
  },
  {
    name: "Walnuts",
    ingredients: "",
    Nutrients:
      "Energy - 715 calories, Fats - 65 grams, Saturated fatty acids - 6 grams, Trans fatty acids - 0.5 grams, Cholesterol - 2.5 mg, Sodium - 2 mg, Total carbohydrates - 14 grams, Sugars from carbohydrates - 3 grams, Dietary fiber - 7 grams, Proteins - 15 grams, Calcium - 98 mg, Zinc - 3 mg, Omega 3 fatty acid 10 grams",
    Category: "fats",
  },
  {
    name: "raw tehini",
    ingredients: "Sesame",
    Nutrients:
      "Energy - 670 calories, Fats - 60 grams, Saturated fatty acids - 10.5 grams, Trans fatty acids - 0.5 grams, Cholesterol - 0 mg, Sodium - 180 mg, Total carbohydrates - 4 grams, Sugars from carbohydrates - 1.5 grams, Dietary fiber - 8, Proteins - 24.6 grams, Calcium - 120 mg, Iron - 7.7 mg",
    Category: "fats",
  },
  {
    name: "Crunchy",
    ingredients:
      "Cereals 95.2% (whole corn flour 49.2%, rice flour, whole oat flour 20% gluten, sugar, salt, raising agent sodium bicarbonate. Emulsifier soy lecithin)",
    Nutrients:
      "Energy - 391 calories, Fats - 3.8 grams, Saturated fatty acids - 0.6 grams, Trans fatty acids - 0.5 grams, Cholesterol - 0 mg, Sodium - 390 mg, Total carbohydrates - 77 grams, Sugars from carbohydrates - 4 grams, From the contents of 1 teaspoon of sugar, Dietary fiber - 6.6 grams, Proteins - 8.8 grams",
    Category: "carbs",
  },
  {
    name: "Granola",
    ingredients:
      "Whole oat flakes (contains gluten) (44.5%), whole oat flour (13.3%), sugar, sunflower oil, isomaltulose, rice flour (5.3%), invert sugar syrup, dried glucose syrup, whole wheat flour (contains gluten ) (2.6%), honey (2.1%), wheat flour (1.9%), minerals (calcium (calcium carbonate), iron), salt, barley malt extract (contains gluten), coconut, flavoring agents, raising agent (sodium bicarbonate), an antioxidant (tocopherol). Total grains in the product: 67.6% 89% of the total grains in the product are whole grains",
    Nutrients:
      "Energy - 195 calories 195 calories, Fats – 0 gram, Saturated fatty acids - 0.8 gram , Trans fatty acids - 0.5 gram , Cholesterol - 0 mg, Sodium - 0 mg, Total carbohydrates - 0 grams, Sugars from carbohydrates - 10 grams, From the content of 0 teaspoons of sugar, Dietary fiber - 2.7 grams, Proteins - 0 gram, Calcium - 0 mg, Iron - 3.2 mg",
    Category: "carbs",
  },
  {
    name: "Dark Chocolate",
    ingredients: "Cocoa mass, sugar, cocoa butter, emulsifier (lecithin)",
    Nutrients:
      "Energy - 527 calories, Fats - 32 grams, Saturated fatty acids - 19.3 grams, Trans fatty acids - 0.5 grams, Cholesterol - 0 mg, Sodium - 0 mg, Total carbohydrates - 49 grams, Sugars from carbohydrates - 46 grams, Contains 11.5 teaspoons of sugar, Proteins - 5.5 grams",
    Category: "carbs",
  },
  {
    name: "Cream cheese 3%",
    ingredients: "milk, salt",
    Nutrients:
      "Energy - 82 calories, Fats - 3 grams, Saturated fatty acids - 1.8 grams, Trans fatty acids - 0.5 grams, Cholesterol - 9 mg, Sodium - 200 mg, Total carbohydrates - 4.3 grams, Proteins - 9.5 grams, Calcium - 95 mg",
    Category: "protein",
  },
  {
    Name: "Cucumber",
    ingredients: "",
    Nutrients:
      "Energy - 15 calories, Proteins - 0.65 gram, Carbohydrates - 3.63 gram, Of sugar content - 1.67 gram, Teaspoons of sugar -0.42  gram, Fats - 0.11 gram, Of which saturated fat - 0.037 gram, Of which saturated fat - 0.037 gram, Cholesterol - 0 mg, Sodium - 2 mg, Dietary fiber - 0.5 gram, Water - 95.25 gram",
    Category: "vegetable",
  },
  {
    Name: "Tomato",
    ingredients: "",
    Nutrients:
      "Energy  - 18 calories, Proteins - 0.887 gram, Carbohydrates - 3.923 gram, Of sugar content - 2.63 gram, Teaspoons of sugar - 0.66 gram, Fats - 0.2 gram, Of which saturated fat - 0.028 gram, Cholesterol - 0 mg, Sodium 5 - mg, Dietary fiber - 1.2 gram, Water - 94.5 gram, Lycopene - 2.573 mg",
    Category: "vegetable",
  },
  {
    Name: "Frozen green beans",
    ingredients: "green beans",
    Nutrients:
      "Energy - 34 calories, Fats - 0 grams, Sodium - 11 mg, Total carbohydrates - 4.7 grams, Sugars from carbohydrates - 1.5 grams, Dietary fiber - 3.2 grams, Proteins - 2.1 grams",
    Category: "vegetable",
  },
  {
    Name: "Apple",
    ingredients: "",
    Nutrients:
      "Energy – 52 calories, Proteins - 0.26 gram, Carbohydrates - 13.81 gram, Of sugar content - 10.38 gram, Teaspoons of sugar - 2.6 gram, Fats - 0.171 gram, Of which saturated fat - 0.028 gram, Cholesterol - 0 mg, Sodium - 1 mg, Dietary fiber - 2.4 gram, Water - 85.55 gram",
    Category: "carbs",
  },
  {
    Name: "pear",
    ingredients: "",
    Nutrients:
      "Energy - 58 calories, Proteins - 0.382 gram, Carbohydrates -15.469 gram, Of sugar content - 9.8 gram, Teaspoons of sugar -  2.45 gram, Fats - 0.12 gram, Of which saturated fat - 0.006 gram, Cholesterol – 0 mg, Sodium – 1 mg, Dietary fiber - 3.1 gram, Water - 83.75 gram",
    Category: "carbs",
  },
  {
    Name: "Banana",
    ingredients: "",
    Nutrients:
      "Energy - 89 calories,Proteins - 1.09 gram,Carbohydrates - 22.84 gram,Of sugar content  - 12.23 gram,Spoonfuls of suga - 3.06 gram, Fats - 0.33 gram, Of which saturated - 0.112 gram, Cholesterol - 0 mg, Sodium - 1 mg, Dietary fiber - 2.6 gram, Water - 74.9 gram",
    Category: "carbs",
  },
  {
    Name: "Chicken Breast",
    ingredients: "",
    Nutrients:
      "Energy - 120 calories, Proteins - 22.5 gram, Carbohydrates - 0 gram, Of sugar content – 0 gram, Teaspoons of sugar – 0 gram, Fats - 2.62 gram, Of which saturated fat - 0.563 gram, Of which trans fat  - 0.007 gram, Cholesterol – 73 mg, Sodium – 45 mg, Dietary fiber -  0 gram, Water - 73.9 gram",
    Category: "protein",
  },
  {
    Name: "Salmon",
    ingredients: "",
    Nutrients:
      "Energy - 208 calories, Proteins - 20.42 gram, Carbohydrates – 0 gram, Fats - 13.42 gram, Of which saturated fat - 3.05 gram, Cholesterol - 55 mg, Sodium - 59 mg",
    Category: "protein",
  },
  {
    Name: "Tofu",
    ingredients:
      "Extract from soybeans (water, soybeans 32%), increases strength (calcium chloride)",
    Nutrients:
      "Energy - 154.6 calories, Proteins - 17.3 gram, Carbohydrates - 4.5 gram, Fats - 7.5 gram, Of which saturated fat -  1.1 gram, Cholesterol - 0 mg, Sodium - 8.3 mg, Calcium - 257.5 mg",
    Category: "protein",
  },
  {
    Name: "Yellow cheese",
    ingredients:
      "Pasteurized milk, salt, natural food coloring (beta carotene)",
    Nutrients:
      "Energy - 372 calories, Fats - 30 grams, Saturated fatty acids - 18 grams, Trans fatty acids - 0.8 grams, Cholesterol - 90 mg, Sodium - 490 mg, Total carbohydrates - 0 grams, Proteins - 25.5 grams, Calcium - 750 mg",
    Category: "protein",
  },
];

export default products;
