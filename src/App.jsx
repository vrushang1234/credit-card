import { useState } from "react"
import "./style.css"
export default function App(){
    function cvcfocus(){
        document.getElementsByClassName("main-credit-card")[0].style.transform="rotate3d(0,1,0,180deg)"
    }
    function cvcnotfocus(){
        document.getElementsByClassName("main-credit-card")[0].style.transform="rotate3d(0,1,0,0deg)"
    }
    let number_arr=[".",".",".",". ",".",".",".",". ",".",".",".",". ",".",".",".","."]
    function inputchanged(event){
        document.getElementById("card").style.backgroundColor=" rgb(0, 140, 255)";
        let {name, value}= event.target;
        console.log(value.split("-"))
        setinput((prevvalue)=>{
            if(name==="number"){
                for(let x=0;x<value.length;x++){
                    if(x<16){
                        if(x%4===0 && x!==0){
                            number_arr[x]=" "+value[x]
                        }
                        else{
                        number_arr[x]=value[x]
                        }
                        number_arr.join("")
                    }
                }
                return{
                    number:number_arr.join(""),
                    name:prevvalue.name,
                    expiry_date:prevvalue.expiry_date,
                    cvc: prevvalue.cvc
                }
            }
            else if(name==="name"){
                return{
                    number:prevvalue.number,
                    name:value,
                    expiry_date:prevvalue.expiry_date,
                    cvc: prevvalue.cvc
                }
            }
            else if(name==="expiry_date"){
                let new_value=value.split("-")
                return{
                    number:prevvalue.number,
                    name:prevvalue.name,
                    expiry_date:new_value[1]+ "/" + new_value[0].slice(2),
                }
            }
            else{
                return{
                    number:prevvalue.number,
                    name:prevvalue.name,
                    expiry_date:prevvalue.expiry_date,
                    cvc: value
                }
            }
        })
    }
    
    const [input, setinput]=useState(
        {
            number:".... .... .... ....",
            name:"Your Name Here",
            expiry_date:". . / . .",
            cvc:""
        }
    )
    if(input.name===""&&input.number===".... .... .... ...."&& input.expiry_date===". . / . ."){
        document.getElementById("card").style.backgroundColor="rgb(104, 104, 104)";
    }
    return(
        <div className="main">
        <div className="main-credit-card">
                <div id="card" className="credit-card front">
                    <img alt="chip" className="chip" src={require("./chip.png")}/>
                    <img alt="visa" className="visa" src={require("./visa.png")} />
                    <div className="number">
                        {input.number}
                    </div>
                    <div className="name">
                        {input.name}
                    </div>
                    <div className="date">
                        valid thru <br />
                        {input.expiry_date}
                    </div>
                </div>
                <div className= "back">
                    <div className="black-bar">
                    </div>
                    
                    <div className="cvv-box">
                        <h1>{input.cvc}</h1>
                    </div>

                    <img className="back-img" src={require("./visa.png")} />

                </div>
            </div>
            <div className="form">
                <label className="label"> Card number: </label> &emsp;
                <input className="input" name="number" onFocus={cvcnotfocus} onChange={inputchanged}  type="text"></input><br /><br />
                <label className="label"> Cardholder name: </label> &emsp;
                <input className="input" name="name" onFocus={cvcnotfocus}  type="text" onChange={inputchanged}></input><br /><br />
                <label className="label"> Card expiry date: </label> &emsp;
                <input className="input" name="expiry_date" onFocus={cvcnotfocus} value={input.expiry_date} type="month" onChange={inputchanged}></input><br /><br />
                <label className="label"> CVC: </label> &emsp;
                <input className="input" name="cvc" value={input.cvc} type="text" onFocus={cvcfocus} onChange={inputchanged}></input><br /><br />
            </div>
        </div>
       
    )
    
}