import dotenv from "dotenv";
dotenv.config();

import mailgun from "mailgun-js";

const {MAILGUN_KEY, MAILGUN_DOMAIN} = process.env;
const mg = mailgun({apiKey: MAILGUN_KEY, domain: MAILGUN_DOMAIN});

const emailVerification = async (email) => {
    await mg.messages().send({
        from: " Felipe <lypematos82@gmail.com>",
	    to: email,
	    subject: "Seja Bem-Vindo",
	    html: `
            <h1>Olá, Seja Bem-Vindo!</h1>
            <p>Obrigado por se juntar nossa comunidade de amante de filmes<p>    
        `
    })
}

export {emailVerification};