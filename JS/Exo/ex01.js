function calculPerimeter (width, height){
    console.log((width*2)+(height*2));
};

function calcSurface () {
    let rayon = prompt("Rayon ?:");
    console.log(Math.round((Math.sqrt(rayon)*Math.PI)*100)/100);
};



var a =3;
var b = 2;
function multi(x) {
    return ((x??8)*3);
}

function affiche(){
    alert(multi(a));
    alert(multi(b));
    alert(multi());
}


let tab = [-2,1,4];

function add (x){
    return x+2;
}

/*
function affiche2 (){
    for (let num of tab){
    alert(add(num));
    }
}
*/

function affiche2 (){
    for (let i = 0; i < tab.length; i++) {
        alert(add(tab[i]));
    }
}

let fibo = [1,1,2,3,5,8];

function go(){
    fibo.push(0);
    fibo.unshift(13);
    console.table(fibo);
    let fibo2=fibo.map(Number => Number4);
    console.table(fibo2);
    console.table(fibo2.sort((a,b) => a-b));
}

function boucle (x){
    let ctrl = x??3
    let tab2=[];
    for (let i = 0; i<= ctrl ; i++){
    tab2[i] = Math.round(Math.sqrt(i)*100)/100;
    }
    alert(tab2);
}

function boucle2(){
    let lght = prompt("longueur du tableau ?:");
    boucle(lght);
}

let tab3 = [-2,1,4];
function soustrait(x){
 if (x >=0){
    return x-2;
}else {return "Nombre négatif!";}
}

function affiche3(){
    alert(soustrait(tab3[0]));
    alert(soustrait(tab3[tab3.length-1]));
}

function today() {
    const jours = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
    const date = new Date();
    const numero = date.getDay();
    alert("On est "+jours[numero]);
}

class Rectangle {
    constructor(width, height){
        this.height = height;
        this.width = width;
        this.isValid = (this.height<0||this.width<0)?false:true;
    }

    isBiggerThan(x) {
       return this.perimeter>x.perimeter;
    }

    get perimeter(){
        return 2*(this.height+this.width)
    }
}

class Square extends Rectangle {
    constructor(width){
        super(width);
        this.isValid = (this.height??this.width<0) ? true:false;
    }

    get perimeter(){
       return this.width*4;
    }
}

const r = new Rectangle(10,20);
console.log(r.perimeter);
console.log(r.isValid);
const r2 = new Rectangle(-10,20);
console.log(r2.isValid);
const c = new Square(10);
console.log(c.perimeter);
console.log(r.isBiggerThan(c));


class Book{
    constructor(title, nbPage){
        this.title = title;
        this.nbPage = nbPage;
        this.page = 1;
    }
    
    nextPage(){
        return (this.page < this.nbPage) ? ++this.page : this.close();
    }

    close(){
        return this.page = 1;
    }
}

const bk = new Book('Seigneur des anneaux', 200);
console.log(bk.page);   // 1
bk.nextPage();
console.log(bk.page);   // 2
bk.close();
console.log(bk.page);   // 1

class Library{
    constructor (){
    this.list = [];
    }

    addBook(x){
        this.list.push(x);
    }

    addBooks(books){
        /*
        for (const book of books) {
        this.list.push(book);}*/
        this.list.push(...books);
    }

    findBookByLetter(letter){
        return this.list.filter(book => book.title.includes(letter));
    }
}

const l = new Library();
l.addBook(bk);
l.addBooks([
    new Book('Ready player one', 100),
    new Book('Oui-oui', 10),
    new Book('Sillage', 50)
])
console.table(l);
console.table(l.findBookByLetter('S'));