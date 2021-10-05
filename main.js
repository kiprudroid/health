function alert1(){
  var input=document.getElementById('src').value;
  var password="shaddy";
  if(input==password) {
           document.getElementById("login").style.background="white";
         var x=document.getElementById("text").innerHTML="GOT IT";
         x.style.color="green";
         alert("CORRECT");     
     }else{
      
      document.getElementById("login").style.background="red";
      alert("WRONG PASSWORD");
      document.getElementById("text").innerHTML="WRONG PASSWORD";
  }}