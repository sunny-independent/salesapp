# sales-management

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

Sales Managaement web app :- 
The application stub has been developed by yeoman angular generator.It has been following the basic MVC architecture and all the API calls are interfaced with APIService.The application has been utilized the following libraries,

- Angular Drag and drop lists for DND
- Angular d3 for drawing charts
- Bootstrap for basic layout
- Angular route for state navigation.
- Angular bootstrap for UI modals.

Application has following main routes,

1) Login :- Will have separate view and controller the login operations.
2) Footer :- Will be controlling all the 3 links in footer.
3) Home :- It has a parent home controller which holds all the graphs and lists. It will be resolving all the API calls thru APIService interface. It also has a BlockController which will have a separate instance to controll each block in this page.Which is using the parent child scope mechanism to get the job done.

Home page layout:- 
Can be found under this same directory as "home-page-layout.pdf"

Run the application:-
Source file are in the src/SalesManagement is the project directory.You need the following tools to run the application or build the executables from it. They are,

- Node
- npm
- bower
- grunt-cli
- compass (to compile scss)

Then you have to install the depedencies by doing the following commands,

- npm install (install all dependencies from package.json)
- bower install (install all dependencies from bower.json)
- grunt serve (to get a live dev preview on local server)

Actual source code :- 
This will be lies in the following folder "src/SalesManagement/app/".

Deliverables :- 
The minified source code which can be deployed in any web server is in "src/SalesManagement/dist/"

Working demo video:-
Video has been recorded and put under as "demo-video". Which is in the same directory of readme.


