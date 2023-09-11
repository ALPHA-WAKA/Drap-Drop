const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')
const richestPeople=[
      'Jeff Bezos',
      'Bill Gates',
      'Warren Buffett',
      'Bernard Arnault',
      'Carlos Slim Helu',
      'Anancio Ortega',
      'Larry Ellison',
      'Mark Zuckerberg',
      'Michael Bloomberg',
      'Larry Page'

];
//Store listIems
const listItems=[];

let dragStartIndex;
let dragEndIndex;

createList();

//Insert list items into Dom
function createList(){
    [...richestPeople]
      .map(a=>({value:a, sort:Math.random()}))
      .sort((a,b)=>a.sort - b.sort)
      .map(a=>a.value)
      .forEach((person,index)=>{
       
        const listItem=document.createElement('li');
       
        listItem.setAttribute('data-index',index);

        listItem.innerHTML=`
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>`;
        listItems.push(listItem);
        draggable_list.appendChild(listItem)


      });
      addEventListeners();
}

function dragStar(){
   // console.log('Event:','dragstrart');
    dragStartIndex= +this.closest('li').getAttribute('data-index');
    //console.log(dragStartIndex);
}
function dragEnter(){
   // console.log('Event:','dragenter');
    this.classList.add('over')
}

function dragLeave(){
//console.log('Event:','dragleave');
    this.classList.remove('over')

}

function dragOver(e){
   // console.log('Event:','dragover');
   e.preventDefault();
}

function dragDrop(){
    //console.log('Event:','dragdrop');
    dragEndIndex= +this.parentElement.getAttribute('data-index');
    console.log(dragEndIndex);
  swapItems(dragStartIndex,dragEndIndex);

  this.classList.remove('over');
}
function swapItems(fronIndex,toIndex){
    const itemOne=listItems[fronIndex].querySelector('.draggable')
    const itemTwo=listItems[toIndex].querySelector('.draggable')
    listItems[fronIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}
 function checkOrder(){
    listItems.forEach((listItem,index)=>{
        const personName=listItem.querySelector('.draggable')
        .innerText.trim();

        if(personName!==richestPeople[index]){
            listItem.classList.add('wrong')
        }else{
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
 }


    
      
      function   addEventListeners(){
        const draggables= document.querySelectorAll('.draggable')
        const dragListItems= document.querySelectorAll('.draggable-list li')
draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',dragStar)
})
draggables.forEach(item=>{
    item.addEventListener('dragover',dragOver)
    item.addEventListener('drop',dragDrop)
    item.addEventListener('dragenter',dragEnter)
    item.addEventListener('dragover',dragOver)
    item.addEventListener('dragleave',dragLeave)
})

      }
 
      check.addEventListener('click',checkOrder)