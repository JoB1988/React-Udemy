import React from "react";
import ProdutoService from "../produto.service";

export default class ListaProduto extends React.Component {
  constructor() {
    super();
    this.produtoService = new ProdutoService();
  }

  state = {
    produtos: []
  };

  componentDidMount() {
    this.produtoService.get().then(response => {
      this.setState({ produtos: response });
    });
  }

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
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
