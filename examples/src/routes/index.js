const Layout = require('../components/Layout');
const NotFoundPage = require('../components/NotFoundPage');
const NotFoundHelpers = require('./helpers/not-found');
const HomePage = require('./home/components/HomePage');
const UncontrolledFormPage = require('./forms/components/UncontrolledPage');
const ControlledFormPage = require('./forms/components/ControlledPage');
const ComplexValueFormPage = require('./forms/components/ComplexValuePage');
const NestedFormPage = require('./forms/components/NestedPage');

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
            {
                path: 'controlled',
                component: ControlledFormPage,
                exact: true
            },
            {
                path: 'complex-value',
                component: ComplexValueFormPage,
                exact: true
            },
            {
                path: 'nested',
                component: NestedFormPage,
                exact: true
            },
            NotFoundHelpers.CatchAllRoute
        ]
    }
];
