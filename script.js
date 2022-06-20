
const allIcons = document.querySelectorAll('i');
/**
 * Toggle navigation icons when clicked
 */
const navigation =document.querySelector('.navigation').addEventListener('click',(e)=>{
    
    //Izbriši -fill sa svih ikona
    allIcons.forEach(icon=>{
        const classList =icon.className;
        if(classList.includes('icon')){
            let i =classList.split(' ').filter((i)=>i!='icon').join('').replace('-fill','');
            icon.className='';
            icon.classList.add('icon', i)
        }
    })

    //Ubaci -fill u ikonu na kliknutoj list-item 
    const currentIcon = e.target.closest('li').querySelector('i').className.split(' ').splice(1,1).join('');
    const iconElement = document.querySelector(`.${currentIcon}`);
    iconElement.classList.remove(currentIcon);
    iconElement.classList.add(`${currentIcon}-fill`);
});


/**
 * Toggle active-item class
 */
const tagList = document.querySelector('.tags-list').addEventListener('click',(e)=>{
    

    //Provjera je li kliknut tag
    const tagItem = e.target.closest('.tag-item');
    if(!tagItem){
        return;
    }

    //Ukloni Active klasu iz svih tagova
    const allTags = document.querySelectorAll('.tag-item');
    allTags.forEach(tag=>{
        if(!tag.classList.contains('active-item')){
            return;
        }else{
            tag.classList.remove('active-item')

        };
    });

    //Dodaj Active klasu kliknutom tagu
    tagItem.classList.toggle('active-item');

});


/**
 * DRAG scroll
 */
let isDown = false;
let startX ;
let scrollLeft;
let scrDown=0;
let scrUp=0;


const slider = document.querySelector('.tags-box');
    
slider.addEventListener('mousedown',(e)=>{
    isDown = true;
    slider.classList.add('active-tags');
    
    startX = e.pageX - slider.offsetLeft+ (scrDown-scrUp);
    scrollLeft = slider.offsetLeft;
    scrDown += e.screenX

})
slider.addEventListener('mouseleave',(e)=>{
    isDown = false;
    slider.classList.remove('active-tags');
})
slider.addEventListener('mouseup',(e)=>{
    isDown = false;
    slider.classList.remove('active-tags');

    const x = e.pageX - slider.offsetLeft+(scrDown-scrUp);
    scrUp += e.screenX;

     walk = x - startX;

})
slider.addEventListener('mousemove',(e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
     walk = x - startX;
    slider.scrollLeft = -walk;
})
