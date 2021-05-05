# strange-forms examples

> [bigroomstudios.github.io/strange-forms](https://bigroomstudios.github.io/strange-forms)
>
> Usage examples of strange-forms, based on [strangeluv](https://github.com/BigRoomStudios/strangeluv)

To get started, you can check this code out, `npm install`, then run `npm start`.  You'll find six usage examples, each annotated with comments and an in-page explainer:

 - Uncontrolled [[form](./src/components/Forms/Uncontrolled.js)] [[page](./src/routes/forms/components/UncontrolledPage.js)]
 - Controlled [[form](./src/components/Forms/Controlled.js)] [[page](./src/routes/forms/components/ControlledPage.js)]
 - Complex Value [[form](./src/components/Forms/ComplexValue.js)] [[page](./src/routes/forms/components/ComplexValuePage.js)]
 - Nested [[form](./src/components/Forms/Nested.js)] [[page](./src/routes/forms/components/NestedPage.js)]
 - Constraints [[form](./src/components/Forms/Constraints.js)] [[page](./src/routes/forms/components/ConstraintsPage.js)]
 - List [[form](./src/components/Forms/List.js)] [[page](./src/routes/forms/components/ListPage.js)]

## Requirements
* node `12.x.x`

## Getting Started
Click the green "Use this template" button above or install manually using git:

```bash
$ git clone --depth=1 --origin=strangeluv --branch=strangeluv git@github.com:bigroomstudios/strangeluv.git my-project
$ cd my-project
$ git checkout --orphan master  # New branch without history
$ npm install                   # Install all dependencies
$ npm start                     # Start development server
```

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000` via webpack-dev-server.|
|`build`|Compile the application to `build/` for production.|
|`build:dev`|Compile the application to `build/`, overriding `NODE_ENV` to "development".|
|`clean`|Remove the `build/` folder.|
|`test`|Run tests with Jest.|
|`serve`|Run production server.|
|`serve:dev`|Run production server, overriding `NODE_ENV` to "development".|
|`lint`|Lint all javascript in the repository.|
