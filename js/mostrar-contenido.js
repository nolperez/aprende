import { supabase } from './supabase.js';

// Función para mostrar contenido dinámico
async function mostrarContenido() {
    try {
        // Obtener nombre de página del hash de la URL
        const pageName = window.location.hash.replace('#', '') || 'home';
        
        const { data, error } = await supabase
            .from('contenido_paginas')
            .select('titulo, contenido')
            .eq('pagina', pageName)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error de Supabase:', error);
            return;
        }

        // Actualizar elementos dinámicos
        if (data) {
            if (data.titulo) {
                const tituloElement = document.querySelector('[data-dynamic-id="titulo"]');
                if (tituloElement) tituloElement.innerHTML = data.titulo;
            }
            
            if (data.contenido) {
                const contenidoElement = document.querySelector('[data-dynamic-id="contenido"]');
                if (contenidoElement) contenidoElement.innerHTML = data.contenido;
            }
        }
    } catch (error) {
        console.error('Error en mostrarContenido:', error);
    }
}

// Hacer la función disponible globalmente
window.mostrarContenido = mostrarContenido;

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar contenido inicial
    setTimeout(mostrarContenido, 100);
    
    // Escuchar cambios de ruta en SPA
    window.addEventListener('popstate', mostrarContenido);
});