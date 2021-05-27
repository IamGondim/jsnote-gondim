import * as esbuild from 'esbuild-wasm';


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => (
        {
          path: 'index.js',
          namespace: 'a'
        }
      ));

      build.onResolve({ filter: /^\.+\// }, (args) => ({
        namespace: 'a',
        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
      }));

      build.onResolve({ filter: /.*/ }, async (args: any) => ({
        namespace: 'a',
        path: `https://unpkg.com/${args.path}`
      }));
    },
  };
};