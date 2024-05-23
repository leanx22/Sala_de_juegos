type Binario = 0|1;

type Cartucho = [Binario, Binario, Binario?, Binario?, Binario?, Binario?, Binario?, Binario?];

export type Arma = {
    cartucho: Cartucho,
    dano: number,
};

export interface IObjeto{
    id: string,
    descripcion: string,
    pathImagen: string,
    usar(): void,
}