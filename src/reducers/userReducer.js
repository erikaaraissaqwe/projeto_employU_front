/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    email : '',
    isLogged : false,
    tipo : '',
    token : '',
    name : '',
    cpf : '',
    cnpj : '',
    id : '',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN_CANDIDATE':
            return{
                ...state, 
                token: action.payload.token,
                isLogged : action.payload.isLogged,
                tipo: 'Candidate',
                name: action.payload.name,
                cpf: action.payload.cpf,
                id: action.payload.id,
                email: action.payload.email,
            };
            case 'SET_TOKEN_COMPANY':
                return{
                    ...state, 
                    token: action.payload.token,
                    isLogged : action.payload.isLogged,
                    tipo: 'Company',
                    name: action.payload.name,
                    cnpj: action.payload.cnpj,
                    id: action.payload.id,
                    email: action.payload.email,
                };
        default:
            break;
    }
    return state;
}