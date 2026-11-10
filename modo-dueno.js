(function () {
  if (window.__modoDuenoLoaded) return;
  window.__modoDuenoLoaded = true;

  const style = document.createElement('style');
  style.textContent = `
    #md-demo-disclaimer {
      background: linear-gradient(90deg, #78350f, #92400e, #78350f);
      color: #fef3c7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11.5px;
      font-weight: 700;
      text-align: center;
      padding: 6px 14px;
      letter-spacing: 0.15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      z-index: 9989;
      position: relative;
      border-bottom: 1px solid #f59e0b;
    }
    #md-demo-disclaimer strong {
      color: #ffffff;
      background: rgba(0,0,0,0.28);
      padding: 2px 7px;
      border-radius: 999px;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    #md-promo-banner {
      background: linear-gradient(90deg, #14532d, #15803d, #14532d);
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      font-weight: 800;
      text-align: center;
      padding: 7px 14px;
      letter-spacing: 0.2px;
      display: none;
      align-items: center;
      justify-content: center;
      gap: 10px;
      z-index: 9990;
      position: relative;
      border-bottom: 2px solid #4ade80;
    }
    #md-promo-banner.active {
      display: flex;
    }
    #md-pause-banner {
      background: #991b1b;
      color: #fef2f2;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      font-weight: 800;
      text-align: center;
      padding: 8px 14px;
      display: none;
      align-items: center;
      justify-content: center;
      gap: 8px;
      z-index: 9991;
      position: relative;
    }
    #md-pause-banner.active {
      display: flex;
    }
    #md-fab {
      position: fixed;
      bottom: 18px;
      left: 18px;
      z-index: 9998;
      background: #0f172a;
      color: #ffffff;
      border: 2px solid #4ade80;
      border-radius: 999px;
      padding: 10px 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 12px 28px rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.15s ease, background 0.15s ease;
    }
    #md-fab:hover {
      transform: translateY(-2px);
      background: #1e293b;
    }
    #md-fab .md-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.25);
    }
    #md-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(3px);
      z-index: 9999;
      display: none;
      justify-content: flex-start;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #md-backdrop.open {
      display: flex;
    }
    #md-drawer {
      width: 100%;
      max-width: 460px;
      background: #0f172a;
      color: #f8fafc;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-right: 2px solid #334155;
      box-shadow: 15px 0 40px rgba(0,0,0,0.45);
      overflow: hidden;
    }
    .md-head {
      padding: 14px 16px;
      background: #14532d;
      border-bottom: 1px solid rgba(74, 222, 128, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .md-head-title {
      font-size: 14px;
      font-weight: 900;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .md-head-sub {
      font-size: 11px;
      color: #bbf7d0;
      margin-top: 2px;
    }
    .md-close {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.25);
      color: #fff;
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
    }
    .md-tabs {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      padding: 8px 12px;
      background: #090d16;
      border-bottom: 1px solid #1e293b;
    }
    .md-tab-btn {
      background: #1e293b;
      color: #94a3b8;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 7px 4px;
      font-size: 10.5px;
      font-weight: 800;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }
    .md-tab-btn.active {
      background: #14532d;
      color: #ffffff;
      border-color: #4ade80;
    }
    .md-body {
      padding: 14px 16px;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .md-pane {
      display: none;
      flex-direction: column;
      gap: 12px;
    }
    .md-pane.active {
      display: flex;
    }
    .md-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 12px 14px;
    }
    .md-card-title {
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #4ade80;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .md-input {
      width: 100%;
      background: #0f172a;
      border: 1px solid #475569;
      color: #ffffff;
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 12px;
      font-weight: 600;
      outline: none;
    }
    .md-input:focus {
      border-color: #4ade80;
    }
    .md-btn {
      background: #4ade80;
      color: #052e16;
      border: none;
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 11px;
      font-weight: 900;
      cursor: pointer;
      white-space: nowrap;
    }
    .md-btn:hover {
      background: #22c55e;
    }
    .md-item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px solid #334155;
      font-size: 12px;
    }
    .md-item-row:last-child {
      border-bottom: none;
    }
    .md-item-name {
      font-weight: 700;
      color: #f1f5f9;
      flex: 1;
      line-height: 1.25;
    }
    .md-price-inp {
      width: 82px;
      background: #0f172a;
      border: 1px solid #475569;
      color: #4ade80;
      font-weight: 800;
      font-size: 12px;
      padding: 5px 7px;
      border-radius: 6px;
      text-align: right;
    }
    .md-stock-btn {
      border: none;
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 10px;
      font-weight: 900;
      cursor: pointer;
      min-width: 78px;
    }
    .md-stock-on {
      background: #dcfce7;
      color: #14532d;
    }
    .md-stock-off {
      background: #fee2e2;
      color: #991b1b;
    }
    .md-kpi-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .md-kpi-box {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 10px;
    }
    .md-kpi-lbl {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
    }
    .md-kpi-val {
      font-size: 16px;
      font-weight: 900;
      color: #f8fafc;
      margin-top: 2px;
    }
    .md-sched-row {
      display: grid;
      grid-template-columns: 78px 1fr 1fr 56px;
      gap: 6px;
      align-items: center;
      padding: 5px 0;
      border-bottom: 1px solid #334155;
      font-size: 11px;
    }
    .md-sched-row:last-child {
      border-bottom: none;
    }
    .md-time-inp {
      background: #0f172a;
      border: 1px solid #475569;
      color: #e2e8f0;
      border-radius: 6px;
      padding: 4px 6px;
      font-size: 11px;
      font-weight: 700;
      width: 100%;
    }
    .md-foot {
      padding: 10px 16px;
      background: #090d16;
      border-top: 1px solid #1e293b;
      font-size: 10.5px;
      color: #94a3b8;
      line-height: 1.35;
    }
  `;
  document.head.appendChild(style);

  // Top Demo Disclaimer Bar (para clientes literales)
  const demoDisclaimer = document.createElement('div');
  demoDisclaimer.id = 'md-demo-disclaimer';
  demoDisclaimer.innerHTML = `
    <strong>🎨 DEMO DE REFERENCIA FUNCIONAL</strong>
    <span>Tu sitio final será 100% personalizado con tu logo, tus colores, tus fotos reales y la identidad de tu negocio.</span>
  `;
  document.body.prepend(demoDisclaimer);

  // Promo & Pause top banners
  const promoBanner = document.createElement('div');
  promoBanner.id = 'md-promo-banner';
  promoBanner.innerHTML = `<span id="md-promo-text">🔥 OFERTA DEL DÍA ACTIVADA DESDE EL PANEL DEL DUEÑO</span>`;
  document.body.prepend(promoBanner);

  const pauseBanner = document.createElement('div');
  pauseBanner.id = 'md-pause-banner';
  pauseBanner.innerHTML = `⏸️ LOCAL EN PAUSA TEMPORAL / COLACIÓN — Volvemos a recibir pedidos en 30 minutos`;
  document.body.prepend(pauseBanner);

  // Floating Action Button
  const fab = document.createElement('button');
  fab.id = 'md-fab';
  fab.type = 'button';
  fab.innerHTML = `
    <span class="md-dot"></span>
    <span>🔐 Modo Dueño PWA (Productos · Horarios · Ventas)</span>
  `;
  fab.onclick = () => toggleDrawer(true);
  document.body.appendChild(fab);

  // Drawer Modal
  const backdrop = document.createElement('div');
  backdrop.id = 'md-backdrop';
  backdrop.onclick = (e) => {
    if (e.target === backdrop) toggleDrawer(false);
  };

  backdrop.innerHTML = `
    <div id="md-drawer">
      <div class="md-head">
        <div>
          <div class="md-head-title">📲 App Móvil “Modo Dueño” (PWA $0)</div>
          <div class="md-head-sub">Controla productos, stock, horarios, caja del día y QRs desde tu celular</div>
        </div>
        <button type="button" class="md-close" id="md-close-btn">✕ Cerrar</button>
      </div>

      <!-- 4 PESTAÑAS DEL MODO ADMIN -->
      <div class="md-tabs">
        <button type="button" class="md-tab-btn active" data-tab="productos">📦 Productos</button>
        <button type="button" class="md-tab-btn" data-tab="ventas">📊 Ventas/Caja</button>
        <button type="button" class="md-tab-btn" data-tab="horarios">🕒 Horarios</button>
        <button type="button" class="md-tab-btn" data-tab="qr">📲 QR & App</button>
      </div>

      <div class="md-body">
        <!-- PESTAÑA 1: PRODUCTOS, PRECIOS Y STOCK -->
        <div class="md-pane active" id="md-pane-productos">
          <div class="md-card">
            <div class="md-card-title">
              <span>📢 Cintillo de Oferta / Aviso en Vivo</span>
              <span style="color:#94a3b8;font-weight:600;">Instantáneo</span>
            </div>
            <div style="display:flex;gap:6px;">
              <input type="text" id="md-inp-promo" class="md-input" value="🔥 HOY: 15% DCTO EN COMPRAS ONLINE · DESPACHO RÁPIDO" />
              <button type="button" class="md-btn" id="md-btn-promo">Publicar</button>
            </div>
          </div>

          <div class="md-card">
            <div class="md-card-title">
              <span>➕ Agregar Nuevo Producto / Servicio / Plato</span>
              <span style="color:#94a3b8;font-weight:600;">En 10 seg</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 90px;gap:6px;margin-bottom:6px;">
              <input type="text" id="md-new-name" class="md-input" placeholder="Nombre (Ej: Promo Familiar / Servicio)" />
              <input type="number" id="md-new-price" class="md-input" placeholder="$ Precio" step="500" />
            </div>
            <div style="display:flex;gap:6px;">
              <input type="text" id="md-new-cat" class="md-input" placeholder="Categoría o detalle breve (opcional)" />
              <button type="button" class="md-btn" id="md-btn-add">+ Agregar al Catálogo</button>
            </div>
          </div>

          <div class="md-card">
            <div class="md-card-title">
              <span>🏷️ Precios y Stock en Tiempo Real</span>
              <span style="color:#94a3b8;font-weight:600;">Edita o Agota</span>
            </div>
            <div id="md-items-container"></div>
          </div>
        </div>

        <!-- PESTAÑA 2: CONTROL DE VENTAS Y CAJA DEL DÍA -->
        <div class="md-pane" id="md-pane-ventas">
          <div class="md-card">
            <div class="md-card-title">
              <span>💰 Resumen de Ventas y Caja de Hoy</span>
              <span style="color:#4ade80;font-weight:800;">Turno Activo</span>
            </div>
            <div class="md-kpi-grid">
              <div class="md-kpi-box">
                <div class="md-kpi-lbl">Ventas de Hoy</div>
                <div class="md-kpi-val" id="md-kpi-total" style="color:#4ade80;">$348.500</div>
              </div>
              <div class="md-kpi-box">
                <div class="md-kpi-lbl">Pedidos / Órdenes</div>
                <div class="md-kpi-val" id="md-kpi-count">19 completados</div>
              </div>
              <div class="md-kpi-box">
                <div class="md-kpi-lbl">WhatsApp / Salón QR</div>
                <div class="md-kpi-val" style="font-size:13px;">12 WhatsApp · 7 Local</div>
              </div>
              <div class="md-kpi-box">
                <div class="md-kpi-lbl">Ticket Promedio</div>
                <div class="md-kpi-val" style="font-size:13px;color:#fbbf24;">$18.342 CLP</div>
              </div>
            </div>
          </div>

          <div class="md-card">
            <div class="md-card-title">
              <span>🧾 Últimos Movimientos / Comandas del Día</span>
              <button type="button" class="md-btn" id="md-btn-sim-sale" style="padding:3px 8px;font-size:10px;">+ Registrar Venta Manual</button>
            </div>
            <div id="md-sales-list" style="display:flex;flex-direction:column;gap:6px;font-size:11.5px;">
              <div class="md-item-row">
                <div>
                  <div style="font-weight:800;color:#fff;">#1049 · Pedido WhatsApp / Web</div>
                  <div style="font-size:10.5px;color:#94a3b8;">Hace 12 min · Pagado Transferencia</div>
                </div>
                <span style="font-weight:900;color:#4ade80;">$24.900</span>
              </div>
              <div class="md-item-row">
                <div>
                  <div style="font-weight:800;color:#fff;">#1048 · Atención Local / QR</div>
                  <div style="font-size:10.5px;color:#94a3b8;">Hace 28 min · Débito / Webpay</div>
                </div>
                <span style="font-weight:900;color:#4ade80;">$16.500</span>
              </div>
              <div class="md-item-row">
                <div>
                  <div style="font-weight:800;color:#fff;">#1047 · Pedido WhatsApp</div>
                  <div style="font-size:10.5px;color:#94a3b8;">Hace 51 min · Efectivo</div>
                </div>
                <span style="font-weight:900;color:#4ade80;">$31.000</span>
              </div>
            </div>
            <button type="button" class="md-btn" id="md-btn-export" style="width:100%;margin-top:10px;background:#38bdf8;color:#082f49;">
              📥 Descargar Cuadratura de Caja del Día (Excel / CSV)
            </button>
          </div>
        </div>

        <!-- PESTAÑA 3: PROGRAMAR HORARIOS Y TURNOS -->
        <div class="md-pane" id="md-pane-horarios">
          <div class="md-card">
            <div class="md-card-title">
              <span>🚦 Estado Inmediato del Negocio</span>
              <span id="md-status-lbl" style="color:#4ade80;">🟢 ABIERTO</span>
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" id="md-btn-open" class="md-btn" style="flex:1;">🟢 Recibiendo Pedidos</button>
              <button type="button" id="md-btn-pause" class="md-btn" style="flex:1;background:#ef4444;color:#fff;">⏸️ Pausar / Colación</button>
            </div>
          </div>

          <div class="md-card">
            <div class="md-card-title">
              <span>🗓️ Programar Horario Automático Semanal</span>
              <span style="color:#94a3b8;font-weight:600;">Abre y cierra solo</span>
            </div>
            <div id="md-sched-container">
              <div class="md-sched-row">
                <strong style="color:#f8fafc;">Lun a Vie</strong>
                <input type="time" class="md-time-inp" value="09:00" />
                <input type="time" class="md-time-inp" value="20:30" />
                <span style="color:#4ade80;font-weight:800;text-align:right;">Activo</span>
              </div>
              <div class="md-sched-row">
                <strong style="color:#f8fafc;">Sábado</strong>
                <input type="time" class="md-time-inp" value="10:00" />
                <input type="time" class="md-time-inp" value="21:30" />
                <span style="color:#4ade80;font-weight:800;text-align:right;">Activo</span>
              </div>
              <div class="md-sched-row">
                <strong style="color:#f8fafc;">Domingo</strong>
                <input type="time" class="md-time-inp" value="11:00" />
                <input type="time" class="md-time-inp" value="17:00" />
                <span style="color:#fbbf24;font-weight:800;text-align:right;">Medio día</span>
              </div>
            </div>
            <div style="margin-top:8px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <label style="font-size:11px;color:#cbd5e1;display:flex;align-items:center;gap:6px;">
                <input type="checkbox" checked /> Activar modo “Colación” automático (14:30 a 15:15)
              </label>
              <button type="button" class="md-btn" id="md-btn-save-sched">Guardar Horario</button>
            </div>
          </div>
        </div>

        <!-- PESTAÑA 4: QR MESAS / MOSTRADOR & APP PWA -->
        <div class="md-pane" id="md-pane-qr">
          <div class="md-card">
            <div class="md-card-title">
              <span>📱 Instalar como App en tu Celular (PWA)</span>
              <span style="color:#4ade80;">Sin App Store</span>
            </div>
            <p style="font-size:11.5px;color:#cbd5e1;line-height:1.45;margin-bottom:8px;">
              Tu panel <strong>Modo Dueño</strong> viene configurado como <strong>Aplicación Web Progresiva (PWA)</strong>. Queda con ícono directo en la pantalla de tu teléfono Android o iPhone para abrir tu caja, cambiar precios o pausar pedidos en 2 segundos.
            </p>
            <button type="button" class="md-btn" id="md-btn-pwa" style="width:100%;">
              📲 Simular Instalación de Icono PWA en mi Celular
            </button>
          </div>

          <div class="md-card">
            <div class="md-card-title">
              <span>🔳 Generador de Código QR (Mesas / Vitrina / Flyers)</span>
              <span style="color:#fbbf24;">Listo para imprimir</span>
            </div>
            <div style="display:flex;gap:12px;align-items:center;">
              <div style="width:88px;height:88px;background:#fff;border-radius:10px;padding:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <img id="md-qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://universo693.com/impulsa-pyme" alt="QR" style="width:100%;height:100%;object-fit:contain;" />
              </div>
              <div style="flex:1;">
                <div style="font-size:11px;color:#94a3b8;margin-bottom:4px;">Identificador de Mesa / Mostrador:</div>
                <input type="text" id="md-qr-label" class="md-input" value="MESA-01-SALON" style="margin-bottom:6px;" />
                <button type="button" class="md-btn" id="md-btn-qr" style="width:100%;">🔄 Generar QR para Imprimir</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="md-foot">
        💡 <strong>Incluido $0 en todos los planes:</strong> Tu sitio final se entrega 100% personalizado con tu marca y con este panel conectado a tu base de datos para que seas dueño total de tu operación.
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  function toggleDrawer(open) {
    backdrop.classList.toggle('open', open);
    if (open) renderItemsList();
  }

  document.getElementById('md-close-btn').onclick = () => toggleDrawer(false);

  // Tab switching
  backdrop.querySelectorAll('.md-tab-btn').forEach((btn) => {
    btn.onclick = () => {
      backdrop.querySelectorAll('.md-tab-btn').forEach((b) => b.classList.remove('active'));
      backdrop.querySelectorAll('.md-pane').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      const pane = document.getElementById('md-pane-' + tab);
      if (pane) pane.classList.add('active');
    };
  });

  // Promo Banner action
  document.getElementById('md-btn-promo').onclick = () => {
    const val = document.getElementById('md-inp-promo').value.trim();
    if (val) {
      document.getElementById('md-promo-text').textContent = val;
      promoBanner.classList.add('active');
    } else {
      promoBanner.classList.remove('active');
    }
  };

  // Open / Pause status action
  document.getElementById('md-btn-open').onclick = () => {
    pauseBanner.classList.remove('active');
    const lbl = document.getElementById('md-status-lbl');
    lbl.textContent = '🟢 ABIERTO';
    lbl.style.color = '#4ade80';
  };
  document.getElementById('md-btn-pause').onclick = () => {
    pauseBanner.classList.add('active');
    const lbl = document.getElementById('md-status-lbl');
    lbl.textContent = '⏸️ EN PAUSA';
    lbl.style.color = '#f87171';
  };

  // Save schedule feedback
  document.getElementById('md-btn-save-sched').onclick = (e) => {
    const btn = e.currentTarget;
    const orig = btn.textContent;
    btn.textContent = '✓ Horario Guardado';
    setTimeout(() => {
      btn.textContent = orig;
    }, 1800);
  };

  // Simulate manual sale & export CSV
  let salesTotal = 348500;
  let salesCount = 19;
  document.getElementById('md-btn-sim-sale').onclick = () => {
    const amount = 12900 + Math.floor(Math.random() * 15) * 1000;
    salesTotal += amount;
    salesCount += 1;
    document.getElementById('md-kpi-total').textContent = '$' + salesTotal.toLocaleString('es-CL');
    document.getElementById('md-kpi-count').textContent = salesCount + ' completados';
    const list = document.getElementById('md-sales-list');
    const row = document.createElement('div');
    row.className = 'md-item-row';
    row.innerHTML = `
      <div>
        <div style="font-weight:800;color:#fff;">#${1030 + salesCount} · Venta Registrada en Caja</div>
        <div style="font-size:10.5px;color:#4ade80;">Recién · Registro directo Modo Dueño</div>
      </div>
      <span style="font-weight:900;color:#4ade80;">$${amount.toLocaleString('es-CL')}</span>
    `;
    list.prepend(row);
  };

  document.getElementById('md-btn-export').onclick = () => {
    const csv = [
      'Orden,Canal,Estado,Monto_CLP',
      '1049,WhatsApp/Web,Pagado,24900',
      '1048,Salon QR,Pagado,16500',
      '1047,WhatsApp,Pagado,31000',
      'TOTAL_DIA,Turno_Actual,Cuadrado,' + salesTotal
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cuadratura_caja_modo_dueno.csv';
    a.click();
  };

  // QR & PWA simulation
  document.getElementById('md-btn-qr').onclick = () => {
    const label = document.getElementById('md-qr-label').value.trim() || 'MESA-01';
    const targetUrl = window.location.origin + window.location.pathname + '?mesa=' + encodeURIComponent(label);
    document.getElementById('md-qr-img').src =
      'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=' + encodeURIComponent(targetUrl);
  };

  document.getElementById('md-btn-pwa').onclick = (e) => {
    const btn = e.currentTarget;
    btn.textContent = '✅ ¡Listo! Así se agrega el ícono directo en tu celular';
    setTimeout(() => {
      btn.textContent = '📲 Simular Instalación de Icono PWA en mi Celular';
    }, 2800);
  };

  // Detect live items in each demo page (including DISHES for Restaurante)
  function getDemoAdapter() {
    try {
      if (typeof DISHES !== 'undefined' && Array.isArray(DISHES)) {
        return {
          items: DISHES,
          getName: (it) => it.name,
          getPrice: (it) => it.price,
          setPrice: (it, v) => {
            it.price = v;
          },
          getStock: (it) => !it._agotado,
          setStock: (it, on) => {
            it._agotado = !on;
            if (!on && !it._origName) it._origName = it.name;
            it.name = on ? it._origName || it.name : '🔴 [AGOTADO] ' + (it._origName || it.name);
          },
          addItem: (name, price, cat) => {
            DISHES.unshift({
              id: 'd' + Date.now(),
              cat: cat || 'brasa',
              name: name,
              desc: 'Agregado en vivo desde el Panel Modo Dueño.',
              price: price,
              badge: 'NUEVO HOY',
              time: '12 min',
              img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
            });
          },
          refresh: () => {
            if (typeof renderDishes === 'function') renderDishes();
            if (typeof renderCart === 'function') renderCart();
          }
        };
      }
      if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
        return {
          items: PRODUCTS,
          getName: (it) => it.name,
          getPrice: (it) => it.price,
          setPrice: (it, v) => {
            it.price = v;
          },
          getStock: (it) => (typeof it.stock === 'number' ? it.stock > 0 : !it._agotado),
          setStock: (it, on) => {
            if (typeof it.stock === 'number') {
              it.stock = on ? 10 : 0;
            } else {
              it._agotado = !on;
              if (!on && !it._origName) it._origName = it.name;
              it.name = on ? it._origName || it.name : '🔴 [AGOTADO] ' + (it._origName || it.name);
            }
          },
          addItem: (name, price, cat) => {
            PRODUCTS.unshift({
              id: 'p' + Date.now(),
              cat: cat || 'ofertas',
              name: name,
              unit: 'Unidad · Recién agregado',
              price: price,
              oldPrice: Math.round(price * 1.15),
              stock: 12,
              badge: 'NUEVO',
              img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
            });
          },
          refresh: () => {
            if (typeof renderProducts === 'function') renderProducts();
            if (typeof renderGrid === 'function') renderGrid();
            if (typeof updateCartUI === 'function') updateCartUI();
          }
        };
      }
      if (typeof CATALOG !== 'undefined' && Array.isArray(CATALOG)) {
        return {
          items: CATALOG,
          getName: (it) => it.name,
          getPrice: (it) => it.price,
          setPrice: (it, v) => {
            it.price = v;
          },
          getStock: (it) => it.stock > 0,
          setStock: (it, on) => {
            it.stock = on ? 8 : 0;
          },
          addItem: (name, price, cat) => {
            CATALOG.unshift({
              id: 'c' + Date.now(),
              category: cat || 'destacados',
              brand: 'COLECCIÓN PROPIA',
              name: name,
              price: price,
              oldPrice: null,
              stock: 10,
              rating: '5.0',
              badge: 'NUEVO',
              specs: 'Agregado desde Modo Dueño',
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
            });
          },
          refresh: () => {
            if (typeof renderCatalog === 'function') renderCatalog();
            if (typeof renderCart === 'function') renderCart();
          }
        };
      }
      if (typeof SERVICES !== 'undefined' && Array.isArray(SERVICES)) {
        return {
          items: SERVICES,
          getName: (it) => it.name,
          getPrice: (it) => it.priceParticular ?? it.price ?? 0,
          setPrice: (it, v) => {
            if ('priceParticular' in it) it.priceParticular = v;
            if ('priceFonasa' in it) it.priceFonasa = Math.round(v * 0.72);
            if ('price' in it) it.price = v;
          },
          getStock: (it) => !it._agotado,
          setStock: (it, on) => {
            it._agotado = !on;
            if (!on && !it._origName) it._origName = it.name;
            it.name = on ? it._origName || it.name : '🔴 [SIN CUPO HOY] ' + (it._origName || it.name);
          },
          addItem: (name, price) => {
            SERVICES.unshift({
              id: 's' + Date.now(),
              name: name,
              priceParticular: price,
              priceFonasa: Math.round(price * 0.75),
              price: price
            });
          },
          refresh: () => {
            if (typeof renderServices === 'function') renderServices();
            if (typeof updateSummary === 'function') updateSummary();
          }
        };
      }
      if (typeof COURSES !== 'undefined' && Array.isArray(COURSES)) {
        return {
          items: COURSES,
          getName: (it) => it.title || it.name,
          getPrice: (it) => it.price,
          setPrice: (it, v) => {
            it.price = v;
          },
          getStock: (it) => !it._agotado,
          setStock: (it, on) => {
            it._agotado = !on;
            if (!on && !it._origTitle) it._origTitle = it.title;
            it.title = on ? it._origTitle || it.title : '🔴 [CUPOS CERRADOS] ' + (it._origTitle || it.title);
          },
          refresh: () => {
            if (typeof renderCourses === 'function') renderCourses();
          }
        };
      }
      if (typeof BAYS !== 'undefined' && Array.isArray(BAYS)) {
        return {
          items: BAYS,
          getName: (it) => `${it.patente} · ${it.model}`,
          getPrice: (it) => it.total,
          setPrice: (it, v) => {
            it.total = v;
          },
          getStock: (it) => it.stage !== 'LISTO PARA RETIRO ✅',
          setStock: (it, on) => {
            it.stage = on ? 'EN REPARACIÓN 🔧' : 'LISTO PARA RETIRO ✅';
            it.progress = on ? 65 : 100;
          },
          refresh: () => {
            if (typeof renderBays === 'function') renderBays();
          }
        };
      }
      if (typeof MATERIALS !== 'undefined' && typeof MATERIALS === 'object') {
        const list = Object.keys(MATERIALS).map((k) => ({ key: k, ...MATERIALS[k] }));
        return {
          items: list,
          getName: (it) => it.label || it.name || it.key,
          getPrice: (it) => it.ufPerM2,
          setPrice: (it, v) => {
            MATERIALS[it.key].ufPerM2 = v;
          },
          getStock: (it) => !MATERIALS[it.key]._paused,
          setStock: (it, on) => {
            MATERIALS[it.key]._paused = !on;
          },
          refresh: () => {
            if (typeof calcQuote === 'function') calcQuote();
          }
        };
      }
    } catch (err) {
      console.warn('Modo Dueño adapter warning:', err);
    }
    return null;
  }

  // Add new item handler
  document.getElementById('md-btn-add').onclick = () => {
    const adapter = getDemoAdapter();
    const nameInp = document.getElementById('md-new-name');
    const priceInp = document.getElementById('md-new-price');
    const catInp = document.getElementById('md-new-cat');
    const name = nameInp.value.trim();
    const price = Number(priceInp.value) || 9900;
    const cat = catInp.value.trim();
    if (!name) {
      nameInp.focus();
      return;
    }
    if (adapter && typeof adapter.addItem === 'function') {
      adapter.addItem(name, price, cat);
      adapter.refresh();
      nameInp.value = '';
      priceInp.value = '';
      catInp.value = '';
      renderItemsList();
    }
  };

  function renderItemsList() {
    const container = document.getElementById('md-items-container');
    const adapter = getDemoAdapter();
    if (!adapter || !adapter.items || !adapter.items.length) {
      container.innerHTML = `<div style="color:#94a3b8;font-size:12px;">Catálogo sincronizado y listo para editar.</div>`;
      return;
    }

    container.innerHTML = '';
    adapter.items.slice(0, 7).forEach((item) => {
      const row = document.createElement('div');
      row.className = 'md-item-row';

      const nameEl = document.createElement('div');
      nameEl.className = 'md-item-name';
      nameEl.textContent = adapter.getName(item);

      const priceInp = document.createElement('input');
      priceInp.type = 'number';
      priceInp.className = 'md-price-inp';
      priceInp.value = adapter.getPrice(item);
      priceInp.step = adapter.getPrice(item) < 200 ? '1' : '500';
      priceInp.onchange = () => {
        const val = Number(priceInp.value);
        if (!isNaN(val) && val >= 0) {
          adapter.setPrice(item, val);
          adapter.refresh();
        }
      };

      const isAvailable = adapter.getStock(item);
      const stockBtn = document.createElement('button');
      stockBtn.type = 'button';
      stockBtn.className = 'md-stock-btn ' + (isAvailable ? 'md-stock-on' : 'md-stock-off');
      stockBtn.textContent = isAvailable ? '🟢 En Stock' : '🔴 Agotado';
      stockBtn.onclick = () => {
        const nextState = !adapter.getStock(item);
        adapter.setStock(item, nextState);
        adapter.refresh();
        renderItemsList();
      };

      row.appendChild(nameEl);
      row.appendChild(priceInp);
      row.appendChild(stockBtn);
      container.appendChild(row);
    });
  }
})();
