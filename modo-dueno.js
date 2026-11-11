// ============================================================================
// PANEL DE AUTOADMINISTRACIÓN ASVID SpA — MODO DUEÑO
// Desarrollado por UniVerso 693 para Ingeniería y Construcción Asvid SpA
// Permite al cliente gestionar obras, fotos, datos de contacto y avisos sin programador.
// ============================================================================

(function () {
  if (window.__modoDuenoAsvidLoaded) return;
  window.__modoDuenoAsvidLoaded = true;

  const STORAGE_KEY = 'asvid_dueno_data_v1';

  // Datos base por defecto
  const DEFAULT_DATA = {
    contacto: {
      telefono: '+56 9 9038 7414',
      whatsapp: '56990387414',
      email: 'contacto.asvid@gmail.com',
      direccion: 'Camino Internacional s/n, Concón · Región de Valparaíso',
      horario: 'Lunes a Viernes de 08:00 a 18:30 hrs'
    },
    avisoFaena: {
      activo: false,
      texto: 'Atención en terreno activa en Concón, Viña del Mar y Quintero. Recepción de EETT para cubicación inmediata.'
    },
    obras: [
      {
        id: 'obra-1',
        categoria: 'Montaje Estructural',
        titulo: 'Nave Industrial y Centro Logístico',
        ubicacion: 'Parque Industrial Concón',
        superficie: '850 m² construidos',
        alcance: 'Fundaciones, estructura A37 y cubierta PV-4',
        foto: 'assets/galpones_montaje.jpg'
      },
      {
        id: 'obra-2',
        categoria: 'Pavimentación',
        titulo: 'Radier Industrial Alto Tráfico',
        ubicacion: 'Sector El Salto, Viña del Mar',
        superficie: '1.200 m² de losa',
        alcance: 'H-30 afinado con helicóptero mecánico',
        foto: 'assets/pavimentacion_radier.jpg'
      },
      {
        id: 'obra-3',
        categoria: 'Obras Civiles',
        titulo: 'Muro de Contención Estructural',
        ubicacion: 'Valparaíso Costa',
        superficie: '65 metros lineales (H=4.5m)',
        alcance: 'Hormigón armado con drenajes de agua',
        foto: 'assets/obras_civiles.jpg'
      }
    ]
  };

  // Cargar datos persistidos o iniciales
  function obtenerDatos() {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) return JSON.parse(guardado);
    } catch (e) {
      console.warn('Error leyendo localStorage de Asvid:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function guardarDatos(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      aplicarDatosEnPagina(data);
    } catch (e) {
      alert('Error guardando en almacenamiento local: ' + e.message);
    }
  }

  // Inyectar CSS del Panel de Control
  const style = document.createElement('style');
  style.textContent = `
    #asvid-banner-aviso {
      background: #001A4C;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      text-align: center;
      padding: 7px 14px;
      border-bottom: 2px solid #0056B3;
      display: none;
      align-items: center;
      justify-content: center;
      gap: 8px;
      position: relative;
      z-index: 9980;
    }
    #asvid-banner-aviso.activo { display: flex; }

    #asvid-fab-admin {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 9998;
      background: #002469;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 6px;
      padding: 9px 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(0, 36, 105, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    #asvid-fab-admin:hover {
      background: #001A4C;
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 36, 105, 0.5);
    }
    #asvid-fab-admin .dot-live {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #22c55e;
    }

    #asvid-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 26, 76, 0.6);
      backdrop-filter: blur(2px);
      z-index: 9999;
      display: none;
      justify-content: flex-start;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #asvid-drawer-backdrop.abierto { display: flex; }

    #asvid-drawer {
      width: 100%;
      max-width: 480px;
      background: #ffffff;
      color: #32373C;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 10px 0 35px rgba(0,0,0,0.3);
      border-right: 1px solid #DEE2E6;
      overflow: hidden;
    }

    .asvid-head {
      background: #002469;
      color: #ffffff;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #0056B3;
    }
    .asvid-head h3 {
      font-size: 14px;
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .asvid-head p {
      font-size: 11px;
      color: #BFDBFE;
      margin: 2px 0 0 0;
    }
    .asvid-close-btn {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.3);
      color: #fff;
      border-radius: 4px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: 700;
      font-size: 13px;
    }
    .asvid-close-btn:hover { background: rgba(255,255,255,0.3); }

    .asvid-tabs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: #F1F3F6;
      border-bottom: 1px solid #DEE2E6;
    }
    .asvid-tab {
      padding: 10px 4px;
      font-size: 10.5px;
      font-weight: 700;
      text-align: center;
      color: #6C757D;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.15s ease;
    }
    .asvid-tab.activo {
      color: #002469;
      background: #ffffff;
      border-bottom-color: #002469;
    }

    .asvid-content {
      padding: 18px 20px;
      overflow-y: auto;
      flex: 1;
    }
    .asvid-pane {
      display: none;
      flex-direction: column;
      gap: 16px;
    }
    .asvid-pane.activo { display: flex; }

    .asvid-card {
      background: #F8F9FA;
      border: 1px solid #DEE2E6;
      padding: 14px 16px;
      border-radius: 4px;
    }
    .asvid-card-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #002469;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .asvid-label {
      display: block;
      font-size: 10.5px;
      font-weight: 700;
      color: #495057;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .asvid-input, .asvid-select, .asvid-textarea {
      width: 100%;
      background: #ffffff;
      border: 1px solid #CED4DA;
      color: #32373C;
      border-radius: 3px;
      padding: 7px 10px;
      font-size: 12px;
      box-sizing: border-box;
      outline: none;
    }
    .asvid-input:focus, .asvid-select:focus, .asvid-textarea:focus {
      border-color: #002469;
    }

    .asvid-btn-primary {
      background: #002469;
      color: #ffffff;
      border: none;
      border-radius: 3px;
      padding: 9px 16px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      cursor: pointer;
      width: 100%;
      transition: background 0.15s ease;
    }
    .asvid-btn-primary:hover { background: #001A4C; }

    .asvid-btn-danger {
      background: #DC3545;
      color: #ffffff;
      border: none;
      border-radius: 3px;
      padding: 4px 8px;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
    }
    .asvid-btn-danger:hover { background: #BD2130; }

    .asvid-obra-item {
      display: flex;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid #E9ECEF;
      align-items: center;
    }
    .asvid-obra-item:last-child { border-bottom: none; }
    .asvid-obra-thumb {
      width: 60px;
      height: 48px;
      object-fit: cover;
      border-radius: 3px;
      border: 1px solid #DEE2E6;
    }

    .asvid-footer-notice {
      padding: 12px 20px;
      background: #F8F9FA;
      border-top: 1px solid #DEE2E6;
      font-size: 11px;
      color: #6C757D;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;
  document.head.appendChild(style);

  // Crear Banner de Aviso Superior
  const bannerAviso = document.createElement('div');
  bannerAviso.id = 'asvid-banner-aviso';
  bannerAviso.innerHTML = `
    <span style="font-weight:800; background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:3px; font-size:10px;">COMUNICADO</span>
    <span id="asvid-banner-texto"></span>
  `;
  document.body.insertBefore(bannerAviso, document.body.firstChild);

  // Crear Botón Flotante (FAB)
  const fab = document.createElement('button');
  fab.id = 'asvid-fab-admin';
  fab.title = 'Modo Dueño (Presiona Alt + D)';
  fab.innerHTML = `
    <span class="dot-live"></span>
    <span>Modo Dueño · AsviD</span>
  `;
  document.body.appendChild(fab);

  // Crear Drawer / Panel Lateral
  const backdrop = document.createElement('div');
  backdrop.id = 'asvid-drawer-backdrop';
  backdrop.innerHTML = `
    <div id="asvid-drawer">
      
      <!-- Head -->
      <div class="asvid-head">
        <div>
          <h3>Panel Dueño AsviD SpA</h3>
          <p>Autoadministración de Obras, Fotos y Contacto</p>
        </div>
        <button class="asvid-close-btn" id="asvid-close-drawer">✕</button>
      </div>

      <!-- Tabs -->
      <div class="asvid-tabs">
        <button class="asvid-tab activo" data-tab="obras">Obras</button>
        <button class="asvid-tab" data-tab="contacto">Contacto</button>
        <button class="asvid-tab" data-tab="aviso">Aviso</button>
        <button class="asvid-tab" data-tab="respaldo">Bóveda</button>
      </div>

      <!-- Content -->
      <div class="asvid-content">
        
        <!-- PANE 1: GESTIÓN DE OBRAS -->
        <div class="asvid-pane activo" id="pane-obras">
          
          <div class="asvid-card">
            <div class="asvid-card-title">
              <span>Agregar Nueva Obra</span>
              <span style="font-size:10px; color:#6C757D;">Tiempo Real</span>
            </div>
            
            <form id="form-nueva-obra" style="display:flex; flex-direction:column; gap:10px;">
              <div>
                <label class="asvid-label">Nombre de la Obra *</label>
                <input type="text" id="nueva-obra-titulo" required class="asvid-input" placeholder="Ej: Galpón Logístico 900 m²" />
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div>
                  <label class="asvid-label">Categoría *</label>
                  <select id="nueva-obra-cat" class="asvid-select">
                    <option value="Montaje Estructural">Montaje Estructural</option>
                    <option value="Obras Civiles">Obras Civiles</option>
                    <option value="Pavimentación">Pavimentación</option>
                    <option value="Mantenimiento Industrial">Mantenimiento</option>
                  </select>
                </div>
                <div>
                  <label class="asvid-label">Ubicación / Comuna *</label>
                  <input type="text" id="nueva-obra-ubicacion" required class="asvid-input" placeholder="Ej: Concón / Viña del Mar" />
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div>
                  <label class="asvid-label">Superficie o Dimensión *</label>
                  <input type="text" id="nueva-obra-superficie" required class="asvid-input" placeholder="Ej: 750 m² construidos" />
                </div>
                <div>
                  <label class="asvid-label">Especificación Técnica</label>
                  <input type="text" id="nueva-obra-alcance" class="asvid-input" placeholder="Ej: H-30 / Acero A37" />
                </div>
              </div>

              <div>
                <label class="asvid-label">Fotografía de la Obra (Celular o PC) *</label>
                <input type="file" id="nueva-obra-file" accept="image/*" class="asvid-input" />
                <span style="font-size:10px; color:#6C757D; margin-top:2px; display:block;">Puedes subir directamente fotos tomadas con tu celular.</span>
              </div>

              <button type="submit" class="asvid-btn-primary" style="margin-top:6px;">
                + Publicar Obra en el Sitio Web
              </button>
            </form>
          </div>

          <div class="asvid-card">
            <div class="asvid-card-title">
              <span>Obras Publicadas Actualmente</span>
              <span id="contador-obras" style="font-size:11px; color:#002469; font-weight:700;">0</span>
            </div>
            <div id="lista-obras-admin"></div>
          </div>

        </div>

        <!-- PANE 2: DATOS DE CONTACTO & WHATSAPP -->
        <div class="asvid-pane" id="pane-contacto">
          <div class="asvid-card">
            <div class="asvid-card-title">Canales Oficiales de AsviD</div>
            
            <form id="form-contacto-admin" style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label class="asvid-label">Número de WhatsApp (Sin + ni espacios) *</label>
                <input type="text" id="adm-whatsapp" class="asvid-input" placeholder="Ej: 56990387414" />
                <span style="font-size:10px; color:#6C757D; margin-top:2px; display:block;">Aquí llegarán los mensajes de cotización de la web.</span>
              </div>

              <div>
                <label class="asvid-label">Teléfono Visible en Pantalla *</label>
                <input type="text" id="adm-telefono" class="asvid-input" placeholder="Ej: +(56 9) 9038 7414" />
              </div>

              <div>
                <label class="asvid-label">Correo Electrónico para Planos & EETT *</label>
                <input type="email" id="adm-email" class="asvid-input" placeholder="Ej: contacto.asvid@gmail.com" />
              </div>

              <div>
                <label class="asvid-label">Dirección de Casa Matriz *</label>
                <input type="text" id="adm-direccion" class="asvid-input" placeholder="Ej: Camino Internacional s/n, Concón" />
              </div>

              <button type="submit" class="asvid-btn-primary">
                Guardar Cambios de Contacto
              </button>
            </form>
          </div>
        </div>

        <!-- PANE 3: AVISO SUPERIOR DE FAENA -->
        <div class="asvid-pane" id="pane-aviso">
          <div class="asvid-card">
            <div class="asvid-card-title">Cintillo Superior de Anuncio</div>
            <p style="font-size:11px; color:#555; line-height:1.4; margin-bottom:12px;">
              Muestra una barra destacada en la parte superior del sitio web para avisos de faena urgente, vacaciones o llamados a licitación.
            </p>

            <div style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label class="asvid-label">Texto del Aviso</label>
                <textarea id="adm-aviso-texto" rows="3" class="asvid-textarea" placeholder="Escribe el mensaje de anuncio..."></textarea>
              </div>

              <div style="display:flex; gap:8px;">
                <button type="button" id="btn-activar-aviso" class="asvid-btn-primary" style="flex:1;">
                  Activar Barra
                </button>
                <button type="button" id="btn-desactivar-aviso" class="asvid-btn-danger" style="flex:1; padding:9px 12px; font-size:11px;">
                  Ocultar Barra
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- PANE 4: BÓVEDA & RESPALDO -->
        <div class="asvid-pane" id="pane-respaldo">
          <div class="asvid-card">
            <div class="asvid-card-title">Bóveda Digital AsviD</div>
            <p style="font-size:11px; color:#555; line-height:1.4; margin-bottom:12px;">
              Como contrataste la Propuesta N° 3 (Venta Directa), eres dueño del código y del contenido. Puedes descargar un archivo con toda tu información en cualquier momento.
            </p>

            <div style="display:flex; flex-direction:column; gap:8px;">
              <button type="button" id="btn-descargar-json" class="asvid-btn-primary" style="background:#0056B3;">
                ⬇ Descargar Respaldo Completo (JSON)
              </button>
              <button type="button" id="btn-restaurar-fabrica" class="asvid-btn-danger" style="padding:8px 12px; font-size:11px; margin-top:8px;">
                Restaurar Obras Originales de Fábrica
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Info -->
      <div class="asvid-footer-notice">
        <span>UniVerso 693 · Licencia Oficial</span>
        <span style="font-weight:700; color:#002469;">Modo Dueño Activo</span>
      </div>

    </div>
  `;
  document.body.appendChild(backdrop);

  // Toggle Abrir / Cerrar Drawer
  function abrirDrawer() { backdrop.classList.add('abierto'); }
  function cerrarDrawer() { backdrop.classList.remove('abierto'); }

  fab.onclick = abrirDrawer;
  document.getElementById('asvid-close-drawer').onclick = cerrarDrawer;
  backdrop.onclick = (e) => { if (e.target === backdrop) cerrarDrawer(); };

  // Atajo de Teclado Alt + D
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      backdrop.classList.toggle('abierto');
    }
  });

  // Manejo de Pestañas
  const tabBtns = backdrop.querySelectorAll('.asvid-tab');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      tabBtns.forEach(b => b.classList.remove('activo'));
      backdrop.querySelectorAll('.asvid-pane').forEach(p => p.classList.remove('activo'));
      btn.classList.add('activo');
      const target = document.getElementById('pane-' + btn.getAttribute('data-tab'));
      if (target) target.classList.add('activo');
    };
  });

  // Renderizar las Obras en la Web y en la Lista de Administración
  function renderizarObras(data) {
    const contenedorWeb = document.getElementById('contenedor-obras');
    const listaAdmin = document.getElementById('lista-obras-admin');
    const contador = document.getElementById('contador-obras');

    if (contador) contador.textContent = data.obras.length + ' obras';

    // 1. Renderizar en el Sitio Web Oficial
    if (contenedorWeb) {
      contenedorWeb.innerHTML = data.obras.map((obra) => `
        <div class="bg-white border border-[#DEE2E6]">
          <img src="${obra.foto}" alt="${obra.titulo}" class="w-full h-52 object-cover" />
          <div class="p-6 space-y-3">
            <span class="text-[11px] font-bold text-[#002469] uppercase tracking-wider block">${obra.categoria}</span>
            <h3 class="text-base font-bold text-[#32373C] font-heading">${obra.titulo}</h3>
            
            <div class="text-xs text-[#555555] space-y-1.5 border-t border-slate-100 pt-3">
              <p><strong>Ubicación:</strong> ${obra.ubicacion}</p>
              <p><strong>Superficie:</strong> ${obra.superficie}</p>
              <p><strong>Alcance:</strong> ${obra.alcance || 'Ejecución integral'}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 2. Renderizar en el Panel Admin
    if (listaAdmin) {
      listaAdmin.innerHTML = data.obras.map((obra) => `
        <div class="asvid-obra-item">
          <img src="${obra.foto}" alt="" class="asvid-obra-thumb" />
          <div style="flex:1; min-width:0;">
            <strong style="display:block; font-size:11.5px; color:#002469; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${obra.titulo}
            </strong>
            <span style="font-size:10px; color:#6C757D;">${obra.ubicacion} · ${obra.superficie}</span>
          </div>
          <button class="asvid-btn-danger btn-eliminar-obra" data-id="${obra.id}" title="Eliminar obra">
            ✕
          </button>
        </div>
      `).join('');

      // Asociar eventos eliminar
      listaAdmin.querySelectorAll('.btn-eliminar-obra').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute('data-id');
          if (confirm('¿Deseas eliminar esta obra del sitio web?')) {
            const actual = obtenerDatos();
            actual.obras = actual.obras.filter(o => o.id !== id);
            guardarDatos(actual);
            renderizarObras(actual);
          }
        };
      });
    }
  }

  // Aplicar datos generales en la web (Teléfonos, correos, avisos)
  function aplicarDatosEnPagina(data) {
    // 1. Obras
    renderizarObras(data);

    // 2. Banner de Aviso
    const banner = document.getElementById('asvid-banner-aviso');
    const txtAviso = document.getElementById('asvid-banner-texto');
    if (data.avisoFaena && data.avisoFaena.activo && data.avisoFaena.texto) {
      txtAviso.textContent = data.avisoFaena.texto;
      banner.classList.add('activo');
    } else {
      banner.classList.remove('activo');
    }

    // 3. Teléfonos y Enlaces WhatsApp
    const whatsappNum = data.contacto.whatsapp || '56990387414';
    const telVisible = data.contacto.telefono || '+(56 9) 9038 7414';
    const emailVisible = data.contacto.email || 'contacto.asvid@gmail.com';

    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      a.href = 'tel:' + telVisible.replace(/[^0-9+]/g, '');
      const span = a.querySelector('span');
      if (span && span.textContent.includes('9')) span.textContent = telVisible;
    });

    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const url = new URL(a.href);
      const textParam = url.searchParams.get('text') || '';
      a.href = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(textParam)}`;
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = 'mailto:' + emailVisible;
      const span = a.querySelector('span');
      if (span && span.textContent.includes('@')) span.textContent = emailVisible;
    });
  }

  // Cargar formulario con datos iniciales
  function rellenarFormularioAdmin(data) {
    document.getElementById('adm-whatsapp').value = data.contacto.whatsapp || '';
    document.getElementById('adm-telefono').value = data.contacto.telefono || '';
    document.getElementById('adm-email').value = data.contacto.email || '';
    document.getElementById('adm-direccion').value = data.contacto.direccion || '';
    document.getElementById('adm-aviso-texto').value = data.avisoFaena.texto || '';
  }

  // EVENTO: AGREGAR NUEVA OBRA
  const formObra = document.getElementById('form-nueva-obra');
  formObra.onsubmit = function (e) {
    e.preventDefault();
    const titulo = document.getElementById('nueva-obra-titulo').value.trim();
    const categoria = document.getElementById('nueva-obra-cat').value;
    const ubicacion = document.getElementById('nueva-obra-ubicacion').value.trim();
    const superficie = document.getElementById('nueva-obra-superficie').value.trim();
    const alcance = document.getElementById('nueva-obra-alcance').value.trim();
    const fileInput = document.getElementById('nueva-obra-file');

    function finalizarGuardado(fotoUrl) {
      const actual = obtenerDatos();
      const nueva = {
        id: 'obra-' + Date.now(),
        titulo,
        categoria,
        ubicacion,
        superficie,
        alcance,
        foto: fotoUrl || 'assets/obras_civiles.jpg'
      };
      actual.obras.unshift(nueva); // Ponerla de primera
      guardarDatos(actual);
      renderizarObras(actual);
      formObra.reset();
      alert('¡Obra publicada con éxito en el sitio web!');
    }

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        finalizarGuardado(evt.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      finalizarGuardado('assets/obras_civiles.jpg');
    }
  };

  // EVENTO: GUARDAR DATOS DE CONTACTO
  document.getElementById('form-contacto-admin').onsubmit = function (e) {
    e.preventDefault();
    const actual = obtenerDatos();
    actual.contacto.whatsapp = document.getElementById('adm-whatsapp').value.trim().replace(/[^0-9]/g, '');
    actual.contacto.telefono = document.getElementById('adm-telefono').value.trim();
    actual.contacto.email = document.getElementById('adm-email').value.trim();
    actual.contacto.direccion = document.getElementById('adm-direccion').value.trim();
    guardarDatos(actual);
    alert('Datos de contacto actualizados correctamente.');
  };

  // EVENTO: ACTIVAR / OCULTAR AVISO
  document.getElementById('btn-activar-aviso').onclick = function () {
    const actual = obtenerDatos();
    const txt = document.getElementById('adm-aviso-texto').value.trim();
    if (!txt) {
      alert('Ingresa el texto para el comunicado.');
      return;
    }
    actual.avisoFaena.activo = true;
    actual.avisoFaena.texto = txt;
    guardarDatos(actual);
    alert('Barra de aviso activada en la parte superior.');
  };

  document.getElementById('btn-desactivar-aviso').onclick = function () {
    const actual = obtenerDatos();
    actual.avisoFaena.activo = false;
    guardarDatos(actual);
    alert('Barra de aviso ocultada.');
  };

  // EVENTO: DESCARGAR JSON RESPALDO
  document.getElementById('btn-descargar-json').onclick = function () {
    const actual = obtenerDatos();
    const blob = new Blob([JSON.stringify(actual, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo_asvid_obras_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // EVENTO: RESTAURAR DE FÁBRICA
  document.getElementById('btn-restaurar-fabrica').onclick = function () {
    if (confirm('¿Restaurar las obras y datos a la configuración inicial de AsviD?')) {
      guardarDatos(DEFAULT_DATA);
      rellenarFormularioAdmin(DEFAULT_DATA);
      alert('Configuración de fábrica restablecida.');
    }
  };

  // Inicializar al cargar
  const datosIniciales = obtenerDatos();
  aplicarDatosEnPagina(datosIniciales);
  rellenarFormularioAdmin(datosIniciales);

})();
