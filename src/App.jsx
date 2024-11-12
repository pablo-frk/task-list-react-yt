import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    },[tasks])

    /////////////////////////////////////////////////////
    // EXEMPLO - ATUALIZANDO A LISTA VIA API
    // useEffect(() => {
    //    async function fetchTasks() {
    //      // CHAMAR A API
    //      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
    //         method: 'GET'
    //     })
    //     // PEGAR OS DADOS QUE ELA RETORNA
    //     const data = await response.json()
    //     console.log(data)
    //
    //     // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
    //
    //     setTasks(data)
    //    }
    //    fetchTasks()
    // }, [])
    //////////////////////////////////////////////////


    // FUNÇÃO DE COMPLETAR TAREFA
    function onTaskClick(taskId) {
        const newTasks = tasks.map((task) => {
            // ATUALIZAR TAREFA SE O ID FOR IGUAL
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }

            return task;
        });
        setTasks(newTasks);
    }

    // FUNÇÃO DE DELETAR TAREFA
    function onDeleteClick(taskId) {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
    }

    // FUNÇÃO DE ADICIONAR TAREFA
    function onAddTaskSubmit (title, description) {
        const newTask = {
            id: v4(),
            title: title,
            description: description,
            isCompleted: false
        };
        setTasks([...tasks, newTask])
    }


    //////////// AREA DE RENDERIZAÇÃO
    return (
        <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
            <div className="w-[500px] space-y-4">
                <Title>Gerenciador de Tarfas</Title>
                <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
                <Tasks
                    tasks={tasks}
                    onTaskClick={onTaskClick}
                    onDeleteClick={onDeleteClick}
                />
            </div>
        </div>
    );
}

export default App;
