'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Mocks = require('./mock-components');
const StrangeForms = require('../src');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const internals = {};

describe('strange-forms', () => {

    const StrangeSansLifecycle = StrangeForms(Mocks.ComponentSansLifecycle);
    const StrangeLifecycle = StrangeForms(Mocks.ComponentWithLifecycle);

    describe('strangeForm()', () => {

        it('initializes state to match fields in props.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_age: '13'
            });

            done();
        });

        it('accepts string for field getter.', (done) => {

            const props = {
                person: {
                    name: 'MVX',
                    age: 13,
                    bogus: true
                }
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: 'person',
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_age: '13'
            });

            done();
        });

        it('accepts object for per-field getter.', (done) => {

            const props = {
                person: {
                    longName: 'MVX'
                },
                throughNull: null,
                color: 'blue'
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: {
                            name: 'person.longName',
                            color: 'color',
                            empty: 'very.empty',
                            null: 'throughNull.empty'
                        },
                        fields: ['name', 'color', 'empty', 'null']
                    });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_color: 'blue'
            });

            done();
        });

        it('accepts object for per-field getter with default (string).', (done) => {

            const props = {
                person: {
                    name: 'MVX',
                    age: 13
                },
                color: 'blue'
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: {
                            color: 'color',
                            '*': 'person'
                        },
                        fields: ['name', 'age', 'color']
                    });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_age: '13',
                _sf_color: 'blue'
            });

            done();
        });

        it('accepts object for per-field getter with default (func).', (done) => {

            const props = {
                person: {
                    name: 'MVX',
                    age: 13
                },
                color: 'blue'
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: {
                            color: (currentProps) => currentProps.color,
                            '*': (currentProps, field) => currentProps.person[field]
                        },
                        fields: ['name', 'age', 'color']
                    });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_age: 13, // No auto-casting when using function
                _sf_color: 'blue'
            });

            done();
        });

        it('accepts function for per-field getter.', (done) => {

            const props = {
                person: {
                    name: 'MVX',
                    age: 13
                }
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: (currentProps, field) => currentProps.person[field],
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_age: 13 // No auto-casting when using function
            });

            done();
        });

        it('defaults fields to empty array.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({});

            done();
        });

        it('throws when props are empty.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor() {

                    super();
                    this.strangeForm({ get: null });
                }
            };

            expect(() => new Component(props)).to.throw('You gotta pass props in constructor with super(props) when using strange-forms.');

            done();
        });

        it('maintains pre-existing state.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.state = { original: 'state' };
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component(props);

            expect(component.state).to.equal({
                original: 'state',
                _sf_name: 'MVX',
                _sf_age: '13'
            });

            done();
        });
    });

    describe('fieldValue()', () => {

        it('gets field value stored in component state.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component(props);

            expect(component.fieldValue('name')).to.equal('MVX');
            expect(component.fieldValue('age')).to.equal('13');

            done();
        });

        it('throws when specifying a non-existent field.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component(props);

            expect(() => component.fieldValue('badField')).to.throw('Field "badField" does not exist in this form.');

            done();
        });
    });

    describe('proposeNew()', () => {

        it('creates a function that will call act with field, form value, and any additional arguments (using defaults).', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: this.act.bind(this),
                        fields: ['name', 'age']
                    });
                }

                act(...args) {

                    this.actedWith = args;
                }
            };

            const component = new Component(props);

            const proposer = component.proposeNew('name');
            const event = { target: { value: 'JRD' } };
            proposer(event, 'extras');

            // Updates local state

            expect(component.setStates).to.equal([
                { _sf_name: 'JRD' }
            ]);

            expect(component.state).to.equal({ _sf_name: 'JRD', _sf_age: '13' });

            // Acts

            expect(component.actedWith).to.equal([
                'name',
                'JRD',
                event,
                'extras'
            ]);

            done();
        });

        it('throws when specifying a non-existent field.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: this.act.bind(this),
                        fields: ['name', 'age']
                    });
                }

                act(...args) {

                    this.actedWith = args;
                }
            };

            const component = new Component(props);

            expect(() => component.proposeNew('badField')).to.throw('Field "badField" does not exist in this form.');

            done();
        });

        it('creates a proposer that calls act on a per-field basis, including a default act.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);

                    this.actedWith = {};

                    this.strangeForm({
                        get: null,
                        act: {
                            name: this.nameAct.bind(this),
                            '*': this.defaultAct.bind(this)
                        },
                        fields: ['name', 'age']
                    });
                }

                nameAct(...args) {

                    this.actedWith.name = args;
                }

                defaultAct(...args) {

                    this.actedWith.defaulted = args;
                }
            };

            const component = new Component(props);

            const nameProposer = component.proposeNew('name');
            const nameEvent = { target: { value: 'JRD' } };
            nameProposer(nameEvent);

            const ageProposer = component.proposeNew('age');
            const ageEvent = { target: { value: '45' } };
            ageProposer(ageEvent);

            // Updates local state

            expect(component.setStates).to.equal([
                { _sf_name: 'JRD' },
                { _sf_age: '45' }
            ]);

            expect(component.state).to.equal({ _sf_name: 'JRD', _sf_age: '45' });

            // Acts

            expect(component.actedWith).to.equal({
                name: ['name', 'JRD', nameEvent],
                defaulted: ['age', '45', ageEvent]
            });

            done();
        });

        it('uses getFormValue option.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: this.act.bind(this),
                        getFormValue: this.getFormValue.bind(this),
                        fields: ['name', 'age']
                    });
                }

                act(...args) {

                    this.actedWith = args;
                }

                getFormValue(...args) {

                    this.gotFormValue = args;
                    return `${args[0].target.value} & MVX`;
                }
            };

            const component = new Component(props);

            const proposer = component.proposeNew('name');
            const event = { target: { value: 'JRD' } };
            proposer(event, 'extras');

            expect(component.gotFormValue).to.equal([event, 'extras']);
            expect(component.state).to.equal({ _sf_name: 'JRD & MVX', _sf_age: '13' });
            expect(component.actedWith).to.equal(['name', 'JRD & MVX', event, 'extras']);

            done();
        });

        it('uses getFormValue option when specified as per-field object.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: this.act.bind(this),
                        getFormValue: {
                            name: this.getFormValueName.bind(this),
                            '*': this.getFormValueDefault.bind(this)
                        },
                        fields: ['name', 'age']
                    });
                }

                act(...args) {

                    this.actedWith = args;
                }

                getFormValueName(...args) {

                    this.gotFormValueName = args;
                    return `${args[0].target.value} & MVX`;
                }

                getFormValueDefault(...args) {

                    this.gotFormValueDefault = args;
                    return String(args[0].target.value);
                }
            };

            const component = new Component(props);

            const nameProposer = component.proposeNew('name');
            const nameEvent = { target: { value: 'JRD' } };
            nameProposer(nameEvent, 'extras');

            expect(component.actedWith).to.equal(['name', 'JRD & MVX', nameEvent, 'extras']);

            const ageProposer = component.proposeNew('age');
            const ageEvent = { target: { value: 45 } };
            ageProposer(ageEvent, 'extras');

            expect(component.actedWith).to.equal(['age', '45', ageEvent, 'extras']);

            expect(component.gotFormValueDefault).to.equal([ageEvent, 'extras']);
            expect(component.state).to.equal({ _sf_name: 'JRD & MVX', _sf_age: '45' });

            done();
        });

        it('uses getFormValue option when passed as argument.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: this.act.bind(this),
                        getFormValue: () => false, // Shouldn't be used
                        fields: ['name', 'age']
                    });
                }

                act(...args) {

                    this.actedWith = args;
                }
            };

            const component = new Component(props);

            let gotFormValue;
            const proposer = component.proposeNew('name', (...args) => {

                gotFormValue = args;
                return `${args[0].target.value} & MVX`;
            });

            const event = { target: { value: 'JRD' } };
            proposer(event, 'extras');

            expect(gotFormValue).to.equal([event, 'extras']);
            expect(component.state).to.equal({ _sf_name: 'JRD & MVX', _sf_age: '13' });
            expect(component.actedWith).to.equal(['name', 'JRD & MVX', event, 'extras']);

            done();
        });

        it('caches function when not using getFormValue argument.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: () => false,
                        getFormValue: () => false,
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            const proposeOne = component.proposeNew('name');
            const proposeTwo = component.proposeNew('name');

            expect(proposeOne).to.be.a.function();
            expect(proposeTwo).to.be.a.function();
            expect(proposeOne).to.shallow.equal(proposeTwo);

            done();
        });

        it('does not cache function when using getFormValue argument.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: () => false,
                        getFormValue: () => false,
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            const getFormValue = () => false;
            const proposeOne = component.proposeNew('name', getFormValue);
            const proposeTwo = component.proposeNew('name', getFormValue);

            expect(proposeOne).to.be.a.function();
            expect(proposeTwo).to.be.a.function();
            expect(proposeOne).to.not.shallow.equal(proposeTwo);

            done();
        });
    });

    describe('fieldError()', () => {

        it('returns error when state and props don\'t match.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: () => false, // No-op
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            component.proposeNew('name')({ target: { value: 'JRD' } });

            expect(component.fieldError('name')).to.equal(true); // Default
            expect(component.fieldError('name', 'error!')).to.equal('error!');

            done();
        });

        it('throws when specifying a non-existent field.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: () => false, // No-op
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            expect(() => component.fieldError('badField')).to.throw('Field "badField" does not exist in this form.');

            done();
        });

        it('returns evaluated error function when state and props don\'t match.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({
                        get: null,
                        act: () => false, // No-op
                        fields: ['name', 'age']
                    });
                }
            };

            const component = new Component(props);

            component.proposeNew('name')({ target: { value: 'JRD' } });

            expect(component.fieldError('name', (...args) => args)).to.equal(['JRD', 'MVX']);

            done();
        });

        it('returns null when state and props do match.', (done) => {

            const props = {
                name: 'MVX',
                age: 13
            };

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component(props);

            expect(component.fieldError('name', true)).to.equal(null);
            expect(component.fieldError('age', true)).to.equal(null);

            done();
        });
    });

    describe('componentWillReceiveProps()', () => {

        it('syncs state with field values in props.', (done) => {

            const Component = class extends StrangeSansLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component({});

            expect(component.state).to.equal({});

            const nextProps = [
                {
                    name: 'MVX',
                    age: 13
                },
                {
                    name: 'JRD',
                    age: 13
                }
            ];

            component.componentWillReceiveProps(nextProps[0]);

            expect(component.state).to.equal({
                _sf_name: 'MVX',
                _sf_age: '13'
            });

            component.componentWillReceiveProps(nextProps[1]);

            expect(component.state).to.equal({
                _sf_name: 'JRD',
                _sf_age: '13'
            });

            expect(component.setStates).to.equal([
                {
                    _sf_name: 'MVX',
                    _sf_age: '13'
                },
                {
                    _sf_name: 'JRD'
                }
            ]);

            done();
        });

        it('calls super\'s method if it exists.', (done) => {

            const Component = class extends StrangeLifecycle {

                constructor(initProps) {

                    super(initProps);
                    this.strangeForm({ get: null, fields: ['name', 'age'] });
                }
            };

            const component = new Component({});

            const nextProps = {
                name: 'MVX',
                age: 13
            };

            component.componentWillReceiveProps(nextProps);
            expect(component.calledWillReceiveProps).to.shallow.equal(nextProps);

            done();
        });
    });
});
