// ============================================================================
// CLIENTE WEB DINÁMICO — ASVID SpA
// Sincroniza en tiempo real los datos editados desde /interno (Obras, Servicios, Contacto, Avisos)
// ============================================================================

(function () {
  const STORAGE_KEY = 'asvid_dueno_data_v1';

  const DEFAULT_DATA = {
    contacto: {
      telefono: '+(56 9) 4419 4618',
      whatsapp: '56944194618',
      email: 'contacto@grupoasvid.cl',
      direccion: 'Los Diamantes #740 Cs2, Lote 2, Concón · Región de Valparaíso',
      horario: 'Lunes a Viernes de 08:00 a 18:30 hrs'
    },
    avisoFaena: {
      activo: false,
      texto: 'Atención en terreno activa en Concón, Viña del Mar y Quintero. Recepción de EETT para cubicación inmediata.'
    },
    servicios: [
      {
        id: 'srv-1',
        linea: 'Línea 01',
        titulo: 'Obras Civiles & Cálculo Estructural',
        descripcion: 'Fundaciones masivas, memoria de cálculo de ingeniería, losas de hormigón armado, muros de contención estructural y zapatas.',
        cta: 'Cotizar Obra Civil',
        foto: 'assets/obras_civiles.webp'
      },
      {
        id: 'srv-2',
        linea: 'Línea 02',
        titulo: 'Obras y Montajes Industriales',
        descripcion: 'Fabricación en maestranza, montaje de galpones y naves en perfiles A37/A52, cubiertas aisladas y pintura intumescente.',
        cta: 'Cotizar Galpón',
        foto: 'assets/galpones_montaje.webp'
      },
      {
        id: 'srv-3',
        linea: 'Línea 03',
        titulo: 'Pavimentación & Radieres',
        descripcion: 'Radieres industriales afinados con helicóptero mecánico, adición de fibra metálica, corte de juntas y calzadas de hormigón.',
        cta: 'Cotizar Pavimento',
        foto: 'assets/pavimentacion_radier.webp'
      },
      {
        id: 'srv-4',
        linea: 'Línea 04',
        titulo: 'Mantenimiento de Plantas',
        descripcion: 'Paradas de planta, refuerzo estructural en fibra o acero, canalizaciones subterráneas, zanjas y contratos de mantención técnica.',
        cta: 'Cotizar Mantención',
        foto: 'assets/maquinaria_movimiento.webp'
      }
    ],
    obras: [
      {
        id: 'obra-1',
        categoria: 'Montaje Estructural',
        titulo: 'Nave Industrial y Centro Logístico',
        ubicacion: 'Parque Industrial Concón',
        superficie: '850 m² construidos',
        alcance: 'Fundaciones, estructura A37 y cubierta PV-4',
        foto: 'assets/galpones_montaje.webp'
      },
      {
        id: 'obra-2',
        categoria: 'Pavimentación',
        titulo: 'Radier Industrial Alto Tráfico',
        ubicacion: 'Sector El Salto, Viña del Mar',
        superficie: '1.200 m² de losa',
        alcance: 'H-30 afinado con helicóptero mecánico',
        foto: 'assets/pavimentacion_radier.webp'
      },
      {
        id: 'obra-3',
        categoria: 'Obras Civiles',
        titulo: 'Muro de Contención Estructural',
        ubicacion: 'Valparaíso Costa',
        superficie: '65 metros lineales (H=4.5m)',
        alcance: 'Hormigón armado con drenajes de agua',
        foto: 'assets/obras_civiles.webp'
      }
    ]
  };

  function obtenerData() {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (!parsed.servicios || !Array.isArray(parsed.servicios)) {
          parsed.servicios = JSON.parse(JSON.stringify(DEFAULT_DATA.servicios));
        }
        if (!parsed.obras || !Array.isArray(parsed.obras)) {
          parsed.obras = JSON.parse(JSON.stringify(DEFAULT_DATA.obras));
        }
        return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  function aplicarDataEnWeb() {
    const data = obtenerData();

    // 1. Banner de aviso superior
    let banner = document.getElementById('asvid-banner-aviso');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'asvid-banner-aviso';
      banner.style.cssText = 'background:#001A4C; color:#ffffff; font-size:11.5px; font-weight:600; text-align:center; padding:7px 14px; border-bottom:2px solid #0056B3; display:none; align-items:center; justify-content:center; gap:8px; z-index:9980; position:relative;';
      banner.innerHTML = `
        <span style="font-weight:800; background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:3px; font-size:10px;">COMUNICADO</span>
        <span id="asvid-banner-texto"></span>
      `;
      document.body.insertBefore(banner, document.body.firstChild);
    }

    if (data.avisoFaena && data.avisoFaena.activo && data.avisoFaena.texto) {
      document.getElementById('asvid-banner-texto').textContent = data.avisoFaena.texto;
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }

    // 2. Renderizar Obras
    const contenedorObras = document.getElementById('contenedor-obras');
    if (contenedorObras && data.obras && data.obras.length > 0) {
      contenedorObras.innerHTML = data.obras.map(obra => `
        <div class="bg-white border border-[#E2E4E8]">
          <img src="${obra.foto}" alt="${obra.titulo}" loading="lazy" class="w-full h-52 object-cover" onerror="this.src='assets/obras_civiles.webp'" />
          <div class="p-6 space-y-3">
            <span class="text-[11px] font-bold text-[#FF6412] uppercase tracking-wider block">${obra.categoria}</span>
            <h3 class="text-base font-bold text-[#1E2229] font-heading">${obra.titulo}</h3>
            
            <div class="text-xs text-[#555555] space-y-1.5 border-t border-slate-100 pt-3">
              <p><strong>Ubicación:</strong> ${obra.ubicacion}</p>
              <p><strong>Superficie:</strong> ${obra.superficie}</p>
              <p><strong>Alcance:</strong> ${obra.alcance || 'Ejecución integral de obra'}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 3. Renderizar Servicios Especializados
    const contenedorServicios = document.getElementById('contenedor-servicios');
    if (contenedorServicios && data.servicios && data.servicios.length > 0) {
      contenedorServicios.innerHTML = data.servicios.map(srv => `
        <div class="bg-white border border-[#E2E4E8] flex flex-col justify-between hover:border-[#FF6412] transition-colors">
          <div>
            <img src="${srv.foto}" alt="${srv.titulo}" loading="lazy" class="w-full h-44 object-cover" onerror="this.src='assets/obras_civiles.webp'" />
            <div class="p-5 space-y-2">
              <span class="text-[10px] font-bold text-[#FF6412] uppercase tracking-wider block">${srv.linea || 'Especialidad'}</span>
              <h3 class="text-base font-bold text-[#1E2229] font-heading">
                ${srv.titulo}
              </h3>
              <p class="text-xs text-[#555555] leading-relaxed">
                ${srv.descripcion}
              </p>
            </div>
          </div>
          <div class="p-5 pt-0 border-t border-slate-100 mt-4">
            <a href="#contacto" class="text-xs font-bold text-[#1E2229] hover:text-[#FF6412] transition-colors flex items-center gap-1 uppercase tracking-wider">
              <span>${srv.cta || 'Cotizar Especialidad'}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      `).join('');
    }

    // 4. Teléfonos y Enlaces WhatsApp
    const whatsappNum = data.contacto.whatsapp || '56944194618';
    const telVisible = data.contacto.telefono || '+(56 9) 4419 4618';
    const emailVisible = data.contacto.email || 'contacto@grupoasvid.cl';

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

  // Atajo de Teclado Alt + D para ir al Portal Interno
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      window.location.href = 'interno.html';
    }
  });

  // Ejecutar al cargar la página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarDataEnWeb);
  } else {
    aplicarDataEnWeb();
  }

  // Escuchar si otra pestaña (el portal /interno) actualiza localStorage
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) aplicarDataEnWeb();
  });
})();
