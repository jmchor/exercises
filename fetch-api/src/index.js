// index.js
/*
fetch("https://api.spacexdata.com/v4/launches") //fetches a data response from the URL using the API, delivering the requested item as a Promise
  .then((response) => { //using the then() method the returned Promise is handled

    return response.json(); //using the json() method to parse the response as JSON, which in turn returns a Promise
  })
  .then((data) => { //the Promise is handled using the then() method, which receives the parsed JSON data as the "data" parameter
    console.log("Parsed response: ", data);
  })
  .catch( (err) => console.log(err));
*/


  // index.js

fetch("https://api.spacexdata.com/v4/launches")
.then((response) => response.json())
.then((data) => {

data.forEach((launchObj) => {
    console.log (launchObj)
  const patchImage = launchObj.links.patch.small;
  const imgElement = document.createElement("img");

  imgElement.setAttribute("src", patchImage);
  imgElement.setAttribute("width", 200);
  document.body.appendChild(imgElement);
});

}).catch((err) => console.log(err));

