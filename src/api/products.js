


const url=  "http://10.70.12.38:4000/products";

 
let jsondata;    

fetch(url).then(
        function(u){ return u.json();}
      ).then(
        function(json){
          jsondata = json;
        }
      )



  export default jsondata;

