import React, { useState } from 'react'



export default function TextForm(props) {

    const [text, setText] = useState('');
    const [extractedEmails, setExtractedEmails] = useState([]);
    const [extractedPhoneNumbers, setExtractedPhoneNumbers] = useState([]);

    const [extractedLinks, setExtractedLinks] = useState([]);


    // convert uppercase 
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Upper Case!", "success")
    }

    // to convert lowercase
    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lower Case!", "success")

    }

    // clear the text 
    const handleToClear = () => {
        setText(" ")
        props.showAlert("Text have been cleared!", "success")
    }

    // copy to clipboard
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(text);
            props.showAlert("Text copied to clipboard!", "success")

        } catch (error) {
            console.error('Error copying text:', error);
            props.showAlert("Failed to copy text!", "warning")

        }
    }

    // Remove extra spaces
    const handleRemoveSpaces = () => {
        let newText = text.replace(/\s+/g, ' ').trim(); // Replace multiple spaces with a single space and remove leading/trailing spaces
        setText(newText);
        props.showAlert("Extra spaces removed!", "success");
    };


    // extract email 

    const handleExtractEmail = () => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const extractedEmails = text.match(emailRegex) || [];
        setExtractedEmails(extractedEmails);

        if (extractedEmails.length === 0) {
            props.showAlert("No email addresses found.", "warning");
        } else {
            setExtractedEmails(extractedEmails);
            props.showAlert("Email addresses have been extracted.", "success");
        }

    };


    // extract phone number 
    const handleExtractPhoneNumber = () => {
        const phoneRegex = /(?:\+\d{1,3})?(?:[ -]?\(?\d{2,3}\)?[ -]?)?\d{3,4}[ -]?\d{3,4}[ -]?\d{3,4}/g;
        const extractedPhoneNumbers = text.match(phoneRegex) || [];
        setExtractedPhoneNumbers(extractedPhoneNumbers);

        if (extractedPhoneNumbers.length === 0) {
            props.showAlert("No phone numbers found.", "warning");
        } else {
            setExtractedPhoneNumbers(extractedPhoneNumbers);
            props.showAlert("Phone numbers have been extracted.", "success");
        }
    };



    // Extract links
    const handleExtractLinks = () => {
        const linkRegex = /(?:https?:\/\/|www\.)[^\s]+/g;
        const extractedLinks = text.match(linkRegex) || [];

        // Add missing protocols to links without http/https
        const linksWithProtocol = extractedLinks.map(link => {
            if (!link.startsWith('http://') && !link.startsWith('https://')) {
                return 'https://' + link;
            }
            return link;
        });

        setExtractedLinks(linksWithProtocol);
        // props.showAlert("Links have been extracted", "success");

        if (linksWithProtocol.length === 0) {
            props.showAlert("No links found.", "warning");
        } else {
            setExtractedLinks(linksWithProtocol);
            props.showAlert("Links have been extracted", "success");
        }
    };




    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    // const [text, setText] = useState('');

    return (
        <>
            <div className='container' style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>{props.heading} </h1>
                <div className="mb-3">
                    <textarea className="form-control border-dark-subtle" id="exampleFormControlTextarea1" style={{ background: props.mode === 'dark' ? '#2f3e5c' : '#f5f5f5', color: props.mode === 'dark' ? 'white' : 'black' }} value={text} onChange={handleOnChange} rows="8" ></textarea>
                </div>
                <div className="app-button">
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleUpClick} >Convert to uppercase</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleLoClick} >Convert to lowercase</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleToClear} >Clear Text</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleRemoveSpaces}>Remove Extra Spaces</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleCopyClick} >Copy to clipboard</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleExtractEmail}>Extract Email</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleExtractPhoneNumber}>Extract Phone Number</button>
                    <button disabled={text.length === 0} className="app-custom-btn btn btn-primary my-1 mx-2" onClick={handleExtractLinks}>Extract Links</button>
                </div>
            </div>

            <div className="container my-3 " style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h2>Text summery.</h2>
                <p>{text.split(" ").filter((element) => { return element.length !== 0 }).length} words and {text.length} characters </p>
                <p>{0.008 * text.split(" ").filter((element) => { return element.length !== 0 }).length} minutes to read. </p>
                <h3>Preview</h3>
                <p>{text.length > 0 ? text : "Nothing to preview..."}</p>
            </div>


            <div className="container my-3 " style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                {extractedEmails.length > 0 && (
                    <div>
                        <h3>Extracted Information</h3>
                        <h4>Email Addresses</h4>
                        <ul>
                            {extractedEmails.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {extractedPhoneNumbers.length > 0 && (
                    <div>
                        <h4>Phone Numbers</h4>
                        <ul>
                            {extractedPhoneNumbers.map((phoneNumber, index) => (
                                <li key={index}>{phoneNumber}</li>
                            ))}
                        </ul>
                    </div>


                )}

                {extractedLinks.length > 0 && (
                    <div>
                        <h4>Links</h4>
                        <ul>
                            {extractedLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


            </div>

        </>

    )
}
