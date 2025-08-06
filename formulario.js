// formulario.js mejorado para manejo asíncrono y UX refinada

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comidaForm");
  const paisSelect = document.getElementById("paisSelect");
  const tipoSelect = document.getElementById("tipoSelect");
  const respuestaEl = document.getElementById("respuesta");
  const submitBtn = form.querySelector('button[type="submit"]');

  const API_URL = "https://script.google.com/macros/s/AKfycbwKL_3oi_t8Frk88EczoF7tccX0pcoc0-r_TBg4dwkKiFEosrDVyGbALPth5CPDM3Cm/exec";

  // Instancias de TomSelect
  const paisTS = new TomSelect(paisSelect, { allowEmptyOption: true });
  const tipoTS = new TomSelect(tipoSelect, { allowEmptyOption: true });

  // Carga y ordena países dinámicamente
  const paises = [
    { nombre: "Afganistán", emoji: "🇦🇫" },
    { nombre: "Albania",    emoji: "🇦🇱" },
    { nombre: "Yibuti",      emoji: "🇩🇯" },
    { nombre: "Zambia",      emoji: "🇿🇲" },
    { nombre: "Zimbabue",    emoji: "🇿🇼" }
  ].sort((a, b) => a.nombre.localeCompare(b.nombre));

  paises.forEach(({ nombre, emoji }) => {
    paisTS.addOption({ value: nombre, text: `${emoji} ${nombre}` });
  });

  async function actualizarContadores() {
    try {
      const res = await fetch(API_URL);
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
    } catch (e) {
      console.warn('No se pudieron cargar contadores:', e);
    }
  }

  function mostrarRespuesta(texto, tipo = 'info') {
    respuestaEl.textContent = texto;
    respuestaEl.classList.remove('success', 'error');
    if (tipo === 'success') respuestaEl.classList.add('success');
    if (tipo === 'error')   respuestaEl.classList.add('error');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const entry = {
      nombre: form.nombre.value.trim(),
      comida: form.comida.value.trim(),
      pais: paisTS.getValue(),
      tipo: tipoTS.getValue()
    };

    // Validación básica
    if (Object.values(entry).some(v => !v)) {
      return mostrarRespuesta('Por favor, completa todos los campos.', 'error');
    }

    // Estado de envío
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
          mostrarRespuesta('El cupo de entrantes está lleno. ¡Gracias!', 'error');
          break;
        case 'PRINCIPALES_LLENO':
          mostrarRespuesta('El cupo de platos principales está lleno. ¡Gracias!', 'error');
          break;
        default:
          mostrarRespuesta('Error inesperado. Inténtalo más tarde.', 'error');
      }
    } catch (err) {
      console.error('Fallo al enviar:', err);
      mostrarRespuesta('Error de conexión. Revisa tu internet.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  // Primera carga de contadores
  actualizarContadores();
});
