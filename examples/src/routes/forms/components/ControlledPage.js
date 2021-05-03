const { useState } = require('react');
const { default: Card } = require('@material-ui/core/Card');
const ControlledForm = require('../../../components/Forms/Controlled');

const internals = {};

module.exports = function ControlledPage() {

    const [values, setValues] = useState(null);

    return (<>
        <Card>
            <ControlledForm onSubmit={setValues} />
        </Card>
        {values && <Card>
            <pre>{JSON.stringify(values, null, 2)}</pre>
        </Card>}
    </>);
};
