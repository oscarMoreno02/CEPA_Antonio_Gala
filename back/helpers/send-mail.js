const nodemailer = require('nodemailer');

//Óscar

const enviarCorreo = (body) => {
    let mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS, 
        to: body.email, 
        subject: 'Cancelación de Reserva',
        html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cancelación de Reserva de Aula</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f9f9f9;
                    color: #444;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    color:#000
                }
                h1, h2 {
                    color: #007bff;
                    margin-bottom: 20px;
                }
                p {
                    margin-bottom: 15px;
                    line-height: 1.5;
                }
                ul {
                    padding-left: 20px;
                    margin-bottom: 20px;
                }
                li {
                    margin-bottom: 5px;
                }
                .logo {
                    margin-bottom: 20px;
                }
                .signature {
                    border-top: 1px solid #ddd;
                    padding-top: 20px;
                    font-style: italic;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img class="logo" src="https://res.cloudinary.com/doa7shrwz/image/upload/v1709238124/secciones/qi0w6nwhdlckwopze7oz.jpg" alt="Logo de la Universidad">
                <h1>Cancelación de Reserva de Aula</h1>
                <p>Estimado/a Profesor/a,</p>
                <p>Lamentamos informarte que tu reserva de aula para el siguiente horario ha sido cancelada:</p>
                <ul>
                <li><strong>Fecha:</strong> ${body.fecha}</li>
                <li><strong>Horario:</strong> ${body.horario}</li>
                <li><strong>Aula:</strong> ${body.aula}</li>
                </ul>
                <p>Por favor, disculpa cualquier inconveniente que esto pueda causarte. Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                <p>Gracias por tu comprensión.</p>
                <p>Atentamente,</p>
                <p>Jefatura de estudios CEPA Antonio Gala</p>
                <div class="signature">
                    <p>Este es un mensaje automático. Por favor, no respondas a este correo electrónico.</p>
                </div>
            </div>
        </body>
        </html>
        
        
    `
    };
   
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error al enviar el correo electrónico:', error);
          
        } else {
        }
    });
}

let transporter = nodemailer.createTransport({ 
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT_SECURE,
    secure:true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },

});



module.exports = {
    enviarCorreo
}