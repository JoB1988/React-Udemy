export class Produto {
    constructor(name, sku, desc, price, provider, id = undefined) {
        this.name = name;
        this.sku = sku;
        this.desc = desc;
        this.price = price;
        this.provider = provider;
        this.id = id
    }
}