export type TranslationType = {
  HomePage: {
    home: string;
    hero: {
      findClothes: string;
      thatMatches: string;
      yourStyle: string;
      description: string;
      cashOnDelivery: {
        title: string;
        description: string;
      };
      fastDelivery: {
        title: string;
        description: string;
      };
      highQuality: {
        title: string;
        description: string;
      };
    };
  };
  CartPage: {
    yourCart: string;
    paymentSummary: string;
    paymentMethod: string;
    cashOnDelivery: string;
    creditCard: string;
    address: string;
    name: string;
    phone: string;
    email: string;
    location: string;
    postalCode: string;
    editAddress: string;
    noAddressAdded: string;
    addNewAddress: string;
    subtotal: string;
    discount: string;
    deliveryFee: string;
    total: string;
    placeOrder: string;
    cartEmpty: string;
    shopProducts: string;
    enterShippingDetails: string;
    fullName: string;
    country: string;
    city: string;
    region: string;
    saveAddress: string;
    selectRegion: string;
    selectCity: string;
    addressPlaceholder: string;
    countryPlaceholder: string;
    namePlaceholder: string;
  };
  ProductsPage: {
    products: string;
    filters: string;
    reset: string;
    from: string;
    to: string;
    availability: string;
    inStock: string;
    outOfStock: string;
    applyFilters: string;
    showing: string;
    of: string;
    noProductsFound: string;
    noProductsFoundDescription: string;
  };
  ProductDetailsPage: {
    chooseSize: string;
    selectColor: string;
  };
  Global: {
    searchProductsPlaceholder: string;
    size: string;
    color: string;
    quantity: string;
    next: string;
    previous: string;

    soon: string;
    cancel: string;
    optional: string;
    price: string;
    addToCart: string;
    shopNow: string;
    shop: string;
    allProducts: string;
    newArrivals: string;
    summerCollection: string;
    winterCollection: string;
    viewAllProducts: string;
    topSelling: string;
    topSellingDescription: string;
    customerService: string;
    contactUs: string;
    youMightAlsoLike: string;
    youMightAlsoLikeDescription: string;
    shippingInfo: string;
    returns: string;
    privacyPolicy: string;
    termsAndConditions: string;
    rightsReserved: string;
    footerDescription: string;
    postedOn: string;
    customerReviews: string;
    writeReview: string;
    newArrivalsDescription: string;
  };
};
