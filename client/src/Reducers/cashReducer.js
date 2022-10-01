const cashReducer = (state=false,action) => {
    switch (action.type) {
        case "COD_PAYMENT":
            return action.payload;
        default:
            return state;
    }
}
export default cashReducer;