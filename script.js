
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

})


/**
 * DRAG scroll
 */
const scrollOnDrag= function(){
    let el =document.querySelector('.tags-list');

    function addEvent(name, el, func) {
        el.addEventListener(name, func, false);

        if (el.addEventListener) {
            el.addEventListener(name, func, false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + name, func);
        } else {
            el[name] = func;
        }
    }
    addEvent('mousedown', el, onMouseDown);
    addEvent('mousemove', el, onMouseMove);
    addEvent('mouseup', el, onMouseUp);

    function onMouseDown(e) {
        if (!e) { e = window.event; }
        if (e.target && e.target.nodeName === 'ul') {
            e.preventDefault();
        } else if (e.srcElement && e.srcElement.nodeName === 'ul') {
            e.returnValue = false;
        }
        startx = e.clientX + el.scrollLeft;
        starty = e.clientY + el.scrollTop;
        diffx = 0;
        diffy = 0;
        drag = true;
    }

    function onMouseMove(e) {
        if (drag === true) {
            if (!e) { e = window.event; }
            diffx = (this.startx - (e.clientX + el.scrollLeft));
            diffy = (this.starty - (e.clientY + el.scrollTop));
            el.scrollLeft += diffx;
            el.scrollTop += diffy;
        }
    }

    function onMouseUp (e) {
        if (!e) { e = window.event; }
        drag = false;
        var start = 1,
            animate = function () {
                var step = Math.sin(start);
                if (step <= 0) {
                    window.cancelAnimationFrame(animate);
                } else {
                    el.scrollLeft += diffx * step;
                    el.scrollTop += diffy * step;
                    start -= 0.02;
                    window.requestAnimationFrame(animate);
                }
            };
        animate();
    }
}
scrollOnDrag();