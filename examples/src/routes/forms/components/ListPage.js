const { useState } = require('react');
const { Link } = require('react-router-dom');
const { default: Typography } = require('@material-ui/core/Typography');
const FormValuesLayout = require('./FormValuesLayout');
const ListForm = require('../../../components/Forms/List');
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');
const FormExplainer = require('./FormExplainer');

const internals = {};

module.exports = function ListFormPage() {

    const { Explainer } = internals;
    const [values, setValues] = useState({ ...ListForm.defaults, submitted: false });

    return <FormValuesLayout values={values} explainer={<Explainer />}>
        <ListForm
            {...values}
            component="form"
            onChange={(users) => setValues({ users, submitted: false })}
            onSubmit={(ev) => {

                ev.preventDefault();

                setValues({ ...values, submitted: true });
            }}
        >
            <SubmitButtonRow />
        </ListForm>
    </FormValuesLayout>;
};

internals.Explainer = () => (

    <FormExplainer
        header="List"
        formUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/components/Forms/List.js"
        pageUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/routes/forms/components/ListPage.js"
    >
        <Typography gutterBottom>
            This is a controlled form comprised of arbitrarily many copies of the form component from the <Link to="/controlled">Controlled</Link> example.  The user may click the "+" button to add a new copy of the form.
        </Typography>
        <Typography>
            Strange-forms is not especially well suited to forms with a dynamic number of fields, so it's just as easy to manage this without strange-forms as it is with it, as this example demonstrates.  This is still a good example of how a controlled form built using strange-forms can be composed into a list.
        </Typography>
    </FormExplainer>
);
