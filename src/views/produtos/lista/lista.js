import React from "react";
import ProdutoService from "../produto.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./lista.scss";
import { withRouter } from "react-router-dom";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

class ListaProduto extends React.Component {

  constructor() {
    super();
    this.produtoService = new ProdutoService();
  }

  state = {
    produtos: []
  };

  componentDidMount() {
    this.produtoService.getAll().then(
      response => {
        if (response) {
          this.setState({ produtos: response });
        } else {
          this.setState({ produtos: [] });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  edit = id => {
    // enviando o id pela rota
    this.props.history.push(`/cadastro-produto/${id}`);
  };

  delete = id => {
    this.produtoService.delete(id).then(
      response => {
        this.updateArray(id);
      },
      error => {
        console.log(error);
      }
    );
  };

  updateArray = id => {
    // retorna um novo array com excessão do deletado
    this.setState({
      produtos: this.state.produtos.filter(produto => produto.id !== id)
    });
  };

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">nome</th>
            <th scope="col">sku</th>
            <th scope="col">descrição</th>
            <th scope="col">preço</th>
            <th scope="col">fornecedor</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {this.state.produtos.map((produto, index) => {
            return (
              <tr key={index} className="table-dark">
                <th scope="row">{produto.name}</th>
                <td>{produto.sku}</td>
                <td>{produto.desc}</td>
                <td>{produto.price}</td>
                <td>{produto.provider}</td>
                <td>
                  <button
                    className="editButton"
                    onClick={() => this.edit(produto.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="deleteButton" 
                    onClick={() => this.delete(produto.id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

// para navegar entre rotas enviando parâmetros, não dá export default clas lá em cima. Tem que ser
// como está em baixo
export default withRouter(ListaProduto);
