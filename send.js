const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Creamos el cliente con la estrategia de autenticación LocalAuth
// (guarda la sesión en la carpeta .wwebjs_auth)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Escuchamos el evento 'qr' para generar el código QR en la consola
client.on('qr', qr => {
    console.log('Escanea el siguiente QR con tu teléfono:');
    qrcode.generate(qr, { small: true });
});

// Cuando el cliente esté listo, enviamos el mensaje
client.on('ready', async () => {
    console.log('¡Cliente listo!');

    // lista de números de teléfono al que enviaremos mensajes. 
    // Debe incluir el código de país, sin espacios ni símbolos extra.

    const messages = [
        {
            phone: '5730000000', // Cambiar
            message: 'Feliz año padrino'
        },
        {
            phone: '5730000000', // Cambiar
            message: 'Feliz año compadre'
        },
    ]

    const targetDate = new Date(2024, 11, 31, 23, 59, 55);

    // Fecha y hora actuales
    const now = new Date();
    
    // Validamos que la hora sea superior a las 11:59:55 segundos del 31 de diciembre de 2024
    // Para evitar enviar los mensajes involuntariamente
    if (now > targetDate) {
        // Enviar el mensaje
        messages.forEach(async m => {
            try {
                const chatId = m.phone + '@c.us';
                const sentMessage = await client.sendMessage(chatId, m.message);
                console.log('Mensaje enviado:', sentMessage.id.id);
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
            }
        })
    } else {
        console.log('Aún no hemos llegado al 31/12/2024 23:59:55');
    }

    setTimeout(() => {
        process.exit(0);
    }, 10000)
});

// Iniciar el cliente
client.initialize();

