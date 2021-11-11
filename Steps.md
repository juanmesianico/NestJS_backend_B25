# Steps 

1. Instalar typescript y nest/cli

```bash
npm install -g typescript
npm i -g @nestjs/cli
```

2. Crear proyecto en una carpeta
(Si quiero crear una carpeta con el proyecto, en lugar del punto pongo el nombre de la carpeta)

```bash
nest new . 
```
3. Instalar dependencias e iniciar la ejecución del servidor

```bash
npm install 
npm run star:dev 
```

4. Instalar las librerias de Basa de datos  (en este caso mongo)

```bash
npm install --save @nestjs/mongoose mongoose
npm install @types/mongoose -D
```

## Para cada modulo se debe:

5. Crear el modulo para la entidad que voy a trabajar

```bash
nest g mo product
```

6. Crear el controlador y el servicio

```bash
nest g co product
nest g s product
```

7. Crear el (o los) DTO

- Crear una carpeta DTO dentro de la carpeta product 
- crear un archivo "create_product.dto.ts"

8. Crear la carpeta "interfaces"

- Crear una carpeta "interfaces" dentro del modulo (carpeta producto)
- crear un archivo "product.interface.ts"

9. Crear la carpeta schemas

- Crear una carpeta "schemas" dentro del producto o carpeta producto 
- crear un archivo "product.schema.ts"

## Configurar la conexion a BD

10. Crear la base de datos y la coleccion en MongoAtlas. 

- Selecciono la BD (de forma predeterminada es Cluster0)
- Selcciono la pestaña "collections" 
- Creo una base de datos (create database)
- Creo una coleccion en la base (create) con el nombre "products"


11. Configurar en app.module la conexión a la BD de mongo usando mongoose

- En el archivo app.module importamos:
```bash
import { MongooseModule } from '@nestjs/mongoose';
```
- En la sección "imports: []" (separados por comas) agregamos:
```bash
MongooseModule.forRoot('mongodb+srv://XXXX:YYYY@cluster0.bbu9b.mongodb.net/ZZZZ',{
      useNewUrlParser: true
    }),
```
Donde:
- XXXX es el usuario de la base de datos
- YYYY es la contraseña
- ZZZZ es el nombre de la base

nota: la url de conexión se obtiene directamente en MongoAtlas


## Implementar las funcionalidades de product

12. Crear el Schema de product

- Agregar los atributos que tendrá la coleccion en la BD

13. Actualizar el DTO y la interface con los campos a utilizar

- Actualizar el DTO con los mismos atributos del Schema

- Actualizar la interface con los mismos atributos del Schema

14. Agregar a la interface el extends Document de mongoose
- Importar el Document de mongoose
```bash
import { Document } from "mongoose";
```
- Agregar a la interface IProduct la herencia extends document
```bash
export interface IProduct extends Document
```

## Implementar el servicio y el controlador

15. Configurar el modulo de product "product.module.ts"

- Importar el MongooseModule
    ```bash
    import { MongooseModule } from '@nestjs/mongoose';
    ```
- Agregar en imports la configuración de la colección mediante Mongoose.ForFeature quedando así: 
    ```bash
    @Module({
        imports: [
            MongooseModule.forFeature([
                { name: 'Product', schema: ProductSchema}
            ])
        ],
        controllers: [ProductController],
        providers: [ProductService]
    })
    export class ProductModule {}
    ```


16. Creamos las consultas (queries) en el servicio

    - Importar la librerías necesarias: el DTO, la interface, el Model y el InjecModel
    ```bash
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { createdProductDTO } from './dto/create_product.dto';
    import { IProduct } from './interfaces/product.interface';
    ```

    - injectar el modelo anteriormente definido en product.module.ts mediante el constructor
    ```bash
     constructor(@InjectModel('Product') private readonly productModel : Model<IProduct> ){}
    ```

    - Crear la consulta de listar

    ```bash
        async getProducts(): Promise<IProduct[]>{
            const products = await this.productModel.find();
            return products;
        }
    ```
    nota: productModel representa un modelo o elemento de la base de datos, por lo tanto tiene todas las operaciones para trabajar con la coleccion Products, por ejemplo, lista (find), guardar (save) o eliminar (delete)
    
    - Crear la consulta de guardar
    ```bash
        async createProduct(createdProductDTO: createdProductDTO Promise<IProduct>{
            const product = await new this.productModel(createdProductDTO);
            product.save();
            return product;
        }
    ```

    - Crear la consulta de eliminar
    ```bash
    ```


17. Usar los servicios creados en el controller
