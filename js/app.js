/* eslint-disable no-unused-vars */
'use strict';
//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let count =0;
const maxClicks=25;
const product = [];
let preLeftIndex;
let preMidIndex ;
let preRightIndex ;
const itemVotes = [];
const itemViews = [];
const leftImg = document.getElementById('left_img');
// console.log(leftImg);
const midImg = document.getElementById('mid_img');
// console.log(midImg);
const rightImg = document.getElementById('right_img');
// console.log(rightImg);
const imgSection = document.getElementById('img-section');

//construction function
function Mall(item, path){
  this.item=item;
  this.path = path;
  this.votes = 0;
  this.views = 0;

  Mall.all.push(this);
}
Mall.all = [] ;

//new product
const bag = new Mall ('bag', 'img/bag.jpg');
const banana = new Mall ('banana', 'img/banana.jpg');
const bathroom = new Mall ('bathroom', 'img/bathroom.jpg');
const boots = new Mall ('boots', 'img/boots.jpg ');
const breakfast = new Mall ('breakfast', 'img/breakfast.jpg');
const bubblegum = new Mall ('bubblegum', 'img/bubblegum.jpg ');
const chair = new Mall ('chair', 'img/chair.jpg');
const cthulhu = new Mall ('cthulhu', 'img/cthulhu.jpg');
const dogDuck = new Mall ('dog duck', 'img/dog-duck.jpg ');
const dragon = new Mall ('dragon', 'img/dragon.jpg');
const pen = new Mall ('pen', 'img/pen.jpg');
const petSweep = new Mall ('pet sweep', 'img/pet-sweep.jpg');
const scissors = new Mall ('scissors', 'img/scissors.jpg');
const shark = new Mall ('shark', 'img/shark.jpg');
const sweep = new Mall ('sweep', 'img/sweep.png');
const tauntaun = new Mall ('tauntaun', 'img/tauntaun.jpg');
const unicorn = new Mall ('unicorn', 'img/unicorn.jpg');
const usb = new Mall ('usb', 'img/usb.gif');
const waterCan = new Mall ('water can', 'img/water-can.jpg');
const wineGlass = new Mall ('wine glass', 'img/wine-glass.jpg');


// console.table(Mall.all); //show objects in table




//////////////////////////render function//////////////////////////
function render() {
  let leftIndex = randomNumber(0, Mall.all.length -1);
  while (leftIndex === preLeftIndex || leftIndex === preMidIndex || leftIndex === preRightIndex) {
    leftIndex = randomNumber(0, Mall.all.length -1);
    if(leftIndex !== preLeftIndex && leftIndex !== preMidIndex && leftIndex !== preRightIndex){
      break;
    }
  }
  leftImg.src = Mall.all[leftIndex].path;
  leftImg.title = Mall.all[leftIndex].item;
  leftImg.alt = Mall.all[leftIndex].item;
  Mall.all[leftIndex].views++;
  let midIndex = randomNumber(0, Mall.all.length -1);
  while (midIndex === preLeftIndex || midIndex === preMidIndex || midIndex === preRightIndex || midIndex === leftIndex) {
    midIndex = randomNumber(0, Mall.all.length -1);
    if(midIndex !== preLeftIndex && midIndex !== preMidIndex && midIndex !== preRightIndex && midIndex !== leftIndex) {
      break;
    }
  }
  midImg.src = Mall.all[midIndex].path;
  midImg.title = Mall.all[midIndex].item;
  midImg.alt = Mall.all[midIndex].item;
  Mall.all[midIndex].views++;
  let rightIndex = randomNumber(0, Mall.all.length -1);
  while (rightIndex === preLeftIndex || rightIndex === preMidIndex || rightIndex === preRightIndex || rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = randomNumber(0, Mall.all.length -1);
    if(rightIndex !== preLeftIndex && rightIndex !== preMidIndex && rightIndex !== preRightIndex && rightIndex !== leftIndex && rightIndex !== midIndex){
      break;
    }
  }
  rightImg.src = Mall.all[rightIndex].path;
  rightImg.title = Mall.all[rightIndex].name;
  rightImg.alt = Mall.all[rightIndex].name;
  Mall.all[rightIndex].views++;
  preLeftIndex = leftIndex;
  preMidIndex = midIndex;
  preRightIndex = rightIndex;
}
render();

/////////////////////Listener///////////////////
imgSection.addEventListener('click' , handleClick);

function handleClick(event) {
  console.log('Target', event.target.id + ':',event.target.title);
  if (event.target.id !== 'img-section'){
    for( let i=0 ; i<Mall.all.length; i++){

      if (Mall.all[i].item === event.target.title){
        Mall.all[i].votes++; //Mall.all[i].votes =Mall.all[i].votes + 1

        console.log('votes',Mall.all[i].votes);

      }
    }

    count = count + 1;
    // console.log(count);
    if(count === maxClicks){
      imgSection.removeEventListener('click', handleClick);
      resultRender();
      createChart();
      fillLocalStorage();
      retrieve();
    }
    render();
  }
////////////////Result////////////////
}
function resultRender(){
  const division =  document.getElementById('result');
  const ulEl = document.createElement('ul');
  division.appendChild(ulEl);
  for (let i = 0; i < Mall.all.length; i++) {
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent= `${Mall.all[i].item}:${Mall.all[i].votes} Votes and  ${Mall.all[i].views} times`;
  }
}
//////convert JS to JSON ////////
function fillLocalStorage(){
  localStorage.setItem('votes',JSON.stringify(itemVotes));
  localStorage.setItem('views',JSON.stringify(itemViews));
  console.log(localStorage);
}


/////////////////////creat chart////////////////////
function createChart (){
  const ctx = document.getElementById('chart').getContext('2d');
  const itemName = [];
  for (let i=0; i<Mall.all.length;i++){
    itemName.push(Mall.all[i].item);
    itemVotes.push(Mall.all[i].votes);
    itemViews.push(Mall.all[i].views);
  }
  new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: itemName,
      datasets: [
        {
          // barPercentage: 0.8,
          barThickness: 20,
          borderWidth: 2.5,
          label: 'Result of Votes',
          backgroundColor: 'rgb(0, 0, 200,0.5)',
          borderColor: 'rgb(0, 0, 0)',
          data: itemVotes,
        },{
          barPercentage: 0.5,
          barThickness: 20,
          borderWidth: 2.5,
          label: 'Result Of Views',
          backgroundColor: 'rgb(255,99,132,0.2)',
          borderColor: 'rgb(0, 0, 0)',
          data: itemViews,
        }
      ],
    },

    // Configuration options go here
    options: {},

  } );
}
function retrieve(){
  if (localStorage>0){
    ///////to convert JSON to JS //////////
    const storVotes=JSON.parse(localStorage.getItem('votes'));
    const storViews=JSON.parse(localStorage.getItem('views'));
    for (let i=0; i<itemVotes.length ;i++){
      itemVotes[i]+=storVotes[i];
      itemViews[i]+=storViews[i];

      render();
      console.log(localStorage);

    }

  }
  console.log(localStorage);

}

