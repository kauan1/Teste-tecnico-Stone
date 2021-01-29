//função para calcular quanto cada pessoa tem que pagar
function gerarListaPagamento(itens, emails){
    const map = new Map(); // a cosntante map é onde será guradado o map que se deve retornar como resultado
    const totalEmails = emails.length;
    //a constante total é onde será guardado o total a ser pago, ulizei reduce para efetuar a somatoria
    //visto que ele passa por todas as posições de um array e sempre retorna um valor que será 
    //incrementado a partir de uma logica
    const total = itens.reduce((total, item) => {
        const valor = item.quantidade * item.preco;
        return total + valor;
    },0);
    //a constante resto receberá o resto da divisão do total a ser pago pela quantidade de emails
    const resto = total % totalEmails;
    //a constante totalParcial receberá o total menos o resto para que não se tenha valores com ponto
    //flutuante para se pagar
    const totalParcial = total - resto;
    //a constante totalDividido receberá quanto cada um tera que pagar sem considerar o resto
    const totalDividido = totalParcial / totalEmails;
    // valoresParaPagar será um Array que será preenchido por totalDividido, e a quantidade de valores 
    //no array será igual a quantidade de emails
    const valoresParaPagar = [];
    for(let i=0; i < totalEmails; i++){ // este for incrementa o array valoresParaPagar
        valoresParaPagar.push(totalDividido);
    }
    for(let i=resto; i>0; i--){
        //este for é para fazer com que o resto seja dividido pelos emails, por exemplo
        //resto igual 2 ele fará com que duas possições receba +1 para q no final o resto tambem
        //seja contemplato no pagamento
        valoresParaPagar[i]++;
    }
    //este forEach é para inicializar a contante map, que sera retornada
    // ela é inicializada tem a chave como o email e o valor quanto que se tem que pagar
    emails.forEach((email, index) => {
        map.set(email,valoresParaPagar[index]);
    });
    return map;
} 

//esta função cria uma lista de itens no seguinte formato
// item = {
//     item: 'nome',
//     quantidade: 1,
//     preco: 20, //em centavo
// }
function gerarItens(quantidade){
    const itens = [];
    for(i=0; i<quantidade; i++){
        itens.push({item: `iten${i}`, quantidade: i+1, preco: Math.ceil(Math.random() * i)})
    }

    return itens;
}

//esta função cria uma lista de emails
function gerarEmails(quantidade){
    const emails = [];
    for(i=0;i<quantidade;i++){
        emails.push(`kauan_silva${i}@elixir.com.br`);
    }
    return emails;
}

//está é a função principal onde se inicializa a execução
function main() {
    // pode-se mudar os valores de numeroEmails e numeroItens, para variar a quantidade dos mesmos 
    const numeroEmails = 10;
    const numeroItens = 10;

    //chamada das funções para criar os emails e itens
    const itens = gerarItens(numeroItens);
    const emails = gerarEmails(numeroEmails);

    //chamada da função para elabora lista de pagamento, para se saber quanto cada um dos emaisl terá que pagar
    const listaPagamento = gerarListaPagamento(itens, emails);

    console.log(listaPagamento);
}

main();