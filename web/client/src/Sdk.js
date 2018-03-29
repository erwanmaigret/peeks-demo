import React from 'react';
import './Doc.js';

const menuGettingStarted = 'Getting Started';
const menuReference = 'Reference';
const menuExamples = 'Examples';

const code = {
    html: function(name) { return (<span className="textHtmlTag">&lt;{name}&gt;<br/></span>); },
    htmlOpen: function(name) { return (<span className="textHtmlTag">&lt;{name}&nbsp;</span>); },
    htmlClose: function(slash) {
        if (slash) return (<span className="textHtmlTag">/&gt;<br/></span>);
        else return (<span className="textHtmlTag">&gt;<br/></span>);
    },
    var: function(value) { return (<span className="textJsVar">{value}</span>); },
    string: function(value) { return (<span className="textJsString">'{value}'</span>); },
    body: function(value) { return (<span className="textJs">{value}</span>); },
    function: function(value) { return (<span className="textJsFunction">{value}</span>); },
    comment: function(value) { return (<span className="textJsComment">{value}</span>); },
};

function isPhone() {
    var userAgent = navigator.userAgent.toLowerCase();
    var value =
        userAgent.search('iphone') !== -1 ||
        userAgent.search('ipod') !== -1 ||
        userAgent.search('android') !== -1;
    return value;
}

function getLayoutWidth() {
    if (isPhone()) {
        // Always display in portrait mode even if the phone is landscape
        return 0;
        /*
        if (window.orientation !== -90 && window.orientation !== 90) {
            return 0;
        } else {
            return 1;
        }
        */
    } else {
        if (window.innerWidth < 650) {
            return 0;
        } else {
            return 1;
        }
    }
}

class Examples extends React.Component {
    renderImage(element) {
        if (isPhone() && getLayoutWidth() === 0) {
            return (<img src={element.image} alt="product" width="150px" className="box"/>);
        } else {
            return (<img src={element.image} alt="product" width="200px" className="box"/>);
        }
    }

    renderSection(element, isRight, section) {
        const layout = getLayoutWidth();
        if (layout === 0) {
            return (
                <div className={section}>
                <table align="center" width="100%"><tbody><tr><td>
                    <p className="textTitle2">{element.title}</p>
                    <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td></tr>
                <tr><td width="50%">{this.renderImage(element)}</td></tr>
                </tbody></table></div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><table align="center" width="100%">
                    <tbody><tr>
                    <td width="50%">{this.renderImage(element)}</td>
                    <td width="5%"></td>
                    <td width="45%" align="left">
                        <div className="textTitle2">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td>
                    </tr></tbody></table>
                    </div>
                );
            } else {
                return (
                    <div className={section}>
                    <table align="center" width="100%"><tbody><tr>
                        <td width="5%" ></td>
                        <td width="45%" align="left">
                            <div className="textTitle2">{element.title}</div>
                            <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                        </td>
                        <td width="50%">{this.renderImage(element)}</td>
                    </tr></tbody></table>
                    </div>
                );
            }
        }
    }

    render() {
        const elements = {
            'face': {
                title: 'Face Tracking.',
                description:
                    '<p>Add face tracking in <b>10 lines of code</b>!</p>'+
                    '<p>Allow the user to see themselves inside of a viewer and attach any 3d assets to their face</p>' +
                    "<p>This can be used for creating fun experiences of virtually trying products on one's head.</p>" +
                    "<p><a href='https://dev.peeks.io/pages/face.js' target='_blank'>See the code</a> <a href='https://dev.peeks.io/face' target='_blank'>Try it</a></p>"+
                    "",
                image: 'examples/example-face.png',
            },
            'carVR': {
                title: 'Car VR.',
                description:
                '<p>Explore the interior of a car in 360'+
                '</p>',
                image: 'examples/example-car-vr.png',
            },
            'furtinureAR': {
                title: 'Furniture AR.',
                description: '<p>Explore the interior of a car in 360</p>',
                image: 'examples/example-furniture-ar.png',
            },
            'scan3D': {
                title: '3d Scan.',
                description:
                '<p>Explore the interior of a car in 360'+
                '</p>',
                image: 'examples/example-scane-3d.png',
            },
            'visitVR': {
                title: 'VR visit.',
                description:
                '<p>Explore the interior of a car in 360'+
                '</p>',
                image: 'examples/example-visit-vr.png',
            },
            'objectDesigner': {
                title: 'Virtual Designer.',
                description:
                '<p>Create a 3d Object and allow to customize it'+
                '</p>',
                image: 'examples/example-object-designer.png',
            },
            'movies': {
                title: 'Play movies.',
                description:
                    '<p>Integrate movie streams into your experience.</p>',
                image: 'examples/example-movie.png',
            },
            'image360': {
                title: '360 images.',
                description:
                    '<p>Easily create Virtual experiences using 360 images.</p>',
                image: 'examples/example-image360.png',
            },
        };

        return (
            <div>
            {this.renderSection(elements['face'], false, 'sectionBlank')}
            {this.renderSection(elements['carVR'], true, 'sectionBlank')}
            {this.renderSection(elements['furtinureAR'], false, 'sectionBlank')}
            {this.renderSection(elements['scan3D'], true, 'sectionBlank')}
            {this.renderSection(elements['visitVR'], false, 'sectionBlank')}
            {this.renderSection(elements['objectDesigner'], true, 'sectionBlank')}
            {this.renderSection(elements['movies'], false, 'sectionBlank')}
            {this.renderSection(elements['image360'], true, 'sectionBlank')}
            </div>
        );
    }
}

