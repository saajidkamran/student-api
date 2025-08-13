import { buildApp } from './app.js';
const PORT = Number(process.env.PORT ?? 3000);
buildApp().then((app) => app.listen({ port: PORT, host: '0.0.0.0' })
    .then(() => app.log.info(`Up on :${PORT}`))
    .catch((err) => { app.log.error(err); process.exit(1); }));
//# sourceMappingURL=index.js.map