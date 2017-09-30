var server = require("./server");
var router = require("./router");
var handlers = require("./handlers");

var handlersArray = {};
handlersArray["/"] = handlers.index;
handlersArray["/index.html"] = handlers.index;
handlersArray["/sobre.html"] = handlers.sobre;
handlersArray["/aleatorios.html"] = handlers.aleatorios;
handlersArray["/primos.html"] = handlers.primos;
handlersArray["/equacao.html"] = handlers.equacao;
handlersArray["/xadrez.html"] = handlers.xadrez;
handlersArray["/xadrez.json"] = handlers.xadrezJson;
handlersArray["/notfound"] = handlers.naoEncontrado;

server.start(router, handlersArray);
