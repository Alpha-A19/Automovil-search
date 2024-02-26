const btnMenu = document.getElementById("btn-menu");
const listMenu = document.getElementById("listMenu");

fetch('./Js/data.json')
.then(response => {
    return response.json();
})
.then(jsondata => {
    var remplaza = /\+/gi;
    var url = window.location.href;
    
    url = unescape(url);
    url = url.replace(remplaza, " ");
    url = url.toUpperCase();
    
    var valor = obtener_valor("search");
        getData(jsondata, valor);
    }
);


function obtener_valor(variable) {
    var variable_may = variable.toUpperCase();
    var variable_pos = url.indexOf(variable_may);

    if (variable_pos != -1) {
        var pos_separador = url.indexOf("&", variable_pos);

    if (pos_separador != -1) {
        return url.substring(variable_pos + variable_may.length + 1, pos_separador);
    } else {
        return url.substring(variable_pos + variable_may.length + 21, url.length);
    }
    } else {
        return "NO_ENCONTRADO";
    }
}
btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("active");
    listMenu.classList.toggle("active");
})
function getData(data, valor) {
    let result = [];
    
    let stringSet = valor;
    stringSet = stringSet.toLowerCase();
    for (let i = 0; i < data[0].cars.length; i++) {
        let string = data[0].cars[i].brand.toLowerCase();
        let brandUp = string.split(" ").join("");

        let nanmelg = data[0].cars[i].brand.trim().toLowerCase() + data[0].cars[i].model.trim().toLowerCase();
        let brandYear = data[0].cars[i].brand.trim().toLowerCase() + data[0].cars[i].year;
        
        let nanmelgYe = nanmelg + data[0].cars[i].year;
    
        let yearSh = data[0].cars[i].year + "";

        // Solo marca
        if(brandUp.includes(stringSet)){
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img); 
            result.push(car);

        // Marca y año
        } else if(brandYear.includes(stringSet)){
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img);
            result.push(car);
            
        // Solo modelo
        } else if (data[0].cars[i].model.trim().toLowerCase().includes(stringSet)) {
            console.log(data[0].cars[i].img);
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img);
            result.push(car);
        
        // Marca y modelo
        } else if(nanmelg.trim().includes(stringSet)) {
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img);
            result.push(car);
        
        // Solo año
        } else if (yearSh.includes(stringSet)) {
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img);
            result.push(car);
        
        // Marca modelo y año
        } else if(nanmelgYe.trim().includes(stringSet)) {
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img);
            result.push(car);
        
        //Cilindrada
        } else if (data[0].cars[i].displacement.trim().toLowerCase().includes(stringSet)) {
            let car = new carIn(data[0].cars[i].brand, data[0].cars[i].model, data[0].cars[i].displacement, data[0].cars[i].year, data[0].cars[i].img);
            result.push(car);
        }
    }

    document.getElementById("wrapper").innerHTML = ""
    
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            let a = document.createElement("a");
            a.id = "a-result-search-" + i
            
            let div = document.createElement("div");
            div.id = "cont-result-search-" + i
            
            let DivchA = document.createElement("div");
            let DivchB = document.createElement("div");
            DivchA.id = "chA-result-search-" + i
            
            let imgLogo = document.createElement("img");
            let str = result[i].Img;
            let newStr = str.slice(2);
            imgLogo.src = "https://alpha-a19.github.io/Automovil-search" + newStr;
            console.log(imgLogo.src);
            
            DivchB.id = "chB-result-search-" + i
            let texA = document.createElement("h2");
            let texB = document.createElement("h3");
            texA.innerText = result[i].Brand;
            texB.innerText = result[i].Model + " " + result[i].Displacement + " " + result[i].Year;

            let idA = a.id;
            let idD = div.id; 
            let idDivA = DivchA.id;
            let idDivB = DivchB.id;
            document.getElementById("wrapper").appendChild(a);
            document.getElementById(`${idA}`).appendChild(div);
            document.getElementById(`${idD}`).appendChild(DivchA);
            document.getElementById(`${idD}`).appendChild(DivchB);
            document.getElementById(`${idDivA}`).appendChild(imgLogo);
            document.getElementById(`${idDivB}`).appendChild(texA);
            document.getElementById(`${idDivB}`).appendChild(texB);

        
        }
    }
}

function carIn(brand, model, displacement, year, img) {
    this.Brand = brand;
    this.Model = model;
    this.Displacement = displacement;
    this.Year = year;
    this.Img = img;
}
