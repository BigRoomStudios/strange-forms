const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');
const { default: Button } = require('@material-ui/core/Button');
const { default: RichTextEditor } = require('react-rte');
const { default: Memoize } = require('memoize-one');
const SubmitButtonRow = require('./SubmitButtonRow');

const internals = {};

module.exports = class ComplexValueForm extends StrangeForms(Component) {

    static defaults = {
        name: '',
        email: '',
        spam: true,
        about: ''
    }

    constructor(...args) {

        super(...args);

        const createEditorState = (getString) => {

            // The memoization is necessary, otherwise the local form state object will be recreated
            // every time that the page re-renders rather than just when the about prop changes.
            // To observe an interesting bug, remove the call to Memoize() below, then in the Complex
            // Value example, click "Re-render Parent" after modifying the about WYSIWYG field.
            const memoCreateFromString = Memoize((str) => RichTextEditor.createValueFromString(str, 'markdown'));

            return (props) => memoCreateFromString(getString(props));
        };

        this.strangeForm({
            fields: ['name', 'email', 'spam', 'about'],
            get: {
                // As in other examples, map props to local form state.
                name: (props) => props.name ?? ComplexValueForm.defaults.name,
                email: (props) => props.email ?? ComplexValueForm.defaults.email,
                spam: (props) => props.spam ?? ComplexValueForm.defaults.spam,
                // The about field needs some special handling because its form state is a
                // complex object utilized by react-rte even though the prop is a markdown string.
                about: createEditorState((props) => props.about ?? ComplexValueForm.defaults.about)
            },
            // A no-op act() indicates that this form is uncontrolled, and only has local form state.
            act: () => null,
            getFormValue: {
                '*': (ev) => ev.target.value,
                spam: (ev) => ev.target.checked,
                about: (value) => value
            }
        });
    }

    handleSubmit = (ev) => {

        ev.preventDefault();

        this.props.onSubmit({
            name: this.fieldValue('name'),
            email: this.fieldValue('email'),
            spam: this.fieldValue('spam'),
            // On submission, map the local form state object used by react-rte back to a markdown string.
            about: this.fieldValue('about').toString('markdown')
        });
    }

    render() {

        const { onClickRerender, ...others }  = this.props;

        return <Grid
            container
            spacing={3}
            {...others}
            component="form"
            onSubmit={this.handleSubmit}
        >
            <Grid item xs={4}>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={this.fieldValue('name')}
                    onChange={this.proposeNew('name')}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={this.fieldValue('email')}
                    onChange={this.proposeNew('email')}
                />
            </Grid>
            <Grid item xs={4} container alignItems="center">
                <FormControlLabel
                    label="Send me spam"
                    control={<Checkbox
                        checked={this.fieldValue('spam')}
                        onChange={this.proposeNew('spam')}
                    />}
                />
            </Grid>
            <Grid item xs={8}>
                <RichTextEditor
                    placeholder="About"
                    value={this.fieldValue('about')}
                    onChange={this.proposeNew('about')}
                    toolbarConfig={internals.toolbarConfig}
                />
            </Grid>
            <Grid item xs={4} container justify="center">
                <Button type="button" variant="outlined" color="secondary" onClick={onClickRerender}>
                    Re-render Parent
                </Button>
            </Grid>
            <SubmitButtonRow />
        </Grid>;
    }
};

internals.toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
    ]
};
