var timeDisplay=document.getElementById("time-container");
var alarmList=document.getElementById("alarms-list");


//Returns the alarmArray 
function getAlarmArray(){
    let arr=[];
    if(localStorage.getItem("alarmArr")!=""&&localStorage.getItem("alarmArr")!=null){
       arr=JSON.parse(localStorage.getItem("alarmArr"));
    }else if(localStorage.getItem("alarmArr")==null){
        localStorage.setItem("alarmArr",JSON.stringify(arr));
    }
    return arr;
}
//converts AMPM time format to 24 hour Format
function fromAMPMto24(time){
    if(time.AMPM="PM"){
        time.hour=time.hour+12;
    }
    return time;
}
//converts 24 hour formatted time object to AMPM format time object and returns the object
function from24toAMPM(timeObject){//timeObject={hour:,minutes:,seconds:}
    // var today=new Date();
    var seconds= timeObject.seconds;
    var minutes=timeObject.minutes;
    var hour=timeObject.hour;
    var AMPM;

    //CONVERT THE TIME TO AM/PM
    if(hour>12&&hour<24){
        hour= hour-12;
        AMPM="PM";
    }else if(hour==24){
        hour=hour-12;
        AMPM="AM";
    }else if(hour==12){
        AMPM="PM";
    }else{
        AMPM="AM";
    }
    return {
        hour:hour,
        minutes:minutes,
        seconds:seconds,
        AMPM:AMPM,
    }
}


//In every window reload, reloads  the alarms from Alarm Array in UI
function reloadAlarms(){
    let alarmArr=getAlarmArray();
    alarmList.innerHTML="";
    for(let i of alarmArr){
        let hour=i.hour;
        let minutes=i.minutes;
        let seconds=i.seconds;
        let AMPM=i.AMPM;
        let alarmTime={
            hour:hour,
            minutes:minutes,
            seconds:seconds,
            AMPM:AMPM,
        }
        addAlarmToUI(alarmTime);
    }
}
window.addEventListener("load",reloadAlarms);

//shows the time and checks if there is some alarm to ring
setInterval(function(){
    var today=new Date();
    var seconds= today.getSeconds();
    var minutes=today.getMinutes();
    var hour=today.getHours();
    if(seconds<=9){
        seconds="0"+seconds;
            
    }
    if(minutes<=9){
        minutes="0"+minutes;
    }
    var timeObject={
        hour:hour,
        minutes:minutes,
        seconds:seconds,
    }
    var AMPMtime=from24toAMPM(timeObject);
    var AMPMhour=AMPMtime.hour;
    var AMPMminutes=AMPMtime.minutes;
    var AMPMseconds=AMPMtime.seconds;
    var AMPMstatus=AMPMtime.AMPM;
    timeDisplay.innerHTML=AMPMhour + ":" + AMPMminutes + ":" +AMPMseconds+" "+AMPMstatus;
    //ring the bell
    let alarms=getAlarmArray();
    for(let i of alarms){
        if(parseInt(i.hour)==AMPMhour&&parseInt(i.minutes)==AMPMminutes&&parseInt(i.seconds)==AMPMseconds&&i.AMPM==AMPMstatus){
            window.alert("GET READY YOUR ALARM IS UP");
        }
    }
},1000);

//ADDING ALARM
var alarmBtn=document.getElementById("set-alarm-btn");

alarmBtn.addEventListener("click",function(){
    var hourField = document.getElementById("hour");
    var minuteField=document.getElementById("minute");
    var secondField=document.getElementById("second");
    var AMPMField= document.getElementById("AMPM");
    var hour=hourField.value;
    var minutes=minuteField.value;
    var seconds=secondField.value;
    var AMPM= AMPMField.value;
    if(hour<=12&&minutes<=59&&seconds<=59){
        if(hour.length==0){
            hour=0;
        }
        if(minutes.length==0){
            minutes=0;
        }
        if(seconds.length==0){
            seconds=0;
        }
        var alarmTime={
            hour:hour,
            minutes:minutes,
            seconds:seconds,
            AMPM:AMPM,
        }
        var doesAlarmAlreadyExists=false;
        if(getAlarmArray().length!=0){
            doesAlarmAlreadyExists=checkAlarm(alarmTime);
        }
        if(doesAlarmAlreadyExists==false){
            var alarmArr=getAlarmArray();
            alarmArr.push(alarmTime);
            localStorage.setItem("alarmArr",JSON.stringify(alarmArr));
            console.log(alarmArr);
            addAlarmToUI(alarmTime);

        }else{
            window.alert("THIS ALARM ALREADY EXISTS");
        }

    }else{
        window.alert("CANT SET ALARM TIME IS OUT OF RANGE!")
        console.log("CAN'T SET ALARM");
    }
    hourField.value="";
    minuteField.value="";
    secondField.value="";
    AMPMField.value=alarmTime.AMPM;
})

//checkAlarm function will tell you if the alarm arready exits or not ** you can't create two alarms with same time;
function checkAlarm(alarmTime){
    var TempAlarmArr=getAlarmArray();
    var result=false;
    for(let i of TempAlarmArr){
        if(i.hour==alarmTime.hour&&i.minutes==alarmTime.minutes&&i.seconds==alarmTime.seconds&&i.AMPM==alarmTime.AMPM){
            result=true;
        }
    }
    return result;

}
//adds the alarm with the given time input in UI
function addAlarmToUI(alarmTime){
    let childLi=document.createElement("li");
    childLi.id=JSON.stringify(alarmTime);
    childLi.innerHTML=
    `<div>`+
    `${alarmTime.hour<=9?`0`+alarmTime.hour:alarmTime.hour}:${alarmTime.minutes<=9?`0`+alarmTime.minutes:alarmTime.minutes}:${alarmTime.seconds<=9?`0`+alarmTime.seconds:alarmTime.seconds}  ${alarmTime.AMPM}`+
    `</div>`+
    `<i class="delete-button fa-solid fa-circle-minus" data-info=${JSON.stringify(alarmTime)} onClick="removeAlarm(this)"></i>`;
    alarmList.appendChild(childLi);
}

//Removes the alarm
function removeAlarm(element){
    var alarmTime= JSON.parse(element.getAttribute("data-info"));
    removeAlarmFromAlarmList(alarmTime);
    removeAlarmFromUI(JSON.stringify(alarmTime));

}
//Removes the alarm from AlarmArray
function removeAlarmFromAlarmList(alarmTime){
    let alarmArr=getAlarmArray();
    let index=alarmArr.indexOf(alarmTime);
    alarmArr.splice(index,1);
    localStorage.setItem("alarmArr",JSON.stringify(alarmArr));
}
//Removes the alarm from UI
function removeAlarmFromUI(id){
    let element=document.getElementById(id);
    element.remove();

}





