const listaDeContatos = [
    {
        id: 1,
        nome: "Joaquim",
        ultimaMensagem: "Olá, como você está?",
        horarioUltimaMensagem: "20:03",
        avatar: "./src/assets/images/Avatar 3.png",
        conversas: [
            { mensagem: "Oi, tudo bem?", tipo: "recebida", horario: "" },
            { mensagem: "Oi, eu estou bem sim, e você", tipo: "enviada", horario: "" },
            { mensagem: "Tudo certo, também", tipo: "recebida", horario: "" },
        ]
    },
    {
        id: 2,
        nome: "Pedro",
        ultimaMensagem: "Fui lá ontem, estava muito massa",
        horarioUltimaMensagem: "19:15",
        avatar: "./src/assets/images/Avatar 2.png",
        conversas: [
            { mensagem: "Tinha muita gente lá", tipo: "recebida", horario: "" },
            { mensagem: "Aconteceu um imprevisto com o carro, ai não deu pra ir", tipo: "enviada", horario: "" },
            { mensagem: "Que pena, quando acontecer algo assim me avisa, te dou uma carona", tipo: "recebida", horario: "" }
        ]
    },
    {
        id: 3,
        nome: "Maria",
        ultimaMensagem: "Vou passar ai para buscar então",
        horarioUltimaMensagem: "20:50",
        avatar: "./src/assets/images/Avatar 1.png",
        conversas: [
            { mensagem: "Tu tem o cabo dela também?", tipo: "recebida", horario: "" },
            { mensagem: "Tenho sim, já está tudo dentro do case, aqui separadinho", tipo: "enviada", horario: "" },
            { mensagem: "Beleza, estou indo ai agora então", tipo: "recebida", horario: "" }
        ]
    },
    {
        id: 4,
        nome: "Paulo",
        ultimaMensagem: "Tu foi pra aula hoje?",
        horarioUltimaMensagem: "19:10",
        avatar: "./src/assets/images/Avatar 2.png",
        conversas: [
            { mensagem: "Precisei ficar trabalhando até mais tarde", tipo: "recebida", horario: "" },
            { mensagem: "Fui sim, professor só continuou passando a matéria da última aula, depois já te passo ela.", tipo: "enviada", horario: "" },
            { mensagem: "Beleza, pego com você na aula hoje.", tipo: "recebida", horario: "" }
        ]
    },
    {
        id: 5,
        nome: "Julia",
        ultimaMensagem: "Confirmado o ensaio para amanhã às 19:00",
        horarioUltimaMensagem: "21:45",
        avatar: "./src/assets/images/Avatar 4.png",
        conversas: [
            { mensagem: "Vai estar a banda completa", tipo: "recebida", horario: "" },
            { mensagem: "Show, já vamos combinar de pedir umas pizzas então.", tipo: "enviada", horario: "" },
            { mensagem: "Claro, vamos pedir sim.", tipo: "recebida", horario: "" }
        ]
    },
    {
        id: 6,
        nome: "Francisco",
        ultimaMensagem: "Eu já comprei meu ingresso",
        horarioUltimaMensagem: "17:15",
        avatar: "./src/assets/images/Avatar 3.png",
        conversas: [
            { mensagem: "Primeiro lote no setor A está R$50,00", tipo: "recebida", horario: "" },
            { mensagem: "Show, vou passar lá hoje pra comprar o meu.", tipo: "enviada", horario: "" },
            { mensagem: "Acho que vai ser muito difícil, mas um Jogão", tipo: "recebida", horario: "" }
        ]
    },
    {
        id: 7,
        nome: "Vanessa",
        ultimaMensagem: "Combinado então",
        horarioUltimaMensagem: "15:00",
        avatar: "./src/assets/images/Avatar 7.png",
        conversas: [
            { mensagem: "Tudo vai custar R$ 100,00 ", tipo: "recebida", horario: "" },
            { mensagem: "Ok, posso pegar na terça perto do meio dia?", tipo: "enviada", horario: "" },
            { mensagem: "Sim, já vou deixar deixar reservado aqui. ", tipo: "recebida", horario: "" }
        ]
    }
    

]


