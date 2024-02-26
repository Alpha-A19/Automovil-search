const btnMenu = document.getElementById("btn-menu");
const logoNav = document.getElementById("logo");
const listMenu = document.getElementById("listMenu");
const searchOpp = document.getElementById("search-option");
const contOpp = document.getElementById("cont-opp-pro");
const formSearch = document.getElementById("form-search");
const contentSelectA = document.getElementById("content-select");
const contentSelectB = document.getElementById("content-select-two");
const selectA = document.getElementById("selectA");
const selectB = document.getElementById("selectB");
const searchProOpp = document.getElementById("cont-select-search");
const oppIcon = document.getElementById("oppIcon");

const inputSearchA = document.getElementById("input-search");
const searchInA = document.getElementById("search-in-a");

fetch('./Js/data.json')
.then(response => {
    return response.json();
})
.then(jsondata => {
        inputSearchA.addEventListener("keyup", e => {
            e.preventDefault()
            getData(jsondata, e);
        })
    }
);


$(window).scroll(function(){
    // sticky navbar on scroll script
    if(this.scrollY > 20){
        $('.header').addClass("sticky");
        // $('.menu-btn').addClass("menu-btn-scroll");
        // $('#logo').attr("src", "./Recursos/LOGO-alpha.png");
    }else{
        $('.header').removeClass("sticky");
        // $('.menu-btn').removeClass("menu-btn-scroll");
        // $('#logo').attr("src", "./Recursos/LOGO-alpha-2.png");
    }
});



var time = 0;
btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("active");
    listMenu.classList.toggle("active");
})


function getData(data, e){
    let result = [];
    let string = e.target.value;
    let inputSearch = string.split(" ").join("");
    
    
    for (let i = 0; i < data[0].cars.length; i++) {
        let stringBrand = data[0].cars[i].brand.trim().toLowerCase();
        let brandUp = stringBrand.split(" ").join("");
        let nanmelg = brandUp + data[0].cars[i].model.trim().toLowerCase();
        let brandYear = brandUp + data[0].cars[i].year;
        let nanmelgYe = nanmelg + data[0].cars[i].year;
        let yearSh = data[0].cars[i].year + "";


        // Solo marca
        if(brandUp.includes(inputSearch.trim().toLowerCase())){
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase();
            
        // Marca y año
        } else if(brandYear.includes(inputSearch.trim().toLowerCase())){
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase();
              
        // Solo modelo
        } else if (data[0].cars[i].model.trim().toLowerCase().includes(inputSearch.trim().toLowerCase())) {
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase(); 
        
        // Marca y modelo
        } else if(nanmelg.trim().includes(inputSearch.trim().toLowerCase())) {
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase();
            
        // Solo año
        } else if (yearSh.includes(inputSearch.trim().toLowerCase())) {
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase();  
        
        // Marca modelo y año
        } else if(nanmelgYe.trim().includes(inputSearch.trim().toLowerCase())) {
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase();
            
        //Cilindrada
        } else if (data[0].cars[i].displacement.trim().toLowerCase().includes(inputSearch.trim().toLowerCase())) {
            result.push(data[0].cars[i].brand + " " + data[0].cars[i].model + " " + data[0].cars[i].year);
            searchInA.href = "results.html?search=" + inputSearch.trim().toLowerCase();
        }
    }
    
    document.getElementById("results").innerHTML = ""
    
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            if (i<8) {

                let li = document.createElement("li");
                let id = "li-list-search-" + i
                li.id = id;

                let a = document.createElement("a");

                a.textContent = result[i];
                
                document.getElementById("results").appendChild(li);
                document.getElementById(`${id}`).appendChild(a);
            }
        }
    } else {
        let li = document.createElement("li");
        li.textContent = "No se encontraron resultados para: " + inputSearch;
        document.getElementById("results").appendChild(li);
        searchInA.href = "results.html?search=0";
    }
    if(inputSearch.trim() === "") {
        console.log(result.length);
        result = [];
        document.getElementById("results").textContent = "";
        searchInA.href = "results.html?search=0";
        
        if (!formSearch.querySelector(".active")) {
            formSearch.classList.remove("active");
        }
    }
}

function myF(data) {
    var x = document.getElementById("selectA");
    let collected = [];
    for (let i = 0; i < data[0].cars.length; i++) {
        collected[i] = data[0].cars[i].brand;
    }
    const dataArr = new Set(collected);
    let result = [...dataArr];

    for (let index = 0; index < result.length; index++) {       
        var option = document.createElement("option");
        option.value = result[index];
        option.text = result[index];
        x.add(option);
    }
}

function myM(data) {
    var a = document.getElementById("selectA");
    var x = document.getElementById("selectB");
    x.innerHTML = '<option value="">Modelo: </option>';
    let selectModel = a.value;

    let collected = [];
    let value = [];
    
    for (let i = 0; i < data[0].cars.length; i++) {
        if (selectModel == data[0].cars[i].brand) {
            let modelSelect = data[0].cars[i].model;
            let valueSelect = data[0].cars[i].brand;
            collected.push(modelSelect);
            value.push(valueSelect);
        }
    }
    const dataArr = new Set(collected);
    let result = [...dataArr];
    for (let index = 0; index < result.length; index++) {       
        var option = document.createElement("option");
        option.text = result[index];
        option.value = result[index];
        x.add(option);
    }
} 

formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
     let site = 'Automovil-search/results.html?search=';
     let url = site + inputSearchA.value;
     window.location.replace(url);
})
