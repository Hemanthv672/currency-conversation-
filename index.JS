const BASE_URL =
            "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelectorAll("form button");
const fromCurr = document.querySelectorAll(".from select");
const tocurr = document.querySelectorAll(".to select");
const msg = document.querySelectorAll(".msg");

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode === "USD"){
         newOption.selected = "selected";     
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () =>{
  let amount =document.querySelectorAll(".amountinput");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}`;
  let response = awaitfetch(URL);
  let data = await response.json();
   let rate = data[tocurr.value.toLowerCase()];

   let finalAmoutn = amtVal * rate;
   Msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
 };

const updateFlag =(element)=>{
 let currCode = element.value;
 let countryCode = countryList[currCode];
 letnewSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
};
btn.addEventListener("click",(evt) =>{
    evt.preventDefult();
    updateExchangeRate();
});
window.addEventListener("load",() =>{
    updateExchangeRate();
});