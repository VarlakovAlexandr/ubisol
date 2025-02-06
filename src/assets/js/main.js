const hamburger = document.querySelector('.hamburger');
const mobMenu = document.querySelector('.mob-menu');
const header = document.querySelector('.header');

let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  hideMenu();
});


hamburger.addEventListener('click', function(){

    let morphingSvg = document.querySelector('.hamburger-path');
      


    if (!this.classList.contains('active')){

        

        
        this.classList.add('active');
        header.classList.add('menu-active');
        mobMenu.classList.add('active');
        
        let bodyWidth = document.documentElement.clientWidth;  
        let indexHeader = document.querySelector('.header.index-header'); 
        if (indexHeader){
            indexHeader.style.maxWidth  = bodyWidth + 'px'; 
        }             
        document.body.style.maxWidth  = bodyWidth + 'px';
        document.body.classList.add('no-scroll');
        
        
    } else{
        
        hideMenu();
    }

    
})

const hideMenu = () => {
    hamburger.classList.remove('active');
    header.classList.remove('menu-active');
    document.body.classList.remove('no-scroll');
    document.body.removeAttribute('style');
    let indexHeader = document.querySelector('.header.index-header'); 
    if (indexHeader){
        indexHeader.removeAttribute('style');
    }   
    mobMenu.classList.remove('active');    
    
}

/*

data-to-jump="#test"  - куда переносимся
data-media-jump="768" - media breakpoint
data-mode="desktop-first" - если не указано то по умолчанию mobile-first

*/
document.addEventListener('DOMContentLoaded', function(){
    let jumpBlocks = document.querySelectorAll('[data-to-jump][data-media-jump]');

    if ( jumpBlocks.length ){
        jumpBlocks.forEach( jb => {
            
            const targetBlockLink = jb.getAttribute('data-to-jump');
            const targetBlockNode = document.querySelector(targetBlockLink);
            const targetMedia = Number(jb.getAttribute('data-media-jump'));
            

            const initialParent = jb.parentNode;
            
            let vw = document.documentElement.clientWidth;
            
            if ( targetBlockNode &&  targetMedia )  {

                const mode = jb.getAttribute('data-mode');

                if ( mode === 'desktop-first' ){
                    if ( vw <= targetMedia ) targetBlockNode.append(jb);
                } else{
                    if ( vw >= targetMedia ) targetBlockNode.append(jb);
                }
                
                

                window.addEventListener('resize', function(){
                    
                    let currentParent = jb.parentNode;
                    let vw = document.documentElement.clientWidth;

                    if ( mode === 'desktop-first' ){
                        if ( vw <= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw > targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }

                    } else{
                        if ( vw >= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw < targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }
                    }
                })
            }


            

        } )  
    }

})


let doc = document.querySelector('html');

const modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    backscroll: true,
    waitTransitions: false,
    closeOnOverlay: true,

    beforeOpen: function(modal){
        doc.classList.add('stop-scroll')
    },
    afterClose: function(modal){
        doc.classList.remove('stop-scroll')
        
    }
});


document.addEventListener('click', function(event){
    if ( event.target.classList.contains('hystmodal__shadow') ){
        modals.close();
    }

    
})


document.getElementById('feedback-form').addEventListener('submit', function (event) {

    event.preventDefault(); // Предотвращаем стандартное поведение формы


    const formData = new FormData(this);


    fetch('sript.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой');
        }

        return response.json();

    })

    .then(data => {
        this.reset();
        modals.close('#feedback-modal')
        modals.open('#thanks-modal');
    })
    .catch((error) => {
        this.reset();
        modals.close('#feedback-modal')
        modals.open('#thanks-modal');

    });

});

let phoneInputs = document.querySelectorAll('input[name="phone"]');
if ( phoneInputs.length ){
    phoneInputs.forEach( inp => {
        let mask = IMask(inp, {
            mask: '+{7} 000 000 00-00',
			
            lazy: true,  // make placeholder always visible
            placeholderChar: '_'     // defaults to '_'
        })

		inp.addEventListener('focus', function(){
			mask.updateOptions({
				lazy: false,
			});
		})
		inp.addEventListener('blur', function(){
			mask.updateOptions({
				lazy: true,
			});
		})
    } )
}