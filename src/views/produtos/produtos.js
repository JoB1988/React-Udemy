import React from 'react';
import './produtos.scss';
import ProdutoService from './produtos.service';

const initialState = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: ''
}

export default class CadastroProduto extends React.Component {

    constructor() {
        super();
        this.nameInput = React.createRef();
        this.produtoService = new ProdutoService();
    }

    state = initialState;

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    _resetForm = () => {
        this.setState(initialState);
        this.nameInput.current.focus();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this._resetForm();
        this.produtoService.salvar(this.state);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">Cadastro de Produtos</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Nome:</label>
                                <input type='text' className='form-control' name='nome' ref={this.nameInput} value={this.state.nome} onChange={event => this.onChange(event)} autoFocus></input>
                            </div>
                            <div className='col-md-6'>
                                <label>SKU:</label>
                                <input type='text' className='form-control' name='sku' value={this.state.sku} onChange={event => this.onChange(event)}></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Descrição:</label>
                                <textarea className='form-control' name='descricao' value={this.state.descricao} onChange={event => this.onChange(event)}></textarea>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Preço:</label>
                                <input type='text' className='form-control' name='preco' value={this.state.preco} onChange={event => this.onChange(event)}></input>
                            </div>
                            <div className='col-md-6'>
                                <label>Fornecedor:</label>
                                <input type='text' className='form-control' name='fornecedor' value={this.state.fornecedor} onChange={event => this.onChange(event)}></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-1'>
                                <button className='btn btn-primary' type='reset' onClick={this._resetForm}>Limpar</button>
                            </div>
                            <div className='col-md-1'>
                                <button className='btn btn-success' type='submit'>Salvar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