class Sdk extends React.Component {
    constructor(props) {
        super(props)
        let doc = window.PEEKS.generateDoc();
        this.state = {
            menu: menuGettingStarted,
            doc: doc,
            currentClass: doc.rootClass,
        }
    }

    onClickClass(name) {
        this.setState({currentClass: name.name});
    }

    renderClassList() {
        return (
            <div>
                {this.state.doc.classNames.map((name) => {
                    return (<button key={name} className="buttonLink" onClick={(e) => this.onClickClass({name})}>{name}</button>);
                })}
            </div>
        );
    }

    renderCurrentClass() {
        if (this.state.currentClass !== '') {
            var currentClass = this.state.doc.classes[this.state.currentClass];
            return (
                <div>
                <div className="textTitle3">PEEKS.{currentClass.name}</div>
                <div className="textDocumentation" dangerouslySetInnerHTML={{__html: currentClass.doc.description}}/>
                {currentClass.methodNames.map((name) => {
                    return <div key={name} className="textTitle4">
                        {name}({currentClass.methods[name].args})
                        <ul>
                        <div className="textDocumentation2" dangerouslySetInnerHTML={{__html: currentClass.methods[name].description}}/>
                        <div className="textDocumentation2">Returns: {currentClass.methods[name].returnValue}</div>
                        <div className="textDocumentation2" dangerouslySetInnerHTML={{__html: currentClass.methods[name].usage}}/>
                        <div className="textDocumentation2" dangerouslySetInnerHTML={{__html: currentClass.methods[name].example}}/>
                        </ul>
                    </div>;
                })}
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    renderReference() {
        return (
            <div>
            {this.renderClassList()}
            <div className="sectionDocumentation">
                {this.renderCurrentClass()}
            </div>
            </div>
        );
    }

    getBody() {
        switch (this.state.menu) {
            default:
            case menuGettingStarted:
                return (
                    <div>
                        <div className="sectionDocumentation">
                        <div className="textTitle2">Quickstart</div>
                        <div className="textDocumentation">
                            Here is the simplest example to get a Peeks viewer into an html page
                        </div>
                        <div className="textCode">
                            {code.htmlOpen('script')}
                                {code.var('src')}
                                {code.body('=')}
                                {code.string('http://dev.peeks.io/peeks.js')}
                            {code.htmlClose(true)}
                            {code.html('script')}
                            <ul className="codeIndent">
                                {code.function('PEEKS.registerPage')}
                                {code.body("(")}
                                {code.string("widget")}
                                {code.body(", function() {")}
                                <ul className="codeIndent">
                                    {code.body("var page = new ")}
                                    {code.function('PEEKS.Asset')}
                                    {code.body("({")}
                                    <ul className="codeIndent">
                                        {code.body("category: ")}
                                        {code.string("winter")}
                                        {code.body(",")}
                                    </ul>
                                {code.body("});")}<br/>
                                {code.body("return page;")}
                                </ul>
                            {code.body("});")}<br/>
                            {code.function('PEEKS.start')}
                            {code.body("(window, ")}
                            {code.string("widget")}
                            {code.body(");")}<br/>
                            </ul>
                            {code.html('/script')}
                        </div>
                        <div className="textDocumentation">
                            The first step is to load the peeks.js script. Once this is done you can
                            access the sdk through the PEEKS variable. This global variable gives you access to
                            the functions and classes you will need to start the viewer.
                        </div>
                        <div className="textDocumentation">
                            To start a Peeks viewer, you need to define a named page, and then start it with this name.
                        </div>
                        <div className="textTitle2">Populating a page</div>
                        <div className="textDocumentation">
                            A page is a function that returns a PEEKS Asset.
                        </div>
                        <div className="textDocumentation">
                            In PEEKS, every object is an Asset. An Asset is a hierarchical object, with properties, to which you can add child Assets.
                        </div>
                        <div className="textDocumentation">
                            There are different types of Assets. Our starting point is the page which will act as out root Assets.
                        </div>
                        <div className="textTitle2">Creating a widget</div>
                        <div className="textDocumentation">
                            To embed a viewer inside a widget, pass a canvas name at the first argument to the start call.
                        </div>
                            <div className="textCode">
                                {code.htmlOpen('canvas')}
                                    {code.var('id')}
                                    {code.body('=')}
                                    {code.string('peeksView')}
                                    &nbsp;
                                    {code.body('width=400')}
                                    &nbsp;
                                    {code.body('height=300')}
                                {code.htmlClose(true)}
                                {code.htmlOpen('script')}
                                    {code.var('src')}
                                    {code.body('=')}
                                    {code.string('http://dev.peeks.io/peeks.js')}
                                {code.htmlClose(true)}
                                {code.html('script')}
                                <ul className="codeIndent">
                                    {code.function('PEEKS.registerPage')}
                                    {code.body("(")}
                                    {code.string("widget")}
                                    {code.body(", function() {")}
                                    <ul className="codeIndent">
                                        {code.body("var page = new ")}
                                        {code.function('PEEKS.Asset')}
                                        {code.body("({")}
                                        <ul className="codeIndent">
                                            {code.body("category: ")}
                                            {code.string("winter")}
                                            {code.body(",")}
                                        </ul>
                                    {code.body("});")}<br/>
                                    {code.body("return page;")}
                                    </ul>
                                {code.body("});")}<br/>
                                {code.function('PEEKS.start')}
                                {code.body("(")}
                                {code.string("peeksView")}
                                {code.body(", ")}
                                {code.string("widget")}
                                {code.body(");")}<br/>
                                </ul>
                                {code.html('/script')}
                            </div>
                            </div>
                        </div>
                );
            case menuReference:
                return (
                    <div>
                        {this.renderReference()}
                    </div>
                );
            case menuExamples:
                return (
                    <div>
                    <Examples/>
                    </div>
                );
        }
    }

    onClick(menu) {
        this.setState(menu);
    }

    addButton(menu) {
        if (menu === this.state.menu) {
            return (<button className="menuItem2Selected" onClick={(e) => this.onClick({menu})}>{menu}</button>);
        } else {
            return (<button className="menuItem2" onClick={(e) => this.onClick({menu})}>{menu}</button>);
        }
    }

    render() {
        return (
            <div>
                <div className="textTitle">Developer SDK</div>
                <div>
                    {this.addButton(menuGettingStarted)}
                    {this.addButton(menuReference)}
                    {this.addButton(menuExamples)}
                </div>
                <div>
                    {this.getBody()}
                </div>
            </div>
    )}
}

export default Sdk;
