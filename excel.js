var arr = [[ ],[ ]];
var tempArr = [[ ],[ ]];
var loadFlag=0;
let rowObject,obj;
var routes = [ ];
var url="https://docs.google.com/spreadsheets/d/e/2PACX-1vR1fxwzZsTpe7wXJ-NchbRH81RgC1fzDi0Jxmpf553xxPZNNVy-letfp74xl6vJHPJIYlPxUzZjeukk/pub?output=csv";
var table = document.querySelector("table");
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200)
    {
        var data=Papa.parse(xhr.responseText);
        tempArr = data.data;
	//remove loader
	const element = document.getElementById("loader");
  	element.remove();
        //alert("loaded");
        /*
        //Print 2D array
        // This loop is for outer array
        for (var i = 0, l1 = arr.length; i < l1; i++) {
            // This loop is for inner-arrays
            for (var j = 0, l2 = arr[i].length; j < l2; j++) {
                // Accessing each elements of inner-array
                console.log(arr[i][j]); 
            }
            console.log("\n");
        }
        */
        //Remove 1st row
        tempArr.shift();
        //Removing empty string from array
        for (var i = 0, l1 = tempArr.length; i < l1; i++) {
            // This loop is for inner-arrays
            for (var j = 0, l2 = tempArr[i].length; j < l2; j++) {
                // Accessing each elements of inner-array
                 arr[i] = tempArr[i].filter(e =>  e);
            }
        }
        console.log(arr);
    }
};
xhr.open("GET",/*"https://cors-anywhere.herokuapp.com/"*/url,true);
xhr.send();


//as per bus route no
function routeSearch() {
    document.getElementById("busRoute").style.borderWidth = "medium";
    if(document.getElementById("busRoute").value==="") {
        document.getElementById("routeRes").innerHTML = "<br>No routes number entered";
        document.getElementById("busRoute").style.borderColor = "red";
    }
    else {
        document.getElementById("busRoute").style.borderStyle = "solid";
        var busRoute=document.getElementById("busRoute").value;
        var str="";
        for(var i=0;i<arr.length;i++) {
            if(busRoute.toLowerCase()===arr[i][0].toLowerCase()) {
                str+="<b>"+arr[i][0]+"</b> : ";
                for(var j=1;j<arr[i].length;j++) {
                    if(j==arr[i].length-1)
                        str+=arr[i][j];
                    else
                        str+=arr[i][j]+"->";
                }        
                str+="<br><br>";    
            }
        }
        if(str==="") {
            document.getElementById("busRoute").style.borderColor = "red";
            document.getElementById("routeRes").innerHTML = "<br>No such routes found";        
        }
        else {
            document.getElementById("busRoute").style.borderColor = "green";
            document.getElementById("routeRes").innerHTML = "<br>"+str; 
        }
    }   
}  


//search as per location
function locSearch() {
    document.getElementById("loc").style.borderWidth = "medium";
    var loc=document.getElementById("loc").value;
    if(loc==="") {
        document.getElementById("locRes").innerHTML="<br>No location entered.";
        document.getElementById("loc").style.borderColor = "red";
    }
    else {
        var busArray = [ ];
        for (var i = 0, l1 = arr.length; i < l1; i++) {
            for (var j = 1, l2 = arr[i].length; j < l2; j++) {
                if(arr[i][j].toLowerCase()===loc.toLowerCase())
                    busArray.push(arr[i][0]); 
            }
        }
        if(busArray.length!=0){
            //returns only unique values of bus routes
            let uniqueChars = busArray.filter((c, index) => {
                return busArray.indexOf(c) === index;
            });
            document.getElementById("locRes").innerHTML="<br>"+uniqueChars;
            document.getElementById("loc").style.borderColor = "green";
        }
        else  {
            document.getElementById("locRes").innerHTML="<br>No bus runs at your entered location. Please try a new location or check spelling of the location given."  
            document.getElementById("loc").style.borderColor = "red";
        }
    }
}

//search as per src dest
function flip() {
    var src=document.getElementById("src").value;
    var des=document.getElementById("des").value;
    document.getElementById("src").value=des;
    document.getElementById("des").value=src;
}

