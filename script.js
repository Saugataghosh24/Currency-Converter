const api = "https://v6.exchangerate-api.com/v6/569ff460ab06cce2a6f0d73b/latest/USD";

const dropdowns= document.querySelectorAll(".dropdown Select");
const btn= document.querySelector("button");
const msg= document.querySelector("#msg");

for(let select of dropdowns){
    for(currencyCode in countryList){
        let newOp= document.createElement("option");
        newOp.innerText= currencyCode;
        newOp.value= currencyCode;
        select.append(newOp);
        if(select.name==="from" && currencyCode==="USD"){
            newOp.selected= "selected";
        }
        else if(select.name==="to" && currencyCode==="INR"){
            newOp.selected= "selected";
        }
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target);
    });
}

const updateFlag= (element)=> {
    let currencyCode= element.value;
    let countryCode= countryList[currencyCode];
    let flagSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src= flagSrc;
};

btn.addEventListener("click", (evt)=> {
    evt.preventDefault();

    let amount= document.querySelector(".amount input");
    if(amount.value== "" || amount.value<0){
        amount.value= 1;
    }
    convert();
});

async function convert(){
    const fromCurrency= document.querySelector("#from").value;
    const toCurrency= document.querySelector("#to").value;
    let amount= document.querySelector(".amount input").value;

    let response= await fetch(api);
    let data= await response.json();

    let fromRate= data.conversion_rates[fromCurrency];
    let toRate= data.conversion_rates[toCurrency];

    let converted_amount= (amount/fromRate)*toRate;
    msg.innerText= `${amount} ${fromCurrency} = ${converted_amount} ${toCurrency}`;

}

window.addEventListener("load", ()=> {
    convert();
});


// Exchange Button Implementation
let symbol= document.querySelector("#exchange");
let leftCode= document.querySelector("#from");
let rightCode= document.querySelector("#to");

let leftFlag= document.querySelector(".from img");
let rightFlag= document.querySelector(".to img");

symbol.addEventListener("click", ()=>{
    let exchangeCode= leftCode.value;
    leftCode.value= rightCode.value;
    rightCode.value= exchangeCode;

    let exchangeFlag= leftFlag.src;
    leftFlag.src= rightFlag.src;
    rightFlag.src= exchangeFlag;
})

