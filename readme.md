# DOCKER BOILERPLATE 

## NodeJS v8/OracleDB 

Acesse https://container-registry.oracle.com e registre sua conta.

**Aceite os termos de uso dos registros de containers.**

Registre suas credencias de acesso no docker

```BASH
docker login container-registry.oracle.com
```

Entre com suas credenciais quando solicitado.

## Instalando

##### 1. Clone o repositório

```git clone https://github.com/maiquemalmeida/docker-boilerplate-nodejs8-oracledb.git myAwesomeProject```

##### 2. Entre no diretório

```cd myAwesomeProject```

##### 3. Apague o diretório .git

```rm -rf .git```

##### 4. Reinicie o controle de versão

```git init```

##### 5. Edite as variáveis de ambiente que armazenam as credencias de acesso ao banco no arquivo:

```docker-compose.yml```


## Como utilizar

Execute:

```docker-compose up```
