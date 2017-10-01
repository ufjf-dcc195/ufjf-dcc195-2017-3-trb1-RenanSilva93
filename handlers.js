var varA = require("querystring");
var varB = require("querystring");
var varC = require("querystring");

var lin = require("querystring");
var col = require("querystring");

var url = require("url");

function index(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<a href='/index.html'>INDEX</a> <br>");
  res.write("<a href='/sobre.html'>SOBRE</a> <br>");
  res.write("<a href='/aleatorios.html'>ALEATORIOS</a> <br>");
  res.write("<a href='/primos.html'>PRIMOS</a> <br>");
  res.write("<a href='/equacao.html'>EQUACAO</a> <br>");
  res.write("<a href='/xadrez.html'>XADREZ</a><br>");
  res.write("<a href='/xadrez.json'>XADREZ JSON</a><br>");
  res.end();
}

function sobre(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<p> Nome: Renan Costa da Silva </p>");
  res.write("<p> Matricula: 201276048 </p>");
  res.write("<p> E-mail: renan.costas@hotmail.com </p>");
  res.write("<p> Curso: Sistemas de Informacao </p>");
  res.write("<a href='/index.html'>INDEX</a> <br>");
  res.end();
  
}

function aleatorios(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  var i = 0, j = 0, total = 0;
  var pares = [];
  var impares = [];
  while (total < 100) {
	  var rand = Math.floor(Math.random() * 100);
	  if (rand % 2 == 0) { //par
		if (i < 50) {
		  pares[i++] = rand;		  
		}		  
	  } else {
		  if (j < 50) {
			impares[j++] = rand;
		  }
	  }
	  total++;
  }

	res.write("<p> Pares: </p>");
	res.write("<ul>");
	for(var k=0; k<pares.length; k++) {
		res.write("<li>"+ pares[k] +"</li>");
	}
	res.write("</ul>");
  
	res.write("<p> Impares: </p>");
	res.write("<ul>");
	for(var h=0; h<impares.length; h++) {
		res.write("<li>"+ impares[h] +"</li>");
	}
	res.write("</ul>");
	
	res.write("<a href='/index.html'>INDEX</a> <br>");

  res.end();
}

function primos(req, res) {
	if(req.method == "GET"){
    res.writeHead(200, {"Content-Type": "text/html"});
	res.write("Passa os parametros pela url usando: n1 e n2<br><br>");
	var query = url.parse(req.url, true).query;
	
	if(query.n1 < query.n2 && query.n1 < 100 && query.n2 < 100) {
		var num1 = query.n1;
		var num2 = query.n2;
		var flag = 0;
		while(num1 < num2) {
			for(var i=2; i< num1; i++) {
				if(num1 % i == 0) {
					flag = 1;
				}
			}
			
			if(num1 == 2) {
				flag = 0;
			}
			
			if(flag == 0 || num1 == 1) {
				res.write(num1+" ");
			}
			num1++;
			flag = 0;
		}
	
	} else {
		res.write("Numeros invalidos");
	}
	
	res.write("<a href='/index.html'>INDEX</a> <br>");
	res.end();
	}
	
}

function equacao(req, res) {
	if(req.method == "GET"){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1>Passe os parametros de acordo com uma funcao de segundo grau: ax^2+bx+c = 0</h1>");
    res.write("<form method=post>");
	res.write("A: ");
    res.write("<input type=number name=valorA required /><br><br>");
	res.write("B: ");
	res.write("<input type=number name=valorB required /><br><br>");
	res.write("C: ");
	res.write("<input type=number name=valorC required /><br><br>");
    res.write("<input type=submit />");
    res.write("</form>");
	res.write("<a href='/index.html'>INDEX</a> <br>");
	res.end(); 
	} else {
    var body = '';
    req.on('data', function( data) {
      body += data;
    });
    req.on('end', function() {
      var a = varA.parse(body);
	  var b = varB.parse(body);
	  var c = varC.parse(body);
      res.writeHead(200, {"Content-Type": "text/html"});
	  
		  var delta = Math.pow(b.valorB , 2) - ((4 * a.valorA)*c.valorC);
		  
		  if( delta > 0){
			var deltaR = Math.sqrt(delta);
			var  x1 = ((-b.valorB +  deltaR)  /(2 * a.valorA));
			var  x2 = ((-b.valorB -  deltaR)  /(2 * a.valorA));
		  }else{
			var x1 = ("Sem raiz");
			var x2 = ("Sem raiz");
		  }
		  
		  res.write("Raiz: "+x1);
		  res.write("<br>")
		  res.write("Raiz: "+x2);
		  
		  
	  res.write("<a href='/index.html'>INDEX</a> <br>");
      res.end();
    })

  }
}

