Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: 
        `

        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>

        `
})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class='product-image'>
                <!-- vue data binding -->
                <img v-bind:src="image" v-bind:alt="altText" />
            </div>
            <div class='product-info'>
                <span v-if="onSale == true">{{productOnSale}}</span>
                <h1>{{title}}</h1>
                <h2>{{description}}</h2>
                <!-- <p v-if='inStock'>In Stock</p>
                        <p v-else='inStock'>Out of Stock</p> -->
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{shipping}}</p>



                <!-- v-for loops through the array to render its data -->
                <product-details :details ='details'></product-details>

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class='color-box'
                    :style="{backgroundColor: variant.variantColor}"
                    @mouseover='updateProduct(index)'>
                </div>
                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>
                <a :href="link">More products like this</a>

                <div class='cart'>
                    <p>Cart({{cart}})</p>
                </div>
                <button v-on:click="addToCart"
                    :disabled='!inStock'
                    :class="{disabledButton: !inStock}">Add to cart</button>
                <button 
                v-if="cart >= 1"
                v-on:click='removeFromCart'>Remove From Cart</button>
            </div>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description: "A nice comfy sock made from wool.",
            details: ["80% cotton", "20% polyester", "Gender neutral"],
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s?k=socks&ref=nb_sb_noss_1",
            onSale: false,
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
        }
    } ,
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
        },
        shipping() {
            if(this.premium) {
                return "Free"
            } else {
                return "$2.99"
            }
        }
        
    }
})


var app = new Vue ({
    el: "#app",
    data: {
        premium: true
    }
})