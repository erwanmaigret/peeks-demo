import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLearnMore = this.handleLearnMore.bind(this);
        this.handleViewProducts = this.handleViewProducts.bind(this);
        this.handleRequestTrial = this.handleRequestTrial.bind(this);
    }

    handleLearnMore(event) {
        event.preventDefault();
        window.open('/about', '_self');
    }

    handleViewProducts(event) {
        event.preventDefault();
        window.open('/products', '_self');
    }

    handleRequestTrial(event) {
        event.preventDefault();
        window.open('/#trial', '_self');
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.email !== '' && this.state.message !== '') {
            let url = 'https://dev.peeks.io/mailer?' +
                'email:' + encodeURIComponent(this.state.email) + '&' +
                'message:' + encodeURIComponent(this.state.message);
                var xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, true);
            xhttp.send();

            this.setState({
                email: '',
                message: '',
            });
        }
    }

    renderExample(element) {
        if (element.image) {
            return (
                <img aling="center" src={element.image} alt="product1" width='80%' vspace="50"/>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderSection(element, isRight, section) {
        let buttonClass = (section === 'sectionDark') ? "inputPurple" : "inputDark";
        if (window.innerWidth < 650) {
            return (
                <div className={section}>
                <table align="center" width="100%"><tbody>
                <tr>
                <td width="10%"></td>
                <td width="80%">
                    <h2>{element.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: element.description}}></p>
                    <form onSubmit={element.buttonAction}>
                        <input type="submit" className={buttonClass} value={element.button}/>
                    </form>
                </td>
                <td width="10%"></td>
                </tr>
                </tbody></table>
                    <div align="center">
                    {this.renderExample(element)}
                    </div>
                </div>
            );
        } else {
            if (isRight) {
                return (
                    <div className={section}><br/>
                    <table align="center"><tbody><tr>
                    <td width="50%" align="center">{this.renderExample(element)}</td>
                    <td width="40%">
                        <h2>{element.title}</h2>
                        <p dangerouslySetInnerHTML={{__html: element.description}}></p>
                        <form onSubmit={element.buttonAction}>
                            <input type="submit" className={buttonClass} value={element.button}/>
                        </form>
                    </td>
                    <td width="10%"></td>
                    </tr></tbody></table>
                    <br/><br/></div>
                );
            } else {
                return (
                    <div className={section}><br/>
                    <table align="center"><tbody><tr>
                    <td width="10%"></td>
                    <td width="40%">
                        <h2>{element.title}</h2>
                        <p dangerouslySetInnerHTML={{__html: element.description}}></p>
                        <form onSubmit={element.buttonAction}>
                            <input type="submit" className={buttonClass} value={element.button}/>
                        </form>
                    </td>
                    <td width="50%" align="center">{this.renderExample(element)}</td>
                    </tr></tbody></table>
                    <br/><br/></div>
                );
            }
        }
    }

    renderContactPart1(section) {
        return (
            <div>
                <a name="trial"><h2>Request Trial</h2></a>
                <h4>Our VR technology is ultra easy to implement!</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
                    <textarea placeholder="Message" value={this.state.message} onChange={this.handleMessageChange} />
                    <div align="right">
                        <input className="inputDark" type="submit" value="Send" />
                    </div>
                </form>
                <br/>
            </div>
        );
    }

    renderContactPart2(section) {
        return (
            <div>
                <table width="100%"><tbody>
                <tr height="30px"/>
                <tr>
                <td width="10%"></td>
                <td width="40%"><img className='iconBig' align="right" hspace="20" src="/icon_email_blue.png" alt="email"/></td>
                <td width="40%"><b>Email Us</b><p><a href='mailto:info@peekss.io'>info@peeks.io</a></p></td>
                <td width="10%"></td>
                </tr>
                <tr height="30px"/>
                <tr>
                <td width="10%"></td>
                <td width="20%"><img className='iconBig' align="right" hspace="20" src="/icon_twitter_blue.png" alt="twitter"/></td>
                <td width="60%"><b>Follow Us</b><p><a href='https://twitter.com/PeeksIo'>twitter</a></p></td>
                <td width="10%"></td>
                </tr>
                <tr height="30px"/>
                </tbody></table>
            </div>
        );
    }

    renderContact(section) {
        if (window.innerWidth < 650) {
            return (
                <div className={section}>
                <table width="100%"><tbody><tr>
                <td width="10%"></td>
                <td width="80%">
                    {this.renderContactPart1()}
                </td>
                <td width="10%"></td>
                </tr><tr>
                <td width="15%"></td>
                <td width="70%">
                    {this.renderContactPart2()}
                </td>
                <td width="15%"></td>
                </tr></tbody></table>
                </div>
            );
        } else {
            return (
                <div className={section}>
                <table width="100%"><tbody><tr>
                <td width="10%"></td>
                <td width="40%">
                    {this.renderContactPart1()}
                </td>
                <td width="10%"></td>
                <td width="30%">
                    {this.renderContactPart2()}
                </td>
                <td width="10%"></td>
                </tr></tbody></table>
                </div>
            );
        }
    }

    render() {
        const elements = {
            'intro': {
                title: 'Portable, powerful, engaging AR & VR',
                description: '<p>Reach your audience in new ways with <b>Peeks</b>.</p><p>Virtual try-ons, immersive websites, and engaging experiences that increase conversion, upselling from recommendations, and customer retention.</p>',
                image: "snapshot-product-1.png",
                button: "Learn More",
                buttonAction: this.handleLearnMore,
            },
            'browser': {
                title: 'It just works',
                description: '<p>No special apps or plug-in to download.</p><p>Creating and incorporating immersive content is easy and within your existing website, mobile app, and digital advertisements.</p><p>Our machine learning technology makes optimizing your existing content for AR and VR fast.</p>',
                image: "snapshot-product-2.jpg",
                button: "View Products",
                buttonAction: this.handleViewProducts,
            },
            'headset': {
                title: 'You don’t need previous expertise in VR or AR',
                description: '<p>Peeks is designed to easily integrate into your existing creative workflow.</p><p>This mean your creative team doesn’t need to ramp up or change the way they work.</p><p>Publishing content in AR and VR and is easy and fast.</p>',
                image: "snapshot-product-3.png",
                button: "Request Trial",
                buttonAction: this.handleRequestTrial,
            },
        };

        return (
            <div>
                {this.renderSection(elements['intro'], false, 'sectionDark')}
                {this.renderSection(elements['browser'], true, 'sectionBlank')}
                {this.renderSection(elements['headset'], false, 'sectionDark')}
                {this.renderContact('sectionBlank')}
            </div>
        );
    }
}

export default Home;
