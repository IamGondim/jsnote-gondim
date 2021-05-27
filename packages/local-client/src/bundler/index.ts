import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';
import { fetchPlugin } from './plugins/fetchPlugin';

interface BundleReturnProps {
  code: string;
  err: string;
}

let service: esbuild.Service;
export const bundle = async (rawCode: string): Promise<BundleReturnProps> => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(rawCode)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });
    return {
      code: result.outputFiles[0].text,
      err: ''
    };
  } catch (err) {
    return {
      code: '',
      err: err.message
    }
  }

};