import { createInterface } from "readline";
import chalk from "chalk";

const tasks =[];

const rl= createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.log(chalk.redBright.bold("To Do App"));
    console.log("1. Agregar tarea");
    console.log("2. Listar tareas");
    console.log("3. Completar tarea");
    console.log("4. salir");
    console.log("\n\n")

}

function addTask() {
    rl.question(chalk.bgGreen("Escribe la tarea"),(task)=>{ 
        tasks.push({task,completed: false});
        console.log(chalk.green.bold("Tarea agregada con exito"))
        displayMenu();
        choseOption();
    });
}

function listTask() {
    console.log(chalk.bgYellow.bold("\n tareas por hacer \n"))
    if (tasks.length ===0) {
        console.log(chalk.bgRed("no hay tareas por hacer :)\n\n"))
    }else{
        tasks.forEach((task,index) =>{
            let status =task.completed ? "completado" :"no completado" ;
            if (task.completed) {
                console.log(chalk.green(`${index + 1}.${status}- ${task.task}`))                
            }else{
                console.log(chalk.redBright(`${index + 1}.${status}- ${task.task}`))                
                
            }
        })
    }
    displayMenu();
    choseOption();
}

function completeTask () {
    rl.question(chalk.bgMagentaBright("Digita el numero de la tarea a completar \n\n"),
        (taskNumber)=>{
            const index =parseInt(taskNumber)-1;
            if (index>=0 && index<tasks.length) {
                tasks[index].completed=true;
                console.log(chalk.green.bold("tarea marcada con exito ✅ \n\n"))
            }else{
                console.log(chalk.red.bold("Numero de tarea invalido \n\n"))
            }
            displayMenu();
            choseOption();
        }
    );

}


function choseOption() {
    rl.question("elegi una opcion pibe, digita el numero de tu opcion: " ,(choice)=>{
        switch(choice) {
            case "1":
                addTask()
                break;
            case "2" :
                listTask()
                break;
            case "3":
                completeTask()
                break;
            case "4":
                console.log(chalk.yellow("Adios"));
                rl.close()
                break;
            default:
                console.log(chalk.red("opcion invalida \n"))
                displayMenu();
                choseOption();
                break;                
        }
    })
}


displayMenu();
choseOption();