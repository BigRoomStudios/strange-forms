const { useState } = require('react');
const { default: Card } = require('@material-ui/core/Card');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: CardContent } = require('@material-ui/core/CardContent');
const UncontrolledForm = require('../../../components/Forms/Uncontrolled');

const internals = {};

module.exports = function ControlledPage() {

    const [values, setValues] = useState(null);

    return (<Grid container spacing={3}>
        <Grid item xs={8}>
            <Card>
                <CardContent>
                    <UncontrolledForm onSubmit={setValues} />
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
