export type TranslationType = {
  HomePage: {
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
  };
  ProductDetailsPage: {
    chooseSize: string;
    selectColor: string;
  };
  Global: {
    size: string;
    color: string;
    quantity: string;
    soon: string;
    cancel: string;
    optional: string;
    price: string;
    addToCart: string;
    shopNow: string;
  };
};
