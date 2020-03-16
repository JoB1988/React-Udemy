import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/home";
import CadastroProduto from "./views/produtos/cadastro/cadastro";
import ListaProduto from "./views/produtos/lista/lista";
import ConsultaProduto from "./views/produtos/consulta/consulta";

export default () => {
  return (
    <Switch>
      {/* exact que dizer que eu quero que seja exatamente essa rota que eu quero que seja aberta */}
      <Route exact path="/" component={Home} />
      {/* forma de passar o parâmetro para essa tela */}
      <Route exact path="/cadastro-produto/:id?" component={CadastroProduto} />
      <Route exact path="/lista-produto" component={ListaProduto} />
      <Route exact path="/consulta-produto" component={ConsultaProduto} />
    </Switch>
  );
};
