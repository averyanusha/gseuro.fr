import {siteContent} from "./content.js";
import Chart from "chart.js/auto";


const header = document.querySelector('.nav');
const sticky = header.offsetTop;
const search = document.querySelector('.search');
let searchQuery = document.querySelector('.search__input');
let searchResult = document.querySelector('.search__result');
let searchButton = document.querySelector('.search__button');

const products = document.querySelectorAll('.product');
const productButtons = document.querySelectorAll('.product__button');
const cards = document.querySelectorAll('.card');
const closeButtons = document.querySelectorAll('.card__close');

// function escapeHtml(unsafe) {
//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

function cleanText(text) {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/'/g, "");
  } else {
    return "";
  }
}

function siteSearch() {
  searchResult.innerHTML = "";

  let query = cleanText(searchQuery.value);
  if (!query || query.length === 0) return;

  let resultsFound = false;
  let resultsArray = []; 

  siteContent.forEach(page => {
    let pageMatch = cleanText(page.title).includes(query);
    let matchedSections = page.sections.filter(section => 
        cleanText(section.heading).includes(query) ||  
        cleanText(section.text).includes(query)
    );

    if (pageMatch || matchedSections.length > 0) {
      resultsFound = true;
      resultsArray.push({
        title: page.title,
        url: page.url,
        matchedSections: matchedSections
      });
      if (resultsArray.length > 0) {
        resultsArray.forEach((result, index) => {
          let li = document.createElement('li');
          let resultLink = document.createElement('a');
          resultLink.href = result.url;
          resultLink.textContent = result.title;
          li.appendChild(resultLink);
          searchResult.appendChild(li);
        });
      } 
    };
  });
  if (!resultsFound) {
    let noResult = document.createElement('li');
    noResult.textContent = "Aucun resultat trouve";
    searchResult.appendChild(noResult);
  };
};

searchButton.addEventListener('click', () => {
  siteSearch();
});

searchQuery.addEventListener('keydown', (event) => {
  if(event.key === "Enter"){
    siteSearch();
  }
});

searchQuery.addEventListener('input', () => {
  siteSearch();
})

searchQuery.addEventListener('focus', () => {
  if (searchQuery.value.length > 0) {
    siteSearch();
  }
});

// search.addEventListener('mouseout', (event) => {
//   if(!search.contains(event.relatedTarget)){
//     searchResult.innerText = "";
//   }
// })

// search.addEventListener('mouseover', () => {
//   if (searchQuery.value.length > 0) {
//     siteSearch();
//   }
// });

window.onscroll = function () {stickyHeader()};

function stickyHeader() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Scroll animation produits page 

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    };
  })
}, {
    threshold: 0.5,
  }
);

products.forEach(product => {
  observer.observe(product)
  });


// Modal window with product cards in produit page

function hideProducts() {
  products.forEach(product => {
      product.classList.remove('visible');
  });
}

// Function to show all products
function showProducts() {
  products.forEach(product => {
      product.classList.add('visible');
  });
}

productButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
      cards[index].classList.add('show');
      products.forEach(product => {
        observer.unobserve(product)
        });
      hideProducts();
  });
});

// Close modal and show products
closeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
      cards[index].classList.remove('show');
      products.forEach(product => {
        observer.observe(product)
        });
      showProducts();
  });
});

document.addEventListener('click', (event) => {
  cards.forEach((card) => {
      if (
          card.classList.contains('show') && 
          !card.contains(event.target) && 
          !event.target.closest('.product__button')
      ) {
          card.classList.remove('show');
          products.forEach(product => {
            observer.observe(product)
            });
      }
  })
});

// The page for rate of copper

let rate = document.getElementById("rate");
let rateHeader = document.getElementById("rateHeader")
const myChart = document.getElementById("weeklyChart");
const mySecondChart = document.getElementById("yearlyChart");


const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();
const monthsNames = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","November","Decembre"];

// let dates = [];
// let months = [];
// let apiDates = [];
// let apiMonths = [];
// let rateChart;
// let monthlyData = [];

// for (let i = 8; i >= 1; i--) {
//   const dateObj = new Date(today);
//   dateObj.setDate(today.getDate() - i);
//   const displayDate = `${dateObj.getDate()} ${monthsNames[dateObj.getMonth()]}`
//   dates.push(displayDate);
//   const apiDate = dateObj.toISOString().split('T')[0];
//   apiDates.push(apiDate);
// }

