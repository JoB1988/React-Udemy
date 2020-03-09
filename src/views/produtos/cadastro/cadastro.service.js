import AXIOS from 'axios';

export default class CadastroService {

    async salvar(produto) {
        console.log(produto)
        AXIOS.defaults.headers.common = {}
        await AXIOS.post('http://localhost:3000/produtos', produto)
            .then(response => response)
            .catch(error => console.log(error))
            .finally()
    }
}