let googleLink = document.getElementById('google-link');

googleLink.setAttribute('href', 'https://www.google.com');
googleLink.setAttribute('target', '_blank');
let body = document.querySelector('body');
let para = document.createElement('p');
let ul = document.getElementById('items-list');


let button = document.getElementById('add-item-button');
let i = 5;
button.onclick = function() {

    i++;

    let li = document.createElement('li');
    let text = document.createTextNode(`Item number ${i}`);

    li.appendChild(text);
    ul.appendChild(li);
    }

let input = document.getElementById('input-field');

    let liTags = document.getElementsByTagName('li');

    // for (let i = 0; i < liTags.length; i++) {
    //     liTags[i].onclick = function(e) {
    //     console.log(e.currentTarget.innerText   );
    //     };
    // }

    function deleteContent(e) {
        return e.currentTarget.remove();
    }

    let ulList = document.querySelectorAll('.list li');
ulList.forEach((li)=> {
    li.addEventListener('click', deleteContent);
})