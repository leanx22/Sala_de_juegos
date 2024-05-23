export interface IPregunta{
    pregunta: string;
    respuestas: string[];
    respuestaCorrecta: string;
    idCorrecta: number,
    tematica: string,
}

export const preguntas: IPregunta[] = [
    {
        pregunta: "¿Qué palabra reservada se utiliza para crear una clase en C#?",
        respuestas: ["Class", "Object", "Struct"],
        respuestaCorrecta: "Class",
        idCorrecta: 0,
        tematica: "programming&language",
    },
    {
        pregunta: "¿Cuál es el símbolo que se usa para acceder a los miembros de una estructura a través de un puntero en C?",
        respuestas: [". (punto)", "-> (flecha)", ":: (dobles puntos)"],
        respuestaCorrecta: "-> (flecha)",
        idCorrecta: 1,
        tematica: "data",
    },
    {
        pregunta: "¿Qué significa SQL?",
        respuestas: ["Structured Query Language", "Sequential Query Language", "Standar Query Language"],
        respuestaCorrecta: "Structured Query Language",
        idCorrecta: 0,
        tematica: "database",
    },
    {
        pregunta: "¿Cuál es el método correcto para concatenar dos cadenas en PHP?",
        respuestas: ["concat($str1, $str2)", "$str1 . $str2", "join($str1, $str2)"],
        respuestaCorrecta: "$str1 . $str2",
        idCorrecta: 1,
        tematica: "php",
    },
    {
        pregunta: "¿Qué palabra clave se usa para definir una interfaz en TypeScript?",
        respuestas: ["class", "type", "interface"],
        respuestaCorrecta: "interface",
        idCorrecta: 2,
        tematica: "javascript",
    },
    {
        pregunta: "En SQL, ¿cuál es la función que devuelve la cantidad de registros en una tabla?",
        respuestas: ["count()", "sum()", "avg()"],
        respuestaCorrecta: "count()",
        idCorrecta: 0,
        tematica: "programmer",
    },
    {
        pregunta: "¿Qué operador se utiliza para la comparación estricta en PHP?",
        respuestas: ["==", "!=", "==="],
        respuestaCorrecta: "===",
        idCorrecta: 2,
        tematica: "select",
    },
    {
        pregunta: "En C#, ¿qué modificador de acceso permite que una clase sea accesible solo dentro del mismo ensamblado?",
        respuestas: ["private", "internal", "protected"],
        respuestaCorrecta: "internal",
        idCorrecta: 1,
        tematica: "code",
    },
    {
        pregunta: "¿Cuál es el tipo de dato que puede almacenar una dirección de memoria en C?",
        respuestas: ["int", "float", "pointer"],
        respuestaCorrecta: "pointer",
        idCorrecta: 2,
        tematica: "electronic",
    },
    {
        pregunta: "En TypeScript, ¿cómo se declara una variable que puede contener valores de diferentes tipos?",
        respuestas: ["let variable: any", "let variable: union", "let variable string|number"],
        respuestaCorrecta: "let variable string|number",
        idCorrecta: 2,
        tematica: "matrix",
    },
    
    
];