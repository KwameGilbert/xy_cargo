// showToast: tries to use SweetAlert2 toast mixin (red theme for error), falls back to DOM toast
export async function showToast(message, type = 'success', timeout = 3000) {
  // Try to use existing global Swal (if SweetAlert2 is loaded) or dynamically import it
  try {
    let Swal = window.Swal;
    if (!Swal) {
      // dynamic import; will fail if package not installed — we'll catch and fallback
      const mod = await import('sweetalert2');
      Swal = mod.default || mod;
      // optional: load default styles (if using bundler the CSS import may be needed separately)
    }

    const isError = type === 'error';
    // Red-themed toast for the application: using red shades for both success and error
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timeout,
      timerProgressBar: true,
      background: isError ? '#fee2e2' : '#fff1f2',
      color: '#7f1d1d',
      customClass: {
        popup: 'fy-swal-toast-popup'
      },
      didOpen: (el) => {
        el.addEventListener('mouseenter', Swal.stopTimer);
        el.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    await toast.fire({
      icon: isError ? 'error' : 'success',
      title: message
    });
    return;
  } catch (err) {
    // fallback to DOM toast if SweetAlert2 isn't available
    // Minimal DOM toast (keeps red theme for error)
    const id = 'fy-toast-root';
    let root = document.getElementById(id);
    if (!root) {
      root = document.createElement('div');
      root.id = id;
      root.style.position = 'fixed';
      root.style.top = '16px';
      root.style.right = '16px';
      root.style.zIndex = 9999;
      document.body.appendChild(root);
    }

  const toast = document.createElement('div');
  // Red themed application styles: subtle red backgrounds and darker red text
  toast.style.background = type === 'error' ? '#fee2e2' : '#fff1f2';
  toast.style.color = '#7f1d1d';
    toast.style.border = '1px solid rgba(0,0,0,0.06)';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 6px 18px rgba(15,23,42,0.06)';
    toast.style.marginTop = '8px';
    toast.style.fontSize = '14px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
    toast.textContent = message;

    root.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-8px)';
      setTimeout(() => root.removeChild(toast), 220);
    }, timeout);
  }
}

// Also export a convenience synchronous wrapper for code that doesn't await
export function showToastSync(message, type = 'success', timeout = 3000) {
  // Not awaiting the dynamic import; call and ignore the returned promise
  showToast(message, type, timeout).catch(() => {});
}
