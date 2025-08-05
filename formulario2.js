document.addEventListener("DOMContentLoaded", () => {
  // Lista de países con emojis
  const paises = [
  { nombre: "Afganistán", emoji: "🇦🇫" },
  { nombre: "Albania", emoji: "🇦🇱" },
  { nombre: "Alemania", emoji: "🇩🇪" },
  { nombre: "Andorra", emoji: "🇦🇩" },
  { nombre: "Angola", emoji: "🇦🇴" },
  { nombre: "Antigua y Barbuda", emoji: "🇦🇬" },
  { nombre: "Arabia Saudita", emoji: "🇸🇦" },
  { nombre: "Argelia", emoji: "🇩🇿" },
  { nombre: "Argentina", emoji: "🇦🇷" },
  { nombre: "Armenia", emoji: "🇦🇲" },
  { nombre: "Australia", emoji: "🇦🇺" },
  { nombre: "Austria", emoji: "🇦🇹" },
  { nombre: "Azerbaiyán", emoji: "🇦🇿" },
  { nombre: "Bahamas", emoji: "🇧🇸" },
  { nombre: "Bangladés", emoji: "🇧🇩" },
  { nombre: "Barbados", emoji: "🇧🇧" },
  { nombre: "Baréin", emoji: "🇧🇭" },
  { nombre: "Bélgica", emoji: "🇧🇪" },
  { nombre: "Belice", emoji: "🇧🇿" },
  { nombre: "Benín", emoji: "🇧🇯" },
  { nombre: "Bielorrusia", emoji: "🇧🇾" },
  { nombre: "Birmania", emoji: "🇲🇲" },
  { nombre: "Bolivia", emoji: "🇧🇴" },
  { nombre: "Bosnia y Herzegovina", emoji: "🇧🇦" },
  { nombre: "Botsuana", emoji: "🇧🇼" },
  { nombre: "Brasil", emoji: "🇧🇷" },
  { nombre: "Brunéi", emoji: "🇧🇳" },
  { nombre: "Bulgaria", emoji: "🇧🇬" },
  { nombre: "Burkina Faso", emoji: "🇧🇫" },
  { nombre: "Burundi", emoji: "🇧🇮" },
  { nombre: "Bután", emoji: "🇧🇹" },
  { nombre: "Cabo Verde", emoji: "🇨🇻" },
  { nombre: "Camboya", emoji: "🇰🇭" },
  { nombre: "Camerún", emoji: "🇨🇲" },
  { nombre: "Canadá", emoji: "🇨🇦" },
  { nombre: "Catar", emoji: "🇶🇦" },
  { nombre: "Chad", emoji: "🇹🇩" },
  { nombre: "Chile", emoji: "🇨🇱" },
  { nombre: "China", emoji: "🇨🇳" },
  { nombre: "Chipre", emoji: "🇨🇾" },
  { nombre: "Ciudad del Vaticano", emoji: "🇻🇦" },
  { nombre: "Colombia", emoji: "🇨🇴" },
  { nombre: "Comoras", emoji: "🇰🇲" },
  { nombre: "Corea del Norte", emoji: "🇰🇵" },
  { nombre: "Corea del Sur", emoji: "🇰🇷" },
  { nombre: "Costa de Marfil", emoji: "🇨🇮" },
  { nombre: "Costa Rica", emoji: "🇨🇷" },
  { nombre: "Croacia", emoji: "🇭🇷" },
  { nombre: "Cuba", emoji: "🇨🇺" },
  { nombre: "Dinamarca", emoji: "🇩🇰" },
  { nombre: "Dominica", emoji: "🇩🇲" },
  { nombre: "Ecuador", emoji: "🇪🇨" },
  { nombre: "Egipto", emoji: "🇪🇬" },
  { nombre: "El Salvador", emoji: "🇸🇻" },
  { nombre: "Emiratos Árabes Unidos", emoji: "🇦🇪" },
  { nombre: "Eritrea", emoji: "🇪🇷" },
  { nombre: "Eslovaquia", emoji: "🇸🇰" },
  { nombre: "Eslovenia", emoji: "🇸🇮" },
  { nombre: "España", emoji: "🇪🇸" },
  { nombre: "Estados Unidos", emoji: "🇺🇸" },
  { nombre: "Estonia", emoji: "🇪🇪" },
  { nombre: "Eswatini", emoji: "🇸🇿" },
  { nombre: "Etiopía", emoji: "🇪🇹" },
  { nombre: "Filipinas", emoji: "🇵🇭" },
  { nombre: "Finlandia", emoji: "🇫🇮" },
  { nombre: "Fiyi", emoji: "🇫🇯" },
  { nombre: "Francia", emoji: "🇫🇷" },
  { nombre: "Gabón", emoji: "🇬🇦" },
  { nombre: "Gambia", emoji: "🇬🇲" },
  { nombre: "Georgia", emoji: "🇬🇪" },
  { nombre: "Ghana", emoji: "🇬🇭" },
  { nombre: "Granada", emoji: "🇬🇩" },
  { nombre: "Grecia", emoji: "🇬🇷" },
  { nombre: "Guatemala", emoji: "🇬🇹" },
  { nombre: "Guinea", emoji: "🇬🇳" },
  { nombre: "Guinea-Bisáu", emoji: "🇬🇼" },
  { nombre: "Guinea Ecuatorial", emoji: "🇬🇶" },
  { nombre: "Guyana", emoji: "🇬🇾" },
  { nombre: "Haití", emoji: "🇭🇹" },
  { nombre: "Honduras", emoji: "🇭🇳" },
  { nombre: "Hungría", emoji: "🇭🇺" },
  { nombre: "India", emoji: "🇮🇳" },
  { nombre: "Indonesia", emoji: "🇮🇩" },
  { nombre: "Irak", emoji: "🇮🇶" },
  { nombre: "Irán", emoji: "🇮🇷" },
  { nombre: "Irlanda", emoji: "🇮🇪" },
  { nombre: "Islandia", emoji: "🇮🇸" },
  { nombre: "Islas Marshall", emoji: "🇲🇭" },
  { nombre: "Israel", emoji: "🇮🇱" },
  { nombre: "Italia", emoji: "🇮🇹" },
  { nombre: "Jamaica", emoji: "🇯🇲" },
  { nombre: "Japón", emoji: "🇯🇵" },
  { nombre: "Jordania", emoji: "🇯🇴" },
  { nombre: "Kazajistán", emoji: "🇰🇿" },
  { nombre: "Kenia", emoji: "🇰🇪" },
  { nombre: "Kirguistán", emoji: "🇰🇬" },
  { nombre: "Kiribati", emoji: "🇰🇮" },
  { nombre: "Kuwait", emoji: "🇰🇼" },
  { nombre: "Laos", emoji: "🇱🇦" },
  { nombre: "Lesoto", emoji: "🇱🇸" },
  { nombre: "Letonia", emoji: "🇱🇻" },
  { nombre: "Líbano", emoji: "🇱🇧" },
  { nombre: "Liberia", emoji: "🇱🇷" },
  { nombre: "Libia", emoji: "🇱🇾" },
  { nombre: "Liechtenstein", emoji: "🇱🇮" },
  { nombre: "Lituania", emoji: "🇱🇹" },
  { nombre: "Luxemburgo", emoji: "🇱🇺" },
  { nombre: "Madagascar", emoji: "🇲🇬" },
  { nombre: "Malasia", emoji: "🇲🇾" },
  { nombre: "Malaui", emoji: "🇲🇼" },
  { nombre: "Maldivas", emoji: "🇲🇻" },
  { nombre: "Malí", emoji: "🇲🇱" },
  { nombre: "Malta", emoji: "🇲🇹" },
  { nombre: "Marruecos", emoji: "🇲🇦" },
  { nombre: "Mauricio", emoji: "🇲🇺" },
  { nombre: "Mauritania", emoji: "🇲🇷" },
  { nombre: "México", emoji: "🇲🇽" },
  { nombre: "Micronesia", emoji: "🇫🇲" },
  { nombre: "Moldavia", emoji: "🇲🇩" },
  { nombre: "Mónaco", emoji: "🇲🇨" },
  { nombre: "Mongolia", emoji: "🇲🇳" },
  { nombre: "Montenegro", emoji: "🇲🇪" },
  { nombre: "Mozambique", emoji: "🇲🇿" },
  { nombre: "Namibia", emoji: "🇳🇦" },
  { nombre: "Nauru", emoji: "🇳🇷" },
  { nombre: "Nepal", emoji: "🇳🇵" },
  { nombre: "Nicaragua", emoji: "🇳🇮" },
  { nombre: "Níger", emoji: "🇳🇪" },
  { nombre: "Nigeria", emoji: "🇳🇬" },
  { nombre: "Noruega", emoji: "🇳🇴" },
  { nombre: "Nueva Zelanda", emoji: "🇳🇿" },
  { nombre: "Omán", emoji: "🇴🇲" },
  { nombre: "Países Bajos", emoji: "🇳🇱" },
  { nombre: "Pakistán", emoji: "🇵🇰" },
  { nombre: "Palaos", emoji: "🇵🇼" },
  { nombre: "Palestina", emoji: "🇵🇸" },
  { nombre: "Panamá", emoji: "🇵🇦" },
  { nombre: "Papúa Nueva Guinea", emoji: "🇵🇬" },
  { nombre: "Paraguay", emoji: "🇵🇾" },
  { nombre: "Perú", emoji: "🇵🇪" },
  { nombre: "Polonia", emoji: "🇵🇱" },
  { nombre: "Portugal", emoji: "🇵🇹" },
  { nombre: "Reino Unido", emoji: "🇬🇧" },
  { nombre: "República Centroafricana", emoji: "🇨🇫" },
  { nombre: "República Checa", emoji: "🇨🇿" },
  { nombre: "República Dominicana", emoji: "🇩🇴" },
  { nombre: "Ruanda", emoji: "🇷🇼" },
  { nombre: "Rumania", emoji: "🇷🇴" },
  { nombre: "Rusia", emoji: "🇷🇺" },
  { nombre: "Samoa", emoji: "🇼🇸" },
  { nombre: "San Cristóbal y Nieves", emoji: "🇰🇳" },
  { nombre: "San Marino", emoji: "🇸🇲" },
  { nombre: "San Vicente y las Granadinas", emoji: "🇻🇨" },
  { nombre: "Santa Lucía", emoji: "🇱🇨" },
  { nombre: "Santo Tomé y Príncipe", emoji: "🇸🇹" },
  { nombre: "Senegal", emoji: "🇸🇳" },
  { nombre: "Serbia", emoji: "🇷🇸" },
  { nombre: "Seychelles", emoji: "🇸🇨" },
  { nombre: "Sierra Leona", emoji: "🇸🇱" },
  { nombre: "Singapur", emoji: "🇸🇬" },
  { nombre: "Siria", emoji: "🇸🇾" },
  { nombre: "Somalia", emoji: "🇸🇴" },
  { nombre: "Sri Lanka", emoji: "🇱🇰" },
  { nombre: "Sudáfrica", emoji: "🇿🇦" },
  { nombre: "Sudán", emoji: "🇸🇩" },
  { nombre: "Sudán del Sur", emoji: "🇸🇸" },
  { nombre: "Suecia", emoji: "🇸🇪" },
  { nombre: "Suiza", emoji: "🇨🇭" },
  { nombre: "Surinam", emoji: "🇸🇷" },
  { nombre: "Tailandia", emoji: "🇹🇭" },
  { nombre: "Tanzania", emoji: "🇹🇿" },
  { nombre: "Tayikistán", emoji: "🇹🇯" },
  { nombre: "Timor Oriental", emoji: "🇹🇱" },
  { nombre: "Togo", emoji: "🇹🇬" },
  { nombre: "Tonga", emoji: "🇹🇴" },
  { nombre: "Trinidad y Tobago", emoji: "🇹🇹" },
  { nombre: "Túnez", emoji: "🇹🇳" },
  { nombre: "Turkmenistán", emoji: "🇹🇲" },
  { nombre: "Turquía", emoji: "🇹🇷" },
  { nombre: "Tuvalu", emoji: "🇹🇻" },
  { nombre: "Ucrania", emoji: "🇺🇦" },
  { nombre: "Uganda", emoji: "🇺🇬" },
  { nombre: "Uruguay", emoji: "🇺🇾" },
  { nombre: "Uzbekistán", emoji: "🇺🇿" },
  { nombre: "Vanuatu", emoji: "🇻🇺" },
  { nombre: "Venezuela", emoji: "🇻🇪" },
  { nombre: "Vietnam", emoji: "🇻🇳" },
  { nombre: "Yemen", emoji: "🇾🇪" },
  { nombre: "Yibuti", emoji: "🇩🇯" },
  { nombre: "Zambia", emoji: "🇿🇲" },
  { nombre: "Zimbabue", emoji: "🇿🇼" }
];

  // 1. Insertar países en el select 'paisSelect'
  const paisSelectEl = document.getElementById("paisSelect");
  for (const pais of paises) {
    const option = document.createElement("option");
    option.value = pais.nombre;
    option.textContent = `${pais.emoji} ${pais.nombre}`;
    paisSelectEl.appendChild(option);
  }

  // 2. Inicializar TomSelect sobre país y tipo
  const paisSelectTS = new TomSelect("#paisSelect", {
    // Opcional: configuración adicional
    maxItems: 1,
    // permite limpiar selección con X
    allowEmptyOption: true
  });

  const tipoSelectEl = document.querySelector("select[name='tipo']");
  const tipoSelectTS = new TomSelect(tipoSelectEl, {
    maxItems: 1,
    allowEmptyOption: true
  });

  const SHEETDB_URL = "https://script.google.com/macros/s/AKfycbwKL_3oi_t8Frk88EczoF7tccX0pcoc0-r_TBg4dwkKiFEosrDVyGbALPth5CPDM3Cm/exec";
  // pon aquí tu URL real

  function actualizarContadores() {
    fetch(SHEETDB_URL)
      .then(res => res.json())
      .then(data => {
        if (
          data.entrantes !== undefined &&
          data.maxEntrantes !== undefined &&
          data.principales !== undefined &&
          data.maxPrincipales !== undefined
        ) {
          for (let option of tipoSelectEl.options) {
            if (option.value === "Entrante") {
              option.text = `Entrante (${data.entrantes}/${data.maxEntrantes})`;
            } else if (option.value === "Plato principal") {
              option.text = `Plato principal (${data.principales}/${data.maxPrincipales})`;
            } else {
              option.text = option.value;
            }
          }
          tipoSelectTS.refreshOptions(false);
        } else {
          console.warn("Datos de contadores incompletos", data);
        }
      })
      .catch(() => {
        console.warn("No se pudieron cargar los contadores.");
      });
  }

  actualizarContadores();

  document.getElementById("comidaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      nombre: form.nombre.value.trim(),
      comida: form.comida.value.trim(),
      pais: paisSelectTS.getValue(), // usar método de TomSelect para obtener valor
      tipo: tipoSelectTS.getValue()  // idem
    };

    // Validación simple para evitar enviar datos vacíos
    if (!data.nombre || !data.comida || !data.pais || !data.tipo) {
      document.getElementById("respuesta").innerText = "Por favor, completa todos los campos.";
      return;
    }

    fetch(SHEETDB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    })
      .then(res => res.text())
      .then(msg => {
        const respuestaEl = document.getElementById("respuesta");
        if (msg === "PAIS_DUPLICADO") {
          respuestaEl.innerText = "Ese país ya fue registrado.";
        } else if (msg === "ENTRANTES_LLENO") {
          respuestaEl.innerText = "Ya hay suficientes entrantes (4/4).";
        } else if (msg === "PRINCIPALES_LLENO") {
          respuestaEl.innerText = "Ya hay suficientes comidas principales (12/12).";
        } else if (msg === "OK") {
          respuestaEl.innerText = `¡Gracias! Se ha registrado tu comida: ${data.comida}`;
          form.reset();
          paisSelectTS.clear();
          tipoSelectTS.clear();
          actualizarContadores();
        } else {
          respuestaEl.innerText = "Error inesperado. Intenta más tarde.";
        }
      })
      .catch(err => {
        console.error("Error al enviar los datos:", err);
        document.getElementById("respuesta").innerText = "Error al enviar. Intenta más tarde.";
      });
  });
});