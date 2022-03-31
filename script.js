var timeDisplay=document.getElementById("time-container");
var alarmList=document.getElementById("alarms-list");
//localStorage.clear();
//PRINT THE TIME IN TIME DISPLAY
// var alarmArr=[];
// localStorage.setItem("alarmArr",JSON.stringify(alarmArr));
// console.log(localStorage.getItem("alarmArr"));
function reloadAlarms(){
    let alarmArr=JSON.parse(localStorage.getItem("alarmArr"));
    for(let i of alarmArr){
        let hour=i.hour;
        let minute=i.minute;
        let second=i.second;
        let AMPM=i.AMPM;
        let newTime={
            "hour":hour,
            "minute":minute,
            "second":second,    
        }
        if(AMPM=="AM"){
            hour=hour;
        }else{
            hour=eval(parseInt(hour)-12);
        }

        let childLi=document.createElement("li");
        childLi.id=JSON.stringify(newTime);
        let childDiv=document.createElement("div");
        childDiv.innerText= hour + ":" + minute + ":" + second +" "+AMPM;
        let deleteButton=document.createElement("button");
        deleteButton.innerHTML="DELETE";
        deleteButton.classList.add("delete-button");
        deleteButton.dataset.info = JSON.stringify(newTime);
        childLi.appendChild(childDiv);
        childLi.appendChild(deleteButton);
        alarmList.appendChild(childLi);

    }
}



setInterval(function(){
    var today=new Date();
    var seconds= today.getSeconds();
    var minutes=today.getMinutes();
    if(seconds<=9){
        seconds="0"+seconds;
            
    }
    if(minutes<=9){
        minutes="0"+minutes;
    }
    //CONVERT THE TIME TO AM/PM
    if(today.getHours()>12&&today.getHours()<24){
        timeDisplay.innerHTML=(today.getHours()-12) + ":" + minutes + ":" +seconds+" PM";
    }else if(today.getHours()==24){
        timeDisplay.innerHTML=(today.getHours()-12) + ":" + minutes + ":" + seconds+" AM";
    }else if(today.getHours()==12){
        timeDisplay.innerHTML=today.getHours() + ":" + minutes + ":" + seconds+" PM";
    }else{
        timeDisplay.innerHTML=today.getHours() + ":" + minutes + ":" + seconds+" AM";
    }
    //reload alarm lists
        alarmList.innerHTML="";
        reloadAlarms();
    //check if alarm exits from localStorage
    var deleteButtons;
    deleteButtons=document.getElementsByClassName("delete-button");
    for(let i of deleteButtons){
        i.addEventListener("click",function(){
            var idOfAlarm=i.dataset.info;
            //var alamLi=document.getElementById(idOfAlarm);
            if(localStorage.getItem("alarmArr")!=null){
                var tempAlarmArr=JSON.parse(localStorage.getItem("alarmArr"));
                var alarmTime=JSON.parse(idOfAlarm);
                for(let j=0;j<tempAlarmArr.length;j++){
                    if(tempAlarmArr[j].hour==alarmTime.hour&&tempAlarmArr[j].minute==alarmTime.minute&&tempAlarmArr[j].second==alarmTime.second){
                        tempAlarmArr.splice(j,1);
                        localStorage.setItem("alarmArr",JSON.stringify(tempAlarmArr));
                    }
                }
            }

        })
    }
    //ring the bell
    var alarms=JSON.parse(localStorage.getItem("alarmArr"));
    let hour=parseInt(today.getHours());
    let minute=parseInt(today.getMinutes());
    let second=parseInt(today.getSeconds());
    for(let i of alarms){
        if(parseInt(i.hour)==hour&&parseInt(i.minute)==minute&&parseInt(i.second)==second){
            window.alert("GET READY YOUR ALARM IS UP");
        }
    }



},1000);

//ADDING ALARM

