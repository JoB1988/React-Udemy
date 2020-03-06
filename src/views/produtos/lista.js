import React from "react";

export default class ListaProduto extends React.Component {
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
          <tr className="table-dark">
            <th scope="row">tenis nike</th>
            <td>123457890</td>
            <td>Lindo tenis da Nike</td>
            <td>R$ 599.90</td>
            <td>nike</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
