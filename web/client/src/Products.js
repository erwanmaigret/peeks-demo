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

class Products extends React.Component {
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
        } else if (element.imageShadows) {
            if (isPhone() && getLayoutWidth() === 0) {
                return (<img src={element.image} alt="product" width="250px" className="box"/>);
            } else {
                return (<img src={element.image} alt="product" width="300px" className="box"/>);
            }
        } else {
            if (isPhone() && getLayoutWidth() === 0) {
                return (<img src={element.image} alt="product" width="250px"/>);
            } else {
                return (<img src={element.image} alt="product" width="300px"/>);
            }
        }
    }

    renderSection(element, isRight, section) {
        const layout = getLayoutWidth();
        if (layout === 0) {
            return (
                <div className={section}>
                <table align="center" width="100%"><tbody><tr><td>
                    <p className="textTitle2" align="left">{element.title}</p>
                    <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td></tr>
                <tr><td width="50%">{this.renderImage(element)}</td></tr>
                </tbody></table></div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="50%">{this.renderImage(element)}</td>
                    <td width="5%"></td>
                    <td width="45%" align="left">
                        <div className="textTitle2">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="5%" ></td>
                    <td width="45%" align="left">
                        <div className="textTitle2">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td><td width="50%">{this.renderImage(element)}</td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

/*
    '<table width="100%" cellspacing="10"><tbody>' +
    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a DOM widget inside your own <b>website</b></td><td width="10%"/>' +
    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a GUI component of a native <b>mobile</b> application.</td><td width="10%"/>' +
    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a <b>customizable ad</b> with video, AR, 3d and animations!</td><td width="10%"/>' +
    '</tbody></table></p>',
*/

    render() {
        const elements = {
            'widget': {
                title: 'Immersive Advertisements',
                description: '<p>Programmatic advertisements integrated with immersive experiences such as virtual try-ons and games increase click-through rates, dwell times and conversion.</p>',
                image: 'snapshot-widget.png',
                imageShadows: true,
                canvas: 'peeks_shoe',
            },
            'tryon': {
                title: 'Virtual Try-ons',
                description: '<p>From makeup to clothes to cars to accessories, virtual try-ons have been shown to engage your audience, increases conversion and customer satisfaction, and dramatically reduce returns.</p>',
                image: 'snapshot-face-tracking.png',
            },
            'browser': {
                title: 'VR/AR E-Commerce Websites',
                description: '<p>Get your brand out in front of the competition by establishing your presence in VR and AR. From specific content to entire websites, our machine learning technology makes it fast and easy to optimize your digital assets for AR and VR.</p>',
                image: 'snapshot-browser.png',
                imageShadows: true,
            },
            'user': {
                title: 'Try-on Avatars',
                description:
                    '<p>Help your customers find the right fit and discover new products by virtually trying on clothes and accessories with an avatar sized to their specific measurements. Our new feature enables customers to use their avatar across multiple websites.</p>',
                image: 'snapshot-user.png',
                imageShadows: true,
            },
        };

        return (
            <div>
            <div className="sectionBlank"><table align="center"><tbody><tr>
            <td width="10%" ></td>
            <td width="80%" align="center">
                <div className="textTitle">Immerse your audience in your brand’s story</div>
            </td><td width="10%"></td>
            </tr></tbody></table></div>
            {this.renderSection(elements['widget'], false, 'sectionGrey')}
            {this.renderSection(elements['tryon'], true, 'sectionBlank')}
            {this.renderSection(elements['browser'], false, 'sectionGrey')}
            {this.renderSection(elements['user'], true, 'sectionBlank')}
            </div>
        );
    }
}

export default Products;
