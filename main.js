var app = new Vue ({
    el: "#app",
    data: {
        product: "Socks",
        description: "A nice comfy sock made from wool.",
        image: "./vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s?k=socks&ref=nb_sb_noss_1",
        inStock: false,
        inventory: 0,
        onSale: false,
        details: ["80% cotton", "20% polyester", "Gender neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './vmSocks-blue-onWhite.jpg'
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            this.cart -= 1
        }
    }
})