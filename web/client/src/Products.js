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
                    <p className="textTitle">{element.title}</p>
                    <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
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
                        <div className="textTitle">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="5%" ></td>
                    <td width="45%" align="left">
                        <div className="textTitle">{element.title}</div>
                        <div className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></div>
                    </td><td width="50%">{this.renderImage(element)}</td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

    render() {
        const elements = {
            'widget': {
                title: 'Peeks Widget.',
                description: '<p>Enable <b>Augmented Reality</b> and <b>Virtual Reality</b> within your digital properties.</p><p>The peeks player can be embedded as a widget inside your own solution:'+
                '<table width="100%" cellspacing="10"><tbody>' +
                '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a DOM widget inside your own <b>website</b></td><td width="10%"/>' +
                '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a GUI component of a native <b>mobile</b> application.</td><td width="10%"/>' +
                '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet.svg" alt="bullet" width="20px"/></td><td align="left">As a <b>customizable ad</b> with video, AR, 3d and animations!</td><td width="10%"/>' +
                '</tbody></table></p>',
                image: 'snapshot-widget.png',
                imageShadows: true,
                canvas: 'peeks_shoe',
            },
            'tryon': {
                title: 'Fitting Room.',
                description: '<p>Enter the virtual fitting room and try-on products on yourself.</p>'+
                    '<p>Use the best solution adapted to your products:' +
                    '<table width="100%" cellspacing="10"><tbody>' +
                    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">AR <b>Face tracking</b> for head wearables (glasses, hats).</td><td width="10%"/>' +
                    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">2D photo montages from simple photographs.</td><td width="10%"/>' +
                    '<tr><td width="10%"/><td align="right"><img src="/ui-shape-bullet2.svg" alt="bullet" width="20px"/></td><td align="left">Full body <b>3D avatar</b> mapping.</td><td width="10%"/>' +
                    '</tbody></table></p>',
                image: 'snapshot-face-tracking.png',
            },
            'browser': {
                title: 'VR Browser.',
                description: '<p>Explore and navigate through all your inventory inside an <b>immersive 3d</b> environment using a Virtual Reality heaset.</p>' +
                    '<p>Expose your products in our VR browser and get more exposure.</p>',
                image: 'snapshot-browser.png',
                imageShadows: true,
            },
            'user': {
                title: 'User Profile.',
                description:
                    '<p>Let your customers setup their user profile and <b>virtual mannequin</b> for optimized shopping experience.</p>' +
                    '<p>Collect new types of <b>analytics</b> for a more targeted product recommendation.</p>',
                image: 'snapshot-user.png',
                imageShadows: true,
            },
        };

        return (
            <div>
            <div className="textTitle">A solution for everyone</div>
            <div className="textDescription">Extend your brand with the right Mixed Reality experience for your clients.</div>
            <img src="/ui-shape-underline.svg" alt="underline" width="50%"/>
            {this.renderSection(elements['widget'], false, 'sectionBlank')}
            {this.renderSection(elements['tryon'], true, 'sectionBlank')}
            {this.renderSection(elements['browser'], false, 'sectionBlank')}
            {this.renderSection(elements['user'], true, 'sectionBlank')}
            </div>
        );
    }
}

export default Products;
