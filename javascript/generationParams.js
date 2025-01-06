function attachGalleryListeners(tabName) {
  const gallery = gradioApp().querySelector(`#${tabName}_gallery`);
  if (!gallery) return null;
  gallery.addEventListener('click', () => {
    const btn = gradioApp().getElementById(`${tabName}_generation_info_button`);
    if (btn) btn.click();
  });
  gallery?.addEventListener('keydown', (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) gradioApp().getElementById(`${tabName}_generation_info_button`).click();
  });
  return gallery;
}

let txt2img_gallery;
let img2img_gallery;
let control_gallery;
let modal;

async function initiGenerationParams() {
  if (!modal) modal = gradioApp().getElementById('lightboxModal');
  if (!modal) return;

  const modalObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutationRecord) => {
      const tabName = getENActiveTab();
      if (mutationRecord.target.style.display === 'none') {
        const btn = gradioApp().getElementById(`${tabName}_generation_info_button`);
        if (btn) btn.click();
      }
    });
  });

  if (!txt2img_gallery) txt2img_gallery = attachGalleryListeners('txt2img');
  if (!img2img_gallery) img2img_gallery = attachGalleryListeners('img2img');
  if (!control_gallery) control_gallery = attachGalleryListeners('control');
  modalObserver.observe(modal, { attributes: true, attributeFilter: ['style'] });
  log('initGenerationParams');
}

function onCalcResolutionHires(width, height, hr_scale, hr_resize_x, hr_resize_y, hr_upscaler) {
  const setInactive = (elem, inactive) => elem.classList.toggle('inactive', !!inactive);
  const hrUpscaleBy = gradioApp().getElementById('txt2img_hr_scale');
  const hrResizeX = gradioApp().getElementById('txt2img_hr_resize_x');
  const hrResizeY = gradioApp().getElementById('txt2img_hr_resize_y');
  setInactive(hrUpscaleBy, hr_resize_x > 0 || hr_resize_y > 0);
  setInactive(hrResizeX, hr_resize_x === 0);
  setInactive(hrResizeY, hr_resize_y === 0);
  updateIncrementSize();
  return [width, height, hr_scale, hr_resize_x, hr_resize_y, hr_upscaler];
}
