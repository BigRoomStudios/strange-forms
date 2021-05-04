const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ComplexValueForm = require('../../../components/Forms/ComplexValue');
const { default: Typography } = require('@material-ui/core/Typography');
const FormExplainer = require('./FormExplainer');

const internals = {};

module.exports = function ComplexValueFormPage() {

    const { Explainer } = internals;
    const [update, setUpdate] = useState(0);
    const [values, setValues] = useState({ ...ComplexValueForm.defaults, submitted: false });

    return <FormValuesLayout values={values} explainer={<Explainer />}>
        <ComplexValueForm
            {...values}
            onSubmit={(result) => setValues({ ...result, submitted: true })}
            onClickRerender={() => setUpdate(update + 1)}
        />
    </FormValuesLayout>;
};

internals.Explainer = () => (

    <FormExplainer
        header="Complex Value"
        formUrl="/"
        pageUrl="/"
    >
        <Typography gutterBottom>
            This is an uncontrolled form containing a complex value.  The state of the WYSIWYG editor used for the "About" field is represented by an object.  Objects are special because no two objects are referentially identical (<code>obj1 !== obj2</code>).  The other form values are strings and booleans, which can be referentially identical (<code>str1 === str2</code> if they contain the same content).
        </Typography>
        <Typography gutterBottom>
            A common pitfall when managing complex values is to manage them only as local state, and when the form's parent component re-renders for any reason, to recreate that state.  This could cause you to lose progress made by the user if something causes the form to re-render.  This can be handled in strange-forms by memoizing the result of the field's <code>get()</code>.
        </Typography>
        <Typography>
            Try removing the call to <code>Memoize()</code> in the form's implementation.  Then type in the "About" field, and click "Re-render Parent" prior to clicking "Submit."  You should see the user's progress editing their "About" field reset to its value at the time of the last submission, which would be a bug!
        </Typography>
    </FormExplainer>
);
