// formulario.js actualizado: evita repetir países seleccionados

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comidaForm');
  const paisSelect = document.getElementById('paisSelect');
  const tipoSelect = document.getElementById('tipoSelect');
  const respuestaEl = document.getElementById('respuesta');
  const submitBtn = form.querySelector('button[type="submit"]');

  const API_URL = 'https://sheetdb.io/api/v1/28mmcbb3jcryn';
  const MAX_ENTRANTES = 4;
  const MAX_PRINCIPALES = 12;

  // Lista completa de países en español
  const paises = [
    "Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita",
    "Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés",
    "Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia",
    "Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi",
    "Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China",
    "Chipre","Colombia","Comoras","Congo","República Democrática del Congo","Corea del Norte",
    "Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica",
    "Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia",
    "España","Estados Unidos","Estonia","Esuatini","Etiopía","Filipinas","Finlandia","Fiyi",
    "Francia","Gabón","Gambia","Georgia","Ghana","Grecia","Granada","Guatemala","Guinea",
    "Guinea-Bisáu","Guinea Ecuatorial","Guyana","Haití","Honduras","Hungría","India","Indonesia",
    "Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia",
    "Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait",
    "Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania",
    "Luxemburgo","Macedonia del Norte","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta",
    "Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia",
    "Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega",
    "Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea",
    "Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa",
    "República Dominicana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino",
    "San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles",
    "Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Sudáfrica","Sudán","Sudán del Sur",
    "Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga",
    "Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay",
    "Uzbekistán","Vanuatu","Vaticano","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"
  ];

   // Rellenar el <select> de países antes de instanciar TomSelect
  paises.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    paisSelect.appendChild(opt);
  });

  // Inicializar TomSelect
  const paisTS = new TomSelect(paisSelect, {
    placeholder: '-- Selecciona un país --',
    allowEmptyOption: true,
    sortField: { field: 'text', direction: 'asc' },
    maxOptions: paises.length
  });

  const tipoTS = new TomSelect(tipoSelect, { allowEmptyOption: true });

  // Actualiza contadores y elimina países ya usados
  async function actualizarContadores() {
    try {
      const res = await fetch(API_URL);
      const registros = await res.json();

      // Eliminar del selector los países ya registrados
      registros.forEach(r => {
        paisTS.removeOption(r.pais);
      });

      // Contar tipos
      const tipos = registros.map(r => r.tipo);
      const entrantes = tipos.filter(t => t === 'Entrante').length;
      const principales = tipos.filter(t => t === 'Comida Principal').length;

      // Actualizar opciones de tipo reflectando el conteo
      tipoTS.updateOption('Entrante', {
        text: `Entrante (${entrantes}/${MAX_ENTRANTES})`,
        value: 'Entrante',
        disabled: entrantes >= MAX_ENTRANTES
      });
      tipoTS.updateOption('Comida Principal', {
        text: `Plato principal (${principales}/${MAX_PRINCIPALES})`,
        value: 'Comida Principal',
        disabled: principales >= MAX_PRINCIPALES
      });
    } catch (err) {
      console.warn('Error al cargar contadores:', err);
    }
  }

  // Mostrar mensajes de estado
  function mostrarRespuesta(texto, tipo = 'info') {
    respuestaEl.textContent = texto;
    respuestaEl.classList.toggle('success', tipo === 'success');
    respuestaEl.classList.toggle('error', tipo === 'error');
  }

  // Manejo del envío del formulario
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const entry = {
      data: {
        nombre: form.nombre.value.trim(),
        comida: form.comida.value.trim(),
        pais: paisTS.getValue(),
        tipo: tipoTS.getValue()
      }
    };

    // Validación de campos
    if (Object.values(entry.data).some(v => !v)) {
      return mostrarRespuesta('Por favor, completa todos los campos.', 'error');
    }

    // Deshabilitar botón durante envío
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    mostrarRespuesta('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      await res.json(); // Esperar respuesta de SheetDB

      // Eliminar el país recién enviado para que no aparezca nuevamente
      paisTS.removeOption(entry.data.pais);

      mostrarRespuesta(`¡Gracias, ${entry.data.nombre}! Se registró tu comida.`, 'success');
      form.reset();
      tipoTS.clear();
      await actualizarContadores();
    } catch (err) {
      console.error('Error al enviar datos a SheetDB:', err);
      mostrarRespuesta('Error al enviar los datos. Inténtalo de nuevo.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  // Primera carga de contadores y limpieza de opciones
  actualizarContadores();
});

