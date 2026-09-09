# DevTemplate

  This is a template with the goal of boost the begining of a proyect.
  It includes the regular folders, strcuture and dependencies needed to start a new web solution.
  
  The UI library is optional, I like to wokr with angular material and tailwind but this proyect does not includes the installation. However, there are instructions about how to install and configure them.

  *This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.3.*


## Installations

### Install Tailwind
Run the script
```bash
 ng add tailwindcss
```
### Install Angular Material as the UI Component library.

Run the script:
```bash
  ng add @angular/material
```

### Create custom angular material theme
```bash
ng generate @angular/material:theme-color
```
and save it to src/assets/styles
The current theme for angular material is `theme-colors.scss`

### Tailwind theme
The template already have a predefined tailwind theme that maps the variables to the angular material variables.
The current theme for tailwind is `theme.css`

### Material symbols
The new material symbols are generated using a tool. The scripts that generates the symbols are located at `tools/` and contains two scrpts.
- material-symbols.icons.mjs. It contains the name of all the symbols that will be used in the app.
- generate-material-symbols.mjs. This is the script that is executed to create the css file that will contain all the symbols.

This tool can be executed using the script: `npm run generate:icons` and it will generate a new .css file located at `src/assets/styles/material-symbols.generated.css` 

## Ngx-env builder
install the npm package to manage .env variables
```bash
  npm i @ngx-env/builder
```
Replace the builder from angular.json:

```
architect > build > builder:
"builder": "@ngx-env/builder:application"
```

```
architect > serve > builder:
"builder": "@ngx-env/builder:dev-server"
```

```
architect > test > builder:
"builder": "@ngx-env/builder:unit-test"
```


## Folder structure

- Features. This folder is located at `/src/features` and contains all the features for the app.
- Layout. This folder is located at `/src/Layout` and contains the Layout shared for the navigation.
- Shared. This folder is located at `/src/shared` and contains the shared items for the entire application (ui components, services, pipes, directives, models, etc).

![img.png](img.png)

# How to use.

1. Clone the repository.
2. Change the name.
3. remove the no needed files like `img.png`
4. 
