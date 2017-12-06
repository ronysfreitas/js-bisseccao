var E = 2.718281828459045235360287;
var PI = 3.14159265359;
var casas = 6;

function POW(x, y){
    var n = x;
    for(i = 1; i < y; ++i){
        n *= x;  
    }
    return n;
}

function LOG(x, base){
    return Math.log(x) / Math.log(base);
}

function LN(x){
    return LOG(x, E);
}

function roundValue(value){
    return parseFloat(value.toFixed(casas));
}

function exeExpressao(expressao, X){
    return eval(expressao.trim().toUpperCase());
}

var result = document.getElementById('result');
var resultTxt = document.getElementById('resultTxt');

document.getElementById("limpar").addEventListener('click', function(){
    result.innerHTML = "";
    resultTxt.innerHTML = "";
});


document.getElementById("calcular").addEventListener('click', function(){

    var type = document.getElementsByName("type");

    casas = parseInt(document.getElementById("casas").value);
    
    var expressao = document.getElementById("expressao").value;

    var xA = parseFloat(document.getElementById("a").value);
    var xB = parseFloat(document.getElementById("b").value);

    var precisao = parseFloat(document.getElementById("precisao").value);

    var fxReal = parseInt(document.getElementById("fxReal").value);

    var execucao = 1;
    var maiorErro = true;

    result.innerHTML = "";

    var resultado = "";

    do {
            var fXA = roundValue(exeExpressao(expressao, xA));
            var fXB = roundValue(exeExpressao(expressao, xB));

            if(type[0].checked == true){
                // Bissecção
                var xN = roundValue((xB + xA) / 2);
            } else{
                // Falsa Posição
                var xN = roundValue((xA*fXB - xB*fXA) / (fXB - fXA));
            }

            var fXN = roundValue(exeExpressao(expressao, xN));

            if(type[0].checked == true){
                // Bissecção
                if(fXN == fxReal || (xB - xA) < precisao){
                    maiorErro = false;
                    resultado = "<hr/><p><strong>" +
                                "Resultado: " + xN + "<br/>" +
                                "Erro: " + (xB - xA) + "<br/>" +
                                "Iterações: " + execucao + "<br/>" +
                                "</strong></p>";
    
                    resultTxt.innerHTML = resultado;
                }
            } else{
                // Falsa Posição
                if(fXN == fxReal || Math.abs(fXN) < precisao){
                    maiorErro = false;
                    resultado = "<hr/><p><strong>" +
                                "Resultado: " + xN + "<br/>" +
                                "Erro: " + (xB - xA) + "<br/>" +
                                "Iterações: " + execucao + "<br/>" +
                                "</strong></p>";
    
                    resultTxt.innerHTML = resultado;
                }
            }
        
            var linha = "<tr><td>" + execucao + "</td><td>" +
                    xA + "</td><td>" + 
                    fXA + "</td><td>" +
                    xB + "</td><td>" + 
                    fXB + "</td><td>" + 
                    xN + "</td><td>" +
                    fXN + "</td><td>" + 
                    roundValue((xB - xA)) + "</td></tr>";

            result.innerHTML += linha;
        
            xA = ((fXA > fxReal && fXN > fxReal) || (fXA < fxReal && fXN < fxReal)) ? xN : xA;
            xB = ((fXB > fxReal && fXN > fxReal) || (fXB < fxReal && fXN < fxReal)) ? xN : xB;  
            
            execucao++;
        
        } while(maiorErro);

});