//https://restcountries.com/v2/all
//Bhutan
const http='https://restcountries.com/v2/all';
var datalista=document.getElementById("listt"); var contagem=true; var filtro; var filtro2;
for(let i=0; i<7;++i){
let botaofiltro=document.querySelectorAll(".filtro1 li")[i]; 
botaofiltro.addEventListener("click",function (){
    contagem=false;
    reListarOpcoesDatalista(botaofiltro.id);
})}
var telaPrincipal=document.getElementById("lista1");
var telaFavorite=document.getElementById("lista2");
var envio=document.getElementById("enviar");
var procura=document.getElementById("procura"); 
envio.addEventListener("click", function(){
    let procura=document.getElementById("procura").value.toLowerCase();
    let paisProcura= repositoriosPaisesPrincipal.findIndex(x=> x.Nome == procura); 
    if(paisProcura >= 0){
    window.location.href=`#${paisProcura}`;}else{
        let paisProcura= repositoriosPaisesPrincipal.findIndex(x=> x.TraducaoNome.toLowerCase() == procura);
        window.location.href=`#${paisProcura}`;
    }
});
var PopulacaoMudial=document.getElementById("PopulacaoMudial");
var TotaldePaises=document.getElementById("TotaldePaises"); var TotaldePaisesTT=0; var PopulacaoMudialTT=0;
var PopulacaoFAVORITEM=document.getElementById("PopulacaoFAVORITEM");var PopulacaoFAVORITEMNN=0;
var TotaldePaisesFAVORITEM=document.getElementById("TotaldePaisesFAVORITEM");var TotaldePaisesFAVORITEMMM=0;
const repositoriosPaisesPrincipal=[]; 
const repositoriosPaisesFavoritos=[];
var y="Todos";
paiss(http);

