const Layout = require('../components/Layout');
const NotFoundPage = require('../components/NotFoundPage');
const NotFoundHelpers = require('./helpers/not-found');
const HomePage = require('./home/components/HomePage');
const UncontrolledFormPage = require('./forms/components/UncontrolledPage');
const ControlledFormPage = require('./forms/components/ControlledPage');

module.exports = [
    {
        path: '/',
        component: NotFoundHelpers.withNotFoundPage(Layout, NotFoundPage),
        childRoutes: [
            {
                path: '/',
                component: HomePage,
                exact: true
            },
            {
                path: 'uncontrolled',
                component: UncontrolledFormPage,
                exact: true
            },
            // {
            //     path: 'controlled',
            //     component: ControlledFormPage,
            //     exact: true
            // },
            NotFoundHelpers.CatchAllRoute
        ]
    }
];
