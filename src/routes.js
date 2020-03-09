import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './views/home';
import CadastroProduto from './views/produtos/cadastro/cadastro';
import ListaProduto from './views/produtos/lista/lista';
import ConsultaProduto from './views/produtos/consulta/consulta';

export default () => {
    return (
        // HashRouter engloba todas as rotas
        <HashRouter>
            <Switch>
                {/* exact que dizer que eu quero que seja exatamente essa rota que eu quero que seja aberta */}
                <Route exact path='/' component={Home} />
                <Route exact path='/cadastro-produto' component={CadastroProduto}/>
                <Route exact path='/lista-produto' component={ListaProduto}/>
                <Route exact path='/consulta-produto' component={ConsultaProduto}/>
            </Switch>
        </HashRouter>
    )
}