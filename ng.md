## Set up local environment

```cmd
npm install -g @angular/cli
ng new my-app
ng serve --open
```

## Commands

```cmd
ng generate component xyz
ng add @angular/material
ng add one_dependency
ng test
ng build --prod
```

## Template Syntax

* *ngFor
* *ngIf
* interpolation {{ }}
* property binding [ ]
* event binding ( )



## CORS

配置proxy.config.json文件

```json
{
  "/api": {
    "target": "http://127.0.0.1:8080",
    "changeOrigin": true,
    "secure": false
  }
}
```

配置package.json文件

```cmd
ng serve --open --proxy-config=proxy.config.json
```



在程序中用httpClient访问URL为/api/xxx