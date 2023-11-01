import React, { useEffect, useState } from 'react'
import arrow from './up-and-down-arrows.png'
import './CurrencyConverter.css'

const CurrencyConverter = () => {

    const[amount1,Setamount1] = useState("1")
    const[amount2,Setamount2] = useState("83.26")
    const[currency1,Setcurrency1] = useState("USD")
    const[currency2,Setcurrency2] = useState("INR")
    const[rates,setrates] = useState([])

    useEffect(()=>{
        const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_MFIgyWiotcHAsRk7IQpXP2J6Yy1K9nDd1NNCtyTe"
        fetch(URL)
        .then(Res => Res.json())
        .then(Res => {
            setrates(Res.data)
        })
    },[]);
    
    const currencies = Object.keys(rates);
    function format(number){
        return number.toFixed(2);
    }

    function handleAmount1Change(amount1){
        Setamount2(format(amount1 * rates[currency2]/rates[currency1]));
        Setamount1(amount1);
    }
    function handleAmount2Change(amount2){
        Setamount1(format(amount2 * rates[currency1]/rates[currency2]));
        Setamount2(amount2);
    }
    function handleCurrency1Change(currency1){
        Setamount2(format(amount1 * rates[currency2]/rates[currency1]))
        Setcurrency1(currency1)
    }
    function handleCurrency2Change(currency2){
        Setamount1(format(amount2 * rates[currency1]/rates[currency2]))
        Setcurrency2(currency2)
    }
    
  return (
    <div>
      <div className="bgd">
        <div className="lki">
        <h1 id='fc1'>Currency Converter</h1>
        <div className="div1">
            <input type="text" value={amount1} placeholder="Enter Amount" id='Input' onChange={e => handleAmount1Change(e.target.value)}/>
            <select id='Select' value={currency1} onChange={ e => handleCurrency1Change(e.target.value)}>
                {
                    currencies.map((key =>( 
                        <option key={key} value={key}>{key}</option>
                    )))
                }
            </select>
        </div>
                <img src={arrow} id='arrow'/>
        <div className="div2">
            <input type="text" value={amount2} placeholder="Enter Amount" id='Input'onChange={e => handleAmount2Change(e.target.value)}/>
            <select id='Select' value={currency2} onChange={e => handleCurrency2Change(e.target.value)}>
            {
                    currencies.map((key =>(
                        <option key={key} value={key}>{key}</option>
                    )))
                }
            </select>
        </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
