import React, { Component } from 'react';
//import { Timeline } from 'react-twitter-widgets'

class Home extends Component {
    renderExample(element) {
        if (element.image) {
            return (
                <img src={element.image} alt="product1" width='300px'/>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderSection(element, isRight, section) {
        if (window.innerWidth < 650) {
            return (
                <div className={section}>
                <table align="center" width="100%"><tbody>
                <tr>
                <td width="10%"></td>
                <td width="80%">
                    <p className="textTitle2" align="left">{element.title}</p>
                    <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td>
                <td width="10%"></td>
                </tr>
                <tr></tr>
                </tbody></table>{this.renderExample(element)}</div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="50%">{this.renderExample(element)}</td>
                    <td width="40%">
                        <p className="textTitle2" align="left">{element.title}</p>
                        <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td>
                    <td width="10%"></td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div className={section}><table align="center"><tbody><tr>
                    <td width="10%"></td>
                    <td width="40%">
                        <p className="textTitle2" align="left">{element.title}</p>
                        <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td>
                    <td width="50%">{this.renderExample(element)}</td>
                    </tr></tbody></table></div>
                );
            }
        }
    }

    render() {
        const elements = {
            'intro': {
                title: 'Portable, powerful, engaging AR & VR',
                description: '<p>Reach your audience in new ways with <b>Peeks</b>.</p><p>Virtual try-ons, immersive websites, and engaging experiences that increase conversion, upselling from recommendations, and customer retention.</p>',
                image: "snapshot-product-1.png",
            },
            'browser': {
                title: 'It just works',
                description: '<p>No special apps or plug-in to download.</p><p>Creating and incorporating immersive content is easy and within your existing website, mobile app, and digital advertisements.</p><p>Our machine learning technology makes optimizing your existing content for AR and VR fast.</p>',
                image: "snapshot-product-2.png",
            },
            'headset': {
                title: 'You don’t need previous expertise in VR or AR',
                description: '<p>Peeks is designed to easily integrate into your existing creative workflow.</p><p>This mean your creative team doesn’t need to ramp up or change the way they work.</p><p>Publishing content in AR and VR and is easy and fast.</p>',
                image: "snapshot-product-3.png",
            },
        };

        return (
            <div>
                {this.renderSection(elements['intro'], false, 'sectionBlank')}
                {this.renderSection(elements['browser'], true, 'sectionGrey')}
                {this.renderSection(elements['headset'], false, 'sectionBlank')}
            </div>
        );
    }
}

export default Home;
