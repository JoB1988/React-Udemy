import AXIOS from 'axios';

export default class ProdutoService {

    // constructor() { }

    async salvar(produto) {
        AXIOS.defaults.headers.common = {}
        await AXIOS.post('http://localhost:3000/produtos', produto)
            .then(response => response)
            .catch(error => console.log(error))
            .finally()
    }
}