import React from 'react';

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
    } else {
        if (window.innerWidth < 650) {
            return 0;
        } else {
            return 1;
        }
    }
}

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.handleLearnMore = this.handleLearnMore.bind(this);
    }

    handleLearnMore(event) {
        event.preventDefault();
        window.open('/about', '_self');
    }

    renderImage(element) {
        if (typeof (element.canvas) === 'string') {
            const script = document.createElement('script');
            script.async = true;
            script.src = "/widgets_load_products.js";
            document.body.appendChild(script);
            if (isPhone()) {
                return (<canvas id={element.canvas} width="200px" height="180px" className="widget"/>);
            } else {
                return (<canvas id={element.canvas} width="300px" height="250px" className="widget"/>);
            }
        } else if (element.imageFull) {
            return (<img src={element.image} alt="product" width="100%" className="boxFill"/>);
        } else {
            if (isPhone() && getLayoutWidth() === 0) {
                return (<img src={element.image} alt="product" width="250px"/>);
            } else {
                return (<img src={element.image} alt="product" width="80%"/>);
            }
        }
    }

    renderSection(element, isRight, section) {
        const layout = getLayoutWidth();
        if (layout === 0) {
            return (
                <div className={section}>
                <table align="center" width="100%" border="0" cellSpacing="0" cellPadding="0"><tbody><tr><td>
                    <p className="textTitle2" align="left">{element.title}</p>
                    <div className="textDescription" align="left">{element.description()}</div>
                </td></tr>
                <tr><td width="100%" align="center">{this.renderImage(element)}</td></tr>
                </tbody></table></div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><table align="center" border="0" cellSpacing="0" cellPadding="0"><tbody><tr>
                    <td width="50%">{this.renderImage(element)}</td>
                    <td width="2%"></td>
                    <td width="45%" align="left">
                        <div className="textTitle2">{element.title}</div>
                        <div className="textDescription">{element.description()}</div>
                    </td>
                    <td width="3%"></td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div className={section}><table align="center" border="0" cellSpacing="0" cellPadding="0"><tbody><tr>
                    <td width="5%" ></td>
                    <td width="45%" align="left">
                        <div className="textTitle2">{element.title}</div>
                        <div className="textDescription">{element.description()}</div>
                    </td><td width="50%">{this.renderImage(element)}</td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

    render() {
        const elements = {
            'widget': {
                title: 'Immersive Advertisements',
                description: function () {return (
                    <div>
                    Programmatic advertisements integrated with immersive experiences such as virtual try-ons and games:
                    <table width="100%" cellSpacing="10"><tbody>
                        <tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">Increase click-through rates</td><td width="10%"/></tr>
                        <tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">Dwell times and conversion</td><td width="10%"/></tr>
                        <tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">Are interactive, try it!</td><td width="10%"/></tr>
                    </tbody></table>
                    <table width="100%" cellSpacing="10"><tbody>
                        <tr>
                        <td width="10%"/>
                        <td align="center"><img src="/icon_android.png" alt="vr" width="20px"/></td>
                        <td align="center"><img src="/icon_apple.png" alt="vr" width="20px"/></td>
                        <td align="center"><img src="/icon_chrome.png" alt="vr" width="20px"/></td>
                        <td align="center"><img src="/icon_edge.png" alt="vr" width="20px"/></td>
                        <td align="center"><img src="/icon_firefox.png" alt="vr" width="20px"/></td>
                        <td align="center"><img src="/icon_html5.png" alt="vr" width="20px"/></td>
                        <td align="center"><img src="/icon_safari.png" alt="vr" width="20px"/></td>
                        <td width="10%"/>
                        </tr>
                    </tbody></table>
                    </div>
                );},
                image: 'snapshot-widget.png',
                imageFull: true,
                canvas: 'peeks_shoe',
            },
            'tryon': {
                title: 'Virtual Try-ons',
                description: function () {return (
                    <div>
                    From makeup to clothes to cars to accessories, virtual try-ons have been shown to:
                    <table width="100%" cellSpacing="10"><tbody>
                        <tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">Engage your audience</td><td width="10%"/></tr>
                        <tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">Increases conversion and customer satisfaction</td><td width="10%"/></tr>
                        <tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">Dramatically reduce returns</td><td width="10%"/></tr>
                    </tbody></table>
                    </div>
                );},
                imageFull: true,
                image: 'snapshot-face-tracking.png',
            },
            'browser': {
                title: 'VR/AR E-Commerce Websites',
                description: function () {return (<div>
                    <p>
                    Get your brand out in front of the competition by establishing your presence in VR and AR.
                    </p><p>
                    From specific content to entire websites, our machine learning technology makes it fast and easy to optimize your digital assets for AR and VR.
                    </p>
                    <table width="100%" cellSpacing="0" cellPadding="0"><tbody>
                        <tr>
                        <td align="center"><img src="/icon_daydream.png" alt="vr" width="40px"/></td>
                        <td align="center"><img src="/icon_gear_vr.png" alt="vr" width="40px"/></td>
                        <td align="center"><img src="/icon_htc_vive.png" alt="vr" width="40px"/></td>
                        <td align="center"><img src="/icon_microsoft.png" alt="vr" width="40px"/></td>
                        <td align="center"><img src="/icon_oculus.png" alt="vr" width="40px"/></td>
                        <td align="center"><img src="/icon_playstation_vr.png" alt="vr" width="40px"/></td>
                        <td align="center"><img src="/icon_google_cardboard.png" alt="vr" width="40px"/></td>
                        </tr>
                    </tbody></table>
                </div>);},
                image: 'snapshot-browser.png',
                imageFull: true,
            },
            'user': {
                title: 'Try-on Avatars',
                image: 'snapshot-user.png',
                description: function () {return (<div>
                    <p>
                    Help your customers find the right fit and discover new products by virtually trying on clothes and accessories with an avatar sized to their specific measurements.
                    </p><p>
                    Our new feature enables customers to use their avatar across multiple websites.
                    </p>
                </div>);},
                imageFull: true,
            },
        };

        return (
            <div>
            <div className="sectionDark" align="center">
            <br/><br/>
            <table align="center" width="100%"><tbody><tr>
            <td width="5%" ></td>
            <td width="90%" align="center">
                <h1>Our Products</h1>
                <h4>Immerse your audience in your brand’s story</h4>
                <form onSubmit={this.handleLearnMore}>
                    <input type="submit" className="inputLight" value="Learn More"/>
                </form>
            </td><td width="5%"></td>
            </tr></tbody></table>
            <br/><br/><br/>
            </div>
            <div className="sectionGrey" align="center">
            <br/>
            <table align="center" width="100%"><tbody><tr>
            <td width="5%" ></td>
            <td width="90%" align="center">
                <h3>What We Offer</h3>
                <table align="center" width="100%" cellSpacing="40px"><tbody><tr>
                <td align="center"><h5>Programmatic Adverts</h5></td>
                <td align="center"><h5>Try-on Avatars</h5></td>
                <td align="center"><h5>VR/AR E-Commerce Websites</h5></td>
                </tr></tbody></table>
            </td><td width="5%"></td>
            </tr></tbody></table>
            <br/>
            </div>
            {this.renderSection(elements['widget'], false, 'sectionBlank')}
            {this.renderSection(elements['user'], true, 'sectionDark')}
            {this.renderSection(elements['browser'], false, 'sectionBlank')}
            </div>
        );
    }
}

export default Products;
