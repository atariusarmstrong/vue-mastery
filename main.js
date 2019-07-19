var eventBus = new Vue ()

// Vue.component('product-details', {
//     props: {
//         details: {
//             type: Array,
//             required: true
//         }
//     },
//     template:
//         `

//         <ul>
//             <li v-for="detail in details">{{detail}}</li>
//         </ul>

//         `
// })

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
                eventBus.$emit('review-submitted', productReview)
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

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }

    },
    template: `
        <div>
            <div>
                <span class='tab'
                    v-for='(tab, index) in tabs'
                    :key='index'
                    @click='selectedTab = tab'
                    :class="{ activeTab: selectedTab === tab}"    
                >
                    {{tab}}
                </span>
            </div>
            <div v-show="selectedTab === 'Reviews'">
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul v-else>
                        <li v-for="(review, index) in reviews"
                            :key="index"
                        >
                            <p>{{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                            <p>{{ review.recommendation }}
                        </li>
                    </ul>
            </div>
            <div v-show="selectedTab === 'Make A Review'">
                <product-review></product-review>
            </div>
        </div>
    `,
    data () {
        return {
            tabs: ['Reviews', 'Make A Review'],
            selectedTab: "Reviews"
        }
    }
})

Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <ul>
            <span class='tab'
                v-for="(tab, index) in tabs"
                :key='index'
                @click='selectedTab = tab'
                :class="{ activeTab: selectedTab === tab}"
            >{{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Shipping'">
            <p>{{shipping}}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
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
                
                <info-tabs 
                    :shipping="shipping"
                    :details="details"></info-tabs>


                <!-- v-for loops through the array to render its data -->

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

            <product-tabs
                :reviews='reviews'
            ></product-tabs>

            
            
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

    },
    //lifecycle hook
    mounted () {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
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