// async function fetchRate(date){
//   try {
//     console.log(`Making API call for date: ${date}`);
//     const response = await fetch(`https://api.metalpriceapi.com/v1/${date}?api_key=ba4a8f5b8340e9310988b13c84c88e3f&base=EUR&currencies=XCU` , {mode: 'cors'});
//     if (!response.ok) {
//       console.error(`API response not OK for ${date}:`, response.status, response.statusText);
//       throw new Error(`API response error: ${response.status}`);
//     }
//     const exchangeRate = await response.json();
//     const today = new Date().toISOString.split('T')[0];
//     return {
//       date: today.getTime(),
//       rate: exchangeRate.rates.XCU,
//       timeStamp: new Date().getTime()
//     }
//   }
//   catch (error) {
//     console.error("Error fetching exchange data:", error);
//   }
// }

// const freshRate = await fetchRate();

// if (freshRate) {
// }
// for (let i = 0; i < 12; i++){
//   let month = (currentMonth - i) % 12;
//   if (month < 0) month += 12;
  
//   let yearOffset = Math.floor((currentMonth - i) / 12);
//   let year = currentYear + yearOffset;
  
//   // Create date object for first day of month
//   const dateObj = new Date(year, month, 1);
//   const label = `${monthsNames[month]} ${year}`;
//   const apiMonth = String(month + 1).padStart(2, '0'); // +1 because months are 0-indexed, padstart adds 0 to ensure the month is 2 digits 
//   const apiDate = `${year}-${apiMonth}-01`;
//   months.push(label);
//   apiMonths.push(apiDate);
// }

// async function fetchDailyRates() { 
  
//   for (let i = 0; i < apiDates.length; i++) {
//     const date = apiDates[i];
//     const isToday = i === apiDates.length - 1; // Check if it's the last date (today)
    
//     try {
//       let data;
      
//       if (isToday) {
//         data = await getLatestRate();
//       } else {
//         data = await getRate(date);
//       }
      
//       // Process the response
//       if (data && data.rates && data.rates.XCU) {
//         weeklyData.push(data.rates.XCU);
//       } else {
//         console.warn(`No rate data for ${date}`);
//         weeklyData.push(null);
//       }
//     } catch (error) {
//       console.error(`Error fetching data for ${date}:`, error);
//       weeklyData.push(null);
//     }
//   }
// }

// async function fetchMonthRates(){
//   monthlyData = [];

//   for (let i = 0; i <= apiMonths.length; i++){
//     const date = apiMonths.reverse()[i];

//     try {
//       let data; 

//       data = await fetchRate(date);
//       if (data && data.rates && data.rates.XCU) {
//         monthlyData.push(data.rates.XCU);
//       } else {
//         console.warn(`No rate data for ${date}`);
//         monthlyData.push(null);
//       }
//     }
//     catch (error) {
//       console.error(`Error fetching data for ${date}:`, error);
//       monthlyData.push(null);
//     }
//   }
//   yearlyChart(monthlyData);
// }


// async function fetchLatestRate(){
//   try {
//     const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=ba4a8f5b8340e9310988b13c84c88e3f&base=EUR&currencies=XCU' , {mode: 'cors'});
//     const exchangeRate = await response.json();
//     if (rateHeader) {
//       rateHeader.textContent = `${exchangeRate.rates.XCU.toFixed(3)} EUR/LB`;
//     }

//     if (rate) {
//       rate.textContent = `${exchangeRate.rates.XCU} EUR/LB`;
//     }
//     return exchangeRate;
//   }
//   catch (error) {
//     console.error("Error fetching exchange data:", error);
//   }
// }

// function yearlyChart (fetchedData) {
//   if (secondChart) {
//     secondChart.destroy();
//   }
//   secondChart = new Chart(mySecondChart, {
//     type: 'line',
//     data: {
//       backgroundColor: '',
//       labels: months.reverse(),
//       datasets: [{
//         label: `Prix d'une livre de cuivre au cours de la dernière année`,
//         backgroundColor: '#2C5499',
//         data: fetchedData
//       }]
//     },
//   });
// }

// console.log(apiMonths);
// fetchMonthRates();