//evento para verificar se a página esta totalmente carregada.
document.addEventListener('DOMContentLoaded', () => {
    console.log("Minha página carregou!");

    // Seleciona o elemento com o id informado
    const inputMsg = document.querySelector("#inputMenssagem");
    console.log(inputMsg);

    // Add um placeholder na constante informada 
    inputMsg.placeholder = 'Digite sua mensagem';

    // Cria uma constante chamada butons e inclui nela todos os itens que estão com a classe informada
    const buttons = document.querySelectorAll(".cursor--pointer");
    console.log(buttons);

    // Seleciona um elemento que possui uma classe e um nome específico no seu CSS
    const buttonSend = document.querySelector(".cursor--pointer[src*='Send Icon']");
    console.log(buttonSend);

    // Add uma classe nova no item informado 
    buttonSend.classList.add("minha-nova-classe");

    const listaMensagens = document.querySelector(".div--messages");
    console.log(listaMensagens);

    const inputBuscaContato = document.querySelector(".search input[type='search']");
    console.log(inputBuscaContato);

    const inputBuscaMensagem = document.getElementById("search--message");
    console.log(inputBuscaMensagem);


    inputBuscaMensagem.addEventListener("input", () => {
        const termoDeBusca = inputBuscaMensagem.value;
        console.log(`O termo que foi usado para busca é: ${termoDeBusca}`);
        buscarMensagem(termoDeBusca);
    })

    // Evento que "ouve" o que está sendo digitado no campo input
    inputBuscaContato.addEventListener("input", () => {
        const termoDeBusca = inputBuscaContato.value;
        console.log(`O termo buscado foi: ${termoDeBusca}`);
        // Carrega os contatos que tenham os termos buscados  
        carregarContatos(termoDeBusca);
    });

    // Add um ouvinte para o click no item que tem a classe emoji--reaction
    listaMensagens.addEventListener("click", (event) => {
        if (event.target.classList.contains("emoji--reaction")) {
            const mensagem = event.target.closest('.message');
            abrirMenuReacao(mensagem);
        }

    });

    // cria lista com alguns emojis
    const listaEmojis = ["&#128514;", "&#128525;", "&#128546;", "&#128560;", "&#128545;"];

    // função para abrir um menu de reações, para que o usuario reaja a mensagem com um emoji
    function abrirMenuReacao(mensagem) {
        console.log(mensagem);
        let areaEmojis = mensagem.querySelector(".area--emojis");

        // Cria a area do emoji se ela não existir
        if (!areaEmojis) {
            areaEmojis = document.createElement("div");
            areaEmojis.classList.add("area--emojis");
            mensagem.appendChild(areaEmojis);
        }

        // Remove os emojis de escolhas se um deles já tiver sido selecionado
        let emojisExistentes = areaEmojis.querySelectorAll(".emoji--opcao");
        if (emojisExistentes.length > 0) {
            emojisExistentes.forEach((emoji) => emoji.remove());
            return;
        }


        // percorre a lista de emojis e add eles
        listaEmojis.forEach((emoji) => {
            const emojiElement = document.createElement("span");
            emojiElement.classList.add("emoji--opcao", "cursor--pointer");
            emojiElement.innerHTML = emoji;

            // Captura o evento de click no emoji, adiciona a reação escolhida e remove a lista de opção de emojis
            emojiElement.addEventListener("click", ()=> {
                
                console.log(mensagem);
                console.log(emoji);
                alternarEmoji(mensagem, emoji);

                // Remove apenas a lista de opção de emojis, mantendo o "botão" de reação ativo.
                areaEmojis.querySelectorAll(".emoji--opcao").forEach((el) => el.remove());
            });

            areaEmojis.appendChild(emojiElement);

        });

    };

    function alternarEmoji (mensagem, emoji) {
        let reacaoExistente = mensagem.querySelector(".emoji--selecionado");

        if (reacaoExistente && reacaoExistente.innerHTML.includes(emoji)) {
            reacaoExistente.innerHTML = reacaoExistente.innerHTML.replace(emoji, "");
            if(reacaoExistente.innerHTML.trim() === "") {
                reacaoExistente.remove();
            }
        }else{
            if (!reacaoExistente) {
                reacaoExistente = document.createElement("div");
                reacaoExistente.classList.add("emoji--selecionado");
                mensagem.appendChild(reacaoExistente);
            }

            reacaoExistente.innerHTML = emoji;
        }
    };

    // Lista de respostas automaticas do bot
    const respostasParaOBot = [
        "Olá, tudo bem?",
        "Como você está?",
        "Qual é o seu nome?",
        "Meu nome é O Novo Bot",
        "Eu faço o curso do O Novo Programador",
        "Você gostaria de conversar sobre o curso?"
    ]

    // função para permitir a busca por mensagem
    function buscarMensagem(termoDeBusca) {
        let encontrouMensagem = false
        const mensagemElement = document.querySelectorAll(".messagens")
        mensagemElement.forEach((mensagem) => {
            // pega o texto original da mensagem
            const textoOriginal = mensagem.innerText;
            // Transforma o texto para todas as letras ficarem minúsculas
            const textoNoemalizado = textoOriginal.toLowerCase();
            // Transforma o termo de busca para todas as letras ficarem minúsculas
            const termoNormalizado = termoDeBusca.toLowerCase();

            // Compara se o termo pesquisado é igual a alguma mensagem
            if (textoNoemalizado.includes(termoNormalizado)) {
                encontrouMensagem = true;

                // cria um destaque para o termo que está sendo pesquisado
                const termoDestacado = textoOriginal.replace(
                    new RegExp(`(${termoDeBusca})`, "gi"),
                    "<span class='highligth'>$1</span>"
                );

                // add o termo destacado na mensagem
                mensagem.innerHTML = termoDestacado;

                mensagem.style.display = "block";

            }else {
                mensagem.style.display = "block";
            }


        })
    }

    // captura a hora que a mensagem foi enviada
    function horaMensagem () {
        const data = new Date()
        return (`${data.getHours()}:${data.getMinutes()}`);
    }

   
    //função para enviar mensagem
    function enviarMensagem() {
        const texto = inputMsg.value.trim();

        if (texto === "") {
            alert('Não foi digitado nenhuma mensagem!');
        } else {
            const mensagemRenderizada = renderizarMensagem("enviada", texto, "21:00");
            listaMensagens.appendChild(mensagemRenderizada);

            setTimeout(responderMensagens, 2000)
            // Limpa o campo de input, deixando o campo limpo para digitar outra mensagem.
            inputMsg.value = '';
        }
    }

    //Função de Bot automatico de respostas aleatórias
    function responderMensagens() {
        const posicao = Math.floor(Math.random() * respostasParaOBot.length)

        const mesagensDoBot = respostasParaOBot[posicao];
        const mensagemRenderizada = renderizarMensagem("recebida", mesagensDoBot, "21:05");
        listaMensagens.appendChild(mensagemRenderizada);

    }

    // Add evento quando clicar no botão enviar
    buttonSend.addEventListener("click", () => {
        enviarMensagem();
    });


    //Add evento quando pressiona a tecla Enter.
    inputMsg.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            enviarMensagem()
        };
    });


    // Renderiza a mensagem de forma dinamica
    function renderizarMensagem(tipo, mensagem, horario) {
        const divMensagem = document.createElement("div");
        const direcao = tipo === "enviada" ? "end" : "start";
        const estiloDiv = tipo === "enviada" ? "you" : "other";
        const origemMensagem = tipo === "enviada" ? "sua" : "outro";
        const corDaLetra = tipo === "enviada" ? "white" : "rich--black";
        const corCheckIcon = tipo === "enviada" ? "./src/assets/icons/check-icon-white.svg" : "./src/assets/icons/check-icon-black.png";

        divMensagem.classList.add(
            "flex", 
            "flex--direction--row",
            `justify--content--${direcao}`, 
            "width--100",
            "fade-in"

        );

        divMensagem.innerHTML = `
            
           
                <div class="message message--${estiloDiv} background--white flex flex--direction--column">
                    <div class="messagens font--family color--rich--black">
                        ${mensagem}
                    </div>
                    <div class="font--family font--size--12 font--weight--regular flex justify--content--end color--${corDaLetra} flex flex--direction--row align--items--center gap--5">
                       
                        ${horaMensagem()}
                        <img src="${corCheckIcon}" class="check--icon " alt="">
                        <div class="area--emojis">
                            <div class="emoji--reaction cursor--pointer">&#128515;</div>
                        </div>
                    </div>
                </div>
  
        `;

        return divMensagem;

    }


    // Adiciona novos contatos que vieram da Lista de contatos, que poderia ser uma API externa por exemplo.
    // const elementosDiv = [];

    function  carregarMensagemContato(index) {
        const contato = listaDeContatos[index];
        listaMensagens.innerHTML = '';

        contato.conversas.forEach((conversa) => {
            const mensagemRenderizada = renderizarMensagem(conversa.tipo, conversa.mensagem, conversa.horario);
            listaMensagens.appendChild(mensagemRenderizada);
        })
    }

    function carregarContatos(filtro = '') {

        // Seleciona a div onde os elementos serão inseridos 
        const divContatosElement = document.querySelector(".div--contacts");
        // Deixa lista de contatos vazia 
        divContatosElement.innerHTML = '';

        // Filtra os contatos pelo nome, tranforma udo que foi digitado no input em letras minusculas.
        // includes: Verifica de a string digitada no input está dentro do campo nome em um contato, dentro da lista de contatos.
        // Faz a busca utilizando o campo do nome do contato ou da ultima conversa com o contato
        const contatosFiltrados = listaDeContatos.filter((contato) => 
            contato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            contato.ultimaMensagem.toLowerCase().includes(filtro.toLowerCase())||
            contato.horarioUltimaMensagem.toLowerCase().includes(filtro.toLowerCase())
        );

        if (contatosFiltrados.length === 0) {
            divContatosElement.innerHTML = "<div><span>Não foi encontrado nenhum contato com esse nome</span></div>";
            return;
        }

        

        contatosFiltrados.forEach((contato, index) => {
            // Cria uma nova div
            const divParentElement = document.createElement("div");
            divParentElement.classList.add("contact--area", "flex", "gap--5");
            // 
            divParentElement.innerHTML = `
                <div class="flex justify--content--center align--items--center">
                    <img src="${contato.avatar}" class="avatar--left--bar flex--1" alt=""> 
                </div>
                <div class="flex flex--direction--column flex--3 justify--content--center">
                    <div class="flex flex--direction--column justify--content--center">
                        <div class="detalhes--contato flex flex--3">
                            <div class="flex font--size--16 font--family font--weight--bold align--items--center">
                                ${contato.nome}
                            </div>
                        </div>
                        <div class="ultima-conversa font--size--14 font--family font--weight--regular color--grey">
                            ${contato.ultimaMensagem}
                        </div>

                    </div>
                </div>
                <div
                    class="flex flex--direction--column flex--1  align--items--center  gap--5 padding--top--10 padding--left--5">
                    <div class="font--family font--size--12 font--weight--regular">
                        ${contato.horarioUltimaMensagem}
                    </div>
                </div>
                
           `;

           divParentElement.addEventListener("click", () => {
            carregarMensagemContato(index);
           })

           divContatosElement.appendChild(divParentElement);
        });


    }

    setTimeout(() => {
        carregarContatos();
    }, 200)

    


});

