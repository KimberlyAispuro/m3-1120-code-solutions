/* eslint-disable no-unused-vars, no-console */
const takeAChance = require('./take-a-chance');

const yourChance = takeAChance('Kimberly');

yourChance.then((value) => {
    console.log(value)
});

yourChance.catch((error) => {
    console.error(error);
});