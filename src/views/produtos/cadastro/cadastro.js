import React from "react";
import "./cadastro.scss";
import ProdutoService from "../produto.service";
import { Produto } from "../cadastro.model";
import Toast from "../../../components/toast";

const IS = {
  form: {
    name: {
      value: "",
      errorValue: "",
      regex: new RegExp("^[a-zA-ZÀ-Úà-ú ]*$"),
      MinLength: 3
    },
    sku: { value: "", errorValue: "", MinLength: 0 },
    description: { value: "", errorValue: "", MinLength: 0 },
    price: {
      value: 0,
      errorValue: "",
      regex: new RegExp("^[0-9]*$"),
      MinLength: 0
    },
    provider: { value: "", errorValue: "", MinLength: 0 }
  },
  id: undefined,
  chosedMethod: "salvar",
  pageTitle: "Cadastro de Produto",
  toastTitle: "",
  toastMessage: ""
};

export default class CadastroProduto extends React.Component {
  constructor() {
    super();
    // cria uma referencia do input
    this.nameInput = React.createRef();
    this.produtoService = new ProdutoService();
  }

  componentDidMount() {
    const ID = this.props.match.params.id;
    if (ID) {
      this.produtoService.getById(ID).then(
        response => {
          let newForm = this.state.form;
          newForm.description.value = response.desc;
          newForm.name.value = response.name;
          newForm.sku.value = response.sku;
          newForm.price.value = response.price;
          newForm.provider.value = response.provider;
          this.setState({
            form: newForm,
            chosedMethod: "update",
            id: response.id,
            pageTitle: "Atualização de Produto"
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  // estado inicial da aplicação
  state = IS;

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
    let newForm = this.state.form;
    Object.keys(this.state.form).forEach(attribute => {
      newForm[attribute] = {
        value: "",
        errorValue: "",
        regex: this.state.form[attribute].regex,
        MinLength: this.state.form[attribute].MinLength
      };
    });

    this.setState({
      form: newForm,
      chosedMethod: "salvar",
      id: undefined,
      pageTitle: "Cadastro de Produto"
    });
    this.nameInput.current.focus();
  };

  // método invocado ao dar submit
  onSubmit = event => {
    event.preventDefault();
    if (!this._validation()) {
      const cadastro = new Produto(
        this.state.form.name.value,
        this.state.form.sku.value,
        this.state.form.description.value,
        this.state.form.price.value,
        this.state.form.provider.value,
        this.state.id
      );
      this._resetForm();
      this.produtoService[this.state.chosedMethod](cadastro).then(response => {
        this.setState({
          toastTitle: "Sucesso",
          toastMessage: "Salvo com sucesso"
        });
      });
    }
  };

  // verifica se há erros no form, o metodo abaixo faz um foreach no objeto
  _validation = () => {
    let isThereError = false;
    let newForm = this.state.form;
    Object.keys(this.state.form).forEach(attribute => {
      let error = "";
      if (
        this.state.form[attribute].value.length <
        this.state.form[attribute].MinLength
      ) {
        error = `deve possuir ao menos 3 caracteres`;
        isThereError = true;
      }
      if (!this.state.form[attribute].value) {
        error = `não pode estar em branco`;
        isThereError = true;
      }
      if (
        this.state.form[attribute].regex &&
        !this.state.form[attribute].regex.test(this.state.form[attribute].value)
      ) {
        const errorName = `deve possuir apenas letras`;
        const errorNumber = `deve possuir apenas números`;
        attribute === "name" ? (error = errorName) : (error = errorNumber);
        isThereError = true;
      }
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
        o campo {this._translator(value)} {this.state.form[value].errorValue}
      </span>
    ) : (
      <span className="row-error"></span>
    );
  };

  // traduz a variável
  _translator = value => {
    let meaning = "";
    switch (value) {
      case "name":
        meaning = "nome";
        break;
      case "description":
        meaning = "descrição";
        break;
      case "price":
        meaning = "preço";
        break;
      case "provider":
        meaning = "fornecedor";
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
        <div className="card-header">{this.state.pageTitle}</div>
        <div className="card-body">
          {Toast({
            title: this.state.toastTitle,
            message: this.state.toastMessage
          })}
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>nome</label>
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
                <label>sku</label>
                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  disabled={this.state.id}
                  value={this.state.form.sku.value}
                  onChange={event => this.onChange(event)}
                  required
                ></input>
                {this._genericError("sku")}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>descrição</label>
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
                <label>preço</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={this.state.form.price.value || 0}
                  onChange={event => this.onChange(event)}
                  pattern="^[0-9]*$"
                  required
                ></input>
                {this._genericError("price")}
              </div>
              <div className="col-md-6">
                <label>fornecedor</label>
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
