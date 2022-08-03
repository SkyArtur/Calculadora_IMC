/*
Bacharelado em Engenharia de Software - EAD - UNINTER - 2021
Artur dos Santos Shon
*/

/*A classe Mensagens é um objeto criado para armazenar as mensagens
que serão direcionadas ao usuário!*/
class Mensagens{
    magreza = "&emsp;MAGREZA - O seu IMC indica  que você encontra-se abaixo do seu "+
    "peso ideal. Uma boa nutrição, retarda o envelhecimento da pele e a perca de massa muscular."
    
    normal = "&emsp;PESO IDEAL - O seu IMC indica  que você encontra-se no seu peso ideal. "+
    "Siga mantendo uma boa nutrição."

    sobrepeso = "&emsp;SOBREPESO - O seu IMC indica  que você encontra-se com sobrepeso. "+
    "É importante manter uma boa dieta e a prática de exercícios regulares."
    
    obesidadeI = "&emsp;OBESIDADE I - O seu IMC indica  que você encontra-se com obesidade do tipo I. "+
    "O aumento da circuferência abdominal representa risco de acidentes cardiovasculares."
    
    obesidadeII = "&emsp;OBESIDADE II - O seu IMC indica  que você encontra-se com obesidade do tipo I. "+
    "O aumento da circuferência abdominal representa risco de acidentes cardiovasculares."
    
    obesidadeIII = "&emsp;OBESIDADE III - O seu IMC indica  que você encontra-se com obesidade do tipo I. "+
    "O aumento da circuferência abdominal representa risco de acidentes cardiovasculares."

    erro_entrada = "&emsp;Entrada inválida de dados. Verifique os valores inseridos!"+'<br>'+
    "<strong>ATENÇÃO:</strong> Para separar casas decimais, utilize o ponto ao invés da vírgula."
}

/*A classe ElementosDeInteracaoUsuario coleta os elementos HTML
que serão utilizados para a execução da aplicação. Getters e Setter
manipulam seus atributos.*/
class ElementosDeInteracaoUsuario{
    constructor(nome_classe){
        this.elementos = document.getElementsByClassName(nome_classe);
    }
    
    getPeso = () => {return this.elementos[0].value}
    
    getAltura = () => {return this.elementos[1].value}
    
    setIndice = (imc) => {return this.elementos[2].innerHTML = Math.round(imc)}
    
    setMensagem(mensagem, cor='inherit'){
        this.elementos[3].style.color = cor
        return this.elementos[3].innerHTML = mensagem
    }
}

/*A classe CalculoDeIMC é filha de ElementosDeInteracaoUsuario, ela
ela realiza o calculo de IMC através dos Getters de sua classe mãe.
Seu método calcularImc() retorna o resultado do calculo se altura for
menor que 3 metros, caso contrário retorna NaN para gerar uma exceção.*/
class CalculoDeIMC extends ElementosDeInteracaoUsuario{
    constructor(nome_classe){
        super(nome_classe)
    }
    calcularImc(){
        if(this.getAltura() < 3){
            return this.getPeso() / (this.getAltura() ** 2)
        }else{
            return NaN
        }
    }
}

/*A classe Calculadora é filha de CalculoIMC e estabelece uma relação
de associação com a classe Mensagens. Assim como suas classes mães, ela deve
receber o nome da classe dos elementos HTML. Seu método calcular() executa o calculo 
de IMC e setta o seu valor no campo destinado ao Indice, em seguida, testa o valor de imc
e setta uma mensagem adequada ao valor de imc. Ela pode tratar a entrada de dados de forma
simples, apenas verificando se o valor de imc é um número*/
class Calculadora extends CalculoDeIMC{
    constructor(nome_classe){
        super(nome_classe)
        this.msg = new Mensagens()
    }
    calcular(){
        let imc = this.calcularImc()
        this.setIndice(imc)
        if(imc < 18.5){
            this.setMensagem(this.msg.magreza, 'rgb(235, 177, 41)')
        }else if(imc >= 18.5 && imc < 25){
            this.setMensagem(this.msg.normal, 'rgb(37, 147, 54)')
        }else if(imc >= 25 && imc < 30){
            this.setMensagem(this.msg.sobrepeso, 'rgb(235, 177, 41)')
        }else if(imc >= 30 && imc < 35){
            this.setMensagem(this.msg.obesidadeI, 'rgb(219, 72, 72)')
        }else if(imc >= 35 && imc < 40){
            this.setMensagem(this.msg.obesidadeII, 'rgb(219, 72, 72)')
        }else if(imc > 40){
            this.setMensagem(this.msg.obesidadeIII, 'rgb(219, 72, 72)')
        }else{
            this.setIndice(0)
            this.setMensagem(this.msg.erro_entrada)
        }
    }
}

/*A função executarCalculo() instância a classe Calculadora e chama seu 
método calcular()*/
function executarCalculo(classe){
    let elemento = new Calculadora(classe)
    elemento.calcular()
}