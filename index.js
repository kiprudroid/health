var country = document.querySelector('#country');
var cases = document.querySelector('.total-cases');
var active = document.querySelector('.active-case');
var new_cases = document.querySelector('.new-case');
var new_deaths = document.querySelector('.new-deaths');
var total_deaths = document.querySelector('.total-death');
var total_recoveries = document.querySelector('.recovered');
var time_updated = document.querySelector('.update');
var abbr = document.querySelector('#abbr'); 

var btn = document.querySelector('#search-btn');
let url;


$(document).ready(function (){
	url = "https://covid-19-tracking.p.rapidapi.com/v1/world"; 
	send_request(); 
});  




$(btn).click(function(){ 
var input = document.querySelector('#search'); 

if (!input.value == ""){
  url = "https://covid-19-tracking.p.rapidapi.com/v1/"+input.value;

}else{
	url = 'https://covid-19-tracking.p.rapidapi.com/v1/world';
}
  
  send_request(); 
});

function send_request(){ 
var settings = {
	"async": true,
	"crossDomain": true, 
	"url": url,    
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-tracking.p.rapidapi.com",
		"x-rapidapi-key": RAPID_API_KEY  
	}
}



$.ajax(settings).done(function (response) {
	console.log(response);  
  $(cases).text(response["Total Cases_text"]); 
    $(country).text(response["Country_text"]);
    $(active).text(response["Active Cases_text"]); 
    $(new_cases).text(response["New Cases_text"]);
    $(new_deaths).text(response["New Deaths_text"]);
    $(total_deaths).text(response["Total Deaths_text"]);
    $(total_recoveries).text(response["Total Recovered_text"]);
    $(time_updated).text(response["Last Update"]);
    $(abbr).text(response["Country_text"].substring(0,3)); 
    abbr.parentNode.href = "https://en.wikipedia.org/wiki/"+response["Country_text"];  

   });
};
