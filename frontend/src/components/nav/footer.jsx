import React from 'react';

import david from "./footer_items/david";
import audrey from "./footer_items/audrey";
import henry from "./footer_items/henry";
import jose from "./footer_items/jose";
import backpackr from "./footer_items/backpackr";

const Footer = (props) => {
    return (
        <section className="footer-container">
            <footer>

                <ul>
                    { getItems() }
                </ul>
                
                <p id="footer-copyright">
                    Probably not Copyright &copy; 2021 Backpackr
                </p>

            </footer>
        </section>
    )
}

const getItems = () => {
    const peeps = [david, audrey, henry, jose];

    // Map each item/person.
    return [backpackr].concat(shuffle(peeps)).map((item, idx) => {

        // Map each link for this person/item
        const links = item.links.map((link, idx2) =>
                <li key={idx2}>
                    <a href={link.url} target="_blank">{link.name}</a>
                </li>
            );

        return (
            <li key={idx}>
                <p>{item.name}</p>
                <ul>
                    { links }
                </ul>
            </li>
        );
    });
}

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default Footer;