// formulario.js actualizado con lista completa de países en español y depuración

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comidaForm");
  const paisSelect = document.getElementById("paisSelect");
  const tipoSelect = document.getElementById("tipoSelect");
  const respuestaEl = document.getElementById("respuesta");
  const submitBtn = form.querySelector('button[type="submit"]');

  const API_URL = "https://script.google.com/macros/s/AKfycbwKL_3oi_t8Frk88EczoF7tccX0pcoc0-r_TBg4dwkKiFEosrDVyGbALPth5CPDM3Cm/exec";

  // Inicializar TomSelect para países y tipos
  const paisTS = new TomSelect(paisSelect, {
    placeholder: '-- Selecciona un país --',
    allowEmptyOption: true,
    sortField: { field: 'text', direction: 'asc' }
  });
  const tipoTS = new TomSelect(tipoSelect, { allowEmptyOption: true });

  // Lista completa de países del mundo (nombres en español)
  const paises = [
    "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita",
    "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés",
    "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia",
    "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
    "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China",
    "Chipre", "Colombia", "Comoras", "Congo", "República Democrática del Congo", "Corea del Norte",
    "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica",
    "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia",
    "España", "Estados Unidos", "Estonia", "Esuatini", "Etiopía", "Filipinas", "Finlandia", "Fiyi",
    "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Grecia", "Granada", "Guatemala", "Guinea",
    "Guinea-Bisáu", "Guinea Ecuatorial", "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia",
    "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia",
    "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait",
    "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania",
    "Luxemburgo", "Macedonia del Norte", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta",
    "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia",
    "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega",
    "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea",
    "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa",
    "República Dominicana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino",
    "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles",
    "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur",
    "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga",
    "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay",
    "Uzbekistán", "Vanuatu", "Vaticano", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
  ];

  // Agregar opciones de países en TomSelect
  paisTS.addOptions(paises.map(p => ({ value: p, text: p })));
  paisTS.refreshOptions(false);

  // Función para actualizar contadores
  async function actualizarContadores() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      tipoTS.updateOption('Entrante', {
        text: `Entrante (${data.entrantes}/${data.maxEntrantes})`,
        value: 'Entrante',
        disabled: data.entrantes >= data.maxEntrantes
      });
      tipoTS.updateOption('Comida Principal', {
        text: `Plato principal (${data.principales}/${data.maxPrincipales})`,
        value: 'Comida Principal',
        disabled: data.principales >= data.maxPrincipales
      });
    } catch (err) {
      console.warn('Error al actualizar contadores:', err);
    }
  }

  // Mostrar mensajes con clases CSS
  function mostrarRespuesta(texto, tipo = 'info') {
    respuestaEl.textContent = texto;
    respuestaEl.classList.toggle('success', tipo === 'success');
    respuestaEl.classList.toggle('error', tipo === 'error');
  }

  // Envío de formulario
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const entry = {
      nombre: form.nombre.value.trim(),
      comida: form.comida.value.trim(),
      pais: paisTS.getValue(),
      tipo: tipoTS.getValue()
    };
    if (Object.values(entry).some(v => !v)) {
      return mostrarRespuesta('Por favor, completa todos los campos.', 'error');
    }
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    mostrarRespuesta('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: entry })
      });
      const msg = await res.text();
      switch (msg) {
        case 'OK':
          mostrarRespuesta(`¡Gracias, ${entry.nombre}! Se ha registrado tu comida.`, 'success');
          form.reset();
          paisTS.clear();
          tipoTS.clear();
          await actualizarContadores();
          break;
        case 'PAIS_DUPLICADO':
          mostrarRespuesta('Lo sentimos, alguien ya ha elegido ese país.', 'error');
          break;
        case 'ENTRANTES_LLENO':
          mostrarRespuesta('El cupo de entrantes está lleno.', 'error');
          break;
        case 'PRINCIPALES_LLENO':
          mostrarRespuesta('El cupo de platos principales está lleno.', 'error');
          break;
        default:
          mostrarRespuesta('Error inesperado. Intenta más tarde.', 'error');
      }
    } catch (err) {
      console.error('Fallo al enviar datos:', err);
      mostrarRespuesta('Error de conexión.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  // Primera carga de contadores
  actualizarContadores();
});
