'use strict'

//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let count =0;
const maxClicks=25;
const product = [];


const leftImg = document.getElementById('left_img');
console.log(leftImg);
const midImg = document.getElementById('mid_img');
console.log(midImg);
const rightImg = document.getElementById('right_img');
console.log(rightImg);
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


console.table(Mall.all); //show objects in table




//////////////////////////render function//////////////////////////
function render() {
  const leftIndex = randomNumber (0,Mall.all.length -1);
  leftImg.src = Mall.all[leftIndex].path;
  leftImg.title = Mall.all[leftIndex].item;
  leftImg.alt = Mall.all[leftIndex].item;
  let midIndex = randomNumber (0,Mall.all.length -1);
  while (midIndex === leftIndex) {
    midIndex = randomNumber (0,Mall.all.length -1);
  }
  midImg.src = Mall.all[midIndex].path;
  midImg.title = Mall.all[midIndex].item;
  midImg.alt = Mall.all[midIndex].item;
  let rightIndex = randomNumber (0,Mall.all.length -1);
  while (rightIndex === leftIndex || rightIndex === midIndex) {
    rightIndex = randomNumber (0,Mall.all.length -1);
  }
  rightImg.src = Mall.all[rightIndex].path;
  rightImg.title = Mall.all[rightIndex].item;
  rightImg.alt = Mall.all[rightIndex].item;
  for (let i = 0; i < Mall.all.length; i++) {
    switch (i) {
    case leftIndex:
    case midIndex:
    case rightIndex:
      Mall.all[i].views++;
      break;
    default:
      break;
    }
    console.log('views',Mall.all[i].views);
  }
}
render();

imgSection.addEventListener('click' , handleClick);

function handleClick(event) {
  console.log('Target', event.target.id + ':',event.target.title);
  if (event.target.id !== 'img-section'){

    for( let i=0 ; i<Mall.all.length; i++){

      if (Mall.all[i].item=== event.target.title){
        Mall.all[i].votes++; //Mall.all[i].votes =Mall.all[i].votes + 1

        console.log('votes',Mall.all[i].votes);

      }
    }

    count = count + 1;
    console.log(count);
    if(count === maxClicks){
      imgSection.removeEventListener('click', handleClick);
      resultRender();
    }
    render();
  }


}
function resultRender(){
  const division =  document.getElementById('result');
  console.log('hii')
  const ulEl = document.createElement('ul');
  division.appendChild(ulEl);
  for (let i = 0; i < Mall.all.length; i++) {
    console.log('wded')
    let liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent= `${Mall.all[i].item}:${Mall.all[i].votes} and  ${Mall.all[i].views} times`;
  }
}


///----------------------------------------------------///
