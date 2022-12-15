# OpenAPI (Swagger)

If you have a Swagger file you can generate code by use [openapi-generator](https://openapi-generator.tech/)
Install openapi-generator according to the `Getting Started`.

You can generate an openapi client by using this: 

```
openapi-generator-cli generate \ 
    -g javascript \
    -o out \ 
    -i <insert json swagger endpoint here>
```
