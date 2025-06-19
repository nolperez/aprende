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
      history.pushState(null, '', `#${pageName}`);

      // Actualiza los enlaces activos
      updateActiveLink(pageName);

      // Llama a mostrarContenido si está disponible
      if (window.mostrarContenido) {
        setTimeout(window.mostrarContenido, 50);
      }
    })
    .fail(() => {
      $('#content').html('<p>Error cargando la página.</p>');
    });
}

function updateActiveLink(activePage) {
  // Remueve todas las clases activas
  $('[data-page]').each(function () {
    $(this).removeClass('active');
    $(this).removeClass('md:text-blue-700');
    $(this).removeClass('md:dark:text-blue-500');
    $(this).removeClass('dark:text-white');
  });

  // Agrega clases activas al enlace correspondiente
  $(`[data-page="${activePage}"]`).each(function () {
    $(this).addClass('active');
    $(this).addClass('md:text-blue-700');
    $(this).addClass('md:dark:text-blue-500');
    $(this).addClass('dark:text-white');
  });
}

// Al cargar la página, verifica el hash y actualiza el enlace activo
$(document).ready(function() {
  const initialPage = window.location.hash.replace('#', '') || 'home';
  updateActiveLink(initialPage);
});


// Navegación SPA
$(document).on('click', '[data-page]', function (e) {
  e.preventDefault();
  const page = $(this).data('page');
  loadPage(page);
});

// Manejar botón Atrás/Adelante
$(window).on('popstate', function () {
  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
});