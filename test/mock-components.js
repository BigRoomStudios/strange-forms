'use strict';

exports.ComponentSansLifecycle = class {

    constructor(props) {

        this.props = props;
        this.setStates = [];
    }

    setState(values) {

        this.setStates.push(values);
        Object.assign(this.state, values);
    }
};

exports.ComponentWithLifecycle = class extends exports.ComponentSansLifecycle {

    componentWillMount() {

        this.calledWillMount = true;
    }

    componentWillReceiveProps(newProps) {

        this.calledWillReceiveProps = newProps;
    }
};
