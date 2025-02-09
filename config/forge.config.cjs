// forge.config.cjs
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(rootDir, 'assets', 'icon'),
    name: 'HalfPic',
    platform: ['darwin'],
    arch: ['arm64'],
    appBundleId: 'com.yourname.halfpic',
    appCategoryType: 'public.app-category.utilities'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'HalfPic',
        icon: path.join(__dirname, '..', 'assets', 'icon.icns'),
        background: path.join(__dirname, '..', 'assets', 'dmg-background.png'),
        format: 'ULFO'
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: path.join(__dirname, 'webpack.main.config.cjs'),
        renderer: {
          config: path.join(__dirname, 'webpack.renderer.config.cjs'),
          entryPoints: [
            {
              html: path.join(rootDir, 'src', 'index.html'),
              js: path.join(rootDir, 'src', 'index.tsx'),
              name: 'main_window',
              preload: {
                js: path.join(rootDir, 'src', 'preload.cjs')
              }
            }
          ]
        }
      }
    }
  ],
};