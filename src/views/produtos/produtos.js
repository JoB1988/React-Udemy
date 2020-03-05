import React from "react";
import "./produtos.scss";
// import ProdutoService from "./produtos.service";
// import Toast from "../../components/toast";

const initialState = {
  form: {
    name: { value: "", errorValue: "", regex: "[A-zÀ-ús]+", MinLength: 3 },
    sku: { value: "", errorValue: "", regex: "", MinLength: 0 },
    description: { value: "", errorValue: "", regex: "", MinLength: 0 },
    price: { value: 0, errorValue: "", regex: "[A-zÀ-ús]+", MinLength: 0 },
    provider: { value: "", errorValue: "", regex: "", MinLength: 0 }
  }
};

export default class CadastroProduto extends React.Component {
  constructor() {
    super();
    this.nameInput = React.createRef();
    // this.produtoService = new ProdutoService();
  }

  // estado inicial da aplicação
  state = initialState;

  // na troca dos inputs, esse método é invocado e altera o valor do estado
  onChange(event) {
    let attribute = event.target.name;
    this.setState({
      form: {
        ...this.state.form,
        [attribute]: {
          value: event.target.value,
          errorValue: this.state.form[attribute].errorValue,
          regex: this.state.form[attribute].regex,
          MinLength: this.state.form[attribute].MinLength
        }
      }
    });
  }

  // zera o form e foca no primeiro input
  _resetForm = () => {
    this.setState(initialState);
    this.nameInput.current.focus();
  };

  // método invocado ao dar submit
  onSubmit = event => {
    event.preventDefault();
    if (!this._validation()) {
      this._resetForm();
      // this.produtoService.salvar(this.state);
    }
  };

  // verifica se há erros no form
  _validation = () => {
    let isThereError = false;
    let newForm = this.state.form;
    Object.keys(this.state.form).forEach(attribute => {
      let error = "";
      if (!this.state.form[attribute].value) {
        error = `não pode estar em branco`;
        isThereError = true;
      }
      if (
        this.state.form[attribute].value.length <
        this.state.form[attribute].MinLength
      ) {
        error = `deve possuir ao menos 3 caracteres`;
        isThereError = true;
      }
      //   if (attribute.regex && (attribute.pattern !== this.state[attribute].regex)) {
      //     error = `deve possuir apenas letras`;
      //     isThereError = true;
      //   }
      newForm[attribute] = {
        value: this.state.form[attribute].value,
        errorValue: error,
        regex: this.state.form[attribute].regex,
        MinLength: this.state.form[attribute].MinLength
      };
    });
    this.setState({ form: newForm });
    return isThereError;
  };

  // devolve um span com a mensagem de erro após a verificação do form
  _genericError = value => {
    return this.state.form[value].errorValue ? (
      <span className="row-error">
        O campo {this._translator(value)} {this.state.form[value].errorValue}
      </span>
    ) : (
      <></>
    );
  };

  // traduz a variável
  _translator = value => {
    let meaning = "";
    switch (value) {
      case "name":
        meaning = "Nome";
        break;
      case "description":
        meaning = "Descrição";
        break;
      case "price":
        meaning = "Preço";
        break;
      case "provider":
        meaning = "Fornecedor";
        break;
      default:
        meaning = "sku";
    }
    return meaning;
  };

  // #region renderiza a tela (HTML)
  render() {
    return (
      <div className="card">
        <div className="card-header">Cadastro de Produtos</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>nome:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  ref={this.nameInput}
                  value={this.state.form.name.value}
                  onChange={event => this.onChange(event)}
                  minLength="3"
                  pattern="[A-zÀ-ú\s]+"
                  required
                  autoFocus
                ></input>
                {this._genericError("name")}
              </div>
              <div className="col-md-6">
                <label>sku:</label>
                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  value={this.state.form.sku.value}
                  onChange={event => this.onChange(event)}
                  required
                ></input>
                {this._genericError("sku")}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>Descrição:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={this.state.form.description.value}
                  onChange={event => this.onChange(event)}
                  required
                ></textarea>
                {this._genericError("description")}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Preço:</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={this.state.form.price.value}
                  onChange={event => this.onChange(event)}
                  pattern="^[0-9]*$"
                  required
                ></input>
                {this._genericError("price")}
              </div>
              <div className="col-md-6">
                <label>Fornecedor:</label>
                <input
                  type="text"
                  className="form-control"
                  name="provider"
                  value={this.state.form.provider.value}
                  onChange={event => this.onChange(event)}
                  required
                ></input>
                {this._genericError("provider")}
              </div>
            </div>
            <div className="row">
              <div className="col-md-1">
                <button
                  className="btn btn-primary"
                  type="reset"
                  onClick={this._resetForm}
                >
                  Limpar
                </button>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={this.onSubmit}
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  //#endregion
}
