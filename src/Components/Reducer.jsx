import React from 'react'

function Reducer() {
    const intiial = {
        user: "",
        pc: "",
        assign: ""
    }

    const labReducer = (state = intiial, action) => {
        if (action.type === "userfetch") {
            return {
                ...state,
                user: action.data
            };
        }
        if (action.type === "pcfatch") {
            return {
                ...state,
                addpc: action.data

            };
        }
        if (action.type === "assignpcfatch") {
            return {
                ...state,
                assignpc: action.data

            };
        }
        return state
    }

}

export default Reducer