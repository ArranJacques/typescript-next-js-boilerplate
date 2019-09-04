# Next JS Boilerplate

This is an opinionated boilerplate for [Next.js](https://nextjs.org) projects.

- [Application Technologies & Architecture](#application-technologies--architecture)
    - [Technologies](#technologies)
    - [Architecture](#architecture)
- [Local Setup & Development](#local-setup--development)
    - [Local Setup](#local-setup)
    - [Development](#development)

## Application Technologies & Architecture

### Technologies

Applications are written in [TypeScript](https://www.typescriptlang.org) and use [Redux](https://github.com/reduxjs/react-redux) with [Immutable JS](https://immutable-js.github.io/immutable-js) for state management. CSS is written in [Stylus](http://stylus-lang.com).

### Architecture

Most of an application's logic is located in the `app` directory. The application uses a layered architecture where higher level layers can utilise lower level layers, but not the other way around. E.g., containers in the `presentation` layer may make use of logic in the `domain` layer or data from the `persistence` layer, but domain logic in the `domain` layer should never be aware of `presentation` layer.

- `app/presentation` - **presentation layer**
    - `/components` - presentational components.
    - `/containers` - containers for attaching domain logic and application state to presentational components.
    - `/svgs` - svg components
- `app/domain` - **domain layer**: business domain logic.
- `app/data` - **persistence layer**: reducers and actions for updating application state.

As well as these 3 layers there is what can be considered a 4th layer that sits next to the 3 hierarchical layers, and that is `app/support`. This contains support logic, such as helper functions, that can be used by any of the 3 mentioned layers.

As well as the above, there is also the `app/foundation` directory, which contains configuration, global definitions and other logic/code that forms the foundation of all of the aforementioned layers.

## Local Setup & Development

### Local Setup

1. Clone repository.
2. Install dependencies `npm install`.
3. Create a copy of the `.env.example` file and name it `.env.example`

### Development

1. Start development server by running `npm run dev`.
2. Navigate to `http://localhost:3000` in your browser.
