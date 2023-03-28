import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'fileCache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup: (build: esbuild.PluginBuild) => {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });
      // Check file was fetched in cache
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedRes = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedRes) return cachedRes;
      });
      // Process file is .css
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const contents = `
          const style = document.createElement('style');
          style.innerText = \`${data}\`;
          document.head.appendChild(style);
        `;

        const res: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, res);
        return res;
      });
      // Process file is .js, .jsx, ....
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data: contents, request } = await axios.get(args.path);

        const res: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, res);
        return res;
      });
    },
  };
};
