# SUDOKU SOLVER

This a React Application meant to solve or play sudoku games.\
It is currently hosted with AWS at http://rdjorgensen.net using a static type serve with no back end.\
The App currently has two main points:

1. Creates test sudoku\
   **currently there is only one test looking into dynamicly creating more**
2. Will solve any sudoku put into it or will return stating that it is unsolvable\
   **The algorithum used is a recursive backtrace that will go fowards with puting numbers in 1-9 till it hits end or can't move foward. If it can't go forward it will recure to last step and try the next number avalible. This will only stop if it recures to the begining or it gets to the end.**

### to 'Start'

clone the directory to your system then go into the file in a commandline terminal
Once in terminal enter 'yarn install' to download all needed dependencies
**this tool chain was build with create react app**

In the project directory, you can run the following scripts:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

f the needed dependancies stored in yarn.lock
You can then use yarn 'test', 'start' or 'build' scripts

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
