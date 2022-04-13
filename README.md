# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RNF**

**RN**
Não deve ser possível cadastrar carro com placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado por padrão como disponível.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carro

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome da caategoria
Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RNF**

**RN**
O usuário não precisa estar logado no sistema para visualizar a listagem



# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todas os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não específico.
Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.



# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro

**RNF**
Utilizar o multer para upload dos carquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro de imagens deve ser um usuário administrador.



# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 HORAS
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
