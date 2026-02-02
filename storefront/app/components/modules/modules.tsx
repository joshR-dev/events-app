type Module = {
  _key: string;
  _type: string;
  [key: string]: any;
};

type ModulesProps = {
  modules: Module[] | null | undefined;
};

export function Modules({ modules }: ModulesProps) {
  if (!modules || modules.length === 0) {
    return null;
  }

  return (
    <div className="modules">
      {modules.map((module) => {
        if (!module) return null;

        switch (module._type) {
          case 'accordion':
            return (
              <div key={module._key} className="module-accordion">
                <h2>{module._key}</h2>
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          case 'callout':
            return (
              <div key={module._key} className="module-callout">
                <p>{module.text}</p>
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          case 'grid':
            return (
              <div key={module._key} className="module-grid">
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          case 'images':
            return (
              <div key={module._key} className="module-images">
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          case 'imageWithProductHotspots':
            return (
              <div key={module._key} className="module-hotspots">
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          case 'instagram':
            return (
              <div key={module._key} className="module-instagram">
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          case 'products':
            return (
              <div key={module._key} className="module-products">
                <pre>{JSON.stringify(module, null, 2)}</pre>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
