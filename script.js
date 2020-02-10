const input = document.querySelector('.search');
const list = document.querySelector('[class=suggestions]');
const btn = document.querySelector('button');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(response => cities.push(...response));

function findMatches(wordToMatch, cities) {
    return cities.filter(value => {
        let regex = new RegExp(wordToMatch, 'gi');
        return value.city.match(regex) || value.state.match(regex);
    })
}

function markLetters(value) {
    return value.split('')
        .map(letter => {
            if (input.value.includes(letter.toLowerCase())) {
                return `<mark>${letter}</mark>`
            }
            return letter;
        }).join('');
}

function displayMatches() {
    const matches = findMatches(this.value, cities);
    list.innerHTML = matches.map(place => {
        return `
            <li><span class="city">${markLetters(place.city)}</span> <span class="state">${markLetters(place.state)}</span></li>
        `
    }).join('');

    if (!list.firstChild) {
        list.innerHTML = `
            <li class="not-found">Not found any matches! Please, try again!</li>
        `
    }

    if (!this.value) {
        deleteList();
    }
}

function deleteList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    list.innerHTML = `
        <li><span class="city">Filter for a city</span><span class="state">or state</span></li>
    `
}

input.addEventListener('keyup', displayMatches);
btn.addEventListener('click', deleteList);