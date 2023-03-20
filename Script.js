let div=document.createElement("div");
document.body.append(div);
div.setAttribute("class","container");
//Country Select
fetch("https://restcountries.com/v2/all").then((data)=> data.json()).then((response)=>{
  countryoptions(response);
}).catch((error)=> console.log(error));

let selectcountry=document.getElementById("Countryselect");
div.append(selectcountry);
function countryoptions(response){
       response.map(({name,alpha2Code})=>{
        let countryoptions=document.createElement("option");
        selectcountry.append(countryoptions);
        countryoptions.innerHTML=`${name}`;
        countryoptions.setAttribute("value",alpha2Code);
        
       });
 }
 //year select
 let Yearselect=document.getElementById("Yearselect");
 div.append(Yearselect);
 for(var i=2000;i<=2050;i++){
  let Yearselectoptions=document.createElement("option");
             Yearselect.append(Yearselectoptions);
        Yearselectoptions.innerText= i;
        Yearselectoptions.setAttribute("value",i);
 }
//Get calender Button
let getbtn = document.createElement("button");
div.append(getbtn);
getbtn.innerText="Get Calendar";
getbtn.setAttribute("class","btn btn-primary");
// getbtn.setAttribute("type","submit");
getbtn.setAttribute("onclick","Validate(event)");   



//function to validate
async function Validate(){
try{
 if(document.getElementById("Countryselect").value==""){
    alert ( "Please select the Country!");
    document.getElementById("Countryselect").value.focus();
    return false;
    }
 if(document.getElementById("Yearselect").value==""){
      alert ( "Please select the Year!");
      document.getElementById("Yearselect").value.focus();
      return false;
      }
let countrycode= document.getElementById("Countryselect").value;
let year=document.getElementById("Yearselect").value;
console.log(countrycode,year);

let data=await fetch("https://date.nager.at/api/v3/PublicHolidays/"+year+"/"+countrycode)
let response=await data.json();
  console.log(response);
  var tabledata="";
  response.forEach((value,index)=>{
    tabledata += "<tr>";
    tabledata += `<td> ${index + 1}</td>`;
    tabledata += `<td> ${value.date} </td>`;
    tabledata += `<td> ${value.localName}</td>`;
    tabledata += `<td> ${value.name}</td>`;
          });
          document.getElementById("tableBody").innerHTML = tabledata;
}catch{
  alert("Can not Fetch the data of this country select another Country Please");
   }           
}    

