import React, { Component } from 'react';

class Home extends Component {
    renderExample(element) {
        if (element.image) {
            return (
                <img src={element.image} alt="product1" height='400px'/>
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
                <div>
                <table align="center" width="100%"><tbody>
                <tr>
                <td width="10%"></td>
                <td width="80%">
                    <p className="textTitle">{element.title}</p>
                    <p className="textDescription" dangerouslySetInnerHTML={{__html: element.description}}></p>
                </td>
                <td width="10%"></td>
                </tr>
                <tr></tr>
                </tbody></table>{this.renderExample(element)}</div>
            );
        } else {
            if (isRight) {
                return (
                    <div><table align="center"><tbody><tr>
                    <td width="50%">{this.renderExample(element)}</td>
                    <td width="40%">
                        <p className="textTitle" align="left">{element.title}</p>
                        <p className="textDescription" align="left" dangerouslySetInnerHTML={{__html: element.description}}></p>
                    </td>
                    <td width="10%"></td>
                    </tr></tbody></table></div>
                );
            } else {
                return (
                    <div><table align="center"><tbody><tr>
                    <td width="10%"></td>
                    <td width="40%">
                        <p className="textTitle" align="left">{element.title}</p>
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
                title: 'We make AR and VR a reality.',
                description: '<p>Immersive web and mobile VR/AR technology now made available to the retail industry.</p><p>Turn all your inventory into AR. Customers have fun purchasing online using our AR tool. It brings the fitting room into their hands.</p>',
                image: "snapshot-product-1.png",
            },
            'browser': {
                title: 'Web-browser friendly.',
                description: '<p>Wether your store is accessible from the web or a native application, our technology brings VR to all software environments.</p>' +
                    '<p>We support all inventories, no kidding. Food, furniture, clothes, buildings, cars.. all!</p>',
                image: "snapshot-product-2.png",
            },
            'headset': {
                title: 'Headset compatible.',
                description: '<p>If you have a VR Headset, you can make it even more immersive.</p>' +
                    '<p>We are compatible with all VR headsets from the simplest <b>Google Cardboard</b></p>',
                image: "snapshot-product-3.png",
            },
        };

        return (
            <div>
            {this.renderSection(elements['intro'], false, 'sectionBlank')}
            {this.renderSection(elements['browser'], true, 'sectionBlank')}
            {this.renderSection(elements['headset'], false, 'sectionBlank')}
            </div>
        );
    }
}

export default Home;
