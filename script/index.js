let height = document.querySelector('.height');
let weight = document.querySelector('.weight');
let list = document.querySelector('.list');
let circle = document.querySelector('.circle');
let resultBMI = document.querySelector('.resultBMI');
let resultCircle = document.querySelector('.resultCircle');
let restartBtn = document.querySelector('.restartBtn');
let button = document.querySelector('.button');
let data = JSON.parse(localStorage.getItem('bmiData'))||[];

//運算主程式
function BMIcount(e){
    Height = parseInt(height.value);
    Weight = parseInt(weight.value);
    let BMI = (Weight/Math.pow(Height/100,2))
    BMI = BMI.toFixed(2);
    //console.log(BMI);
    //updateList(BMI);

    let BodyType=[{
        bodyType: "重度肥胖",
        bodyTypeClass: "bodyTypeClassSerious",
        color: '#FF1200'
    },{
        bodyType: "中度肥胖",
        bodyTypeClass: "bodyTypeClassHeavy",
        color: '#FF6C02' 
    },{
        bodyType: "輕度肥胖",
        bodyTypeClass: "bodyTypeClassMedium",
        color: '#FF6C02' 
    },{
        bodyType: "體重過重",
        bodyTypeClass: "bodyTypeClassLittle",
        color: '#FF982D' 
    },{
        bodyType: "體重理想",
        bodyTypeClass: "bodyTypeClassFine",
        color: '#86D73F' 
    },{
        bodyType: "體重過輕",
        bodyTypeClass: "bodyTypeClassLight",
        color: '#31BAF9 ' 
    }];
     
    if(BMI<18.5){
        bodtypeValue = BodyType[5].bodyType;
        color = BodyType[5].color;
    }else if(BMI>=18.5&&BMI<24){
        bodtypeValue = BodyType[4].bodyType;
        color = BodyType[4].color;
    }else if(BMI>=24&&BMI<27){
        bodtypeValue = BodyType[3].bodyType;
        color = BodyType[3].color;
    }else if(BMI>=27&&BMI<30){
        bodtypeValue = BodyType[2].bodyType;
        color = BodyType[2].color;
    }else if(BMI>=30&&BMI<35){
        bodtypeValue = BodyType[1].bodyType;
        color = BodyType[1].color;
    }else if(BMI>=35){
        bodtypeValue = BodyType[0].bodyType;
        color = BodyType[0].color;
    }
      
 //時間設定
    let NowDate=new Date();
    let year=NowDate.getFullYear();
    let mon=NowDate.getMonth();
    let day=NowDate.getDate();
    let hr=NowDate.getHours();
    let min=NowDate.getMinutes();
    let monstr=JSON.stringify(mon);
    let daystr=JSON.stringify(day);
    let hrstr=JSON.stringify(hr);
    let minstr=JSON.stringify(min);
    //console.log(typeof(yearstr));
    if(monstr.length===1){mon='0'+mon}
    if(daystr.length===1){day='0'+day}
    if(hrstr.length===1){hr='0'+hr}
    if(minstr.length===1){min='0'+min}
    let currentTime = year+'/'+mon+'/'+mon+'/'+day+' '+hr+':'+min;
 
    //bmiData設定&將資料push進localStorage
    let bmiData={
        colortype:color,
        bodtype:bodtypeValue,
        bmi:BMI,
        hei:Height,
        wei:Weight,
        time:currentTime
    }
    
    data.push(bmiData);
    //console.log(bmiData);
    //console.log(data);
    localStorage.setItem('bmiData',JSON.stringify(data));
    updateList()
   
}

//結果按鈕圖示轉變
function resultData(){
    circle.style.display='none';
    resultCircle.style.display='block';
    resultBMI.style.display='block';
    for(i=0;i<data.length;i++){
        resultCircle.style.border=`${data[i].colortype} 6px solid`;
        resultCircle.innerHTML=`
        <p style='color:${data[i].colortype};ont-family:SFNSDisplay;
        font-size: 32px;'>${data[i].bmi}<br>BMI</p>
        <a href='#' class='restartBtn'><img class='restart' src='https://upload.cc/i1/2021/05/06/X5YRmH.png' style='background:${data[i].colortype};border: 5px solid #424242;'></a>`;
    }
    
}

//資料更新
function updateList(){
    let str='';
    data = JSON.parse(localStorage.getItem('bmiData'))||[];
    //console.log(typeof(data));
    for(i=0;i<data.length;i++){
    str += `<li class='bmi-item' id='bmi-item' data-num=${i}>
            <div class = 'color' style =' width:7px;  background:${data[i].colortype}'></div>
            <p class='bodytype'>${data[i].bodtype}</p>
            <h3>BMI</h3>
            <p>${data[i].bmi}</p>
            <h4>體重</h4>
            <P>${data[i].wei}Kg</p>
            <h5>身高</h5>
            <P>${data[i].hei}cm</p>
            <div class='time' id='time'>${data[i].time}</div>
            <a href='#' class='deletbtn' data-num=${i}>刪除</a>
            </li>`;
    resultBMI.innerHTML=`<p style=' color:${data[i].colortype};'>${data[i].bodtype}</p>` 
    }
    list.innerHTML=str;
    resultData(data);
  
}

function reset(e){
    event.preventDefault();
    circle.style.display='block';
    resultCircle.style.display='none';
    resultBMI.style.display='none';
    height.value='';
    weight.value='';
}
//資料清除
function delet(e){
    let num = e.target.dataset.num;
    if(e.target.nodeName!=='A'){    
       return
    }
    //console.log(e.target.dataset.num);
    data.splice(num,1);
    localStorage.setItem('bmiData',JSON.stringify(data));
    updateList();
}

function checkContent(){
    let heightStr = document.querySelector('.height').value;
    let weightStr = document.querySelector('.weight').value;;
    if(heightStr==''){
        alert('請填入身高')
        return
        };
    if(weightStr==''){
        alert('請填入體重')
        return
        };
    BMIcount();
}
//監聽
circle.addEventListener('click',checkContent,false);
resultCircle.addEventListener('click',reset,false)
list.addEventListener('click',delet,false);
