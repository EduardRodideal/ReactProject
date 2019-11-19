import React from 'react';
import MyGreetings from './MyGreetings';

function MyInfo() {
    return (
        <div>
            <h1>Eduard Rodideal</h1>
            <p>Sunt o persoana care se dezvolta zilnic, pentru a deveni mai mult decat este la moment</p>
            <ol>
                <li>Germania</li>
                <li>Franta</li>
                <li>Portugalia</li>
            </ol>
            <MyGreetings />
        </div>
    );
}

export default MyInfo;