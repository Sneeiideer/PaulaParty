
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comidaForm");
  const paisSelectEl = document.getElementById("paisSelect");
  const tipoSelectEl = document.getElementById("tipoSelect");
  const respuestaEl = document.getElementById("respuesta");
  const submitButton = form.querySelector('button[type="submit"]');

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwKL_3oi_t8Frk88EczoF7tccX0pcoc0-r_TBg4dwkKiFEosrDVyGbALPth5CPDM3Cm/exec";

  const paises = [
    { nombre: "Afganistán", emoji: "🇦🇫" }, { nombre: "Albania", emoji: "🇦🇱" },
    { nombre: "Yibuti", emoji: "🇩🇯" }, { nombre: "Zambia", emoji: "🇿🇲" }, { nombre: "Zimbabue", emoji: "🇿🇼" }
  ];

  function mostrarRespuesta(mensaje, esError = false) {
    respuestaEl.textContent = mensaje;
    respuestaEl.style.color = esError ? "hsl(0, 70%, 50%)" : "hsl(140, 70%, 40%)";
  }

  function actualizarContadores() {
    fetch(GOOGLE_SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        if (data.entrantes !== undefined && data.principales !== undefined) {
          tipoSelectTS.updateOption('Entrante', {
            text: `Entrante (${data.entrantes}/${data.maxEntrantes})`,
            value: 'Entrante',
            disabled: data.entrantes >= data.maxEntrantes
          });
          tipoSelectTS.updateOption('Comida Principal', {
            text: `Plato principal (${data.principales}/${data.maxPrincipales})`,
            value: 'Comida Principal',
            disabled: data.principales >= data.maxPrincipales
          });
        }
      })
      .catch(() => console.warn("No se pudieron cargar los contadores."));
  }

  // Ordenar países alfabéticamente
  paises.sort((a, b) => a.nombre.localeCompare(b.nombre));

  paises.forEach(pais => {
    const option = document.createElement("option");
    option.value = pais.nombre;
    option.textContent = `${pais.emoji} ${pais.nombre}`;
    paisSelectEl.appendChild(option);
  });

  const paisSelectTS = new TomSelect(paisSelectEl, { allowEmptyOption: true });
  const tipoSelectTS = new TomSelect(tipoSelectEl, { allowEmptyOption: true });

  actualizarContadores();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      comida: form.comida.value.trim(),
      pais: paisSelectTS.getValue(),
      tipo: tipoSelectTS.getValue()
    };

    if (!data.nombre || !data.comida || !data.pais || !data.tipo) {
      mostrarRespuesta("Por favor, completa todos los campos.", true);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    mostrarRespuesta("");

    [form.nombre, form.comida, paisSelectEl, tipoSelectEl].forEach(el => el.disabled = true);

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    })
      .then(res => res.text())
      .then(msg => {
        let esError = true;
        let mensaje = "";

        switch (msg) {
          case "OK":
            esError = false;
            mensaje = `¡Gracias, ${data.nombre}! Se ha registrado tu comida.`;
            form.reset();
            paisSelectTS.clear();
            tipoSelectTS.clear();
            actualizarContadores();
            break;
          case "PAIS_DUPLICADO":
            mensaje = "Lo sentimos, alguien ya ha elegido ese país.";
            break;
          case "ENTRANTES_LLENO":
            mensaje = "El cupo de entrantes está lleno. ¡Gracias!";
            break;
          case "PRINCIPALES_LLENO":
            mensaje = "El cupo de platos principales está lleno. ¡Gracias!";
            break;
          default:
            mensaje = "Error inesperado. Inténtalo de nuevo más tarde.";
            break;
        }
        mostrarRespuesta(mensaje, esError);
      })
      .catch(err => {
        console.error("Error al enviar los datos:", err);
        mostrarRespuesta("Error de conexión. Revisa tu internet e inténtalo de nuevo.", true);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar";
        [form.nombre, form.comida, paisSelectEl, tipoSelectEl].forEach(el => el.disabled = false);
      });
  });
});
