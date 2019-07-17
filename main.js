var app = new Vue ({
    el: "#app",
    data: {
        product: "Socks",
        brand: "Vue Mastery",
        description: "A nice comfy sock made from wool.",
        selectedVariant: 0,
        altText: "A pair of socks",
        link: "https://www.amazon.com/s?k=socks&ref=nb_sb_noss_1",
        onSale: false,
        details: ["80% cotton", "20% polyester", "Gender neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(this.selectedVariant)
        },
        removeFromCart() {
            this.cart -= 1
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            //we're passing this.selectedVariant is the array index
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        productOnSale() {
            return this.brand + ' ' + this.product + " is now on sale!!!"
        }
        
    }
})