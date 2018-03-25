import React from 'react';

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

class Sdk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: menuGettingStarted,
        }
    }

    getBody() {
        switch (this.state.menu) {
            default:
            case menuGettingStarted:
                return (
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
                );
            case menuReference:
                return (
                    <div className="sectionDocumentation">

                        <div className="textTitle2">Asset</div>
                        <div className="textDocumentation">
                            Root class definition.
                        </div>
                        <div className="textTitle3">addCanvas(params)</div>
                        <ul>
                            Attach and return a 2D Canvas Asset.
                        </ul>
                        <div className="textTitle3">addImage(params)</div>
                        <ul>
                            Attach and return a 2D image asset.
                        </ul>
                        <div className="textTitle3">destroy()</div>
                        <ul>
                            Detach, destroy along with all its child assets.
                        </ul>

                        <div className="textTitle2">Canvas</div>
                        <div className="textDocumentation">
                            2D Asset space fitting into the view, used for screen space assets.
                        </div>
                    </div>
                );
            case menuExamples:
                return (
                    <div>
                    <table align="center" width ='80%'><tbody>
                    <tr>
                    <td>Object Designer</td>
                    <td>Virtual visit</td>
                    </tr>
                    <tr>
                    <td>Face Tracking</td>
                    <td>Movie</td>
                    </tr>
                    <tr>
                    <td>360 images</td>
                    <td>Gaming</td>
                    </tr>
                    </tbody></table>
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
                <p>Integrate Peeks player into your website or webapp</p>
                <div>
                    {this.addButton(menuGettingStarted)}
                    {this.addButton(menuReference)}
                    {this.addButton(menuExamples)}
                </div>
                <div className="sectionA">
                    {this.getBody()}
                </div>
            </div>
    )}
}

export default Sdk;
