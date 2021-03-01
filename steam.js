class Carousel{
    constructor(root){
        this.root=root;
        this.pre=root.querySelector('.arrowLeft');
        this.next=root.querySelector('.arrowRight');
        this.panel=root.querySelector('.panels');
        this.imgs=Array.from(root.querySelectorAll('.steamContent a'));
        this.dots=Array.from(root.querySelectorAll('.panels > div'));
        this.animated=false;
        this.interVal=null;
        this.bind();
        this.autoPlay();

    }
    
    get index(){
        return this.dots.indexOf(this.root.querySelector('.focus'));
    }
      
    get preIndex(){
        return (this.index-1+this.dots.length)%this.dots.length;
    }

    get nextIndex(){
        return (this.index+1)%this.dots.length;
    }

      
    bind(){
        this.pre.onclick=e=>{
           
           
            let index=this.preIndex;
            let thisIndex=this.index;
            this.setDots(index);
            this.setImgs(thisIndex,index);
        }

        this.next.onclick=e=>{
           
            let index=this.nextIndex;
            let thisIndex=this.index;
            this.setDots(index);
            this.setImgs(thisIndex,index);

        }
        
        this.panel.onclick=e=>{
            if(e.target.parentNode.className!=='panels')return;//防止浏览器报错

            
            let index=this.dots.indexOf(e.target);
            let thisIndex=this.index;
            if(index==thisIndex||this.animated)return;
            this.resetTimer();
            console.log(index);
            this.setDots(index);
            this.setImgs(thisIndex,index);
          
        }

    }

    setDots(index){
        this.dots.forEach(dot=>dot.classList.remove('focus'));
        this.dots[index].classList.add('focus');

    }

    setImgs(fromIndex,index){
       
        this.imgs.forEach(img=>img.style.zIndex=0);
        
        this.imgs[fromIndex].style.zIndex=10;
        this.imgs[index].style.zIndex=10;
        
        this.imgs[index].style.opacity=0;
        console.log(fromIndex,index);
        let that=this;
        let step=0.01;
        let offset1=1;
        let offset0=0;
       
        let timeId1=setInterval(function(){
            this.animated=true;
            if(offset1>0){
                
                offset1-=step;
                that.imgs[fromIndex].style.opacity=offset1;
               
            }else{
               
                clearInterval(timeId1);
                that.imgs[fromIndex].style.opacity=0;
                this.animated=false;
            }
        },0.1)


        let timeId0=setInterval(function(){
            this.animated=true;
            if(offset0<1){
              
                offset0+=step;
                that.imgs[index].style.opacity=offset0;
                
            }else{
                
                clearInterval(timeId0);
                that.imgs[index].style.opacity=1;
                this.animated=false;
            }
        },0.1)
        
        
       
            

    }

   autoPlay(){
       let that=this;
       this.interVal=setInterval(function(){
           if(that.animated)return;
         that.next.onclick();
       },2000)
   }

   resetTimer(){
       clearInterval(this.interVal);
       this.autoPlay();
   }
}

new Carousel(document.querySelector('.steam'));