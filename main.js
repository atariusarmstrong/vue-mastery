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

Vue.component('product-review', {
    template:
        `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        
      </p>

      <p>
      <label for="recommendation">Would you recommend this product?</label>
        <select id="recommendation" v-model="recommendation">
            <option>Yes</option>
            <option>No</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>
          
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommendation: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.recommendation) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendation: this.recommendation
                }
                this.$emit('review-submitted', productReview)
                //resetting the value of each key back to null for submission of new data
                this.name = null
                this.review = null
                this.rating = null
                this.recommendation = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }

        }
    }
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

                
                <button v-on:click="addToCart"
                    :disabled='!inStock'
                    :class="{disabledButton: !inStock}">Add to cart</button>
                <button 
                    v-if="cart.length >= 1"
                    v-on:click='removeFromCart'>Remove From Cart</button>
            </div>
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        <p>{{ review.recommendation }}
                    </li>
                </ul>
            </div>
            <div>
                <product-review
                    @review-submitted='addReview'></product-review>
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
            cart: 0,
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(this.selectedVariant)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
            if (this.premium) {
                return "Free"
            } else {
                return "$2.99"
            }
        }

    }
})


var app = new Vue({
    el: "#app",
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem() {
            this.cart.splice(1, 1)
        }
    }
})