<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


#  Configuracion del proyecto

## Clonar el repositorio en local
1. Entrar en `git bash` o la `terminal de vscode`
```
git clone <url-del-proyecto>
```  
  



## Modificar Variables de entorno
    Renombrar el archivo .env.template a .env 
  
# Instalación de dependencias
###   Debera colocarse dentro de la carpeta del proyecto
#### 1. Instalar las dependencias mediante yarn `ó`
#### 2.  Instalar las dependencias mediante npm

---



# 1. Instalar las dependencias del proyecto mediante yarn



```
yarn intall
```
### si no se tiene instalado yarn, puede instalar mediante el comando :
    

```
npm install --global yarn
```




# 2. Instalar las dependencias del proyecto mediante npm
```
npm install
```


-
-
-
-
  


# Correr el proyecto

## 1. levantar el contenedor de la base de datos
```
docker-compose up -d
```

<!-- ## 2. Levantar el servidor con yarn
```
yarn start:dev
```

## 3. Levantar el servidor con npm
```
npm run start:dev
``` -->
## 2. Levantar el servidor con yarn o npm
```
correr el servidor con el comando `yarn start:dev`

                          ó

correr el servidor con el comando `npm run start:dev`
```





***
# Detener el proyecto

## 1. Detener el servidor de node: presionar  las teclas
```
Control + C
```

## 2. Bajar el contenedor de docker
```
docker-compose down
```




