// FeaturedAd.js

class FeaturedAd {
    constructor(id, title, description, price, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    displayAd() {
        // Logic to display the ad
        console.log(`Ad Title: ${this.title}, Price: ${this.price}`);
    }
}

module.exports = FeaturedAd;