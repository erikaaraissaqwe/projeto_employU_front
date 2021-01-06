/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    email : '',
    token : '',
    name : '',
    cpf : '',
    id : '',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return{
                ...state, 
                token: action.payload.token,
                name: action.payload.name,
                cpf: action.payload.cpf,
                id: action.payload.id,
                email: action.payload.email,
            };
        default:
            break;
    }
    return state;
}