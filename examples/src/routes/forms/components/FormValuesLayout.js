const T = require('prop-types');
const { default: Card } = require('@material-ui/core/Card');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: CardContent } = require('@material-ui/core/CardContent');

module.exports = function FormValuesLayout({ values, children, ...others }) {

    return (<Grid container spacing={3} {...others}>
        <Grid item xs={8}>
            <Card>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            {values && <Card>
                <CardContent>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </CardContent>
            </Card>}
        </Grid>
    </Grid>);
};

module.exports.propTypes = {
    values: T.object,
    children: T.any
};
