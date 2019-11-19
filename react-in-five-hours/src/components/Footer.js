import React from 'react';

function Footer() {
    const styles = {
        color: "red", 
        backgroundColor: "yellow"
    };
    return (
        <footer>
            <h3 style={styles}>This is my footer element</h3>
        </footer>
    );
}

export default Footer;