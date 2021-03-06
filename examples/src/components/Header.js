const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: AppBar } = require('@material-ui/core/AppBar');
const { default: Toolbar } = require('@material-ui/core/Toolbar');
const { default: Button } = require('@material-ui/core/Button');

const internals = {};

module.exports = () => {

    const { Link, SiteTitle } = internals;

    return (
        <AppBar position='static'>
            <Toolbar>
                <SiteTitle>strange-forms</SiteTitle>
                <Link to='/uncontrolled'>Uncontrolled</Link>
                <Link to='/controlled'>Controlled</Link>
                <Link to='/complex-value'>Complex Value</Link>
                <Link to='/nested'>Nested</Link>
                <Link to='/constraints'>Constraints</Link>
                <Link to='/list'>List</Link>
            </Toolbar>
        </AppBar>
    );
};

internals.Link = Styled(Button).attrs({ component: NavLink, color: 'inherit' })`
    &.active {
        font-weight: bold;
        text-decoration: underline;
    }
`;

internals.SiteTitle = Styled(Typography).attrs({ variant: 'h6' })`
    flex-grow: 1;
`;
