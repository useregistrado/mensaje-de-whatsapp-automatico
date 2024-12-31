# Enviar mensajes de WhatsApp de manera automatizada

Este proyecto utiliza la librería [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js) para conectarse a **WhatsApp Web** y enviar mensajes de forma automática o programada.

---

## 1. Requisitos previos

1. **Node.js** (versión 12 o superior).
2. **npm** (administrador de paquetes de Node).
3. Una **cuenta de WhatsApp** activa en tu teléfono móvil.

---

## 2. Instalación

1. **Clona o descarga** este repositorio en tu computadora.
2. Abre una **terminal** en la carpeta raíz del proyecto.
3. Ejecuta:
   ```bash
   npm install
   ```
   Esto instalará las dependencias necesarias, incluyendo `whatsapp-web.js` y `qrcode-terminal`.

---

## 3. Configuración del script

En el archivo `send.js`, encontrarás la siguiente sección para **editar**:

```js
const messages = [
    {
        phone: '5730000000', // Cambiar por el número con código de país (sin +)
        message: 'Feliz año padrino'
    },
    {
        phone: '5730000000', // Cambiar por el número con código de país (sin +)
        message: 'Feliz año compadre'
    },
];
```

- **phone**  
  - Reemplaza `'5730000000'` con el número real, incluyendo el código de país, sin espacios ni “+”.
  - Ejemplos: `573001234567` (para Colombia), `521234567890` (para México).
- **message**  
  - Es el texto que se enviará a ese número.

Si deseas enviar mensajes a más contactos, puedes agregar más objetos con la misma estructura dentro del arreglo `messages`.

---

## 4. Ejecución manual (escaneo del QR)

1. **Ajusta** el arreglo `messages` con los números y mensajes que necesites.
2. **Abre** una terminal en la carpeta del proyecto.
3. Ejecuta:
   ```bash
   node send.js
   ```
4. En la consola aparecerá un **código QR**:
   - En tu teléfono, abre **WhatsApp**.
   - Ve a **Dispositivos vinculados** (o **WhatsApp Web**).
   - Pulsa en **Vincular un dispositivo**.
   - Escanea el código QR que se muestra en la consola.
5. La sesión se guardará localmente (carpeta `.wwebjs_auth`).  
   - **No** la borres si quieres conservar la sesión activa para futuros envíos sin volver a escanear.

---

## 5. Programar la ejecución con cron

En sistemas tipo Unix/Linux, puedes usar **cron** para ejecutar el script automáticamente:

1. **Verifica** que ya hayas hecho la primera ejecución (paso anterior) y que la sesión esté guardada.
2. Abre el editor de cron:
   ```bash
   crontab -e
   ```
3. Agrega una línea con la **ruta completa** de tu script `send.js`. Ejemplo:
   ```cron
   0 0 31 12 * /usr/bin/node /ruta/completa/a/tu/proyecto/send.js
   ```
   - Se ejecutará a las **00:00** del **31 de diciembre**. Ajusta según tus necesidades.
4. Guarda los cambios. Cuando llegue la fecha/hora configurada, cron ejecutará el script sin pedirte el QR de nuevo (la sesión sigue activa).

---

## 6. Notas finales

- **Doble ejecución necesaria**  
  1. **Primera vez**: `node send.js` para escanear y guardar sesión.  
  2. **Subsecuentes**: Se puede automatizar con cron u otras herramientas, sin volver a escanear.

- **Persistencia de sesión**  
  - Se almacena en `.wwebjs_auth`.  
  - Si la borras o cierras sesión en tu teléfono, tendrás que escanear de nuevo.

- **Pruebas manuales**  
  - Antes de confiar en cron, ejecuta `node send.js` para confirmar que los mensajes llegan a los contactos correctos.

¡Listo! Con estos pasos podrás enviar mensajes de WhatsApp de forma automatizada y programada.
