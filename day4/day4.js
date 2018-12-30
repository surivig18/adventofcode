const fs = require('fs');
var data = []
var guardtiming = {}
function getData()
{
    return new Promise(function(resolve,reject){
        fs.readFile("input2.txt", 'utf8',function(err,contents){
            contents.toString().split("\n").forEach((element) =>{
                data.push(element)
            });
            return err ? reject(err) : resolve(contents);
        });
    })    
}

function getGuardData(){
    data.sort();
    var guarddate = [];
    var time = [];
    var activity = [];
    var ID = [];
    var guarddata = [{}];
    data.forEach(
        (element,index) => {
             [guarddate[index],time[index],activity[index],ID[index]]   = element.replace("[","").replace("]","").split(" ");
             if(element.toString().includes("Guard")){
               tempguarddata = ID[index];

            }
             let data = findGuardData(guarddata,tempguarddata);
             if(data == null || data == undefined ){
                 let temp = {}
                temp.guardID = ID[index];
                temp.sleependtime = [];
                temp.sleepstarttime = [];
                tempguarddata = ID[index];
                guarddata.push(temp)
            }
            else{
                tempguarddata = data.guardID;
            }
             
              if(element.toString().includes("wakes")){
                endtime = time[index].split(":")[1];
                let indexofdata = findGuardDataIndex(guarddata,tempguarddata)
                guarddata[indexofdata].sleependtime.push(endtime);
           }
           else if(element.toString().includes("falls")){
                startime = time[index].split(":")[1];
                let indexofdata = findGuardDataIndex(guarddata,tempguarddata)

                guarddata[indexofdata].sleepstarttime.push(startime);
           }
        });
        solution(guarddata)
    }
function findGuardData(guarddata,guardID)
{
   let data =  guarddata.find((data) => {return data.guardID === guardID});
   return data;
}

function findGuardDataIndex(guarddata,guardID)
{
   let data =  guarddata.findIndex( (data) => {return data.guardID === guardID});
   return data;
}

function solution(guarddata){
    let data  = {};
    let length = 0;
    var counts = new Map();
    let countingarray =[{}]
    Object.keys(guarddata).forEach(function(key) {
        let tempdata = guarddata[key];

        if(tempdata.sleependtime != undefined ){
            counts = new Map();
            let templength = 0;

            for(let i=0;i<tempdata.sleependtime.length;i++){
                templength += parseInt(tempdata.sleependtime[i]) - parseInt(tempdata.sleepstarttime[i]);

                for(let start = tempdata.sleepstarttime[i]; start < tempdata.sleependtime[i]; start++){
                    counts[start] = counts[start] ? counts[start] + 1 : 1;
                    }
               
            }
            tempgu = {}
            tempgu.guardID = tempdata.guardID;
            tempgu.counts = counts;
            countingarray.push(tempgu)
            if(templength > length){
                length = templength
                data = tempdata
            }
        }
      
      })

      let answer = 0;
      let answerguard ;
      let answerkey =0;

      Object.keys(countingarray).forEach( function(element) {
          let tempobj = countingarray[element];
            const countobj = tempobj.counts;

            for(let key in countobj){
             
                if(countobj[key] > answer){
                    answer = countobj[key];
                    answerguard = tempobj.guardID;
                    answerkey = key
                }

            }
    })
    // Part 2 - answer
    console.log(answerkey,answerguard)

    
    //Part 1 - find guard sleps max
      counts = {};
      let maxminute = 0;
      let part1Answer ;
      for(let i=0; i< data.sleependtime.length; i++){
    
         for(let start = data.sleepstarttime[i]; start < data.sleependtime[i]; start++){
            counts[start] = counts[start] ? counts[start] + 1 : 1;
        }
      }

      Object.keys(counts).forEach( (key) => {
        if(counts[key] > maxminute){
            maxminute = counts[key];
            part1Answer = key;
        }
      });

    console.log(data.guardID,part1Answer);
}
(function main(){
    getData().then( () =>{ getGuardData()})
})();