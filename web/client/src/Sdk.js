import React from 'react';

const menuGettingStarted = 'Getting Started';
const menuReference = 'Reference';
const menuExamples = 'Examples';

/*
<html>
    <head>
        <title>example</title>
        <link rel="stylesheet" href="http://dev.peeks.io/stylesheets/style.css">
    </head>
    <body>
        <header>
        </header>
        <section id="wrapper">
            <script src="http://dev.peeks.io/peeks.js"></script>
            <script>
                // Declare the behavior of your peeks page:
                PEEKS.registerPage('widget', function() {
                    var page = new PEEKS.Asset({
                        category: 'winter',
                    });
                    return page;
                });
                // Start that page full-screen
                PEEKS.start(window, 'widget');
            </script>
        </section>
    </body>
</html>

*/

class Sdk extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: menuGettingStarted,
        }
    }

    codeHtmlIndent(indent) {
        if (indent && indent > 0) {
            return (<div>&nbsp;{this.codeHtmlIndent(indent-1)}</div>);
        } else {
            return (<div></div>);
        }
    }

    codeHtmlTag(text, indent) {
        return (
            <div>&lt;{text}/&gt;<br/></div>
        );
    }

    codeHtmlTagStart(text) {
        return (
            <div>&lt;{text}&gt;<br/></div>
        );
    }

    codeHtmlTagEnd(text) {
        return (
            <div>&lt;/{text}&gt;<br/></div>
        );
    }

    codeHtmlLine(text) {
        return (
            <div>{text}<br/></div>
        );
    }

    getBody() {
        switch (this.state.menu) {
            default:
            case menuGettingStarted:
                return (
                    <div className="sectionDocumentation">
                        <div className="textTitle2">Quickstart</div>
                        <div className="textDocumentation">
                            To use the Peeks SDK you   just need to load the JS library.
                        </div>
                        <div className="textCode">
                            {this.codeHtmlTag('script src="http://dev.peeks.io/peeks.js"')}
                            {this.codeHtmlTagStart('script')}
                            <ul className="codeIndent">
                            {this.codeHtmlLine("PEEKS.registerPage('widget', function() {")}
                            <ul className="codeIndent">
                            {this.codeHtmlLine("var page = new PEEKS.Asset({")}
                            <ul className="codeIndent">
                            {this.codeHtmlLine("category: 'winter',")}
                            </ul>
                            {this.codeHtmlLine("});")}
                            {this.codeHtmlLine("return page;")}
                            </ul>
                            {this.codeHtmlLine("});")}
                            </ul>
                            {this.codeHtmlTagEnd('script')}
                        </div>
                        <div className="textTitle2">Creating a scene</div>
                        <div className="textDocumentation">
                            ...
                        </div>
                        <div className="textTitle2">Creating a widget</div>
                        <div className="textDocumentation">
                            ....
                        </div>
                    </div>
                );
            case menuReference:
                return (
                    <div className="sectionDocumentation">
                        Reference
                    </div>
                );
            case menuExamples:
                return (
                    <div className="sectionDocumentation">
                        Exampls
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
                <div className="sectionA">
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
