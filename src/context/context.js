import React, { useState } from 'react'

const context = React.createContext({
    auth: {},
    guardarAuth: () => {},
    notas: {},
    setNotas: () => {},
    filternotas: {},
    setFilterNotas: () => {},
    tareas: {},
    setTareas: () => {},
    filtertareas: {},
    setFilterTareas: () => {},
    search: () => {},
})

const ContextProvider = props =>{

    const [auth, guardarAuth] = useState({
        token: '',
        idUsuario: '',
        auth: false
    });

    const [notas, setNotas] = useState([]);

    const [filternotas, setFilterNotas] = useState();

    const [tareas, setTareas] = useState([]);

    const [filtertareas, setFilterTareas] = useState();



    function search(search){
        const temp = [...notas];
        const tempTareas = [...tareas];


        if(search !== ''){
            const newTemp = temp.filter((nota)=>nota._id.title.includes(search) || nota._id.description.includes(search));
            setFilterNotas([...newTemp]);

            const newTempTareas = tempTareas.filter((tarea)=>tarea._id.description.includes(search));
            setFilterTareas([...newTempTareas]);
        }else{
            setFilterNotas([...temp]);

            setFilterTareas([...tempTareas]);
        }
    }


    return(
        <context.Provider value={{auth, guardarAuth, notas, setNotas, filternotas, setFilterNotas, tareas, setTareas, filtertareas, setFilterTareas, search}}>
            {props.children}
        </context.Provider>
    );

}

export {context, ContextProvider};