function paiss(http){
    fetch(http).then(res => res.json()).then(pais=>{
        pais.forEach(elementoPais => {
            let paises=new Object();
            paises.Nome= elementoPais.name;
            paises.NomeNativo=elementoPais.nativeName;
            paises.TraducaoNome=elementoPais.translations.pt;
            paises.linguagens=elementoPais.languages[0].name;
            paises.sigla3= elementoPais.alpha3Code;
            paises.sigla2= elementoPais.alpha2Code;
            paises.capital= elementoPais.capital;
            paises.regiao= elementoPais.region;
            paises.populacao= elementoPais.population;
            paises.bandeira=elementoPais.flags.png;
            paises.id=repositoriosPaisesPrincipal.length;
            repositoriosPaisesPrincipal.push(paises);
           
            PopulacaoMudialTT+=paises.populacao;
    TotaldePaisesTT+=1;
   
        });
        PopulacaoMudial.innerHTML=PopulacaoMudialTT;
TotaldePaises.innerHTML=TotaldePaisesTT;
        listtt(repositoriosPaisesPrincipal);
        Modelar(repositoriosPaisesPrincipal);
    });}
    function reListarOpcoesDatalista(botaofiltro){
        y=botaofiltro; if(botaofiltro == "Todos"){filtro=repositoriosPaisesPrincipal; filtro2=repositoriosPaisesFavoritos;}else{
         filtro=repositoriosPaisesPrincipal.filter(x=> x.regiao == botaofiltro); filtro2=repositoriosPaisesFavoritos.filter(x=> x.regiao == botaofiltro);}
         Modelar(filtro);
        listtt(filtro);
        if(repositoriosPaisesFavoritos.length != 0){ModelarFavoritosComFiltro(filtro2);}
    }
    function listtt(x){
        if(!contagem){ datalista.innerHTML="";  }
        for(let i=0; i< x.length;++i){
            let option=document.createElement('option');
            option.value=`${x[i].Nome}`;
            option.innerHTML=`${x[i].sigla},${x[i].linguagens},${x[i].TraducaoNome},${x[i].regiao}`;
            datalista.appendChild(option);}
    }
    function Modelar(x){
        telaPrincipal.innerHTML=`<ul id="telaPrincipal"><li>Bandeira</li><li>Nome</li><li>População</li><button type="button" id="enfeite"></button> </ul>`;for(let i=0; i<x.length;++i){
    let listet=document.createElement("ul");
    listet.className="telaSuaLista2";
    listet.id=x[i].id;
    listet.innerHTML=` <li><img class="conteiIMG" src="${x[i].bandeira}"></li>
    <li>${x[i].Nome}</li>
    <li>${x[i].populacao}</li>
    `;
    telaPrincipal.appendChild(listet);
    let buttonAD=document.createElement("button");
    buttonAD.className="retirarFav";
    buttonAD.id=x[i].id;
    buttonAD.value=x[i].id;
    buttonAD.innerHTML="+"
    listet.appendChild(buttonAD);
    buttonAD.addEventListener("click", function(){adicionar(buttonAD)});
    
} 
    }
    function ModelarFavoritos(){
        telaFavorite.innerHTML=`<ul id="telaPrincipal"><li>Bandeira</li><li>Nome</li><li>População</li><button type="button" id="enfeite"></button> </ul>`;for(let i=0; i<repositoriosPaisesFavoritos.length;++i){
    let listet=document.createElement("ul");
    listet.className="telaSuaLista2";
    listet.id=repositoriosPaisesFavoritos[i].id;
    listet.innerHTML=` <li><img class="conteiIMG" src="${repositoriosPaisesFavoritos[i].bandeira}"></li>
    <li>${repositoriosPaisesFavoritos[i].Nome}</li>
    <li>${repositoriosPaisesFavoritos[i].populacao}</li>
    `;
    telaFavorite.appendChild(listet);
    let buttonREF=document.createElement("button");
    buttonREF.className="retirarFav";
    buttonREF.style.backgroundColor="red";
    buttonREF.id=repositoriosPaisesFavoritos[i].id;
    buttonREF.value=repositoriosPaisesFavoritos[i].id;
    buttonREF.innerHTML="-";
    listet.appendChild(buttonREF);
    buttonREF.addEventListener("click", function(){retirarF(buttonREF)});
}
    }
    function ModelarFavoritosComFiltro(x){
        telaFavorite.innerHTML=`<ul id="telaPrincipal"><li>Bandeira</li><li>Nome</li><li>População</li><button type="button" id="enfeite"></button> </ul>`;for(let i=0; i<x.length;++i){
    let listet=document.createElement("ul");
    listet.className="telaSuaLista2";
    listet.id=x[i].id;
    listet.innerHTML=` <li><img class="conteiIMG" src="${x[i].bandeira}"></li>
    <li>${x[i].Nome}</li>
    <li>${x[i].populacao}</li>
    `;
    telaFavorite.appendChild(listet);
    let buttonREF=document.createElement("button");
    buttonREF.className="retirarFav";
    buttonREF.style.backgroundColor="red";
    buttonREF.id=x[i].id;
    buttonREF.value=x[i].id;
    buttonREF.innerHTML="-";
    listet.appendChild(buttonREF);
    buttonREF.addEventListener("click", function(){retirarF(buttonREF)});
}
    }
    function adicionar(buttonAD){
        let id=buttonAD.id;
        let filtroAtual=y;
        let iddd= repositoriosPaisesPrincipal.findIndex(x=> x.id == id);
        let paiis=repositoriosPaisesPrincipal[iddd];
        PopulacaoFAVORITEMNN+=paiis.populacao;
        TotaldePaisesFAVORITEMMM+=1;
        PopulacaoFAVORITEM.innerHTML=PopulacaoFAVORITEMNN;
        TotaldePaisesFAVORITEM.innerHTML=TotaldePaisesFAVORITEMMM;

        PopulacaoMudialTT-=paiis.populacao;
        TotaldePaisesTT-=1;
        PopulacaoMudial.innerHTML=PopulacaoMudialTT;
        TotaldePaises.innerHTML=TotaldePaisesTT;
        repositoriosPaisesPrincipal.splice(iddd,1);
         repositoriosPaisesFavoritos.push(paiis);
         reListarOpcoesDatalista(filtroAtual);
         ModelarFavoritos();
         
    }
    function retirarF(buttonREF){
        let id=buttonREF.id;
        let filtroAtual=y;
        let iddd= repositoriosPaisesFavoritos.findIndex(x=> x.id == id);
        let paiis=repositoriosPaisesFavoritos[iddd];
        PopulacaoFAVORITEMNN-=paiis.populacao;
        TotaldePaisesFAVORITEMMM-=1;
        PopulacaoFAVORITEM.innerHTML=PopulacaoFAVORITEMNN;
        TotaldePaisesFAVORITEM.innerHTML=TotaldePaisesFAVORITEMMM;
        PopulacaoMudialTT+=paiis.populacao;
        TotaldePaisesTT+=1;
        PopulacaoMudial.innerHTML=PopulacaoMudialTT;
        TotaldePaises.innerHTML=TotaldePaisesTT;
        repositoriosPaisesPrincipal.splice(id,0,paiis);
        repositoriosPaisesFavoritos.splice(iddd,1);
         reoganizar()
         reListarOpcoesDatalista(filtroAtual);
         ModelarFavoritos();
         console.log(id);
    }
function reoganizar(){
    repositoriosPaisesPrincipal.sort(function(a,b){
        return a.id - b.id ;
    });
}
