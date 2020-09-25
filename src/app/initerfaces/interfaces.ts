interface Usuario{
    nombre?:String,
    apellido?:String,
    email?: String,
    password?:String,
    saldo?:number,
}

interface Dias
{
    fecha?: Date,
    saldoInicial?: number,
    saldoFinal?: number,
    cantidades?: any[],
}