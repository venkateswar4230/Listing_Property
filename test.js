let array=[3,2,7,9,6,3,1,10];

let ans=array.filter(function (el){
     if (el > 6) {
        return true;
    }else{ 
        return false;
    }
})
console.log(ans);
