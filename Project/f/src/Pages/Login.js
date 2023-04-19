import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import 'react-dropdown/style.css';
import 'react-js-dropdavn/dist/index.css'
import * as d3 from "d3";
import AnimatedPieSVG from "./AnimatedPieSVG";
import Button from 'react-bootstrap/Button';


const Login = () => {
  
  const region = [];
const [userData, setUserData] = useState({});
  const [reg, setreg] = useState({});
  const [count, setcount] = useState({});
  const [sect, setsect] = useState({});
  const [top, settop] = useState({});

  const loginUser=async(e)=>{
    // window.location.reload(false);
       e.preventDefault();
       let res=await fetch('/login',{
         method:"POST",
        
       });
       const data = await res.json();
      setUserData(data);
       
       for (var j = 0; j < data.length; j++){
        if(data[j].region != "")
        region.push(data[j].region);
        }
       
       if(res.status===400 || !data){
          Swal.fire({
            title:"Invalid Credintials",
            icon:"warning",
            confimButtonText:"Ok",
            timer: 2000
          });
       }
       else{
        
        Swal.fire({
          title:"Ready",
          icon:"success",
          confimButtonText:"Ok",
          timer: 3000
        })

       }
  }
  const some = [];
  const country = [];
  const sector = [];
  const topic = [];
  for (var j = 0; j < userData.length; j++){
    if(userData[j].region != "")
    some.push(userData[j].region);
    
    }
    function removeDuplicates(region) {
      return region.filter((item,
          index) => region.indexOf(item) === index);
  }

 const arr = removeDuplicates(some);
 
 console.log(arr);

 const handleChange = (e) => {
  setreg(e.target.value)

}

for (var j = 0; j < userData.length; j++){
  if(userData[j].region == reg && userData[j].country != "")
  country.push(userData[j].country);
  }
  const new_country = removeDuplicates(country);
console.log(new_country);
const handleChange1 = (e) => {
  setcount(e.target.value)

}
for (var j = 0; j < userData.length; j++){
  if(userData[j].sector != "")
  sector.push(userData[j].sector);
  }
  const new_sector = removeDuplicates(sector);
  const handleChange2 = (e) => {
    setsect(e.target.value)
  }
  ///
  for (var j = 0; j < userData.length; j++){
    if(userData[j].sector == sect && userData[j].topic != "")
    topic.push(userData[j].topic);
    }
    const new_topic = removeDuplicates(topic);
    const handleChange3 = (e) => {
      settop(e.target.value)

    }
    var likelihood=0;
    var relevance=0;
    var intensity=0;
    var count_likelihood = 0;
    var count_intensity=0;
    var count_relevance = 0;
    for (var j = 0; j < userData.length; j++){
      if(userData[j].country == count && userData[j].topic == top){
        if(userData[j].likelihood!=0)
         count_likelihood++;
        if(userData[j].intensity!=0)
        count_intensity++;
        if(userData[j].relevance!=0)
        count_relevance++;
      likelihood+=userData[j].likelihood;
      intensity+=userData[j].intensity;
      relevance+=userData[j].relevance;
      }
      }
      if(count_likelihood){
        likelihood /=count_likelihood;
      }
      if(count_intensity){
        intensity/=count_intensity;
      }
      if(count_relevance){
        relevance/=count_relevance;
      }
      var final1 = likelihood.toFixed(1);
      var final2 = intensity.toFixed(1);
      var final3 = relevance.toFixed(1);
      var total_count = relevance+intensity+likelihood;
      likelihood = (likelihood/total_count)*100;
      intensity = (intensity/total_count)*100;
      relevance = (relevance/total_count)*100;
      // likelihood%=10;
      // intensity%=10;
      // relevance%=10;
    
    var name = ['likelihood','intensity','relevance'];
  var value = [likelihood, intensity, relevance];
  var final = [];
  
  for(var i=0; i < name.length; i++) {
    final.push({
          name: name[i],
          y: value[i]			 
      }); 	   
  }    
    const generateData = (value, length = 3) =>
  
    d3.range(length).map((item, index) => ({
     
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [pie_data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(final);
  };

  useEffect(
    () => {
     
      setData(final);
    },
    [!pie_data]
  );
  console.log(final);
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
    
      <div class = "row">
        <div class ="btn1">
          <Button variant="secondary" type='submit' onClick={loginUser}>Click here to Refresh</Button>
                        
                    </div>
                    <div>
                      <div class="inp">
                      <select class="selectpicker" onChange={handleChange}>
                 {arr.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
                      </div>
                  <div class="login">
                    <select class="selectpicker" onChange={handleChange1}>
                 {new_country.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <div class = "flex-container">
             <select class="selectpicker" onChange={handleChange2}>
                 {new_sector.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             <div class = "nowrap">
             <select class="selectpicker" onChange={handleChange3}>
                 {new_topic.map(optn => (
                     <option>{optn}</option>
                 ))}
             </select>
             </div>
             
             </div>
             <div>
      <div class = "bdr">
        <AnimatedPieSVG
          data={final}
          width={400}
          height={400}
          innerRadius={0}
          outerRadius={130}
          
        />
        </div>
        <div class="bdr1">
        <h3 style={{color: 'blue'}}>likelihood {final1}</h3>
        <h3 style={{color: 'orange'}}>intensity {final2}</h3>
        <h3 style={{color: 'green'}}>relevance {final3}</h3>
        </div>
    </div>
      </div>
    </>
  )
  
}

export default Login
