var app = new Vue ({
    el: "#app",
    data: {
        product: "Socks",
        description: "A nice comfy sock made from wool.",
        image: "./vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s?k=socks&ref=nb_sb_noss_1",
        inStock: true,
        inventory: 0,
        onSale: false,
        details: ["80% cotton", "20% polyester", "Gender neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green'
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    }
})