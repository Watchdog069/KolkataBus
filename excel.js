let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]
let rowObject,obj;
var arr = [ ];
var routes = [ ];

document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
            let data = event.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
            workbook.SheetNames.forEach(sheet => {
                rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

                for(var i=0;i<rowObject.length;i++) {
                    arr[i] = [ ];
                    obj = rowObject[i];
                    const objectToArray = obj => {
                        const keys = Object.keys(obj);
                        const res = [];
                        for(let i = 0; i < keys.length; i++){
                        res.push(obj[keys[i]]);
                        };
                        return res;
                    };
                    //console.log(objectToArray(obj));
                    for(var j=0;j<objectToArray(obj).length;j++) {
                        arr[i][j] = objectToArray(obj)[j];
                    }    
                }
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
                //get an array of all the routes
                for(var j=0;j<arr.length;j++) {
                    routes[j]=arr[j][0];
                }      
                //remove odd elements from the routes array
                dCount = 0,
                // store array length
                len = routes.length;
                for (var i = 0; i < len; i++) {
                    // check index is odd
                    if (i % 2 == 1) {
                        // remove element based on actual array position 
                        // with use of delete count
                        routes.splice(i - dCount, 1);
                        // increment delete count
                        // you combine the 2 lines as `routes.splice(i - dCount++, 1);`
                        dCount++;
                    }
                }
                   
         });
        }
    }
});

//check for bus route search
function routeSearch() {
    var busRoute=document.getElementById("busRoute").value;
    var str="";
    for(var i=0;i<arr.length;i++) {
        if(busRoute===arr[i][0]) {
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
    if(str==="")
        document.getElementById("routeRes").innerHTML = "<br>No such routes found";        
    else
        document.getElementById("routeRes").innerHTML = "<br>"+str; 
}  

function locSearch() {
    var loc=document.getElementById("loc").value;
    var busArray = [ ];
    for (var i = 0, l1 = arr.length; i < l1; i++) {
        for (var j = 1, l2 = arr[i].length; j < l2; j++) {
            if(arr[i][j]===loc)
                busArray.push(arr[i][0]); 
        }
    }
    if(busArray.length!=0){
        //returns only unique values of bus routes
        let uniqueChars = busArray.filter((c, index) => {
            return busArray.indexOf(c) === index;
        });
        document.getElementById("locRes").innerHTML="<br>"+uniqueChars;
    }
    else  
        document.getElementById("locRes").innerHTML="<br>No bus runs at your entered location. Please try a new location or check spelling of the location given."  

}

function flip() {
    var src=document.getElementById("src").value;
    var des=document.getElementById("des").value;
    document.getElementById("src").value=des;
    document.getElementById("des").value=src;
}

function sdSearch() {
    var src=document.getElementById("src").value;
    var des=document.getElementById("des").value;
    var flag=0;
    var busArray = [ ];
    for (var i = 0, l1 = arr.length; i < l1; i++) {
        for (var j = 1, l2 = arr[i].length; j < l2; j++) {
            if(arr[i][j]===src) 
                flag=1;
            if(flag==1 && arr[i][j]===des) {
                busArray.push(arr[i][0]);
                flag=0;
            } 
        }
        flag=0;
    }
    if(busArray.length!=0)
        document.getElementById("sdRes").innerHTML="<br>"+busArray;
    else
        document.getElementById("sdRes").innerHTML="<br>No direct bus found between the routes";
}

function reset(){
    document.getElementById("src").value="";
    document.getElementById("des").value="";
    document.getElementById("busRoute").value="";
    document.getElementById("loc").value="";
    document.getElementById("sdRes").innerHTML="";
    document.getElementById("routeRes").innerHTML="";
    document.getElementById("locRes").innerHTML="";
}

//https://github.com/jayanthbabu123/excel-to-json-by-javascript
//https://www.tutorialspoint.com/from-json-object-to-an-array-in-javascript
//https://stackoverflow.com/questions/5845190/how-to-assign-values-to-multidimensional-arrays-in-javascript
//https://www.geeksforgeeks.org/multidimensional-array-in-javascript/
//https://stackoverflow.com/questions/38827966/how-to-remove-all-the-odd-indexes-eg-a1-a3-value-from-the-array#:~:text=A%20simple%20alternative%20for%20removing,%3D%20aa%5Bidx%5D%3B%20aa.