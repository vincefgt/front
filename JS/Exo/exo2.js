const nouvelleDiv = document.createElement('div');
nouvelleDiv.id= "divTP1";
/*nouvelleDiv.textContent = 'Ceci est une div ajoutée dynamiquement avec JavaScript !';*/
nouvelleDiv.innerHTML = 'Ceci est une div ajoutée <strong>dynamiquement</strong> avec JavaScript ! <a href="https://developer.mozilla.org/fr/docs/Web/API/Document/createElement" title="link" target="_blank">link</a>';
document.body.appendChild(nouvelleDiv);

/** exo2 */
const newDiv = document.createElement('div');
newDiv.id="divTP2";
const newP = document.createElement('p');
 newP.textContent="Langages basés sur ECMAScript :";
 document.body.appendChild(newDiv);
 newDiv.appendChild(newP);
 const newUL = document.createElement("ul");
 var fragment = document.createDocumentFragment();
 var languages = ["JavaScript", "JScript","ActionScript", "EX4"];

 languages.forEach(function(planguage){
    var newLi = document.createElement("li");
    newLi.textContent = planguage;
    fragment.appendChild(newLi);});
 newUL.appendChild(fragment);
 newDiv.appendChild(newUL);

/** Exo3 */
const newDiv2 = document.createElement('div');
   newDiv2.id="divTP3";
const newParagh = document.createElement('p');
   newParagh.textContent="Languages basés sur ECMAScript :";
const newTab = document.createElement('dl');
var fragment2 = document.createDocumentFragment();
var fragment3 = document.createDocumentFragment();
var languages = ["JavaScript", "JScript","ActionScript", "EX4"];
var paratext = ["dfgdsfsdf","hyfhfghfg","hypkmkmk","opfdsg"];
languages.forEach(
   function (planguage2, index){
      var newdt = document.createElement('dt');
         var newdd = document.createElement('dd');
      newdt.textContent = planguage2;
      newdd.textContent = paratext[index]
      fragment2.appendChild(newdt);
      fragment2.appendChild(newdd);
   } 
);
      
document.body.appendChild(newDiv2);
   newDiv2.appendChild(newParagh);
      newDiv2.appendChild(newTab);
         newTab.appendChild(fragment2);
         newTab.appendChild(fragment3);

/** Exo 4 */
const newDiv3 = document.createElement('div');
document.body.appendChild(newDiv3);
const form = document.createElement('form');
newDiv3.appendChild(form);
form.enctype="multipart/form-data";
form.action="upload.php";
form.method="get";
const fieldinput = document.createElement('fieldset');
form.appendChild(fieldinput);
const legend = document.createElement('legend');
legend.textContent="Uploader une image";
fieldinput.appendChild(legend);
const divform =document.createElement('div');
divform.style="text-align: center";
fieldinput.appendChild(divform);
const labeldiv= document.createElement('label');
labeldiv.textContent="Image à uploader :";
labeldiv.for="inputUpload";
divform.appendChild(labeldiv);
const input=document.createElement('input');
input.type="file";
input.name="inputUpload";
input.id="inputUpload";
divform.appendChild(input);
const line = document.createElement('br');
divform.appendChild(line);
const input2=document.createElement('input');
input2.type="submit";
input2.value="Envoyer";
divform.appendChild(input2);