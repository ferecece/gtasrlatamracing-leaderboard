const fetcher = async (url, method = "GET", body = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (body) options.body = JSON.stringify(body);
  
    const res = await fetch(url, options);
  
    if (!res.ok) {
      let mensajeError = "Ocurrió un error en la solicitud.";
      try {
        const errorData = await res.json();
        if (errorData?.message) {
          mensajeError = errorData.message;
        } else if (res.status >= 400 && res.status < 500) {
          mensajeError = "Hubo un problema con tu solicitud. Verifica los datos enviados.";
        } else if (res.status >= 500) {
          mensajeError = "Ocurrió un problema en el servidor. Intenta nuevamente más tarde.";
        }
      } catch {
        if (res.status >= 400 && res.status < 500) {
          mensajeError = "Hubo un problema con tu solicitud. Verifica los datos enviados.";
        } else if (res.status >= 500) {
          mensajeError = "Ocurrió un problema en el servidor. Intenta nuevamente más tarde.";
        }
      }
  
      mensajeError += " Si el problema persiste, por favor contacta al soporte técnico.";
  
      const error = new Error(mensajeError);
      error.status = res.status;
      throw error;
    }
  
    return res.json();
  };
  
  export const getData = (url) => fetcher(`/api/${url}`, "GET");