//findAlarm function will tell you if the alarm arready exits or not ** you can't create two alarms with same time;
function checkAlarm(hour,minute,second){
    var TempAlarmArr=JSON.parse(localStorage.getItem("alarmArr"));
    var result=false;
    for(let i of TempAlarmArr){
        if(i.hour==hour&&i.minute==minute&&i.second==second){
            result=true;
        }
    }
    return result;

}


var alarmBtn=document.getElementById("set-alarm-btn");

alarmBtn.addEventListener("click",function(){
    var hourField = document.getElementById("hour");
    var minuteField=document.getElementById("minute");
    var secondField=document.getElementById("second");
    var AMPMField= document.getElementById("AMPM");
    var hour=hourField.value;
    var minute=minuteField.value;
    var second=secondField.value;
    var AMPM= AMPMField.value;
    if(hour<=12&&minute<=59&&second<=59){
        if(AMPM=="AM"){
            var newTime={
                "hour":hour,
                "minute":minute,
                "second":second,
                "AMPM":AMPM,
            };
            //check if the alarm already exits or not; if exists then update the localStorage and add it to your browser;
            var doesAlarmAlreadyExists=false;
            console.log(localStorage.getItem("alarmArr"));
            if(localStorage.getItem("alarmArr")!=null){
                doesAlarmAlreadyExists=checkAlarm(hour,minute,second);
            }
            if(doesAlarmAlreadyExists==false){
                var alarmArr;
                if(localStorage.getItem("alarmArr")!=null){
                    alarmArr=JSON.parse(localStorage.getItem("alarmArr"));
                }else{
                    alarmArr=[];
                }
                alarmArr.push(newTime);
                localStorage.setItem("alarmArr",JSON.stringify(alarmArr));
                console.log(alarmArr);

            }else{
                window.alert("THIS ALARM ALREADY EXISTS");
            }
        }else{
            var newTime={
                "hour":parseInt(hour)+12,
                "minute":minute,
                "second":second,
                "AMPM":AMPM,
            }; 
            var doesAlarmAlreadyExists=false;
            console.log(localStorage.getItem("alarmArr"));
            if(localStorage.getItem("alarmArr")!=null){
                doesAlarmAlreadyExists=checkAlarm(hour,minute,second);
            }
            if(doesAlarmAlreadyExists==false){
                var alarmArr;
                if(localStorage.getItem("alarmArr")!=null){
                    alarmArr=JSON.parse(localStorage.getItem("alarmArr"));
                }else{
                    alarmArr=[];
                }
                alarmArr.push(newTime);
                localStorage.setItem("alarmArr",JSON.stringify(alarmArr));
                console.log(alarmArr);
            }else{
                window.alert("THIS ALARM ALREADY EXISTS");
            }
        }

    }else{
        window.alert("CANT SET ALARM TIME IS OUT OF RANGE!")
        console.log("CAN'T SET ALARM");
    }
    hourField.value="";
    minuteField.value="";
    secondField.value="";
    AMPMField.value="AM"


})



//delete alarms
var deleteButtons;
// setInterval(function(){  
// deleteButtons=document.getElementsByClassName("delete-button");},1000);
for(let i of deleteButtons){
    i.addEventListener("click",function(){
        var idOfAlarm=i.dataset.info;
        //var alamLi=document.getElementById(idOfAlarm);
        if(localStorage.getItem("alarmArr")!=null){
            var tempAlarmArr=JSON.parse(localStorage.getItem("alarmArr"));
            var alarmTime=JSON.parse(idOfAlarm);
            for(let j=0;j<tempAlarmArr.length;j++){
                if(tempAlarmArr[j].hour==alarmTime.hour&&tempAlarmArr[j].minute==alarmTime.minute&&tempAlarmArr[j].second==alarmTime.second){
                    tempAlarmArr.splice(j,1);
                    JSON.stringify(localStorage.setItem("alarmArr",tempAlarmArr));
                }
            }
        }

    })
}
