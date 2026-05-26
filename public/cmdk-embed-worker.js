// ─── Cmdk semantic embedding worker ──────────────────────────────
//
// Web Worker that loads @huggingface/transformers + Xenova/all-MiniLM-
// L6-v2 (quantised, ~23 MB) and embeds query strings on demand.
//
// Lives in /public so it can be loaded via `new Worker('/cmdk-embed-
// worker.js', { type: 'module' })` from any page without going through
// Vite's bundler — keeps it OFF every page's JS bundle.
//
// Message protocol
//   main → worker  { type: 'init' }                       — load model
//   worker → main  { type: 'ready' }                      — model loaded
//   worker → main  { type: 'error', message }             — load failed
//   main → worker  { type: 'embed', id, text }            — embed query
//   worker → main  { type: 'embedding', id, vector }      — query vector

let extractorPromise = null;

async function loadModel() {
  if (extractorPromise) return extractorPromise;
  extractorPromise = (async () => {
    // Pull Transformers.js from a CDN (no Vite bundling). Pinning the
    // version + using the slim ESM build keeps the worker self-contained.
    const { pipeline, env } = await import(
      'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0'
    );
    // Tell Transformers.js to fetch model weights from the Hub
    // and cache them in IndexedDB (the default in-browser cache).
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    // dtype: 'q8' loads the int8-quantised ONNX file (~23 MB) instead
    // of the full FP32 weights (~90 MB).
    return pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      dtype: 'q8',
    });
  })();
  return extractorPromise;
}

self.addEventListener('message', async (e) => {
  const msg = e.data || {};
  try {
    if (msg.type === 'init') {
      await loadModel();
      self.postMessage({ type: 'ready' });
      return;
    }
    if (msg.type === 'embed') {
      const extractor = await loadModel();
      const out = await extractor(msg.text, { pooling: 'mean', normalize: true });
      // out.data is Float32Array(384). Convert to plain Array for postMessage.
      const vector = Array.from(out.data);
      self.postMessage({ type: 'embedding', id: msg.id, vector });
      return;
    }
  } catch (err) {
    self.postMessage({ type: 'error', id: msg.id, message: String(err && err.message || err) });
  }
});
