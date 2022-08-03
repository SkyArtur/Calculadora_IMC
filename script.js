/*
Bacharelado em Engenharia de Software - EAD - UNINTER - 2021
Artur dos Santos Shon
*/

/*A classe Mensagens é um objeto criado para armazenar as mensagens
que serão direcionadas ao usuário!*/
class Mensagens{
    magreza = "&emsp;MAGREZA - O seu IMC indica que você encontra-se abaixo do seu "+
    "peso ideal. Uma boa nutrição, retarda o envelhecimento da pele e a perda de massa muscular."
    
    normal = "&emsp;PESO IDEAL - O seu IMC indica que você encontra-se no seu peso ideal. "+
    "Siga mantendo uma boa nutrição."

    sobrepeso = "&emsp;SOBREPESO - O seu IMC indica  que você encontra-se com sobrepeso. "+
    "É importante manter uma boa dieta e a prática de exercícios regulares."
    
    obesidadeI = "&emsp;OBESIDADE I - O seu IMC indica  que você encontra-se com obesidade do tipo I. "+
    "O aumento da circuferência abdominal representa risco de acidentes cardiovasculares e diabetes."
    
    obesidadeII = "&emsp;OBESIDADE II - O seu IMC indica  que você encontra-se com obesidade do tipo II. "+
    "Condições perigosas como apnéia do sono, falta de ar e problemas osteoarticulares podem ser decorrentes "+
    "do excesso de peso."
    
    obesidadeIII = "&emsp;OBESIDADE III - O seu IMC indica  que você encontra-se com obesidade do tipo III. "+
    "Dificuldades para se movimentar pode levar a um tempo maior deitado e um aumento no risco do aparecimento "+
    "de escaras na pele."

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
    
    setMostradorIndice = (imc) => {return this.elementos[2].innerHTML = Math.round(imc)}
    
    setCampoMensagem(mensagem, cor='inherit'){
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
receber o nome da classe dos elementos HTML. Seu método realizarCalculo() executa o calculo 
de IMC e setta o seu valor no campo destinado ao Indice, em seguida, testa o valor de imc
e setta uma mensagem adequada ao valor de imc. Ela pode tratar a entrada de dados de forma
simples, apenas verificando se o valor de imc é um número*/
class Calculadora extends CalculoDeIMC{
    constructor(nome_classe){
        super(nome_classe)
        this.msg = new Mensagens()
        this.cor = ['rgb(235, 177, 41)', 'rgb(37, 147, 54)', 
                    'rgb(235, 177, 41)', 'rgb(219, 72, 72)']
    }
    realizarCalculo(){
        let imc = this.calcularImc()
        this.setMostradorIndice(imc)
        if(imc < 18.5){
            this.setCampoMensagem(this.msg.magreza, this.cor[0])
        }else if(imc >= 18.5 && imc < 25){
            this.setCampoMensagem(this.msg.normal, this.cor[1])
        }else if(imc >= 25 && imc < 30){
            this.setCampoMensagem(this.msg.sobrepeso, this.cor[2])
        }else if(imc >= 30 && imc < 35){
            this.setCampoMensagem(this.msg.obesidadeI, this.cor[3])
        }else if(imc >= 35 && imc < 40){
            this.setCampoMensagem(this.msg.obesidadeII, this.cor[3])
        }else if(imc > 40){
            this.setCampoMensagem(this.msg.obesidadeIII, this.cor[3])
        }else{
            this.setMostradorIndice(0)
            this.setCampoMensagem(this.msg.erro_entrada)
        }
    }
}

/*A função executarCalculo() recebe como parâmetro, o nome da classe dos elementos
HTML para entrada e saída de dados. Em seguida instância a classe Calculadora e 
passa para ela o seu parâmetro de entrada, por fim, chama seu método realizarCalculo().*/
function executarCalculadora(classe){
    let calculadoraIMC = new Calculadora(classe)
    calculadoraIMC.realizarCalculo()
}
