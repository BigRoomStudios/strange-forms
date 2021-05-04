const Layout = require('../components/Layout');
const NotFoundPage = require('../components/NotFoundPage');
const NotFoundHelpers = require('./helpers/not-found');
const UncontrolledFormPage = require('./forms/components/UncontrolledPage');
const ControlledFormPage = require('./forms/components/ControlledPage');
const ComplexValueFormPage = require('./forms/components/ComplexValuePage');
const NestedFormPage = require('./forms/components/NestedPage');
const ConstraintsFormPage = require('./forms/components/ConstraintsPage');
const ListFormPage = require('./forms/components/ListPage');

module.exports = [
    {
        path: '/',
        component: NotFoundHelpers.withNotFoundPage(Layout, NotFoundPage),
        childRoutes: [
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
            {
                path: 'constraints',
                component: ConstraintsFormPage,
                exact: true
            },
            {
                path: 'list',
                component: ListFormPage,
                exact: true
            },
            {
                redirect: { from: '/', to: '/uncontrolled' }
            },
            NotFoundHelpers.CatchAllRoute
        ]
    }
];
