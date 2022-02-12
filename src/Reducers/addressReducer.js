const initialState={};

const addRessReducer = (state=initialState,action) => {
    switch (action.type) {
        case "ADD_ADDRESS":
            return action.payload;
        default:
            return state;
    }
}

export default addRessReducer;