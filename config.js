/* ============================================================
   DATOS DE LA INVITACIÓN  ·  Lola Patricia & Leonardo
   Para cambiar algo (un número, un link, una hora) edita SOLO este archivo.
   ============================================================ */
window.BODA = {
  // Fecha y hora de inicio de la boda (ceremonia civil). Bolivia = UTC-04:00.
  // La cuenta regresiva cuenta hasta este momento.
  inicio: "2026-10-14T18:00:00-04:00",

  // Horas que se muestran en la página
  horaCivil: "18:00",
  horaCena: "20:00",

  // Formulario de asistencia (Microsoft Forms)
  formulario:
    "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAAeG75tUNkgwNTcyR0E4SFlORzFYT1M0Q1Q4TktDWS4u&origin=QRCode",
  limiteConfirmar: "13 de octubre a las 13:00",

  // WhatsApp de los novios: número con código de país, SOLO dígitos (ej. 59171234567)
  // Si "numero" está vacío, la tarjeta muestra "muy pronto" y desactiva los botones.
  whatsapp: {
    lola: { nombre: "Lola Patricia", numero: "59179026328" },
    leonardo: { nombre: "Leonardo", numero: "59162098737" }
  },

  // Música de fondo: coloca tu archivo en  musica/musica.mp3  (si no existe, el botón se oculta)
  musica: "musica/musica.mp3",

  // Lugares (para los botones "Ver mapa")
  lugares: {
    civil: "Registro Civil Oficialía 70101090, Av. Santos Dumont esq. Av. Roque Aguilera, Santa Cruz de la Sierra, Bolivia",
    cena: "Restaurante La Tranquera, Hotel Camino Real, Santa Cruz de la Sierra, Bolivia"
  },

  // Datos del regalo (el QR es la imagen img/regalo-qr.jpg)
  regalo: { titular: "Leonardo Mercado Núñez", banco: "Banco Ganadero", vence: "10/11/2026" }
};
