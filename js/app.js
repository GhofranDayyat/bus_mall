'use strict'

//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let count =0;
const maxClicks=25;
const product = [];


const leftImg = document.getElementById('left img');
console.log(leftImg);
const midImg = document.getElementById('mid img');
console.log(midImg);
const rightImg = document.getElementById('right img');
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

for (let i =0 ; i<product.length ; i++){
  new Mall(product[i]);
}
console.table(Mall.all); //show objects in table




//render function
function renderClick() {

  const leftIndex = randomNumber (0,Mall.all.length -1);
  leftImg.src = Mall.all[leftIndex].path;
  leftImg.title = Mall.all[leftIndex].item;
  leftImg.alt = Mall.all[leftIndex].item;


  const midIndex = randomNumber (0,Mall.all.length -1);
  midImg.src = Mall.all[midIndex].path;
  midImg.title = Mall.all[midIndex].item;
  midImg.alt = Mall.all[midIndex].item;


  const rightIndex = randomNumber (0,Mall.all.length -1);
  rightImg.src = Mall.all[rightIndex].path;
  rightImg.title = Mall.all[rightIndex].item;
  rightImg.alt = Mall.all[rightIndex].item;

}
renderClick();

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
    renderClick();
    count = count + 1;
    console.log(count);
    if(count === maxClicks){
      imgSection.removeEventListener('click', handleClick);
    }
  }

  function resultRender(){
    const division =  document.getElementById('result');
    const ulEl = document.createElement('ul');
    division.appendChild(ulEl);
    for (let i = 0; i < product.length; i++) {
      const liEl = document.createElement('li');
      ulEl.appendChild(liEl);
      ulEl.textContent= `${event.target.title}:${Mall.all[i].votes}`;
    }
  }
  resultRender();
}



///----------------------------------------------------///
