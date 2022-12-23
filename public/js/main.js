const submitbtn = document.getElementById('submitbtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const tempstatus = document.getElementById('tempstatus');
const datahide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
today_data = document.getElementById('today_data');
const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value
   try {
    if (cityVal=="") {
        city_name.innerHTML = `plz write city name properly`;
        datahide.classList.add('data_hide');
    } else {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=bd54494933674910c62e65d3d9f38710`;
            const responce = await fetch(url);
            const data = await responce.json();
            const arrData = [data];
            temp_real_val.innerHTML = arrData[0].main.temp;
            tempmood = arrData[0].weather[0].main;
            if (tempmood == "Clear") {
                tempstatus.innerHTML =
                  "<i class='fas fa-sun' style='color: #eccc68;'></i>";
              } else if (tempmood == "Clouds") {
                tempstatus.innerHTML =
                  "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
              } else if (tempmood == "Rainy") {
                tempstatus.innerHTML =
                  "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
              } 
              else if(tempmood == "Snow"){
                tempstatus.innerHTML = "<i class='fas fa-snowflake' style='color:#f1f2f6;'></i>"
              }
              else {
                tempstatus.innerHTML =
                  "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
              }

              city_name.innerHTML = `${arrData[0].name},${arrData[0].sys.country}`;
              const getcurrentday = ()=>{
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                let currenttime = new Date();
                let day = weekday[currenttime.getDay()];
                return day;
              };
              day.innerHTML = getcurrentday();
              
              const getTime = ()=>{
              let now = new Date();
              let hours = now.getHours();
              let minute = now.getMinutes();
              let second = now.getSeconds();

              let priods = "AM";
              if(hours>11){
                priods = "PM";
                if(hours>12) hours-=12;
              }
              if(minute<10)
              {
                minute = "0"+minute;              
              }
              return `${hours}/${minute}/${second}  ${priods}`;
              };
              today_data.innerHTML = getTime();
            datahide.classList.remove('data_hide');
    }
   } catch{
    city_name.innerHTML = `plz write city name properly`;
    datahide.classList.add('data_hide');
   }
}

submitbtn.addEventListener("click",getInfo);