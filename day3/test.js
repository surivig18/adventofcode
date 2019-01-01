
    var fs = require('fs');

     var words = [];
     let twoLetterCount = 0;
     let threeLetterCount = 0;

     function repeated(words){
        const arr = words.reduce((a, c) => {
            const chars = [...c]
            let seen = {}
            for (let char of chars) {
                seen[char] = seen[char] ? seen[char] + 1 : 1
            }
        
            if (Object.keys(seen).some(k => seen[k] === 2)) a[0]++
            if (Object.keys(seen).some(k => seen[k] === 3)) a[1]++
            return a
        },[0, 0])
        return arr;
     }

function findFrequecyMatch(words)
{
    
for(let i = 0 ; i < words.length;i++){

    for(let j=i+1;j<words.length;j++){
        let diff = 0;

         let charFirst = [...words[i]];
         let charSecond = [...words[j]];
         //console.log(words[i] , words[j])
         for(let k = 0; k < charFirst.length; k++){
            if(charFirst[k] !== charSecond[k]){
                diff ++;
            }
        }
           if(diff === 1){
               //Part2
               console.log(words[i],words[j])
               return;
           }
        }
    }
}
 function findRepeatFrequency(words)
 {
     words.forEach(
         element =>{
            let twoLetterMap = new Map();
            let firstTwotime = false;
            let firstThreeTime = false;
            let count = 0;
            iterateElements(twoLetterMap,element,count).then(
            twoLetterMap.forEach( (key,value) => {
                if(key == 2 && !firstTwotime){
                    twoLetterCount ++;
                    firstTwotime = true;
                }
                if (key == 3 && !firstThreeTime){
                    threeLetterCount ++;
                    firstThreeTime = true;
                }
            })
        );
            });
            //Part 1 
            console.log("tew" +  twoLetterCount, threeLetterCount, twoLetterCount * threeLetterCount)
 }    

 function iterateElements(twoLetterMap,element,count){

return new Promise(function(resolve,reject) { 
    for(let i = 0 ; i < element.length;i++){

        if(twoLetterMap.has(element[i])){
            count = twoLetterMap.get(element[i]);
            count = count +1;
            twoLetterMap.set(element[i], count );
        }
        else{
            count = 1;
            twoLetterMap.set(element[i],1);
        }
    }    
    return resolve(twoLetterMap) 
    });
 }
 function getData (){

return new Promise (function(resolve,reject) {
    fs.readFile('input.txt', 'utf8', function(err, contents) {
     
        contents.toString().split("\n").forEach(element => {
            words.push(element);
            
        });
        return err ?reject(err) : resolve(contents)
        });
    });
 }
 (function(test)
{
    var arr = [];
    getData().then( data  =>
    {
         arr = findFrequecyMatch(words);
         //console.log(arr)
         findRepeatFrequency(words)
        
        }
)

})();

