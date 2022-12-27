import { createSlice } from "@reduxjs/toolkit";

const sum = (array) => {
  return array.reduce((a, b) => a + b, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    getCart: (state, action) => {
      state.id = action.payload.id;
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
    },
    addProductToCart: (state, action) => {
      console.log(action.payload);
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex >= 0) {
        console.log("Already Exist Items in Cart");

        state.products[productIndex].quantitySelected =
          state.products[productIndex].quantitySelected +
          action.payload.quantitySelected;

        const total = sum(
          state.products.map(
            (product) => product.price * product.quantitySelected
          )
        );

        state.total = total;

        const quantity = sum(
          state.products.map((product) => product.quantitySelected)
        );

        state.quantity = quantity;
      } else {
        console.log("New Items in Cart");
        state.products.push(action.payload);

        const total = sum(
          state.products.map(
            (product) => product.price * product.quantitySelected
          )
        );

        state.total = total;

        const quantity = sum(
          state.products.map((product) => product.quantitySelected)
        );

        state.quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      const cart = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      state.products = cart;

      const total = state.products.map(
        (product) => product.price * product.quantitySelected
      );

      const cartSum = sum(total);

      state.total = cartSum;

      const quantity = sum(
        state.products.map((product) => product.quantitySelected)
      );

      state.quantity = quantity;
    },
    decreaseProduct: (state, action) => {
      const decreaseIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (state.products[decreaseIndex].quantitySelected > 1) {
        console.log("Decrease Cart Qty Greater Then 1");
        state.products[decreaseIndex].quantitySelected -= 1;

        const total = sum(
          state.products.map(
            (product) => product.price * product.quantitySelected
          )
        );
        state.total = total;

        const quantity = sum(
          state.products.map((product) => product.quantitySelected)
        );
        state.quantity = quantity;
      } else if (state.products[decreaseIndex].quantitySelected === 1) {
        console.log("Decrease Cart Qty === 1");

        const cart = state.products.filter(
          (product) => product.id !== action.payload.id
        );

        state.products = cart;

        const total = sum(
          state.products.map(
            (product) => product.price * product.quantitySelected
          )
        );
        state.total = total;
        const quantity = sum(
          state.products.map((product) => product.quantitySelected)
        );
        state.quantity = quantity;
      }
    },
    emptyCart: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    },
  },
});

export const {
  getCart,
  addProductToCart,
  removeProduct,
  decreaseProduct,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
