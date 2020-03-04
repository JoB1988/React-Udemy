import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './views/home';
import CadastroProduto from './views/produtos/produtos';

export default () => {
    return (
        // HashRouter engloba todas as rotas
        <HashRouter>
            <Switch>
                {/* exact que dizer que eu quero que seja exatamente essa rota que eu quero que seja aberta */}
                <Route exact path='/' component={Home} />
                <Route exact path='/cadastro-produtos' component={CadastroProduto}/>
            </Switch>
        </HashRouter>
    )
}