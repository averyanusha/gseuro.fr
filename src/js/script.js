import {siteContent} from "./content.js";
import Chart from "chart.js/auto";


const header = document.querySelector('.nav');
const myChart = document.getElementById("yearlyChart");
const sticky = header.offsetTop;
const search = document.querySelector('.search');
let searchQuery = document.querySelector('.search__input');
let searchResult = document.querySelector('.search__result');
let searchButton = document.querySelector('.search__button');
let monthsChart;

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

// async function fetchRateFromServer() {
//   let rateHeader = document.getElementById("rateHeader");
//   let ratePage = document.getElementById("rate");
//   try {
//     const response = await fetch("/exchange-rate");
//     if (!response.ok) {
//       throw new Error (`HTTP Error, status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("[script.js] Received current rate data:", data);
//     if (typeof data.rate === 'number') {
//       const eurPerTon = data.rate * 2205;
//       if (rateHeader) {
//         rateHeader.textContent = `${eurPerTon.toFixed(1)} eur/Ton`;
//       }
//       if (rate) {
//         ratePage.textContent = `${eurPerTon.toFixed(1)} EUR/TONNE`;
//       }
//     } else {
//         console.error("[script.js] Invalid rate data received:", data);
//     }
//   } catch (error) {
//     console.error("Couldnt fetch the data", error);
//   }
// }

// async function fetchYearlyRates() {
//   try {
//     const response = await fetch("/exchange-rate/last-12-months");
//     if (!response.ok) {
//       throw new Error(`HTTP errror! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     if (data && Array.isArray(data.labels) && Array.isArray(data.rates)) {
//       yearlyChart(data.labels, data.rates);
//     } else {
//       console.error("Invalid data structure for yearly rates:", data);
//     }
//   } catch (error) {
//     console.error("Erreur de chargement des données:", error);
//   }
// }

// function yearlyChart (labels, fetchedData) {
//   if (monthsChart) {
//     monthsChart.destroy();
//   }
//   monthsChart = new Chart(myChart, {
//     type: 'line',
//     data: {
//       backgroundColor: '',
//       labels: labels.reverse(),
//       datasets: [{
//         label: `Prix d'une tonne de cuivre au cours de la dernière année`,
//         backgroundColor: '#2C5499',
//         data: ((fetchedData.map(rate => rate * 2205)) + "eur/ton").reverse(),
//         fill: false,
//         tension: 0.1,
//         pointRadius: 5, // Make points slightly larger for easier interaction
//         pointHoverRadius: 8
//       }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false, // Allow canvas to resize freely
//         plugins: {
//           legend: {
//             display: true,
//             position: 'top',
//             labels: {
//                 color: '#333' // Legend text color
//             }
//           },
//           tooltip: {
//             callbacks: {
//                 label: function(context) {
//                     let label = context.dataset.label || '';
//                     if (label) {
//                         label += ': ';
//                     }
//                     if (context.parsed.y !== null) {
//                         label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(context.parsed.y) + '/Ton';
//                     }
//                     return label;
//                 }
//             }
//           }
//         },
//         scales: {
//           y: {
//             title: {
//               display: true,
//               text: 'Prix (EUR/Ton)'
//             }
//           }
//         }
//       }
//   });
// }

// fetchRateFromServer();
// fetchYearlyRates();
// let dates = [];
// let apiDates = [];
// let rateChart;

// async function getDailyRates() { 
  
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
// for (let i = 8; i >= 1; i--) {
//   const dateObj = new Date(today);
//   dateObj.setDate(today.getDate() - i);
//   const displayDate = `${dateObj.getDate()} ${monthsNames[dateObj.getMonth()]}`
//   dates.push(displayDate);
//   const apiDate = dateObj.toISOString().split('T')[0];
//   apiDates.push(apiDate);
// }