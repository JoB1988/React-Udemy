import AXIOS from 'axios';

let URL = `http://localhost:3000/produtos`;

export default class CadastroService {

    salvar(produto) {
        return AXIOS.post(`${URL}`, produto)
            .then(response => response.status)
            .catch(error => console.log(error))
            .finally()
    }

    update(produto) {
        return AXIOS.put(`${URL}/${produto.id}`, produto)
            .then(response => response.status)
            .catch(error => console.log(error))
            .finally()
    }

    delete(id) {
        return AXIOS.delete(`${URL}/${id}`)
            .then(response => response.status)
            .catch(error => console.log(error))
            .finally()
    }

    getById(id) {
        return AXIOS.get(`${URL}/${id}`)
            .then(response => response.data)
            .catch(error => console.log(error))
            .finally()
    }

    getAll() {
        var headers = [
            { key: 'Content-Type', value: 'application/json' },
            { key: 'Cache-Control', value: 'no-cache' }
        ]
        AXIOS.defaults.headers.common = {}
        return AXIOS.get(URL, { headers })
            .then(response => response.data)
            .catch(error => console.log(error))
            .finally()
    }
}