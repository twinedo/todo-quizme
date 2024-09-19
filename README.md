`TODO-APP ` built with expo

to run app:
- make sure you are installing node 18+
- open project on your editor (vscode)
- make sure install yarn
- open terminal, type `yarn install` or `npx expo install` to install dependencies
- open your emulator or real device (usb connected)
- open terminal, type `yarn start`
- menu expo will appear, choose device a for android, i for ios
- or  you can simply install Expo Go from appstore/playstore, enter manually metro server or scan barcode

So the architecture like common expo project.
there are folders such as:
- component: list of component support
- navigations: managing all of navigation such as Bottom Tab, Top Tab, Stack Navigation, type Navigation
- screens: list of view/screens
- services: handle notifications
- stores: managing state for todo app, using `zustand` for simpler setup
- styles: managing styles (empty)
- translations: managing translations (not implemented)
- utils: utilization such as functions

Why i choose the design cause the reference from QuizMe.
When entering the app, user will see Bottom Tab menu with Home as default View. 
Inside Home there are tabs with Monthly & Daily.
Monthly will serve Todo List monthly
Daily will serve Todo List daily
There is plus button to go to Submit Todo Screen (Create and Update)
User can search by title, description, status. And button filter to filter list by status