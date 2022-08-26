Esse projeto teve intuito de praticar e programar uma aplicação back-end com autênticação JWT.
 
- O método de autênticação JWT é um dos mais usados no mundo todo, e consiste basicamente em fazer uma ponte entre cliente e servidor por meio de um token assinado e criptografado que autoriza uma requisição web. De modo geral, assim que o login é efetuado e checado que é existente no banco de dados referente à aplicação, um token criptografado em base64 é gerado pelo backend e logo em seguida é enviado ao frontend. Apenas com esse token armazenado (seja em cookies ou no local storage) é possível acessar as rotas privadas descritas no backend, essas rotas são protegidas por um middleware, uma função que verifica se o token existe e se o 'match' entre os tokens do fronte e do back conferem, se conferir, o usuário terá acesso às rotas por tempo determinado ou inderteminado.

Além da autênticação JWT, foi desenvolvido também um CRUD de uma agenda de contatos com MongoDB. O CRUD consiste-se em criar, atualizar, listar e deletar contatos de uma agenda, vinculado a um usuário específico. De forma simples, rápida e eficaz.

O projeto possui um front-end separado em um projeto específico nesse mesmo repositório: contatos-frontend.