function sdSearch() {
    document.getElementById("src").style.borderWidth = "medium";
    document.getElementById("des").style.borderWidth = "medium";
    var src=document.getElementById("src").value;
    var des=document.getElementById("des").value;
    if(src==="" || des==="") {
        document.getElementById("sdRes").innerHTML="<br>Enter both source and destination location";
        if (src ==="")
            document.getElementById("src").style.borderColor = "red";
        else
            document.getElementById("src").style.borderColor = "black";
        if (des ==="")
            document.getElementById("des").style.borderColor = "red";
        else
            document.getElementById("des").style.borderColor = "black";
    }   
    else {    
        var flag=0;
	var srcFlag=0;
	var desFlag=0;
        var busArray = [ ];
        for (var i = 0, l1 = arr.length; i < l1; i++) {
            for (var j = 1, l2 = arr[i].length; j < l2; j++) {
                if(arr[i][j].toLowerCase()===src.toLowerCase()) {
                    flag=1;
			        srcFlag=1;
		        }
                if(arr[i][j].toLowerCase()===des.toLowerCase()) 
                    desFlag=1;
                if(flag==1 && arr[i][j].toLowerCase()===des.toLowerCase()) {
                    busArray.push(arr[i][0]);
                    flag=0;	
                }     
            }
            flag=0;
        }
        if(busArray.length!=0) {
            document.getElementById("sdRes").innerHTML="<br>"+busArray;
            document.getElementById("src").style.borderColor = "green";
            document.getElementById("des").style.borderColor = "green";
        }
        else {
            if(srcFlag==0 && desFlag==0) {
                document.getElementById("src").style.borderColor = "red";
                document.getElementById("des").style.borderColor = "red";
                document.getElementById("sdRes").innerHTML="<br>Both source & destination location is incorrect. Check spelling, otherwise no such location exists";
            }
            else if(srcFlag==0 && desFlag==1) {
                document.getElementById("src").style.borderColor = "red";
                document.getElementById("des").style.borderColor = "black";
                document.getElementById("sdRes").innerHTML="<br>Source location is incorrect. Check spelling, otherwise no such location exists";
            }
            else if(srcFlag==1 && desFlag==0) {
                document.getElementById("src").style.borderColor = "black";
                document.getElementById("des").style.borderColor = "red";
                document.getElementById("sdRes").innerHTML="<br>Destination location is incorrect. Check spelling, otherwise no such location exists";
            }
            else {
                document.getElementById("src").style.borderColor = "black";
                document.getElementById("des").style.borderColor = "black";
                document.getElementById("sdRes").innerHTML="<br>No direct bus found between the routes";
            }
        }
    }   
}

//reset everything
function reset(){
    document.getElementById("src").value="";
    document.getElementById("des").value="";
    document.getElementById("busRoute").value="";
    document.getElementById("loc").value="";
    document.getElementById("sdRes").innerHTML="";
    document.getElementById("routeRes").innerHTML="";
    document.getElementById("locRes").innerHTML="";
    document.getElementById("busRoute").style.borderColor = "black";
    document.getElementById("loc").style.borderColor = "black";
    document.getElementById("busRoute").style.borderWidth = "thin";
    document.getElementById("loc").style.borderWidth = "thin";
    document.getElementById("src").style.borderWidth = "thin";
    document.getElementById("des").style.borderWidth = "thin";
    document.getElementById("src").style.borderColor = "black";
    document.getElementById("des").style.borderColor = "black";
    
}

var lightFlag=1;
	function lightdark(){
    	if(lightFlag) {
        	document.getElementById("bodyid").style.color= "white";
  			document.getElementById("bodyid").style.backgroundColor = "#1F1B24";
  			document.getElementById("bodyid").style.border= "15px solid #1F1B24";
			document.getElementById("src").style.backgroundColor= "#757575";
			document.getElementById("des").style.backgroundColor= "#757575";
			document.getElementById("loc").style.backgroundColor= "#757575";
			document.getElementById("busRoute").style.backgroundColor= "#757575";
			document.getElementById("src").style.color= "white";
			document.getElementById("des").style.color= "white";
			document.getElementById("loc").style.color= "white";
			document.getElementById("busRoute").style.color= "white";
  			lightFlag=0;
        }
        else {
        	document.getElementById("bodyid").style.color= "black";
  			document.getElementById("bodyid").style.backgroundColor = "white";
  			document.getElementById("bodyid").style.border= "15px solid white";
			document.getElementById("src").style.backgroundColor= "white";
			document.getElementById("des").style.backgroundColor= "white";
			document.getElementById("loc").style.backgroundColor= "white";
			document.getElementById("busRoute").style.backgroundColor= "white";
			document.getElementById("src").style.color= "black";
			document.getElementById("des").style.color= "black";
			document.getElementById("loc").style.color= "black";
			document.getElementById("busRoute").style.color= "black";
  			lightFlag=1;
        }
    }

//youtube.com/watch?v=GUHhiczS78U&t=472s&ab_channel=CCSIT-KFU
//https://www.geeksforgeeks.org/multidimensional-array-in-javascript/
//https://stackoverflow.com/questions/38827966/how-to-remove-all-the-odd-indexes-eg-a1-a3-value-from-the-array#:~:text=A%20simple%20alternative%20for%20removing,%3D%20aa%5Bidx%5D%3B%20aa.
