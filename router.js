function route(pathname, handlers, req, res) {
  console.log("Roteando: ", pathname);
  if (handlers[pathname]) {
    handlers[pathname](req, res);
  } else {
    console.log("Requisicao invalida em ", pathname);
    handlers["/notfound"](req, res);
  }
}

exports.route = route;
