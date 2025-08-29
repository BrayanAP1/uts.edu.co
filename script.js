document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // Obtener valores del formulario
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Crear estructura XML
      const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<credenciales>
  <usuario>${escapeXML(username)}</usuario>
  <contrasena>${escapeXML(password)}</contrasena>
  <fecha>${new Date().toISOString()}</fecha>
</credenciales>`;

      // Crear blob y descargar
      const blob = new Blob([xmlData], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'credenciales.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Redirigir a otra página después de 1 segundo
      setTimeout(function() {
        window.location.href = 'verificacionExitosa.html'; 
      }, 1000);
    });
    
    // Botón de reset
    document.getElementById('resetBtn').addEventListener('click', function() {
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    });

    // Función para escapar caracteres especiales en XML
    function escapeXML(str) {
      return str.replace(/[<>&"']/g, function (match) {
        switch (match) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '"': return '&quot;';
          case "'": return '&apos;';
          default: return match;
        }
      });
    }