function desenhaTabuleiro(matriz, res) {
	res.write("<style type='text/css'>  #branca {width:70px; height:70px;  border: 2px solid;}  </style>");
	res.write("<style type='text/css'>  #preta {width:70px; height:70px;  border: 2px solid; background-color: #000000; color: #FFFFFF;}  </style>");
	
	for (var i=0; i<8; i++){
			res.write("<table>");
			res.write("<tr>");		
		for (var j=0; j<8; j++){
			
			res.write("<td>");
			
			if(matriz[i][j] == 0) {
				if(i%2 == 0) { //linhas pares
					if(j%2 == 0) { //colunas pares
						res.write("<div id='branca'></div>");
					} else {
						res.write("<div id='preta'></div>");
					}
				} else {
					if(j%2 == 0) {
						res.write("<div id='preta'></div>");
					} else {
						res.write("<div id='branca'></div>");
					}	
				}
			} else if(matriz[i][j] == 1) { //cavalo
				if(i%2 == 0) { //linhas pares
					if(j%2 == 0) { //colunas pares
						res.write("<div id='branca'>CAVALO</div>");
					} else {
						res.write("<div id='preta'>CAVALO</div>");
					}
				} else {
					if(j%2 == 0) {
						res.write("<div id='preta'>CAVALO</div>");
					} else {
						res.write("<div id='branca'>CAVALO</div>");
					}	
				}
			} else if(matriz[i][j] == 2) { //casa que pode ir
				if(i%2 == 0) { //linhas pares
					if(j%2 == 0) { //colunas pares
						res.write("<div id='branca'>X</div>");
					} else {
						res.write("<div id='preta'>X</div>");
					}
				} else {
					if(j%2 == 0) {
						res.write("<div id='preta'>X</div>");
					} else {
						res.write("<div id='branca'>X</div>");
					}	
				}
			}

			res.write("</td>");
		}
			res.write("</tr>");
			res.write("</table>");
			
	}
}

function xadrez(req, res) {
	if(req.method == "GET"){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<form method=post>");
	res.write("Linha: ");
    res.write("<input type=number name=linha required /><br><br>");
	res.write("Coluna: ");
	res.write("<input type=number name=coluna required /><br><br>");
    res.write("<input type=submit />");
    res.write("</form>");
	res.write("<a href='/index.html'>INDEX</a> <br>");
	
	var matriz = [];
	for(var i=0; i<8; i++) {
		matriz[i] = [];
		
		for(var j=0; j<8; j++) {
			matriz[i][j] = 0;
		}
	}
	
	desenhaTabuleiro(matriz, res);
	res.end();
	
	} else {
    var body = '';
    req.on('data', function( data) {
      body += data;
    });
    req.on('end', function() {
      var l = lin.parse(body);
	  var c = col.parse(body);
	  
	  var line = parseInt(l.linha, 10);
	  var column = parseInt(c.coluna, 10);
	  
	  var matriz = [];
		for(var i=0; i<8; i++) {
			matriz[i] = [];
			
			for(var j=0; j<8; j++) {
				
				if (i == line-2 && j == column-1) {
				  matriz[line-2][column-1] = 2;
				  
			  } else if(i == line-2 && j == column+1) {
				  matriz[line-2][column+1] = 2;
				  
			  } else if(i == line-1 && j == column-2) {
				  matriz[line-1][column-2] = 2;
				  
			  } else if(i == line-1 && j == column+2) {
				  matriz[line-1][column+2] = 2;
				  
			  } else if(i == line+1 && j == column-2) {
				  matriz[line+1][column-2] = 2;
				  
			  } else if(i == line+1 && j == column+2) {
				  matriz[line+1][column+2] = 2;
				  
			  } else if(i == line+2 && j == column-1) {
				  matriz[line+2][column-1] = 2;
				  
			  } else if(i == line+2 && j == column+1) {
				  matriz[line+2][column+1] = 2;
			  } else if(i == line && j == column) {
				matriz[i][j] = 1;
			  } else {
				  matriz[i][j] = 0;
			  }
			}
		}
	  res.writeHead(200, {"Content-Type": "text/html"});
	  res.write("<a href='/index.html'>INDEX</a> <br>");
	  desenhaTabuleiro(matriz, res);
	  res.end();
    })

  }
}

