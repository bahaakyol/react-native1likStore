import { createSlice } from "@reduxjs/toolkit";

interface InitialSlice {
    wishlist: any[];
}

const initialSlice : InitialSlice= {
    wishlist: [1,2],
}

const productSlice = createSlice({
    name: "wishlist",
    initialState: initialSlice,
    reducers: {
        addWishlist: (state, action) => {
            state.wishlist.push(action.payload);
        },
        deleteWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item !== action.payload);
        }
    }
})

export const { addWishlist, deleteWishlist } = productSlice.actions;
export default productSlice.reducer;