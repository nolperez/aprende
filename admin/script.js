// import { supabase } from '../js/supabase.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     const selectPagina = document.getElementById('selectPagina');
//     const tituloInput = document.getElementById('titulo');
//     const contenidoInput = document.getElementById('contenido');
//     const guardarBtn = document.getElementById('guardar');

//     // Cargar contenido existente
// async function loadContent() {
//   const { data, error } = await supabase
//     .from('contenido_paginas')
//     .select('contenido')
//     .eq('pagina', selectPagina.value)
//     .single();

//   if (error && error.code === 'PGRST116') {
//     // Si la página no existe, mostrar editor vacío
//     elementIdInput.value = 'banner'; // Valor por defecto
//     contenidoInput.value = '';
//     return;
//   }

//   if (error) {
//     Swal.fire('Error', 'No se pudo cargar el contenido', 'error');
//     return;
//   }

//   // Mostrar primer campo disponible
//   if (data.contenido && Object.keys(data.contenido).length > 0) {
//     const firstKey = Object.keys(data.contenido)[0];
//     elementIdInput.value = firstKey;
//     contenidoInput.value = data.contenido[firstKey] || '';
//   } else {
//     elementIdInput.value = 'banner';
//     contenidoInput.value = '';
//   }
// }

//     // Guardar cambios
//     async function saveContent() {
//         const { error } = await supabase
//             .from('contenido_paginas')
//             .upsert({
//                 pagina: selectPagina.value,
//                 titulo: tituloInput.value,
//                 contenido: contenidoInput.value
//             }, { onConflict: 'pagina' });

//         if (error) {
//             alert('Error guardando: ' + error.message);
//         } else {
//             alert('Contenido guardado!');
//         }
//     }

//     // Event listeners
//     selectPagina.addEventListener('change', loadContent);
//     guardarBtn.addEventListener('click', saveContent);

//     // Carga inicial
//     await loadContent();

//     if (confirm('¿Recargar la página para ver cambios?')) {
//         window.opener.location.reload(); // Si abriste admin en nueva pestaña
//     }
// });

// En admin/script.js
// async function saveContent() {
//     const dynamicId = tituloInput.value.trim(); // Esto debe coincidir con data-dynamic-id
//     const content = contenidoInput.value;
    
//     // Guardar usando el mismo ID que en el HTML
//     const { error } = await supabase
//         .from('contenido_paginas')
//         .upsert({
//             pagina: selectPagina.value,
//             [dynamicId]: content  // Usamos notación de corchetes para dinámico
//         }, { onConflict: 'pagina' });
// }

import { supabase } from '../js/supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Elementos del formulario
    const selectPagina = document.getElementById('selectPagina');
    const tituloInput = document.getElementById('titulo');
    const contenidoInput = document.getElementById('contenido');
    const guardarBtn = document.getElementById('guardar');

    // Cargar contenido existente
    async function loadContent() {
        try {
            const { data, error } = await supabase
                .from('contenido_paginas')
                .select('titulo, contenido')
                .eq('pagina', selectPagina.value)
                .single();

            if (error && error.code === 'PGRST116') {
                // Página no existe, valores por defecto
                tituloInput.value = 'titulo';
                contenidoInput.value = '<p>Nuevo contenido</p>';
                return;
            }

            if (error) throw error;

            // Rellenar formulario
            tituloInput.value = data?.titulo || 'titulo';
            contenidoInput.value = data?.contenido || '<p>Nuevo contenido</p>';
        } catch (error) {
            console.error('Error cargando contenido:', error);
            Swal.fire('Error', 'No se pudo cargar el contenido', 'error');
        }
    }

    // Guardar cambios
    async function saveContent() {
        try {
            const { error } = await supabase
                .from('contenido_paginas')
                .upsert({
                    pagina: selectPagina.value,
                    titulo: tituloInput.value,
                    contenido: contenidoInput.value
                }, { onConflict: 'pagina' });

            if (error) throw error;

            Swal.fire('Éxito', 'Contenido guardado correctamente', 'success');
        } catch (error) {
            console.error('Error guardando:', error);
            Swal.fire('Error', 'No se pudo guardar: ' + error.message, 'error');
        }
    }

    // Event listeners
    selectPagina.addEventListener('change', loadContent);
    guardarBtn.addEventListener('click', saveContent);

    // Carga inicial
    await loadContent();
});