function xadrezJson(req, res, next) { 
  if(req.method == "GET"){ 
    res.writeHead(200, {"Content-Type": "text/html"}); 
    res.write("<form method=post>"); 
    res.write("Linha: "); 
    res.write("<input type=number name=linha required /><br><br>"); 
    res.write("Coluna: "); 
    res.write("<input type=number name=coluna required /><br><br>"); 
    res.write("<input type=submit />"); 
    res.write("</form>");
	res.write("<a href='/index.html'>INDEX</a> <br>");
	
	var matriz = [];
	for(var i=0; i<8; i++) {
		matriz[i] = [];
		
		for(var j=0; j<8; j++) {
			matriz[i][j] = 0;
		}
	}

	desenhaTabuleiro(matriz, res);
    res.end(); 
 
    } else { 
    var body = ''; 
    req.on('data', function( data) { 
      body += data; 
    }); 
    req.on('end', function() { 
        var l = lin.parse(body); 
        var c = col.parse(body); 
 
        var line = parseInt(l.linha, 10); 
        var column = parseInt(c.coluna, 10);
 
        var json = { 
          Cavalo: line+","+column, 
          casa1: (line-2 > 0 && line-2 < 8 && column-1 > 0 && column-1 < 8) ? (line-2)+":"+(column-1): 0, 
          casa2: (line-2 > 0 && line-2 < 8 && column+1 > 0 && column+1 < 8) ? (line-2)+":"+(column+1): 0, 
          casa3: (line-1 > 0 && line-1 < 8 && column-2 > 0 && column-2 < 8) ? (line-1)+":"+(column-2): 0, 
          casa4: (line-1 > 0 && line-1 < 8 && column+2 > 0 && column+2 < 8) ? (line-1)+":"+(column+2): 0, 
          casa5: (line+1 > 0 && line+1 < 8 && column-2 > 0 && column-2 < 8) ? (line+1)+":"+(column-2): 0, 
          casa6: (line+1 > 0 && line+1 < 8 && column+2 > 0 && column+2 < 8) ? (line+1)+":"+(column+2): 0, 
          casa7: (line+2 > 0 && line+2 < 8 && column-1 > 0 && column-1 < 8) ? (line+2)+":"+(column-1): 0, 
          casa8: (line+2 > 0 && line+2 < 8 && column+1 > 0 && column+1 < 8) ? (line+2)+":"+(column+1): 0 
        } 
 
      res.setHeader('Content-Type', 'application/json');	  
      res.end(JSON.stringify(json)); 
 
    }) 
  } 
}

function naoEncontrado(req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("Página não encontrada!");
  res.end();
}

exports.index = index;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;
exports.equacao = equacao;
exports.xadrez = xadrez;
exports.xadrezJson = xadrezJson;
exports.naoEncontrado = naoEncontrado;