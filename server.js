var http = require("http");
var url = require("url");
var porta = process.env.PORT || 3000;

function start(router, handlers) {
  http.createServer(function (req, res) {
    var urlParsed = url.parse(req.url, true);
    console.log("Requisição recebida em"+(new Date()), "no caminho ", urlParsed.pathname);
    router.route(urlParsed.pathname, handlers, req, res);
}).listen(porta);
console.log("Servidor rodando em http://localhost:3000");
}

module.exports.start = start;
