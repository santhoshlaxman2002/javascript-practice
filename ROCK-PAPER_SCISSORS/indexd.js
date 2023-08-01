const obj=JSON.parse(localStorage.getItem('score'))||{
    win:0,
    lose:0,
    tie:0
};
function reset(){
    obj.win=0;
    obj.lose=0;
    obj.tie=0;
    document.querySelector('.result').innerHTML='';
    document.querySelector('.pick').innerHTML='';
    document.querySelector('.scorecard').innerHTML=`win : ${obj.win} Lose : ${obj.lose} Tie : ${obj.tie}`;
    localStorage.removeItem('score');
}
let isAutoPlay=false;
let intId;
function autoPlay(){
    if(!isAutoPlay){
        intId = setInterval(()=>{
            const pick=computerPick();
            playGame(pick);
        },1000);
        isAutoPlay=true;
        document.querySelector('.autoPlay-button').innerHTML='Stop';
    }
    else{
        clearInterval(intId);
        isAutoPlay=false;
        document.querySelector('.autoPlay-button').innerHTML='Auto Play';
    }
}
function computerPick(){
    const val=Math.random();
    if(val>=0&&val<1/3){
        return 'rock';
    }
    else if(val>=1/3&&val<2/3){
        return 'paper';
    }
    else{
        return 'scissors';
    }
}
function playGame(selection){
    let result='';
    const computer=computerPick();
    if(selection==='rock'){
        if(computer==='rock'){
            result='  Tie';
        }
        else if(computer==='paper'){
            result='You lose.';
        }
        else{
            result='You win!.';
        }
    }
    else if(selection==='paper'){
        if(computer==='rock'){
            result='You lose.';
        }
        else if(computer==='paper'){
            result='  Tie';
        }
        else{
            result='You lose.';
        }
    }
    else{
        if(computer==='rock'){
            result='You lose.';
        }
        else if(computer==='paper'){
            result='You win!.';
        }
        else{
            result='  Tie';
        }
    }
    if(result==='You lose.'){
        obj.lose++;
    }
    else if(result==='You win!.'){
        obj.win++;
    }
    else{
        obj.tie++;
    }
    document.querySelector('.result').innerHTML=result;
    document.querySelector('.pick').innerHTML=`You Picked <img src="emoji/${selection}-emoji.png" class="emoji"> <img src="emoji/${computer}-emoji.png" class="emoji">Computer Picked`;
    document.querySelector('.scorecard').innerHTML=`Win : ${obj.win} Lose : ${obj.lose} Tie : ${obj.tie}`;
    localStorage.setItem('score',JSON.stringify(obj));
}