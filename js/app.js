// Datos globales para interpolación
const templateData = {
  siteName: "Mi Sitio",
  currentYear: new Date().getFullYear(),
  user: "Visitante"
};

// Carga un componente y aplica variables
function loadComponent(containerId, filePath) {
  $.get(filePath)
    .done(html => {
      let processedHtml = html;
      
      // Reemplaza {{variables}}
      Object.keys(templateData).forEach(key => {
        processedHtml = processedHtml.replace(
          new RegExp(`\\{\\{${key}\\}\\}`, 'g'), 
          templateData[key]
        );
      });
      
      $(`#${containerId}`).html(processedHtml);
    })
    .fail(() => {
      console.error(`Error cargando ${filePath}`);
    });
}

// Carga una página dinámica
function loadPage(pageName) {
  $.get(`templates/pages/${pageName}.html`)
    .done(html => {
      $('#content').html(html);
      
      // Actualiza URL sin recargar (SPA)
      // history.pushState(null, '', `${pageName}`);
      history.pushState(null, '', `#${pageName}`);
    })
    .fail(() => {
      $('#content').html('<p>Error cargando la página.</p>');
    });
}

// Navegación SPA
$(document).on('click', '[data-page]', function(e) {
  e.preventDefault();
  const page = $(this).data('page');
  loadPage(page);
});

// Manejar botón Atrás/Adelante
$(window).on('popstate', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
});