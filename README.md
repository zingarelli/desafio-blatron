# Desafio: Desenvolvimento de Gráfico Interativo 📈

Desafio proposto para o processo seletivo da empresa [Blatron Tecnologia](https://blatron.com).

Veja o resultado final [neste link da Vercel](https://desafio-blatron.vercel.app).

Segue abaixo um gif mostrando a aplicação em uso.

![gif animado mostrando o gráfico sendo montado baseado nas opções selecionadas](https://github.com/zingarelli/codechella/assets/19349339/59a6c686-58f5-4a54-b200-aa13a451af2a)

## Sobre o desafio 🚀

✅ Criar um projeto Javascript utilizando o module bundler Vite, em um repositório Git conectado ao Github em modo public;

✅ Baixar o arquivo de dados [neste link](https://drive.google.com/file/d/1PJkGJAAkyHgP2-iipr62KBcyjgE3aSqe/view?usp=sharing);

✅ Utilizando a biblioteca React e o pacote VisX, criar um gráfico XY com os dados;

✅ Criar botões dropdown que permitam escolher quais colunas do arquivo de dados são os eixos X e Y;

✅ Criar botões dropdown que permitam fazer 2 escolhas estéticas do gráfico (por exemplo, cores, tipos de linha e marcadores, tamanho de fonte, etc.);

✅ O gráfico precisa se atualizar automaticamente ao modificar o estado de cada botão.

## Como rodar o projeto 🛠️

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta em que o projeto foi salvo e rode o seguinte comando para instalar todas as dependências necessárias:

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando:

    npm run dev

O projeto poderá ser acessado pela URL http://127.0.0.1:5173

## Andamento das atividades 📝

Grande parte das atividades solicitadas foram novidades para mim, envolvendo aprendizado de novas tecnologias e bibliotecas, então **gastei um tempo maior do que o estimado para o desafio**. 

Segue abaixo um resumo das atividades realizadas, problemas encontrados e decisões tomadas.

### Entender como criar um projeto com Vite

Estou acostumado a criar projetos React utilizando o CRA (Create React App), que atualmente deixou de ser recomendado pelos desenvolvedores do React. Por conta disso, há pouco tempo, comecei a utilizar o Next.js, por ser recomendação dos desenvolvedores React e por ser um framework mais robusto. 

Já havia ouvido falar sobre o Vite, mas nunca o utilizei. Então, esse foi o primeiro problema que encontrei. Felizmente, a documentação mostrou como a criação de um projeto com o Vite é simples e direta:

- Rodar o comando abaixo e seguir os prompts interativos para definir seu projeto:

    ```
    npm create vite@latest
    ```
    
- Depois instalar as dependências e rodar o app

    ```
    cd <pasta_do_projeto>
    npm install
    npm run dev
    ```

- O projeto roda na URL http://127.0.0.1:5173

**Gastei cerca de 1h30min nessa atividade.**

### Ler um arquivo txt

Os dados para serem trabalhados estão em um arquivo `txt`, que apresenta diversas colunas e valores para elas. Felizmente, o arquivo está bem formatado, com cada dado separado por `tab` e linhas.

Nunca havia trabalhado em JavaScript com o processamento de um arquivo `txt`. Estou mais acostumado com dados vindos de um servidor, no formato JSON, em uma estrutura de objeto com chave/valor. Ou a importar um arquivo JSON disponível no projeto.

Primeiro, tentei verificar se havia uma função nativa para converter o `txt` em JSON, mas não encontrei nada. Então, fiz minhas próprias funções para isso, lendo linha a linha do arquivo de texto e populando um objeto JavaScript.

A primeira linha do arquivo corresponde a um cabeçalho. Utilizei estes valores como sendo as chaves do objeto. O restante das linhas são os valores numéricos correspondentes a cada item do cabeçalho, e foram armazenados em um array para cada chave. Desse modo, fica fácil de acessar os valores de cada coluna.

O código que faz a conversão está no arquivo [`/src/utils/DataExtractor.js`](https://github.com/zingarelli/desafio-blatron/blob/main/src/utils/DataExtractor.js). Ao invés de criar loops com o `for`, optei por usar o `map`, pois estou mais acostumado com ele. 

**Gastei cerca de 2 horas nessa atividade.**

### Criação de gráficos usando o VisX

Não conhecia o pacote VisX e nunca trabalhei com produção de gráficos em JavaScript, então o próximo passo foi pesquisar o pacote e conhecer as funcionalidades necessárias para criar a gráfico XY para o desafio. 

A VisX (*visualization components*) é uma biblioteca para visualização de dados criada pela Airbnb, otimizada para projetos React. Ela oferece o que eles chamam de "visualization primitives", que seriam componentes necessários para criar um gráfico. Achei muito interessante devido à quantidade de funcionalidades que ela oferece para criar gráficos responsivos, altamente customizáveis e que podem incluir aspectos mais complexos como animações.

Para esta etapa, **utilizei a [documentação do pacote](https://airbnb.io/visx/),  a ChatGPT, e o [tutorial do site OwnKng (Owen King)](https://ownkng.dev/thoughts/data-viz-react)**, que mostra como criar um gráfico de dispersão. Não achei a documentação muito intuitiva. Ela possui muitos exemplos, mas são avançados, e não encontrei detalhes sobre as props que cada componente recebe (talvez por que sejam derivados de outra biblioteca, a [D3](https://d3js.org)). Nestes caso, a assistência da ChatGPT foi de grande ajuda para me informar sobre as props que podem ser passadas e o que elas fazem.

De modo a começar a trabalhar com a biblioteca, criei um componente que desenha um gráfico XY, passando alguns valores hard-coded. Para a criação do gráfico, utilizei os seguintes pacotes da VisX e da D3:

- @visx/shape: para criar os pontos no gráfico, em formato de círculos;

- @visx/scale: provê funções para adaptar os eixos e os pontos do gráfico, obedecendo a escala passada;

- @visx/axis: para criar os eixos X e Y, utilizando a escala adequada;

- d3-array: possui a função `extent()` que retorna os valores máximo e mínimo do conjunto de dados passado por argumento.

Comando para instalação dos pacotes:

    npm install @visx/axis @visx/shape @visx/scale d3-array

**Ainda não entendi direito o conceito de escalas e de como configurar o parâmetro range para criação dos eixos X e Y**. Por exemplo, não entendo o motivo de os dois valores no array passado ao range na escala Y serem decrescentes. Também não tenho certeza se os valores nos "ticks" dos eixos estão corretos (isso talvez ocorra pela notação científica usada nos resultados, ou por que pode haver uma amplitude de valores muito grande entre algumas colunas). Por conta disso, decidi por copiar os valores que foram utilizados no [tutorial do site OwnKng](https://ownkng.dev/thoughts/data-viz-react), pois com eles os pontos e eixos não estão se sobrepondo quando o gráfico é plotado. 

O componente criado pode ser visto em [`/src/components/XYChart`](https://github.com/zingarelli/desafio-blatron/blob/main/src/components/XYChart/index.jsx).

**Gastei cerca de 3 horas nessa atividade.**

### Escolha das coordenadas e geração do gráfico

Adicionei novas funções ao arquivo `DataExtractor.js` para auxiliar na escolha das colunas e para popular os dados a serem plotados no gráfico: `getColumns()` e `getValuesFromColumn()`. 

Foram criadas as variáveis de estado abaixo para atualizar automaticamente o gráfico a cada mudança na seleção das colunas:

- `columns`: guarda o nome das colunas (para popular o dropdown);

- `dataX`, `dataY`: guardam os valores para os eixos X e Y, respectivamente. Os valores são armazenados em um array;

- `coordinates`: é um array de objetos, sendo que cada objeto possui as propriedades `x` e `y`, representando o valor de um ponto no eixo X e Y, respectivamente. Esse é o formato utilizado para plotar os pontos gráfico.

Alterei o componente `<XYChart>` para que a variável `coordinates` seja passada via props.

Não houve ponto de dúvidas nestas atividades. O tempo foi gasto na maior parte para a criação da lógica e debug. 

**Gastei cerca de 3 horas nessa atividade.**

### Adicionar duas opções estéticas

Como escolhas estéticas, optei por possibilitar alterar o tamanho (raio do círculo) e a cor do marcador de ponto no gráfico (chamado de `marker` no código). Deixei 4 opções de tamanho (de 2 a 5) e 4 opções de cores (preto, vermelho, verde e azul). Os valores padrão são 2 para o tamanho e `black` para a cor.

As escolhas das colunas, bem como agora as escolhas estéticas são todas baseadas em um elemento de label e de select. Dessa forma, criei um componente [`<Select>`](https://github.com/zingarelli/desafio-blatron/blob/main/src/components/Select/index.jsx) para reúso. Este componente recebe como props um valor para o atributo `id`, um conteúdo para a label, um array com as opções e a implementação de uma função onChange. Por meio da prop `onChange` posso então definir implementações específicas para tratar as mudanças em cada opção selecionada.

Agreguei as opções estéticas em uma única variável de estado, chamada `chartOptions`, que é um objeto e recebe as propriedades `radius` e `color`. Essa variável é atualizada conforme se altera o valor do tamanho ou cor do marcador, mudança que é refletida automaticamente no gráfico, por meio do envio dessas opções em uma nova prop, `options`. 

**Gastei cerca de 2h30min nessa atividade.**

### Retoques finais

Para finalizar, adicionei alguns estilos via CSS para organizar os elementos da tela. A aplicação é melhor visualizada em telas acima de 800px de largura.

Também modifiquei os componentes `<App>` e `<XYChart>` para passar via prop `options` os nomes das colunas. Assim, ao escolher as colunas para os eixos X e Y, o nome em cada eixo é alterado no gráfico para a coluna selecionada.

Por fim, terminei de escrever este README, que foi sendo atualizado conforme eu ia finalizando cada atividade.

**Gastei cerca de 1 hora nessa atividade.**

**Total aproximado de desenvolvimento: 13 horas**.

## Pontos de melhoria 💪

O desafio está sendo entregue com todas as atividades solicitadas. 

Listo aqui alguns pontos que podem ser melhorados. Devido ao tempo estimado para finalização do desafio, foram pontos que eu considerei menos prioritários e que não afetam o que se esperava ser entregue.

- Melhorar o estilo do gráfico, corrigindo posicionamento dos eixos e possibilitando adicionar/editar um nome ao gráfico; 

- Incluir novas funcioalidades ao gráfico. O VisZ oferece uma funcionalidade muito interessante chamada "ToolTip", que permite dar informações adicionais sobre dados do gráfico durante a ação de `hover` do mouse, o que também seria interessante adicionar futuramente;

- Componentização do projeto. Apesar de eu ter criado dois componentes para reúso e melhor estruturação do código, acredito que mais alguns poderiam ser criados, retirando de `App.jsx` a responsabilidade por diversos controles, e facilitando também a manutenção do código;

- Responsividade da aplicação, aplicando estilos para tela menores. Atualmente, a aplicação é melhor visualizada em telas com no mínimo 800px de largura.