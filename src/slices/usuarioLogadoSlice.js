import { createSlice } from "@reduxjs/toolkit"

export const usaurioLogadoSlice = createSlice({
    name: "usuarioLogado",
    initialState: { usuraioLogado: null },
    reducers: {
        setUsuarioLogado: (state, action) => {
            state.usuarioLogado = action.payload;
        },
        removerUsuarioLogado: (state, action) => {
            state.usuarioLogado = null
        }

    }
})

export const { setUsuarioLogado, removerUsuarioLogado } = usaurioLogadoSlice.actions
export default usaurioLogadoSlice.reducer