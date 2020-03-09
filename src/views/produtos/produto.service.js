import AXIOS from 'axios';

export default class CadastroService {

    salvar(produto) {
        AXIOS.defaults.headers.common = {}
        return AXIOS.post('http://localhost:3000/produtos', produto)
            .then(response => response.status)
            .catch(error => console.log(error))
            .finally()
    }

    get() {
        AXIOS.defaults.headers.common = {}
        return AXIOS.get('http://localhost:3000/produtos')
            .then(response => response.data)
            .catch(error => console.log(error))
            .finally()
    }
}